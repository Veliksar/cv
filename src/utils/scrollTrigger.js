import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MOBILE_QUERY = '(max-width: 768px)';

export function isMobile() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

export function getScrollStart(mobileStart = 'top bottom', desktopStart = 'top 85%') {
  return isMobile() ? mobileStart : desktopStart;
}

export function createScrollTriggerConfig(trigger, options = {}) {
  const {
    start = getScrollStart(),
    once: onceOption,
    toggleActions: toggleActionsOption,
    ...rest
  } = options;

  const once = onceOption ?? isMobile();
  const toggleActions = toggleActionsOption ?? (
    once ? 'play none none none' : 'play none none reverse'
  );

  return {
    trigger,
    start,
    once,
    toggleActions,
    ...rest
  };
}

export function reconcileScrollTriggers(scope) {
  if (!isMobile()) return;

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();

    ScrollTrigger.getAll().forEach((st) => {
      if (!st.animation || st.progress > 0) return;

      const triggerEl = st.trigger;
      if (!triggerEl) return;
      if (scope && !scope.contains(triggerEl)) return;

      const rect = triggerEl.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        st.animation.progress(1);
      }
    });
  });
}

let initialized = false;

export function initScrollTrigger() {
  if (initialized) return;
  initialized = true;

  ScrollTrigger.config({ ignoreMobileResize: true });

  const refresh = () => ScrollTrigger.refresh();

  window.addEventListener('load', refresh);
  window.addEventListener('orientationchange', refresh);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refresh, 200);
  });
}
