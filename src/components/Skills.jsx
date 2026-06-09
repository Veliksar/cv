import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portfolioData from '../data/portfolioData';
import AnimatedText from './AnimatedText';
import {
  createScrollTriggerConfig,
  getScrollStart,
  reconcileScrollTriggers
} from '../utils/scrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Skills() {
  const { skills } = portfolioData;
  const [activeTab, setActiveTab] = useState('frontend');
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const contentRef = useRef(null);
  const gridRef = useRef(null);
  const competenciesRef = useRef(null);
  const animatingRef = useRef(false);
  const scrollRevealed = useRef(false);
  const isTabSwitch = useRef(false);

  const tabs = [
    { id: 'frontend', label: 'Frontend', icon: '🎨' },
    { id: 'backend', label: 'Backend', icon: '⚙️' },
    { id: 'wordpress', label: 'WordPress', icon: '📝' },
    { id: 'woocommerce', label: 'WooCommerce', icon: '🛒' },
    { id: 'plugins', label: 'Plugins', icon: '🔌' },
    { id: 'devops', label: 'DevOps', icon: '🚀' }
  ];

  const getGridItems = useCallback(() => {
    return gridRef.current?.querySelectorAll('.skills__item') ?? [];
  }, []);

  const animateGridIn = useCallback(() => {
    const items = getGridItems();
    if (!items.length) return;

    animatingRef.current = true;
    gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.45,
      stagger: 0.035,
      ease: 'power2.out',
      overwrite: true,
      onComplete: () => {
        animatingRef.current = false;
      }
    });
  }, [getGridItems]);

  const animateGridOut = useCallback((onComplete) => {
    const items = getGridItems();
    if (!items.length) {
      onComplete?.();
      return;
    }

    animatingRef.current = true;
    gsap.to(items, {
      y: -24,
      opacity: 0,
      duration: 0.28,
      stagger: 0.025,
      ease: 'power2.in',
      overwrite: true,
      onComplete: () => {
        animatingRef.current = false;
        onComplete?.();
      }
    });
  }, [getGridItems]);

  const hideGridItems = useCallback(() => {
    const items = getGridItems();
    if (!items.length) return;
    gsap.set(items, { y: 24, opacity: 0 });
  }, [getGridItems]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: createScrollTriggerConfig(headerRef.current)
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
          scrollTrigger: createScrollTriggerConfig(tabsRef.current)
        }
      );

      hideGridItems();

      const revealGrid = () => {
        scrollRevealed.current = true;
        animateGridIn();
      };

      ScrollTrigger.create({
        trigger: contentRef.current,
        start: getScrollStart(),
        onEnter: revealGrid,
        onLeaveBack: () => {
          scrollRevealed.current = false;
          animateGridOut();
        }
      });

      const contentRect = contentRef.current.getBoundingClientRect();
      if (contentRect.top < window.innerHeight && contentRect.bottom > 0) {
        revealGrid();
      }

      const competencyCards = competenciesRef.current.querySelectorAll('.skills__competency');
      gsap.fromTo(competencyCards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: createScrollTriggerConfig(competenciesRef.current, {
            start: getScrollStart('top bottom', 'top 80%')
          })
        }
      );
    }, sectionRef);

    reconcileScrollTriggers(sectionRef.current);

    return () => ctx.revert();
  }, [animateGridIn, animateGridOut, hideGridItems]);

  useLayoutEffect(() => {
    const items = getGridItems();
    if (!items.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      gsap.set(items, { y: 0, opacity: 1 });
      scrollRevealed.current = true;
      return;
    }

    gsap.set(items, { y: 24, opacity: 0 });

    if (isTabSwitch.current) {
      isTabSwitch.current = false;
      animateGridIn();
      return;
    }

    if (scrollRevealed.current) {
      animateGridIn();
    }
  }, [activeTab, animateGridIn, getGridItems]);

  const handleTabChange = (tabId) => {
    if (tabId === activeTab || animatingRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setActiveTab(tabId);
      return;
    }

    animateGridOut(() => {
      isTabSwitch.current = true;
      setActiveTab(tabId);
    });
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
              type="button"
              className={`skills__tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              <span className="skills__tab-icon">{tab.icon}</span>
              <span className="skills__tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="skills__content" ref={contentRef}>
          <div className="skills__grid" ref={gridRef} key={activeTab}>
            {skills[activeTab]?.map((skill) => (
              <div key={skill} className="skills__item">
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="skills__additional">
          <h3 className="skills__additional-title">Core Competencies</h3>
          <div className="skills__competencies" ref={competenciesRef}>
            <div className="skills__competency glow-border">
              <div className="skills__competency-icon">🏗️</div>
              <h4>Custom WordPress Development</h4>
              <p>Custom themes, ACF PRO, and Gutenberg blocks — scalable architecture without page-builder lock-in.</p>
            </div>
            <div className="skills__competency glow-border">
              <div className="skills__competency-icon">🛒</div>
              <h4>WooCommerce Development</h4>
              <p>Custom checkout, payment flows, and catalog logic — built for stores with thousands of SKUs.</p>
            </div>
            <div className="skills__competency glow-border">
              <div className="skills__competency-icon">⚡</div>
              <h4>Performance &amp; Core Web Vitals</h4>
              <p>Caching, query optimization, and script cleanup — proven 67→91 mobile PageSpeed on a 3,000-SKU store.</p>
            </div>
            <div className="skills__competency glow-border">
              <div className="skills__competency-icon">🛡️</div>
              <h4>Maintenance &amp; Security</h4>
              <p>Staging-first updates, security hardening, and proactive troubleshooting — keep revenue safe after every Woo release.</p>
            </div>
            <div className="skills__competency glow-border">
              <div className="skills__competency-icon">🔄</div>
              <h4>Migrations &amp; DevOps</h4>
              <p>Seamless host migrations, Git workflows, CI/CD staging, and Cloudflare CDN — zero-downtime deploys.</p>
            </div>
            <div className="skills__competency glow-border">
              <div className="skills__competency-icon">🤝</div>
              <h4>Agency White-Label Partner</h4>
              <p>50+ US/EU agency projects delivered — reliable senior WP/Woo hands with clear async communication.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
