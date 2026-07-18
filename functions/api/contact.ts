import { Resend } from 'resend';

type Env = {
  RESEND_API_KEY?: string;
  CONTACT_EMAIL?: string;
  FROM_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
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
  turnstileToken?: unknown;
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
  body: {
    success: boolean;
    message: string;
    ok?: boolean;
  },
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

type EmailEnv = Required<Pick<Env, 'RESEND_API_KEY' | 'CONTACT_EMAIL' | 'FROM_EMAIL'>>;

function hasRequiredEmailEnv(env: Env): env is Env & EmailEnv {
  return Boolean(env.RESEND_API_KEY && env.CONTACT_EMAIL && env.FROM_EMAIL);
}

async function verifyTurnstile(token: string, secret: string, remoteIp: string | null): Promise<boolean> {
  if (!token) return false;

  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (remoteIp) body.append('remoteip', remoteIp);

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const result = (await response.json()) as { success?: boolean };

    return response.ok && result.success === true;
  } catch {
    return false;
  }
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
    throw new Error('resend_error');
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
    return json({ success: false, ok: false, message: 'Malformed request.' }, 400);
  }

  if (!isPayload(payload)) {
    return json({ success: false, ok: false, message: 'Empty or invalid request.' }, 400);
  }

  if (clean(payload['bot-field'])) {
    return json({ success: true, ok: true, message: 'Request received.' });
  }

  if (!env.TURNSTILE_SECRET_KEY) {
    return json({ success: false, ok: false, message: 'Security service is not configured.' }, 500);
  }

  const turnstileVerified = await verifyTurnstile(
    clean(payload.turnstileToken),
    env.TURNSTILE_SECRET_KEY,
    request.headers.get('CF-Connecting-IP')
  );

  if (!turnstileVerified) {
    return json({ success: false, ok: false, message: 'Security verification failed.' }, 400);
  }

  const validation = validate(payload);
  if (!validation.data) {
    return json({ success: false, ok: false, message: validation.message || 'Invalid request.' }, 400);
  }

  if (!hasRequiredEmailEnv(env)) {
    return json({ success: false, ok: false, message: 'Email service is not configured.' }, 500);
  }
  const configuredEnv = env;

  const resend = new Resend(configuredEnv.RESEND_API_KEY);
  const { date, time } = formatDateTime();
  const data = validation.data;

  try {
    await sendEmail(resend, {
      from: configuredEnv.FROM_EMAIL,
      to: configuredEnv.CONTACT_EMAIL,
      replyTo: data.email,
      subject: `BELNEX ENERGY quote request - ${data.service}`,
      html: leadEmailHtml(data, date, time),
    });

    await sendEmail(resend, {
      from: configuredEnv.FROM_EMAIL,
      to: data.email,
      subject: 'Thank you for contacting BELNEX ENERGY',
      html: confirmationEmailHtml(data.name),
    });
  } catch {
    return json({ success: false, ok: false, message: 'Unable to send email. Please try again later.' }, 502);
  }

  return json({ success: true, ok: true, message: 'Thank you. Your request was sent successfully.' });
};

export const onRequest: PagesFunction<Env> = () => {
  return json({ success: false, ok: false, message: 'Method not allowed.' }, 405, { Allow: 'POST' });
};
