import { Resend } from 'resend';

type Env = {
  RESEND_API_KEY?: string;
  CONTACT_EMAIL?: string;
  FROM_EMAIL?: string;
};

type PagesFunction<EnvBindings> = (context: {
  request: Request;
  env: EnvBindings;
}) => Response | Promise<Response>;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
  'bot-field'?: unknown;
};

type ContactData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const MAX_BODY_BYTES = 10_000;
const LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  service: 100,
  message: 3000,
} as const;

function json(
  body: { success: boolean; message: string; ok?: boolean; missing?: string[] },
  status = 200,
  headers: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...headers,
    },
  });
}

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hasHeaderInjection(value: string): boolean {
  return /[\r\n]/.test(value);
}

function isValidFromEmail(value: string): boolean {
  return !hasHeaderInjection(value) && /^.+<[^<>\s@]+@[^<>\s@]+\.[^<>\s@]+>$/.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isPayload(value: unknown): value is ContactPayload {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getMissingEnv(env: Env): string[] {
  return ['RESEND_API_KEY', 'CONTACT_EMAIL', 'FROM_EMAIL'].filter((key) => !env[key as keyof Env]);
}

function hasEnv(env: Env): env is Required<Env> {
  const missing = getMissingEnv(env);

  if (missing.length) {
    console.error('contact_api_missing_env', { missing });
    return false;
  }

  if (!isValidEmail(env.CONTACT_EMAIL || '') || hasHeaderInjection(env.CONTACT_EMAIL || '')) {
    console.error('contact_api_invalid_contact_email');
    return false;
  }

  if (!isValidFromEmail(env.FROM_EMAIL || '')) {
    console.error('contact_api_invalid_from_email');
    return false;
  }

  return true;
}

function validate(payload: ContactPayload): { data?: ContactData; message?: string } {
  const data = {
    name: clean(payload.name),
    email: clean(payload.email),
    phone: clean(payload.phone),
    service: clean(payload.service),
    message: clean(payload.message),
  };

  if (!data.name) return { message: 'Name is required.' };
  if (data.name.length > LIMITS.name) return { message: 'Name is too long.' };
  if (hasHeaderInjection(data.name)) return { message: 'Invalid name.' };
  if (!data.email) return { message: 'Email is required.' };
  if (data.email.length > LIMITS.email) return { message: 'Email is too long.' };
  if (!isValidEmail(data.email)) return { message: 'Invalid email.' };
  if (!data.phone) return { message: 'Phone is required.' };
  if (data.phone.length > LIMITS.phone) return { message: 'Phone is too long.' };
  if (hasHeaderInjection(data.phone)) return { message: 'Invalid phone.' };
  if (!data.service) return { message: 'Service is required.' };
  if (data.service.length > LIMITS.service) return { message: 'Service is too long.' };
  if (hasHeaderInjection(data.service)) return { message: 'Invalid service.' };
  if (!data.message) return { message: 'Message is required.' };
  if (data.message.length > LIMITS.message) return { message: 'Message is too long.' };

  return { data };
}

function formatDateTime(): { date: string; time: string } {
  const now = new Date();
  const date = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Brussels',
    dateStyle: 'medium',
  }).format(now);
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Brussels',
    timeStyle: 'short',
  }).format(now);

  return { date, time };
}

function leadEmailHtml(data: ContactData, date: string, time: string): string {
  const rows = [
    ['Customer name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Selected service', data.service],
    ['Date', date],
    ['Time', `${time} Brussels time`],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.5">
      <h1 style="margin:0 0 16px;font-size:22px;color:#050505">New BELNEX ENERGY quote request</h1>
      <table style="width:100%;border-collapse:collapse;margin:0 0 20px">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding:8px 12px;border:1px solid #ddd;font-weight:700;background:#f7f7f7">${escapeHtml(label)}</td>
                  <td style="padding:8px 12px;border:1px solid #ddd">${escapeHtml(value)}</td>
                </tr>
              `
            )
            .join('')}
        </tbody>
      </table>
      <h2 style="margin:0 0 8px;font-size:16px;color:#050505">Message</h2>
      <p style="white-space:pre-line;margin:0;padding:12px;border:1px solid #ddd;background:#fafafa">${escapeHtml(data.message)}</p>
    </div>
  `;
}

function confirmationEmailHtml(name: string): string {
  return `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6">
      <h1 style="margin:0 0 16px;font-size:22px;color:#050505">Thank you for contacting BELNEX ENERGY</h1>
      <p style="margin:0 0 12px">Hello ${escapeHtml(name)},</p>
      <p style="margin:0 0 12px">
        Thank you for your request. Our team has received your message and will respond as soon as possible.
      </p>
      <p style="margin:0">BELNEX ENERGY</p>
    </div>
  `;
}

async function sendEmail(resend: Resend, payload: Parameters<Resend['emails']['send']>[0]): Promise<void> {
  const response = await resend.emails.send(payload);

  if (response.error) {
    throw new Error(response.error.name || 'resend_error');
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ success: false, ok: false, message: 'Request body is too large.' }, 413);
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    console.error('contact_api_malformed_request');
    return json({ success: false, ok: false, message: 'Malformed request.' }, 400);
  }

  if (!isPayload(payload)) {
    console.error('contact_api_invalid_payload');
    return json({ success: false, ok: false, message: 'Empty or invalid request.' }, 400);
  }

  if (clean(payload['bot-field'])) {
    return json({ success: true, ok: true, message: 'Request received.' });
  }

  const validation = validate(payload);
  if (!validation.data) {
    return json({ success: false, ok: false, message: validation.message || 'Invalid request.' }, 400);
  }

  if (!hasEnv(env)) {
    return json(
      { success: false, ok: false, message: 'Email service is not configured.', missing: getMissingEnv(env) },
      500
    );
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const { date, time } = formatDateTime();
  const data = validation.data;

  try {
    await sendEmail(resend, {
      from: env.FROM_EMAIL,
      to: env.CONTACT_EMAIL,
      replyTo: data.email,
      subject: `BELNEX ENERGY quote request - ${data.service}`,
      html: leadEmailHtml(data, date, time),
    });

    await sendEmail(resend, {
      from: env.FROM_EMAIL,
      to: data.email,
      subject: 'Thank you for contacting BELNEX ENERGY',
      html: confirmationEmailHtml(data.name),
    });
  } catch (error) {
    console.error('contact_api_resend_failure', {
      error: error instanceof Error ? error.message : 'unknown',
    });
    return json({ success: false, ok: false, message: 'Unable to send email. Please try again later.' }, 502);
  }

  return json({ success: true, ok: true, message: 'Thank you. Your request was sent successfully.' });
};

export const onRequest: PagesFunction<Env> = () => {
  return json({ success: false, ok: false, message: 'Method not allowed.' }, 405, { Allow: 'POST' });
};
