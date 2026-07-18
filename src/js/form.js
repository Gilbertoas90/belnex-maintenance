import { t } from '../i18n/index.js';

const FIELD_NAMES = ['name', 'email', 'phone', 'service', 'message'];
const CONTACT_EMAIL = 'contact@belnexenergy.be';

function getErrorMessage(field) {
  if (field.validity.valueMissing) return t('contact.form.errorRequired');
  if (field.validity.typeMismatch && field.type === 'email') {
    return t('contact.form.errorEmail');
  }
  return t('contact.form.errorGeneric');
}

async function submitLead(formData) {
  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    service: formData.get('service'),
    message: formData.get('message'),
    turnstileToken: formData.get('cf-turnstile-response'),
  };

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.ok === false) {
    throw new Error(result.message || `Form submission failed: ${response.status}`);
  }

  return result;
}

function createMailto(formData) {
  const subject = encodeURIComponent(`Quote request - ${formData.get('service') || 'Belnex Energy'}`);
  const body = encodeURIComponent(
    [
      `Full name: ${formData.get('name') || ''}`,
      `Email: ${formData.get('email') || ''}`,
      `Phone: ${formData.get('phone') || ''}`,
      `Service: ${formData.get('service') || ''}`,
      '',
      'Project details:',
      formData.get('message') || '',
    ].join('\n')
  );

  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export function initContactForm(form) {
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const submitButton = form.querySelector('[type="submit"]');
  const successEl = document.querySelector('[data-form-success]');

  const fields = FIELD_NAMES.map((name) => form.elements[name]).filter(Boolean);

  const setFieldError = (field, message) => {
    const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = message;
    } else {
      field.removeAttribute('aria-invalid');
      if (errorEl) errorEl.textContent = '';
    }
  };

  const validateField = (field) => {
    const valid = field.validity.valid;
    setFieldError(field, valid ? '' : getErrorMessage(field));
    return valid;
  };

  fields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (status) {
      status.textContent = '';
      delete status.dataset.state;
    }

    let firstInvalid = null;
    const allValid = fields.reduce((valid, field) => {
      const fieldValid = validateField(field);
      if (!fieldValid && !firstInvalid) firstInvalid = field;
      return valid && fieldValid;
    }, true);

    if (!allValid) {
      firstInvalid?.focus();
      if (status) {
        status.textContent = t('contact.form.errorFixFields');
        status.dataset.state = 'error';
      }
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = t('contact.form.sending');

    try {
      const formData = new FormData(form);
      const result = await submitLead(formData);

      if (result.fallback) {
        if (status) {
          status.textContent = result.message || t('contact.form.fallbackEmail');
          status.dataset.state = 'success';
        }
        window.location.href = result.mailto || createMailto(formData);
        return;
      }

      form.hidden = true;
      if (successEl) {
        successEl.hidden = false;
        successEl.focus();
      }
    } catch (error) {
      const formData = new FormData(form);
      if (status) {
        status.textContent = error.message || t('contact.form.errorSubmit');
        status.dataset.state = 'error';
      }

      const fallbackLink = form.querySelector('[data-form-mailto]');
      if (fallbackLink) {
        fallbackLink.href = createMailto(formData);
        fallbackLink.hidden = false;
      }
    } finally {
      window.turnstile?.reset?.();
      submitButton.disabled = false;
      submitButton.textContent = t('contact.form.submit');
    }
  });
}
