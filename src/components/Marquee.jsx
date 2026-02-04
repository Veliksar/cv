import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function Marquee() {
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  useEffect(() => {
    const track1Inner = track1Ref.current?.querySelector('.marquee__inner');
    const track2Inner = track2Ref.current?.querySelector('.marquee__inner');

    if (track1Inner) {
      const width = track1Inner.offsetWidth / 2;
      
      gsap.set(track1Inner, { x: 0 });
      gsap.to(track1Inner, {
        x: -width,
        duration: 30,
        ease: 'none',
        repeat: -1
      });
    }

    if (track2Inner) {
      const width = track2Inner.offsetWidth / 2;
      
      gsap.set(track2Inner, { x: -width });
      gsap.to(track2Inner, {
        x: 0,
        duration: 35,
        ease: 'none',
        repeat: -1
      });
    }
  }, []);

  const wordpressItems = Array(8).fill('WORDPRESS');
  const fullstackItems = Array(8).fill('FULLSTACK');

  return (
    <section className="marquee-section">
      <div className="marquee__track" ref={track1Ref}>
        <div className="marquee__inner">
          {wordpressItems.map((text, i) => (
            <span key={i} className="marquee__item">
              {text}
              <span className="marquee__dot"></span>
            </span>
          ))}
          {wordpressItems.map((text, i) => (
            <span key={`dup-${i}`} className="marquee__item">
              {text}
              <span className="marquee__dot"></span>
            </span>
          ))}
        </div>
      </div>

      <div className="marquee__track" ref={track2Ref}>
        <div className="marquee__inner">
          {fullstackItems.map((text, i) => (
            <span key={i} className="marquee__item marquee__item--outline">
              {text}
              <span className="marquee__dot"></span>
            </span>
          ))}
          {fullstackItems.map((text, i) => (
            <span key={`dup-${i}`} className="marquee__item marquee__item--outline">
              {text}
              <span className="marquee__dot"></span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Marquee;
