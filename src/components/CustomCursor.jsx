import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    const outline = cursorOutlineRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;

      gsap.set(outline, {
        x: outlineX,
        y: outlineY
      });

      requestAnimationFrame(animateOutline);
    };

    const handleMouseEnterLink = () => {
      gsap.to(dot, { scale: 0.5, duration: 0.3 });
      gsap.to(outline, { scale: 1.5, duration: 0.3, borderColor: 'rgba(99, 102, 241, 0.8)' });
    };

    const handleMouseLeaveLink = () => {
      gsap.to(dot, { scale: 1, duration: 0.3 });
      gsap.to(outline, { scale: 1, duration: 0.3, borderColor: 'rgba(99, 102, 241, 0.5)' });
    };

    const handleMouseDown = () => {
      gsap.to(dot, { scale: 0.8, duration: 0.1 });
      gsap.to(outline, { scale: 0.8, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.1 });
      gsap.to(outline, { scale: 1, duration: 0.1 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const links = document.querySelectorAll('a, button, input, textarea, .skills__item, .skills__tab');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnterLink);
      link.addEventListener('mouseleave', handleMouseLeaveLink);
    });

    animateOutline();

    gsap.fromTo([dot, outline], 
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, delay: 0.5 }
    );

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnterLink);
        link.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
    };
  }, []);

  useEffect(() => {
    const updateLinkListeners = () => {
      const handleMouseEnterLink = () => {
        gsap.to(cursorDotRef.current, { scale: 0.5, duration: 0.3 });
        gsap.to(cursorOutlineRef.current, { scale: 1.5, duration: 0.3 });
      };

      const handleMouseLeaveLink = () => {
        gsap.to(cursorDotRef.current, { scale: 1, duration: 0.3 });
        gsap.to(cursorOutlineRef.current, { scale: 1, duration: 0.3 });
      };

      const links = document.querySelectorAll('a, button, input, textarea, .skills__item, .skills__tab');
      links.forEach(link => {
        link.addEventListener('mouseenter', handleMouseEnterLink);
        link.addEventListener('mouseleave', handleMouseLeaveLink);
      });
    };

    const observer = new MutationObserver(updateLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef}>
      <div className="cursor-dot" ref={cursorDotRef}></div>
      <div className="cursor-outline" ref={cursorOutlineRef}></div>
    </div>
  );
}

export default CustomCursor;
