export function initCarousel(root) {
  const track = root.querySelector('[data-carousel-track]');
  const prevBtn = root.querySelector('[data-dir="prev"]');
  const nextBtn = root.querySelector('[data-dir="next"]');
  if (!track) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = prefersReducedMotion ? 'auto' : 'smooth';
  const scrollAmount = () => track.clientWidth * 0.8;

  prevBtn?.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount(), behavior });
  });

  nextBtn?.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount(), behavior });
  });

  const updateControls = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (prevBtn) prevBtn.disabled = track.scrollLeft <= 4;
    if (nextBtn) nextBtn.disabled = track.scrollLeft >= maxScroll - 4;
  };

  track.addEventListener('scroll', updateControls, { passive: true });
  updateControls();
}
