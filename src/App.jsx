import { useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
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

  return (
    <div className="app">
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
