import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portfolioData from '../data/portfolioData';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

function About() {
  const { profile, location } = portfolioData.personal;
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);

  const stats = [
    { number: '5+', label: 'Years of WordPress Development' },
    { number: '100+', label: 'Projects Delivered' },
    { number: '50+', label: 'Satisfied Clients Worldwide' },
    { number: '90+', label: 'PageSpeed performance scores achieved on multiple websites' }
  ];

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

      gsap.fromTo(contentRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const statItems = statsRef.current.querySelectorAll('.about__stat');
      gsap.fromTo(statItems,
        { y: 60, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      statItems.forEach((stat) => {
        const numberEl = stat.querySelector('.about__stat-number');
        const endValue = numberEl.textContent;
        const numericValue = parseInt(endValue);
        
        if (!isNaN(numericValue)) {
          gsap.fromTo(numberEl,
            { innerText: 0 },
            {
              innerText: numericValue,
              duration: 2,
              ease: 'power2.out',
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none none'
              },
              onUpdate: function() {
                numberEl.textContent = Math.floor(this.targets()[0].innerText) + (endValue.includes('+') ? '+' : '');
              }
            }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <span className="section-tag">Introduction</span>
          <AnimatedText text="About Me" tag="h2" className="section-title" />
        </div>

        <div className="about__grid">
          <div className="about__content" ref={contentRef}>
            <p className="about__text">{profile}</p>
            <div className="about__info">
              <div className="about__info-item">
                <span className="about__info-icon">📍</span>
                <span>{location}</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-icon">💼</span>
                <span>Middle+ WordPress Developer</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-icon">🎓</span>
                <span>Masters of Computer Science</span>
              </div>
            </div>
          </div>

          <div className="about__stats" ref={statsRef}>
            {stats.map((stat, index) => (
              <div key={index} className="about__stat glow-border">
                <span className="about__stat-number">{stat.number}</span>
                <span className="about__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
