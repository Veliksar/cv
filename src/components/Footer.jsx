import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const particlesRef = useRef(null);
  const particlePositions = useRef([]);
  const returnTimeouts = useRef({});
  
  const [particles] = useState(() => 
    [...Array(60)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.5
    }))
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer__content',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.footer__logo',
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const particleElements = particlesRef.current?.querySelectorAll('.footer__particle');
      if (particleElements) {
        particleElements.forEach((particle, index) => {
          particlePositions.current[index] = { x: 0, y: 0 };
          
          gsap.to(particle, {
            y: 'random(-25, 25)',
            x: 'random(-25, 25)',
            duration: 'random(1.5, 3)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 1.5
          });

          gsap.to(particle, {
            opacity: 'random(0.2, 0.7)',
            duration: 'random(1, 2)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 2
          });
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    const particleElements = particlesRef.current?.querySelectorAll('.footer__particle');

    const returnToPosition = (particle, index) => {
      gsap.to(particle, {
        x: particlePositions.current[index]?.x || 0,
        y: particlePositions.current[index]?.y || 0,
        duration: 2,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const handleMouseMove = (e) => {
      if (!particleElements) return;

      const rect = footer.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      particleElements.forEach((particle, index) => {
        const particleRect = particle.getBoundingClientRect();
        const particleX = particleRect.left - rect.left + particleRect.width / 2;
        const particleY = particleRect.top - rect.top + particleRect.height / 2;

        const distX = particleX - mouseX;
        const distY = particleY - mouseY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        const maxDistance = 80;

        if (returnTimeouts.current[index]) {
          clearTimeout(returnTimeouts.current[index]);
        }

        if (distance < maxDistance) {
          const force = Math.pow((maxDistance - distance) / maxDistance, 2);
          const angle = Math.atan2(distY, distX);
          const pushX = Math.cos(angle) * force * 40;
          const pushY = Math.sin(angle) * force * 40;

          gsap.to(particle, {
            x: `+=${pushX}`,
            y: `+=${pushY}`,
            duration: 0.8,
            ease: 'power1.out',
            overwrite: 'auto'
          });

          returnTimeouts.current[index] = setTimeout(() => {
            returnToPosition(particle, index);
          }, 400);
        }
      });
    };

    const handleMouseLeave = () => {
      if (!particleElements) return;
      
      Object.values(returnTimeouts.current).forEach(timeout => clearTimeout(timeout));
      returnTimeouts.current = {};
      
      particleElements.forEach((particle, index) => {
        returnToPosition(particle, index);
      });
    };

    footer?.addEventListener('mousemove', handleMouseMove);
    footer?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      footer?.removeEventListener('mousemove', handleMouseMove);
      footer?.removeEventListener('mouseleave', handleMouseLeave);
      Object.values(returnTimeouts.current).forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer__particles" ref={particlesRef}>
        {particles.map((particle) => (
          <div 
            key={particle.id} 
            className="footer__particle"
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
      <div className="container">
        <div className="footer__content">
          <div className="footer__logo">
            AV<span>.</span>
          </div>
          <p className="footer__text">
            WordPress Developer crafting digital experiences
          </p>
          <div className="footer__copy">
            © {currentYear} Andrii V. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
