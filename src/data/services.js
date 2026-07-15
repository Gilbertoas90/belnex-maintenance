// Single source of truth for the service taxonomy — consumed by the
// ServiceIconsStrip, the WhatWeDo cards and the contact form dropdown
// (avoids duplicating the list in three places).
//
// The 16 services the client operates were grouped into 6 categories so the
// icon strip stays scannable (<5s per spec.md) — the full list of specific
// services still shows up in the WhatWeDo cards and the form dropdown.
//
// Translatable copy (label, shortDescription, longDescription, service names)
// lives in src/i18n/locales/*.js keyed by `id` — this file only holds
// structural data that doesn't change with language.
export const serviceCategories = [
  {
    id: 'electrical',
    icon: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />',
    image: {
      src: 'electricalCard',
      width: 800,
      height: 1200,
    },
  },
  {
    id: 'smart-home',
    icon: '<path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /><path d="M9.5 15.5a3.5 3 0 0 1 5 0" /><path d="M12 17.2v.01" />',
    image: {
      src: 'smartHomeCard',
      width: 800,
      height: 1422,
    },
  },
  {
    id: 'solar-storage',
    icon: '<path d="M12 3v2M12 3l2.2 3.6M12 3l-2.2 3.6" /><rect x="4" y="9" width="16" height="11" rx="1" /><path d="M4 14.5h16M9.3 9v11M14.7 9v11" />',
    image: {
      src: 'solarStorageCard',
      width: 800,
      height: 1067,
    },
  },
  {
    id: 'ev-charging',
    icon: '<rect x="4" y="4" width="9" height="14" rx="1.5" /><path d="M13 8h3a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V9l-2-2" /><path d="M7 9h3M7 13h3" />',
    image: {
      src: 'evChargerCard',
      width: 800,
      height: 1200,
    },
  },
  {
    id: 'security',
    icon: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" />',
    image: {
      src: 'ccTVHomeCard',
      width: 800,
      height: 1200,
    },
  },
  {
    id: 'networking',
    icon: '<circle cx="12" cy="19" r="1" /><path d="M8.5 15.5a5 5 0 0 1 7 0" /><path d="M5.5 12.5a9 9 0 0 1 13 0" /><path d="M2.5 9.5a13 13 0 0 1 19 0" />',
    image: {
      src: 'networkCard',
      width: 800,
      height: 1422,
    },
  },
];
