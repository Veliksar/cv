import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portfolioData from '../data/portfolioData';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

function Skills() {
  const { skills } = portfolioData;
  const [activeTab, setActiveTab] = useState('frontend');
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const competenciesRef = useRef(null);

  const tabs = [
    { id: 'frontend', label: 'Frontend', icon: '🎨' },
    { id: 'backend', label: 'Backend', icon: '⚙️' },
    { id: 'wordpress', label: 'WordPress', icon: '📝' },
    { id: 'tools', label: 'Tools', icon: '🛠️' },
    { id: 'design', label: 'Design', icon: '✏️' }
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

      const tabButtons = tabsRef.current.querySelectorAll('.skills__tab');
      gsap.fromTo(tabButtons,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tabsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const competencyCards = competenciesRef.current.querySelectorAll('.skills__competency');
      gsap.fromTo(competencyCards,
        { y: 60, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: competenciesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;
    setActiveTab(tabId);
  };

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <span className="section-tag">Expertise</span>
          <AnimatedText text="Skills & Technologies" tag="h2" className="section-title" />
        </div>

        <div className="skills__tabs" ref={tabsRef}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`skills__tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              <span className="skills__tab-icon">{tab.icon}</span>
              <span className="skills__tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="skills__content">
          <div className="skills__carousel">
            <div className="skills__track">
              {skills[activeTab]?.map((skill) => (
                <div key={skill} className="skills__item">
                  <span className="skills__item-name">{skill}</span>
                </div>
              ))}
              {skills[activeTab]?.map((skill, index) => (
                <div key={`${skill}-${index}-dup`} className="skills__item">
                  <span className="skills__item-name">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="skills__additional">
          <h3 className="skills__additional-title">Core Competencies</h3>
          <div className="skills__competencies" ref={competenciesRef}>
            <div className="skills__competency glow-border">
              <div className="skills__competency-icon">🚀</div>
              <h4>Performance Optimization</h4>
              <p>Speed improvements and SEO optimization for better user experience</p>
            </div>
            <div className="skills__competency glow-border">
              <div className="skills__competency-icon">🎯</div>
              <h4>Custom Development</h4>
              <p>Tailored WordPress themes and plugins for specific business needs</p>
            </div>
            <div className="skills__competency glow-border">
              <div className="skills__competency-icon">👥</div>
              <h4>Team Leadership</h4>
              <p>Experience leading development teams and mentoring junior developers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
