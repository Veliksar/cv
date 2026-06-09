import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reconcileScrollTriggers } from './utils/scrollTrigger';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const ThreeDemoPage = lazy(() => import('./pages/ThreeDemoPage'));

const PageLoader = () => (
  <div className="page-loader">
    <div className="page-loader__spinner"></div>
  </div>
);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const isThreeDemo = location.pathname === '/3d-demo' || location.pathname === '/cv/3d-demo';

  useEffect(() => {
    if (!isLoaded || isThreeDemo) return;

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      reconcileScrollTriggers(document.body);
    }, 300);

    return () => clearTimeout(refreshTimer);
  }, [isLoaded, isThreeDemo]);

  return (
    <div className="app">
      <a href="#hero" className="skip-link">Skip to content</a>
      <ScrollToTop />
      {!isLoaded && !isThreeDemo && <Preloader onComplete={() => setIsLoaded(true)} />}
      
      <CustomCursor />
      {!isThreeDemo && <Header />}
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/3d-demo" element={<ThreeDemoPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
