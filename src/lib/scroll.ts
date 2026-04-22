function easeInOutQuart(t: number) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

export function smoothScrollTo(targetSelector: string, offset = 80, duration = 1100) {
  if (typeof window === "undefined") return;
  if (targetSelector === "#") {
    animateScroll(window.scrollY, 0, duration);
    return;
  }
  const target = document.querySelector(targetSelector);
  if (!(target instanceof HTMLElement)) return;
  const startY = window.scrollY;
  const endY = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - offset
  );
  animateScroll(startY, endY, duration);
}

function animateScroll(startY: number, endY: number, duration: number) {
  const distance = endY - startY;
  if (Math.abs(distance) < 2) {
    window.scrollTo(0, endY);
    return;
  }
  const startTime = performance.now();
  function step(now: number) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    const eased = easeInOutQuart(t);
    window.scrollTo(0, startY + distance * eased);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
