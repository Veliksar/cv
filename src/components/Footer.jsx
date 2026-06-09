import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  createScrollTriggerConfig,
  getScrollStart,
  reconcileScrollTriggers
} from '../utils/scrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTrigger = createScrollTriggerConfig(footerRef.current, {
        start: getScrollStart('top bottom', 'top 92%')
      });

      gsap.fromTo(contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger
        }
      );

      gsap.fromTo(logoRef.current,
        { scale: 0.5 },
        {
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: createScrollTriggerConfig(footerRef.current, {
            start: getScrollStart('top bottom', 'top 92%')
          })
        }
      );
    }, footerRef);

    reconcileScrollTriggers(footerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="container">
        <div className="footer__content" ref={contentRef}>
          <div className="footer__logo" ref={logoRef}>
            AV<span>.</span>
          </div>
          <p className="footer__text">
            WordPress Developer crafting digital experiences
          </p>
          <div className="footer__copy">
            © {currentYear} Andrii Veliksar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
