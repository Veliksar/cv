import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(logoRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );

    const menuItems = menuRef.current?.querySelectorAll('li');
    if (menuItems) {
      gsap.fromTo(menuItems,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.4 }
      );
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      const menuItems = document.querySelectorAll('.header__nav.active .header__menu li');
      gsap.fromTo(menuItems,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out' }
      );
    }
  }, [isMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleButtonHover = (e, enter) => {
    gsap.to(e.currentTarget, {
      scale: enter ? 1.05 : 1,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`} ref={headerRef}>
      <div className="header__container">
        <a 
          href="#" 
          className="header__logo" 
          onClick={() => scrollToSection('hero')}
          ref={logoRef}
        >
          AV<span>.</span>
        </a>
        
        <button 
          className={`header__burger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`header__nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="header__menu" ref={menuRef}>
            <li>
              <button 
                onClick={() => scrollToSection('about')}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('skills')}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                Skills
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('experience')}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                Experience
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('education')}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                Education
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                Contact
              </button>
            </li>
            <li>
              <Link 
                to="/3d-demo"
                className="header__menu-link"
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                3D Demo
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
