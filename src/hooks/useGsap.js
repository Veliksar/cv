import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const defaults = {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      ...options
    };

    gsap.fromTo(element, 
      { y: defaults.y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: defaults.duration,
        ease: defaults.ease,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, []);

  return ref;
};

export const useStaggerReveal = (childSelector, options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const children = element.querySelectorAll(childSelector);
    if (!children.length) return;

    const defaults = {
      y: 40,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      ...options
    };

    gsap.fromTo(children,
      { y: defaults.y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: defaults.duration,
        stagger: defaults.stagger,
        ease: defaults.ease,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [childSelector]);

  return ref;
};

export { gsap, ScrollTrigger };
