import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portfolioData from '../data/portfolioData';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

function Experience() {
  const { experience } = portfolioData;
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);
  const particlesRef = useRef(null);
  const particlePositions = useRef([]);
  const returnTimeouts = useRef({});
  const [expandedDetailsId, setExpandedDetailsId] = useState(null);

  const [particles] = useState(() =>
    [...Array(80)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 6,
      opacity: 0.3 + Math.random() * 0.5
    }))
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const timelineLine = timelineRef.current.querySelector('.experience__timeline-line');
      if (timelineLine) {
        gsap.fromTo(timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      const items = timelineRef.current.querySelectorAll('.experience__item');
      items.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        
        gsap.fromTo(item.querySelector('.experience__card'),
          { 
            x: isLeft ? -100 : 100, 
            opacity: 0,
            rotateY: isLeft ? 10 : -10
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        gsap.fromTo(item.querySelector('.experience__dot'),
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      const particleElements = particlesRef.current?.querySelectorAll('.dots-particle');
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const particleElements = particlesRef.current?.querySelectorAll('.dots-particle');

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

      const rect = section.getBoundingClientRect();
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

    section?.addEventListener('mousemove', handleMouseMove);
    section?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section?.removeEventListener('mousemove', handleMouseMove);
      section?.removeEventListener('mouseleave', handleMouseLeave);
      Object.values(returnTimeouts.current).forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <div className="dots-particles" ref={particlesRef}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="dots-particle"
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
        <div className="section-header" ref={headerRef}>
          <span className="section-tag">Career</span>
          <AnimatedText text="Work Experience" tag="h2" className="section-title" />
        </div>

        <div className="experience__timeline" ref={timelineRef}>
          <div className="experience__timeline-line"></div>
          {experience.map((job, index) => (
            <div 
              key={job.id} 
              className={`experience__item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className={`experience__card glow-border${job.featured ? ' experience__card--featured' : ''}`}>
                <div className="experience__header">
                  <span className="experience__period">{job.period}</span>
                  <div className="experience__header-meta">
                    {job.featured && <span className="experience__badge">Featured</span>}
                    <span className="experience__type">{job.type}</span>
                  </div>
                </div>

                <h3 className="experience__title">{job.title}</h3>
                <h4 className="experience__company">{job.company}</h4>
                {job.location && <p className="experience__location">{job.location}</p>}

                <ul className="experience__list">
                  {job.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                {job.details && (
                  <div className="experience__details">
                    <button
                      type="button"
                      className="experience__details-toggle"
                      aria-expanded={expandedDetailsId === job.id}
                      onClick={() => setExpandedDetailsId(expandedDetailsId === job.id ? null : job.id)}
                    >
                      Agency breakdown
                      <span className="experience__details-icon" aria-hidden="true">
                        {expandedDetailsId === job.id ? '−' : '+'}
                      </span>
                    </button>
                    {expandedDetailsId === job.id && (
                      <ul className="experience__details-list">
                        {job.details.map((detail, i) => (
                          <li key={i}>
                            <span className="experience__details-company">{detail.company}</span>
                            <span className="experience__details-period">{detail.period}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
              
              <div className="experience__dot">
                <div className="experience__dot-inner"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
