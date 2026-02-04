import { useEffect, useRef } from 'react';
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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="experience" id="experience" ref={sectionRef}>
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
              <div className="experience__card glow-border">
                <div className="experience__header">
                  <span className="experience__period">{job.period}</span>
                  <span className="experience__type">{job.type}</span>
                </div>
                
                <h3 className="experience__title">{job.title}</h3>
                <h4 className="experience__company">{job.company}</h4>
                <p className="experience__location">{job.location}</p>
                
                <ul className="experience__list">
                  {job.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
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
