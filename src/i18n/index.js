import en from './locales/en.js';
import fr from './locales/fr.js';
import nl from './locales/nl.js';
import de from './locales/de.js';

// Belgium's three official languages (fr, nl, de) plus English as the
// site-wide default — see docs/adr for the client-side-only i18n decision
// (no per-locale URLs/hreflang, single HTML document, instant JS swap).
export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'de', name: 'Deutsch' },
];

const LOCALES = { en, fr, nl, de };
const DEFAULT_LANG = 'en';
const STORAGE_KEY = 'belnex:lang';

let currentLang = DEFAULT_LANG;

function getByPath(obj, path) {
  return path.split('.').reduce((value, key) => (value == null ? undefined : value[key]), obj);
}

export function t(key) {
  const value = getByPath(LOCALES[currentLang], key);
  if (value !== undefined) return value;
  const fallback = getByPath(LOCALES[DEFAULT_LANG], key);
  return fallback !== undefined ? fallback : key;
}

export function getLanguage() {
  return currentLang;
}

function detectInitialLanguage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && LOCALES[stored]) return stored;

  const browserLangs = navigator.languages || [navigator.language];
  for (const lang of browserLangs) {
    const short = (lang || '').slice(0, 2).toLowerCase();
    if (LOCALES[short]) return short;
  }
  return DEFAULT_LANG;
}

// Converts a dataset key like "i18nAttrAriaLabel" back into "aria-label".
function attrNameFromDatasetKey(dataKey) {
  return dataKey
    .slice('i18nAttr'.length)
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
}

function applyStaticTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  root.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  root.querySelectorAll('*').forEach((el) => {
    for (const dataKey of Object.keys(el.dataset)) {
      if (!dataKey.startsWith('i18nAttr') || dataKey === 'i18nAttr') continue;
      el.setAttribute(attrNameFromDatasetKey(dataKey), t(el.dataset[dataKey]));
    }
  });
}

export function setLanguage(lang) {
  currentLang = LOCALES[lang] ? lang : DEFAULT_LANG;
  localStorage.setItem(STORAGE_KEY, currentLang);
  document.documentElement.lang = currentLang;
  applyStaticTranslations();
  document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: currentLang } }));
}

export function initI18n() {
  setLanguage(detectInitialLanguage());
}
