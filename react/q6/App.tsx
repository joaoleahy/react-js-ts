import { useEffect, useState, useRef, useCallback } from "react";
import './index.css';

function App() {
  const containerRef = useRef(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const calculateCenterPosition = (width: number) => {
    return (width - 40) / 2;
  };

  const [achillesPosition, setAchillesPosition] = useState(5);
  const [tortoisePosition, setTortoisePosition] = useState(() => {
    const width = window.innerWidth;
    const trackWidth = Math.min(460, width * 0.9) - 40; // Considera o padding
    return calculateCenterPosition(trackWidth);
  });
  const [achillesSpeed, setAchillesSpeed] = useState(1.5);
  const [tortoiseSpeed] = useState(0.8);
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [trackWidth, setTrackWidth] = useState(460);
  const [isSlowMode, setIsSlowMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Margem para que as bolinhas não encostem no final
  const TRACK_MARGIN = 5;

  useEffect(() => {
    const updateTrackWidth = () => {
      if (trackRef.current) {
        const width = trackRef.current.offsetWidth - 40;
        setTrackWidth(width);
        
        // Se estiver pausado ou a corrida tiver terminado, ajusta as posições proporcionalmente
        if (isPaused || (!isRunning && tortoisePosition > calculateCenterPosition(width))) {
          const ratio = width / trackWidth;
          
          // Calcula as novas posições
          const newTortoisePosition = Math.min(tortoisePosition * ratio, width - TRACK_MARGIN);
          const newAchillesPosition = Math.min(achillesPosition * ratio, newTortoisePosition - 30);
          
          // Garante que Aquiles não ultrapasse os limites da pista
          setAchillesPosition(Math.max(5, Math.min(newAchillesPosition, width - TRACK_MARGIN)));
          setTortoisePosition(newTortoisePosition);
        } else if (!isRunning && !isPaused) {
          // Reset completo apenas quando não estiver rodando e não estiver pausado
          setAchillesPosition(5);
          setTortoisePosition(calculateCenterPosition(width));
        }
      }
    };

    updateTrackWidth();
    window.addEventListener('resize', updateTrackWidth);
    return () => window.removeEventListener('resize', updateTrackWidth);
  }, [trackWidth, isRunning, isPaused, tortoisePosition]);

  useEffect(() => {
    const initializePositions = () => {
      if (trackRef.current) {
        const width = trackRef.current.offsetWidth - 40;
        setTrackWidth(width);
        const centerPosition = calculateCenterPosition(width);
        setTortoisePosition(centerPosition);
      }
    };

    initializePositions();
    window.addEventListener('resize', initializePositions);
    return () => window.removeEventListener('resize', initializePositions);
  }, []);

  const animate = useCallback((timestamp: number) => {
    if (!isRunning || isPaused) return;

    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    // Calcula as próximas posições
    const nextAchillesPosition = achillesPosition + achillesSpeed * deltaTime * 0.1;
    const nextTortoisePosition = tortoisePosition + tortoiseSpeed * deltaTime * 0.1;

    // Garante que Aquiles nunca ultrapasse a tartaruga menos a distância mínima
    const minDistance = 30;
    const limitedAchillesPosition = Math.min(
      nextAchillesPosition,
      nextTortoisePosition - minDistance
    );

    // Calcula a distância atual
    const currentDistance = Math.abs(nextTortoisePosition - limitedAchillesPosition);

    // Verifica se Aquiles está se aproximando da tartaruga
    if (currentDistance <= minDistance && !isSlowMode) {
      setAchillesSpeed(0.8);
      setIsSlowMode(true);
    } else if (currentDistance > minDistance) {
      setAchillesSpeed(1.5);
      setIsSlowMode(false);
    }

    // Verifica se chegou ao final da corrida
    if (nextTortoisePosition >= trackWidth - TRACK_MARGIN) {
      const finalTortoisePosition = trackWidth - TRACK_MARGIN;
      setTortoisePosition(finalTortoisePosition);
      // Garante a distância mínima no final
      setAchillesPosition(finalTortoisePosition - minDistance);
      setIsRunning(false);
      return;
    }

    // Atualiza as posições respeitando os limites
    setAchillesPosition(Math.max(0, Math.min(limitedAchillesPosition, trackWidth - TRACK_MARGIN)));
    setTortoisePosition(Math.min(nextTortoisePosition, trackWidth - TRACK_MARGIN));

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [achillesPosition, tortoisePosition, achillesSpeed, tortoiseSpeed, trackWidth, isRunning, isSlowMode, isPaused]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && isRunning) {
      lastTimeRef.current = undefined;
      animationFrameRef.current = requestAnimationFrame(animate);
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [isVisible, animate, isRunning]);

  const handleReset = () => {
    const width = trackRef.current?.offsetWidth || 460;
    const centerPosition = calculateCenterPosition(width);
    setTortoisePosition(centerPosition);
    setAchillesPosition(5);
    setAchillesSpeed(1.5);
    setIsSlowMode(false);
    setIsRunning(false);
    setIsPaused(false);
    lastTimeRef.current = undefined;
  };

  return (
    <div ref={containerRef} className="container">
      <h1 className="title">Zeno's Paradox of Achilles and the Tortoise</h1>
      <p className="description">
        In this famous paradox by Zeno, Achilles (the fastest runner) can never 
        catch up to the tortoise that started ahead of him. Every time Achilles 
        reaches where the tortoise was, it has already moved slightly forward.
      </p>
      
      <div className="flex justify-center gap-4 mb-8">
        <button 
          onClick={() => {
            if (isRunning || isPaused) {
              setIsRunning(!isRunning);
              setIsPaused(!isRunning);
            } else {
              setIsRunning(true);
              setIsPaused(false);
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {isRunning ? 'Pause' : isPaused ? 'Resume' : 'Start'}
        </button>
        <button 
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Reset
        </button>
      </div>

      {isVisible && (
        <div ref={trackRef} className="track">
          <div 
            className="runner achilles"
            style={{ left: `${achillesPosition}px` }}
          >
            A
          </div>
          <div 
            className="runner tortoise"
            style={{ left: `${tortoisePosition}px` }}
          >
            T
          </div>
        </div>
      )}
    </div>
  );
}

export default App;