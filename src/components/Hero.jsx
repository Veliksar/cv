import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import portfolioData from '../data/portfolioData';
import TypewriterText from './TypewriterText';

function Hero() {
  const { name, title, subtitle } = portfolioData.personal;
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const scrollRef = useRef(null);
  const particlesRef = useRef(null);
  const [particles] = useState(() => 
    [...Array(80)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      opacity: 0.2 + Math.random() * 0.5,
      speed: 0.5 + Math.random() * 1.5
    }))
  );

  useEffect(() => {
    const nodes = [badgeRef.current, titleRef.current, subtitleRef.current, actionsRef.current, scrollRef.current];
    if (nodes.some((n) => !n)) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      gsap.set(nodes, {
        opacity: 0,
        y: 50
      });

      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3
      })
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, '-=0.6')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, '-=0.5')
      .to(actionsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, '-=0.4')
      .to(scrollRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, '-=0.3');

      const particleInners = particlesRef.current?.querySelectorAll('.hero__particle-inner');
      if (particleInners) {
        particleInners.forEach((particle) => {
          gsap.to(particle, {
            y: 'random(-35, 35)',
            x: 'random(-35, 35)',
            duration: 'random(2, 4)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 1.5
          });

          gsap.to(particle, {
            opacity: 'random(0.2, 0.8)',
            duration: 'random(1.5, 3)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 2
          });
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const particleWrappers = particlesRef.current?.querySelectorAll('.hero__particle-wrapper');

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      if (particleWrappers) {
        particleWrappers.forEach((wrapper, index) => {
          const speed = particles[index]?.speed || 1;
          const moveX = xPercent * 50 * speed;
          const moveY = yPercent * 50 * speed;

          gsap.to(wrapper, {
            x: moveX,
            y: moveY,
            duration: 0.5,
            ease: 'power2.out'
          });
        });
      }

      gsap.to('.hero__gradient', {
        backgroundPosition: `${50 + xPercent * 10}% ${50 + yPercent * 10}%`,
        duration: 0.5
      });
    };

    hero?.addEventListener('mousemove', handleMouseMove);

    return () => {
      hero?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [particles]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero__background">
        <div className="hero__gradient"></div>
        <div className="hero__particles" ref={particlesRef}>
          {particles.map((particle) => (
            <div 
              key={particle.id} 
              className="hero__particle-wrapper"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
            >
              <div 
                className="hero__particle-inner"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: particle.opacity
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="hero__content">
        <TypewriterText 
          texts={['Andrii Veliksar', 'Andrew V.', 'Andrew Veliksar', 'Andrii V.']}
          tag="h1" 
          className="hero__name" 
          initialDelay={0.5}
          typeSpeed={0.08}
          deleteSpeed={0.04}
          pauseDuration={3}
        />
        <div className="hero__badge" ref={badgeRef}>Available for work</div>
        <h2 className="hero__title" ref={titleRef}>{title}</h2>
        <p className="hero__subtitle" ref={subtitleRef}>{subtitle}</p>
        
        <div className="hero__actions" ref={actionsRef}>
          <button 
            className="btn btn--primary"
            onClick={() => scrollToSection('contact')}
          >
            Get in Touch
          </button>
          <button 
            className="btn btn--secondary"
            onClick={() => scrollToSection('experience')}
          >
            View Experience
          </button>
        </div>

        <div className="hero__scroll" ref={scrollRef}>
          <span>Scroll Down</span>
          <div className="hero__scroll-indicator">
            <div className="hero__scroll-dot"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
