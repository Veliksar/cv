import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimatedText({ 
  text, 
  tag = 'h2', 
  className = '', 
  delay = 0,
  stagger = 0.03,
  duration = 0.6,
  scrollTrigger = true,
  triggerStart = 'top 85%'
}) {
  const containerRef = useRef(null);
  const Tag = tag;

  const words = text.split(' ');

  useEffect(() => {
    const chars = containerRef.current?.querySelectorAll('.char');
    if (!chars || chars.length === 0) return;

    const animationConfig = {
      y: 50,
      opacity: 0,
      rotateX: -90,
      duration: duration,
      stagger: stagger,
      ease: 'back.out(1.7)',
      delay: delay
    };

    if (scrollTrigger) {
      gsap.fromTo(chars,
        { y: 50, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: duration,
          stagger: stagger,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerStart,
            toggleActions: 'play none none reverse'
          }
        }
      );
    } else {
      gsap.set(chars, { y: 50, opacity: 0, rotateX: -90 });
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        ...animationConfig
      });
    }
  }, [delay, stagger, duration, scrollTrigger, triggerStart]);

  return (
    <Tag className={`animated-text ${className}`} ref={containerRef}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="word">
          {word.split('').map((char, charIndex) => (
            <span 
              key={charIndex} 
              className="char"
              style={{ display: 'inline-block' }}
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && <span className="char">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}

export default AnimatedText;
