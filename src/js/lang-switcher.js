import { LANGUAGES, getLanguage, setLanguage, t } from '../i18n/index.js';

function buildMarkup() {
  const current = getLanguage();
  const options = LANGUAGES.map(
    (lang) => `
      <li
        role="option"
        class="lang-switcher__option"
        data-lang="${lang.code}"
        tabindex="-1"
        aria-selected="${lang.code === current}"
      >${lang.name}</li>
    `
  ).join('');

  return `
    <button type="button" class="lang-switcher__trigger" aria-haspopup="listbox" aria-expanded="false">
      <span class="lang-switcher__code">${current.toUpperCase()}</span>
      <svg class="lang-switcher__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <ul class="lang-switcher__menu" role="listbox">${options}</ul>
  `;
}

function wireContainer(container) {
  const trigger = container.querySelector('.lang-switcher__trigger');
  const menu = container.querySelector('.lang-switcher__menu');
  const getOptions = () => Array.from(menu.querySelectorAll('.lang-switcher__option'));

  const closeMenu = ({ focusTrigger = false } = {}) => {
    if (!container.classList.contains('is-open')) return;
    container.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    if (focusTrigger) trigger.focus();
  };

  const openMenu = () => {
    container.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    const options = getOptions();
    const selected = options.find((opt) => opt.getAttribute('aria-selected') === 'true');
    (selected || options[0])?.focus();
  };

  trigger.addEventListener('click', () => {
    container.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  menu.addEventListener('click', (event) => {
    const option = event.target.closest('.lang-switcher__option');
    if (!option) return;
    setLanguage(option.dataset.lang);
    closeMenu({ focusTrigger: true });
  });

  menu.addEventListener('keydown', (event) => {
    const options = getOptions();
    const index = options.indexOf(document.activeElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        options[(index + 1) % options.length]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        options[(index - 1 + options.length) % options.length]?.focus();
        break;
      case 'Home':
        event.preventDefault();
        options[0]?.focus();
        break;
      case 'End':
        event.preventDefault();
        options[options.length - 1]?.focus();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        document.activeElement?.click();
        break;
      case 'Escape':
        event.preventDefault();
        closeMenu({ focusTrigger: true });
        break;
      case 'Tab':
        closeMenu();
        break;
      default:
        break;
    }
  });

  document.addEventListener('click', (event) => {
    if (!container.contains(event.target)) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && container.classList.contains('is-open')) closeMenu();
  });
}

function refresh(container) {
  const current = getLanguage();
  container.classList.remove('is-open');
  container.querySelector('.lang-switcher__trigger')?.setAttribute('aria-expanded', 'false');
  container.querySelector('.lang-switcher__trigger')?.setAttribute('aria-label', t('langSwitcher.triggerAria'));
  container.querySelector('.lang-switcher__menu')?.setAttribute('aria-label', t('langSwitcher.listAria'));
  const code = container.querySelector('.lang-switcher__code');
  if (code) code.textContent = current.toUpperCase();
  container.querySelectorAll('.lang-switcher__option').forEach((option) => {
    option.setAttribute('aria-selected', String(option.dataset.lang === current));
  });
}

export function initLangSwitcher() {
  const containers = Array.from(document.querySelectorAll('[data-lang-switcher]'));
  if (!containers.length) return;

  containers.forEach((container) => {
    container.innerHTML = buildMarkup();
    wireContainer(container);
    refresh(container);
  });

  document.addEventListener('languagechange', () => {
    containers.forEach(refresh);
  });
}
