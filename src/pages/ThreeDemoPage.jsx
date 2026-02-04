import { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

function Gear({ position, rotation, radius, teeth, thickness, color, speed, direction = 1 }) {
  const meshRef = useRef();
  
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const toothHeight = radius * 0.15;
    const toothWidth = (2 * Math.PI * radius) / (teeth * 2);
    
    for (let i = 0; i < teeth; i++) {
      const angle = (i / teeth) * Math.PI * 2;
      const nextAngle = ((i + 1) / teeth) * Math.PI * 2;
      const midAngle = (angle + nextAngle) / 2;
      
      const innerX1 = Math.cos(angle) * (radius - toothHeight * 0.5);
      const innerY1 = Math.sin(angle) * (radius - toothHeight * 0.5);
      
      const outerX1 = Math.cos(angle + toothWidth / radius * 0.3) * (radius + toothHeight);
      const outerY1 = Math.sin(angle + toothWidth / radius * 0.3) * (radius + toothHeight);
      
      const outerX2 = Math.cos(midAngle - toothWidth / radius * 0.3) * (radius + toothHeight);
      const outerY2 = Math.sin(midAngle - toothWidth / radius * 0.3) * (radius + toothHeight);
      
      const innerX2 = Math.cos(midAngle) * (radius - toothHeight * 0.5);
      const innerY2 = Math.sin(midAngle) * (radius - toothHeight * 0.5);
      
      if (i === 0) {
        shape.moveTo(innerX1, innerY1);
      } else {
        shape.lineTo(innerX1, innerY1);
      }
      shape.lineTo(outerX1, outerY1);
      shape.lineTo(outerX2, outerY2);
      shape.lineTo(innerX2, innerY2);
    }
    shape.closePath();
    
    const holeRadius = radius * 0.2;
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);
    
    const extrudeSettings = {
      steps: 1,
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [radius, teeth, thickness]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * speed * direction;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={position} rotation={rotation} castShadow receiveShadow>
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

function Capacitor({ position }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.02, 32]} />
        <meshStandardMaterial color="#4a4a5a" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.05, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.05, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function Chip({ position, scale = 1 }) {
  const pins = [];
  const pinCount = 8;
  
  for (let i = 0; i < pinCount; i++) {
    const offset = (i - (pinCount - 1) / 2) * 0.08;
    pins.push(
      <mesh key={`left-${i}`} position={[-0.25, -0.05, offset]}>
        <boxGeometry args={[0.1, 0.02, 0.03]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>,
      <mesh key={`right-${i}`} position={[0.25, -0.05, offset]}>
        <boxGeometry args={[0.1, 0.02, 0.03]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>
    );
  }
  
  return (
    <group position={position} scale={scale}>
      <mesh castShadow>
        <boxGeometry args={[0.4, 0.1, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.051, 0]}>
        <boxGeometry args={[0.35, 0.01, 0.55]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[-0.1, 0.06, 0.15]}>
        <circleGeometry args={[0.03, 16]} />
        <meshStandardMaterial color="#3a3a3a" />
      </mesh>
      {pins}
    </group>
  );
}

function Resistor({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.2, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#d4a574" roughness={0.6} />
      </mesh>
      {[0.06, 0.02, -0.02].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <cylinderGeometry args={[0.042, 0.042, 0.02, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color={['#8b4513', '#ff0000', '#ffa500'][i]} />
        </mesh>
      ))}
      <mesh position={[-0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function LED({ position, color = '#ff0000', isOn = true }) {
  const intensity = isOn ? 2 : 0;
  
  return (
    <group position={position}>
      <mesh castShadow>
        <sphereGeometry args={[0.06, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={intensity}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[0, -0.03, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.06, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={intensity * 0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh position={[0.02, -0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.02, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function CircuitBoard() {
  const [ledStates, setLedStates] = useState([true, false, true, false]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    setLedStates([
      Math.sin(time * 2) > 0,
      Math.sin(time * 2 + Math.PI / 2) > 0,
      Math.sin(time * 2 + Math.PI) > 0,
      Math.sin(time * 2 + Math.PI * 1.5) > 0
    ]);
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#0d5c0d" roughness={0.8} />
      </mesh>
      
      {[...Array(10)].map((_, i) => (
        <mesh key={`trace-h-${i}`} position={[0, 0.001, -0.8 + i * 0.18]}>
          <boxGeometry args={[2.8, 0.005, 0.02]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      {[...Array(8)].map((_, i) => (
        <mesh key={`trace-v-${i}`} position={[-1.2 + i * 0.35, 0.001, 0]}>
          <boxGeometry args={[0.02, 0.005, 1.8]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      
      <Chip position={[0, 0.1, 0]} scale={1.5} />
      <Chip position={[-0.8, 0.08, 0.5]} scale={1} />
      <Chip position={[0.8, 0.08, -0.5]} scale={1} />
      
      <Capacitor position={[-1, 0.2, -0.6]} />
      <Capacitor position={[1, 0.2, 0.6]} />
      <Capacitor position={[-0.3, 0.15, 0.7]} />
      
      <Resistor position={[0.5, 0.04, 0.4]} rotation={[0, Math.PI / 4, Math.PI / 2]} />
      <Resistor position={[-0.5, 0.04, -0.4]} rotation={[0, -Math.PI / 4, Math.PI / 2]} />
      <Resistor position={[1, 0.04, 0]} rotation={[0, 0, Math.PI / 2]} />
      
      <LED position={[-1.2, 0.1, 0.8]} color="#ff0000" isOn={ledStates[0]} />
      <LED position={[-1, 0.1, 0.8]} color="#00ff00" isOn={ledStates[1]} />
      <LED position={[-0.8, 0.1, 0.8]} color="#ffff00" isOn={ledStates[2]} />
      <LED position={[-0.6, 0.1, 0.8]} color="#0088ff" isOn={ledStates[3]} />
    </group>
  );
}

function GearMechanism() {
  return (
    <group position={[0, 0.5, 0]}>
      <Gear 
        position={[0, 0, 0]} 
        rotation={[Math.PI / 2, 0, 0]}
        radius={1} 
        teeth={24} 
        thickness={0.2}
        color="#ff6b35"
        speed={0.4}
        direction={1}
      />
      <Gear 
        position={[1.6, 0, 0]} 
        rotation={[Math.PI / 2, 0, Math.PI / 24]}
        radius={0.6} 
        teeth={14} 
        thickness={0.2}
        color="#00d4aa"
        speed={0.67}
        direction={-1}
      />
      <Gear 
        position={[-1.5, 0, 0]} 
        rotation={[Math.PI / 2, 0, Math.PI / 24]}
        radius={0.5} 
        teeth={12} 
        thickness={0.2}
        color="#667eea"
        speed={0.8}
        direction={-1}
      />
      <mesh position={[0, -0.35, 0]}>
        <boxGeometry args={[3.5, 0.1, 2]} />
        <meshStandardMaterial color="#2d3436" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Dino({ positionY, isRunning }) {
  const legsRef = useRef();
  const tailRef = useRef();
  
  useFrame((state) => {
    if (isRunning && legsRef.current) {
      const time = state.clock.getElapsedTime();
      legsRef.current.children[0].rotation.x = Math.sin(time * 15) * 0.5;
      legsRef.current.children[1].rotation.x = Math.sin(time * 15 + Math.PI) * 0.5;
    }
    if (tailRef.current) {
      const time = state.clock.getElapsedTime();
      tailRef.current.rotation.y = Math.sin(time * 3) * 0.1;
    }
  });

  return (
    <group position={[-3, positionY, 0]}>
      <mesh castShadow position={[0, 0.6, 0]}>
        <boxGeometry args={[0.8, 0.9, 0.5]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
      
      <mesh castShadow position={[0.5, 1, 0]}>
        <boxGeometry args={[0.6, 0.5, 0.4]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
      
      <mesh position={[0.7, 1.1, 0.12]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
      <mesh position={[0.7, 1.1, -0.12]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
      
      <group ref={legsRef}>
        <mesh castShadow position={[0.1, 0.15, 0.15]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.15, 0.5, 0.15]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
        <mesh castShadow position={[0.1, 0.15, -0.15]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.15, 0.5, 0.15]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
      </group>
      
      <mesh castShadow position={[0.35, 0.75, 0.15]}>
        <boxGeometry args={[0.1, 0.2, 0.08]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
      <mesh castShadow position={[0.35, 0.75, -0.15]}>
        <boxGeometry args={[0.1, 0.2, 0.08]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
      
      <group ref={tailRef}>
        <mesh castShadow position={[-0.6, 0.5, 0]}>
          <boxGeometry args={[0.6, 0.25, 0.2]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
        <mesh castShadow position={[-1, 0.5, 0]}>
          <boxGeometry args={[0.3, 0.15, 0.12]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
      </group>
    </group>
  );
}

function Cactus({ positionX, height = 1 }) {
  return (
    <group position={[positionX, 0, 0]}>
      <mesh castShadow position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.15, 0.2, height, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>
      {height > 0.8 && (
        <>
          <mesh castShadow position={[0.25, height * 0.6, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.08, 0.1, 0.4, 8]} />
            <meshStandardMaterial color="#2d5016" />
          </mesh>
          <mesh castShadow position={[-0.2, height * 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.08, 0.1, 0.35, 8]} />
            <meshStandardMaterial color="#2d5016" />
          </mesh>
        </>
      )}
    </group>
  );
}

function Cloud({ position }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      <mesh position={[0.35, 0.1, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      <mesh position={[-0.3, 0.05, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
    </group>
  );
}

function DinoGame({ gameState, setGameState, onScoreUpdate }) {
  const [dinoY, setDinoY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([{ x: 8, height: 1 }, { x: 14, height: 0.7 }]);
  const [clouds, setClouds] = useState([{ x: 5, y: 4 }, { x: 12, y: 5 }, { x: 20, y: 3.5 }]);
  const velocityRef = useRef(0);
  const scoreRef = useRef(0);
  const speedRef = useRef(5);
  
  useEffect(() => {
    if (gameState === 'playing') {
      scoreRef.current = 0;
      speedRef.current = 5;
      setObstacles([{ x: 8, height: 1 }, { x: 14, height: 0.7 }]);
      setDinoY(0);
      setIsJumping(false);
      velocityRef.current = 0;
      onScoreUpdate(0);
    }
  }, [gameState, onScoreUpdate]);

  const jump = useCallback(() => {
    if (!isJumping && gameState === 'playing') {
      setIsJumping(true);
      velocityRef.current = 12;
    }
  }, [isJumping, gameState]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (gameState === 'waiting') {
          setGameState('playing');
        } else if (gameState === 'playing') {
          jump();
        } else if (gameState === 'gameover') {
          setGameState('playing');
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump, gameState, setGameState]);

  useFrame((state, delta) => {
    if (gameState !== 'playing') return;

    if (isJumping) {
      velocityRef.current -= 30 * delta;
      const newY = Math.max(0, dinoY + velocityRef.current * delta);
      setDinoY(newY);
      
      if (newY <= 0) {
        setIsJumping(false);
        velocityRef.current = 0;
      }
    }

    scoreRef.current += delta * 10;
    speedRef.current = 5 + Math.floor(scoreRef.current / 100) * 0.5;
    
    if (Math.floor(scoreRef.current) % 5 === 0) {
      onScoreUpdate(Math.floor(scoreRef.current));
    }

    setObstacles(prev => {
      const updated = prev.map(obs => ({
        ...obs,
        x: obs.x - speedRef.current * delta
      })).filter(obs => obs.x > -5);

      if (updated.length < 2 || updated[updated.length - 1].x < 8) {
        const lastX = updated.length > 0 ? Math.max(...updated.map(o => o.x)) : 5;
        updated.push({
          x: lastX + 5 + Math.random() * 4,
          height: 0.6 + Math.random() * 0.6
        });
      }

      return updated;
    });

    setClouds(prev => prev.map(cloud => ({
      ...cloud,
      x: cloud.x - speedRef.current * 0.3 * delta < -5 ? 25 + Math.random() * 5 : cloud.x - speedRef.current * 0.3 * delta
    })));

    const dinoBox = {
      minX: -3.4,
      maxX: -2.2,
      minY: dinoY,
      maxY: dinoY + 1.2
    };

    for (const obs of obstacles) {
      const obsBox = {
        minX: obs.x - 0.2,
        maxX: obs.x + 0.2,
        minY: 0,
        maxY: obs.height
      };

      if (
        dinoBox.maxX > obsBox.minX &&
        dinoBox.minX < obsBox.maxX &&
        dinoBox.maxY > obsBox.minY &&
        dinoBox.minY < obsBox.maxY
      ) {
        onScoreUpdate(Math.floor(scoreRef.current));
        setGameState('gameover');
        break;
      }
    }
  });

  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      <color attach="background" args={['#87CEEB']} />
      
      <mesh receiveShadow position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 8]} />
        <meshStandardMaterial color="#c4b998" />
      </mesh>
      
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[50, 0.1, 0.5]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>

      {clouds.map((cloud, i) => (
        <Cloud key={i} position={[cloud.x, cloud.y, -2]} />
      ))}

      <Dino positionY={dinoY} isRunning={gameState === 'playing' && !isJumping} />
      
      {obstacles.map((obs, i) => (
        <Cactus key={i} positionX={obs.x} height={obs.height} />
      ))}
    </group>
  );
}

function Scene({ mode }) {
  return (
    <>
      <color attach="background" args={['#1a1a2e']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#667eea" />
      <pointLight position={[5, 3, 5]} intensity={0.3} color="#ff6b35" />
      
      {mode === 'gears' ? <GearMechanism /> : <CircuitBoard />}
      
      <OrbitControls 
        enablePan={false}
        minDistance={2}
        maxDistance={10}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

function ThreeDemoPage() {
  const [mode, setMode] = useState('gears');
  const [gameState, setGameState] = useState('waiting');
  const [score, setScore] = useState(0);

  const handleCanvasClick = () => {
    if (mode === 'game') {
      if (gameState === 'waiting') {
        setGameState('playing');
      } else if (gameState === 'gameover') {
        setGameState('playing');
      }
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === 'game') {
      setGameState('waiting');
      setScore(0);
    }
  };

  const handleScoreUpdate = useCallback((newScore) => {
    setScore(newScore);
  }, []);

  return (
    <div className="three-demo-page">
      <div className="three-demo-header">
        <Link to="/" className="three-demo-back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </Link>
        <h1>3D Demo</h1>
        <div className="three-demo-controls">
          <button 
            className={`three-demo-btn ${mode === 'gears' ? 'active' : ''}`}
            onClick={() => handleModeChange('gears')}
          >
            Gear Mechanism
          </button>
          <button 
            className={`three-demo-btn ${mode === 'circuit' ? 'active' : ''}`}
            onClick={() => handleModeChange('circuit')}
          >
            Electronics
          </button>
          <button 
            className={`three-demo-btn ${mode === 'game' ? 'active' : ''}`}
            onClick={() => handleModeChange('game')}
          >
            Game
          </button>
        </div>
      </div>
      
      <div className="three-demo-canvas" onClick={handleCanvasClick}>
        {mode === 'game' ? (
          <>
            <Canvas 
              shadows 
              camera={{ position: [0, 20, 45], fov: 70 }}
              gl={{ antialias: true }}
            >
              <DinoGame 
                gameState={gameState} 
                setGameState={setGameState} 
                onScoreUpdate={handleScoreUpdate}
              />
            </Canvas>
            
            <div className="game-overlay">
              {gameState === 'playing' && (
                <div className="game-score">Score: {score}</div>
              )}
              
              {gameState === 'waiting' && (
                <div className="game-message">
                  <div className="game-message-title">DINO RUN 3D</div>
                  <div className="game-message-text">Press SPACE or click to start</div>
                </div>
              )}
              
              {gameState === 'gameover' && (
                <div className="game-message game-over">
                  <div className="game-message-title">GAME OVER</div>
                  <div className="game-message-score">Score: {score}</div>
                  <div className="game-message-text">Press SPACE to restart</div>
                </div>
              )}
            </div>
          </>
        ) : (
          <Canvas 
            shadows 
            camera={{ position: [3, 3, 3], fov: 50 }}
            gl={{ antialias: true }}
          >
            <Scene mode={mode} />
          </Canvas>
        )}
      </div>
      
      <div className="three-demo-info">
        {mode === 'game' ? (
          <>
            <p>Press SPACE or click to jump</p>
            <p>Jump over the cactuses!</p>
          </>
        ) : (
          <>
            <p>Use mouse to rotate the camera</p>
            <p>Use mouse wheel to zoom in/out</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ThreeDemoPage;
