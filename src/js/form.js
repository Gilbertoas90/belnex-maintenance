import { t } from '../i18n/index.js';

const FIELD_NAMES = ['name', 'email', 'phone', 'service', 'message'];

function encodeFormData(formData) {
  return Array.from(formData.entries())
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

// Netlify Forms: submitting via fetch (rather than a native page-reload
// POST) keeps the existing success/error UI. The form must stay in the
// pre-rendered HTML with data-netlify="true" and a form-name field so
// Netlify's build-time crawler can detect it — see index.html.
async function submitLead(formData) {
  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeFormData(formData),
  });
  if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
  return response;
}

function getErrorMessage(field) {
  if (field.validity.valueMissing) return t('contact.form.errorRequired');
  if (field.validity.typeMismatch && field.type === 'email') {
    return t('contact.form.errorEmail');
  }
  return t('contact.form.errorGeneric');
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
      await submitLead(new FormData(form));
      form.hidden = true;
      if (successEl) {
        successEl.hidden = false;
        successEl.focus();
      }
    } catch (error) {
      if (status) {
        status.textContent = t('contact.form.errorSubmit');
        status.dataset.state = 'error';
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = t('contact.form.submit');
    }
  });
}
