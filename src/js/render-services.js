import { serviceCategories } from '../data/services.js';
import { iconSvg, slugify, responsivePicture } from './dom-utils.js';
import { t } from '../i18n/index.js';

export function renderServiceIconsStrip(container) {
  if (!container) return;
  container.innerHTML = serviceCategories
    .map(
      (category) => `
        <li class="service-icons__item">
          <span class="service-icons__icon">${iconSvg(category.icon)}</span>
          <p class="service-icons__label">${t(`services.${category.id}.label`)}</p>
          <p class="service-icons__desc">${t(`services.${category.id}.shortDescription`)}</p>
        </li>
      `
    )
    .join('');
}

export function renderServiceOptions(select) {
  if (!select) return;
  // Clear previously-generated optgroups so switching language doesn't
  // duplicate options — the placeholder <option> is static markup and stays.
  select.querySelectorAll('optgroup').forEach((optgroup) => optgroup.remove());

  const groups = serviceCategories
    .map((category) => {
      const items = t(`services.${category.id}.items`);
      const options = items
        .map((service) => `<option value="${slugify(service)}">${service}</option>`)
        .join('');
      return `<optgroup label="${t(`services.${category.id}.label`)}">${options}</optgroup>`;
    })
    .join('');
  select.insertAdjacentHTML('beforeend', groups);
}

export function renderServiceCards(container) {
  if (!container) return;
  container.innerHTML = serviceCategories
    .map((category) => {
      const media = category.image
        ? `<div class="what-we-do__card-media">${responsivePicture(
            { ...category.image, alt: t(`services.${category.id}.imageAlt`) },
            { sizes: '280px' }
          )}</div>`
        : '';
      const items = t(`services.${category.id}.items`);
      return `
        <li class="what-we-do__card">
          ${media}
          <div class="what-we-do__card-body">
            <span class="what-we-do__card-icon">${iconSvg(category.icon)}</span>
            <h3 class="what-we-do__card-title">${t(`services.${category.id}.label`)}</h3>
            <p class="what-we-do__card-desc">${t(`services.${category.id}.longDescription`)}</p>
            <ul class="what-we-do__card-tags">
              ${items.map((service) => `<li>${service}</li>`).join('')}
            </ul>
          </div>
        </li>
      `;
    })
    .join('');
}
