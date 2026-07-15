export function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // CSS handles the reveal natively via animation-timeline: view() (ADR 0003).
  // Only fall back to JS where that isn't supported.
  if (CSS.supports('animation-timeline: view()')) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}
