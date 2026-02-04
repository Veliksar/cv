import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const particles = preloaderRef.current?.querySelectorAll('.preloader__particle');
    
    if (particles) {
      particles.forEach((particle) => {
        gsap.to(particle, {
          y: 'random(-30, 30)',
          x: 'random(-30, 30)',
          opacity: 'random(0.3, 0.8)',
          duration: 'random(1.5, 3)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 1.5
        });
      });
    }

    gsap.to('.preloader__logo', {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.preloader__ring', {
      rotation: 360,
      duration: 3,
      repeat: -1,
      ease: 'none'
    });

    gsap.to('.preloader__ring--reverse', {
      rotation: -360,
      duration: 4,
      repeat: -1,
      ease: 'none'
    });
  }, []);

  useEffect(() => {
    let currentProgress = 0;
    const targetProgress = 100;
    const duration = 2000;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * targetProgress, targetProgress);
      
      currentProgress = newProgress;
      setProgress(Math.round(newProgress));

      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: `${newProgress}%`,
          duration: 0.1,
          ease: 'none'
        });
      }

      if (newProgress < targetProgress) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          hidePreloader();
        }, 300);
      }
    };

    const hidePreloader = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      tl.to('.preloader__content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      })
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut'
      }, '-=0.2');
    };

    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  const particlesArray = [...Array(40)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 3,
    opacity: 0.2 + Math.random() * 0.5
  }));

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="preloader__particles">
        {particlesArray.map((particle) => (
          <div 
            key={particle.id} 
            className="preloader__particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity
            }}
          ></div>
        ))}
      </div>

      <div className="preloader__content">
        <div className="preloader__rings">
          <div className="preloader__ring"></div>
          <div className="preloader__ring preloader__ring--reverse"></div>
        </div>
        
        <div className="preloader__logo">
          AV<span>.</span>
        </div>

        <div className="preloader__progress-container">
          <div className="preloader__progress-bar">
            <div className="preloader__progress-fill" ref={progressRef}></div>
          </div>
          <div className="preloader__percent" ref={percentRef}>{progress}%</div>
        </div>

        <div className="preloader__text">Loading experience...</div>
      </div>
    </div>
  );
}

export default Preloader;
