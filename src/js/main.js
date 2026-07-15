import '../styles/tokens.css';
import '../styles/base.css';
import '../styles/utilities.css';
import '../styles/sections/header.css';
import '../styles/sections/lang-switcher.css';
import '../styles/sections/hero.css';
import '../styles/sections/service-icons.css';
import '../styles/sections/what-we-do.css';
import '../styles/sections/social-proof.css';
import '../styles/sections/about.css';
import '../styles/sections/faq.css';
import '../styles/sections/final-cta.css';
import '../styles/sections/contact-form.css';
import '../styles/sections/footer.css';

import { initI18n } from '../i18n/index.js';
import { initNav } from './nav.js';
import { renderServiceIconsStrip, renderServiceCards, renderServiceOptions } from './render-services.js';
import { initCarousel } from './carousel.js';
import { initStatCounters } from './stat-counter.js';
import { initContactForm } from './form.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initLangSwitcher } from './lang-switcher.js';
import { qs } from './dom-utils.js';

// Apply the detected/stored language before the first render so dynamic
// content (service cards, form dropdown) is built with the right strings.
initI18n();

initNav();
renderServiceIconsStrip(qs('.service-icons__list'));
renderServiceCards(qs('.what-we-do__track'));
initCarousel(qs('.what-we-do__carousel'));
initStatCounters(qs('.social-proof__stats'));
renderServiceOptions(qs('#service'));
initContactForm(qs('#quote-form'));
initScrollReveal();
initLangSwitcher();

// Dynamic content isn't covered by the static data-i18n pass — rebuild it
// whenever the visitor switches language.
document.addEventListener('languagechange', () => {
  renderServiceIconsStrip(qs('.service-icons__list'));
  renderServiceCards(qs('.what-we-do__track'));
  renderServiceOptions(qs('#service'));
  initScrollReveal();
});

const yearEl = qs('#current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
