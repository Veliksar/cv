import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function TypewriterText({ 
  texts = [],
  tag = 'h1', 
  className = '', 
  initialDelay = 0.5,
  typeSpeed = 0.08,
  deleteSpeed = 0.04,
  pauseDuration = 3
}) {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const Tag = tag;

  useEffect(() => {
    if (!texts.length) return;

    let timeoutId;
    let currentText = '';
    let isDeleting = false;
    let currentIndex = textIndex;

    const type = () => {
      const fullText = texts[currentIndex];
      
      if (!isDeleting) {
        currentText = fullText.slice(0, currentText.length + 1);
        setDisplayText(currentText);

        if (currentText === fullText) {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, pauseDuration * 1000);
          return;
        }
        
        timeoutId = setTimeout(type, typeSpeed * 1000);
      } else {
        currentText = fullText.slice(0, currentText.length - 1);
        setDisplayText(currentText);

        if (currentText === '') {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % texts.length;
          setTextIndex(currentIndex);
          timeoutId = setTimeout(type, typeSpeed * 1000);
          return;
        }
        
        timeoutId = setTimeout(type, deleteSpeed * 1000);
      }
    };

    const startTimeout = setTimeout(type, initialDelay * 1000);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, [texts, initialDelay, typeSpeed, deleteSpeed, pauseDuration]);

  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'steps(1)'
      });
    }
  }, []);

  return (
    <Tag className={`typewriter ${className}`} ref={containerRef}>
      <span className="typewriter__text">{displayText}</span>
      <span className="typewriter__cursor" ref={cursorRef}>|</span>
    </Tag>
  );
}

export default TypewriterText;
