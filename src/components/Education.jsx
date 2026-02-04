import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portfolioData from '../data/portfolioData';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

function Education() {
  const { education } = portfolioData;
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const highlightsRef = useRef(null);

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

      gsap.fromTo(cardRef.current,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const icon = cardRef.current.querySelector('.education__icon');
      gsap.fromTo(icon,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const highlights = highlightsRef.current.querySelectorAll('.education__highlight');
      gsap.fromTo(highlights,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="education" id="education" ref={sectionRef}>
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <span className="section-tag">Background</span>
          <AnimatedText text="Education" tag="h2" className="section-title" />
        </div>

        <div className="education__card glow-border" ref={cardRef}>
          <div className="education__icon">🎓</div>
          <div className="education__content">
            <div className="education__period">{education.period}</div>
            <h3 className="education__degree">{education.degree}</h3>
            <h4 className="education__university">{education.university}</h4>
            <p className="education__description">{education.description}</p>
            
            <div className="education__highlights" ref={highlightsRef}>
              <div className="education__highlight">
                <span className="education__highlight-icon">💻</span>
                <span>OOP & Web Development</span>
              </div>
              <div className="education__highlight">
                <span className="education__highlight-icon">🏆</span>
                <span>Programming Olympiads</span>
              </div>
              <div className="education__highlight">
                <span className="education__highlight-icon">📚</span>
                <span>Computer Science Conferences</span>
              </div>
              <div className="education__highlight">
                <span className="education__highlight-icon">👨‍🏫</span>
                <span>Teaching Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
