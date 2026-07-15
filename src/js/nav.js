export function initNav() {
  const header = document.getElementById('site-header');
  const toggle = document.querySelector('.site-header__menu-toggle');
  const mobileNav = document.querySelector('.site-header__mobile-nav');
  if (!header || !toggle || !mobileNav) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
  };

  const openMenu = () => {
    toggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    mobileNav.querySelector('a')?.focus();
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  mobileNav.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
