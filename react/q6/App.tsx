import { useEffect, useState, useRef, useCallback } from "react";
import './index.css';
import { FaRunning } from 'react-icons/fa';
import { GiTortoise } from 'react-icons/gi';

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
    const trackWidth = Math.min(460, width * 0.9) - 40;
    return calculateCenterPosition(trackWidth);
  });
  const [achillesSpeed, setAchillesSpeed] = useState(1.5);
  const [tortoiseSpeed] = useState(0.8);
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [trackWidth, setTrackWidth] = useState(460);
  const [isSlowMode, setIsSlowMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const TRACK_MARGIN = 5;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const updateTrackWidth = () => {
      if (trackRef.current) {
        const width = trackRef.current.offsetWidth - 40;
        setTrackWidth(width);
        
        if (isPaused || (!isRunning && tortoisePosition > calculateCenterPosition(width))) {
          const ratio = width / trackWidth;
          
          const newTortoisePosition = Math.min(tortoisePosition * ratio, width - TRACK_MARGIN);
          const newAchillesPosition = Math.min(achillesPosition * ratio, newTortoisePosition - 30);
          
          setAchillesPosition(Math.max(5, Math.min(newAchillesPosition, width - TRACK_MARGIN)));
          setTortoisePosition(newTortoisePosition);
        } else if (!isRunning && !isPaused) {
          setAchillesPosition(5);
          setTortoisePosition(calculateCenterPosition(width));
        }
        setIsMounted(true);
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

    const nextAchillesPosition = achillesPosition + achillesSpeed * deltaTime * 0.1;
    const nextTortoisePosition = tortoisePosition + tortoiseSpeed * deltaTime * 0.1;

    const minDistance = 30;
    const limitedAchillesPosition = Math.min(
      nextAchillesPosition,
      nextTortoisePosition - minDistance
    );

    const currentDistance = Math.abs(nextTortoisePosition - limitedAchillesPosition);

    if (currentDistance <= minDistance && !isSlowMode) {
      setAchillesSpeed(0.8);
      setIsSlowMode(true);
    } else if (currentDistance > minDistance) {
      setAchillesSpeed(1.5);
      setIsSlowMode(false);
    }

    if (nextTortoisePosition >= trackWidth - TRACK_MARGIN) {
      const finalTortoisePosition = trackWidth - TRACK_MARGIN;
      setTortoisePosition(finalTortoisePosition);
      setAchillesPosition(finalTortoisePosition - minDistance);
      setIsRunning(false);
      return;
    }

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
      <h1 className="title">Zeno's Paradox: Achilles and the Tortoise</h1>
      <p className="description">
        In this famous paradox by Zeno, Achilles (the fastest runner) can never 
        catch up to the tortoise that started ahead of him. Every time Achilles 
        reaches where the tortoise was, it has already moved slightly further ahead.
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
          className="control-button primary"
        >
          {isRunning ? 'Pause' : isPaused ? 'Resume' : 'Start'}
        </button>
        <button 
          onClick={handleReset}
          className="control-button secondary"
        >
          Reset
        </button>
      </div>

      {isVisible && (
        <div className="race-container">
          <div ref={trackRef} className="track">
            <div className="track-decoration">
              <div className="grass"></div>
              <div className="track-lines"></div>
              {isMounted && (
                <div 
                  className="finish-line" 
                  style={{ left: `${trackWidth - TRACK_MARGIN}px` }}
                />
              )}
            </div>
            
            <div 
              className={`runner achilles ${isRunning ? 'running' : ''}`}
              style={{ left: `${achillesPosition}px` }}
            >
              <FaRunning className={`runner-icon ${!isRunning ? 'facing-right' : 'facing-left'}`} />
              <div className="runner-shadow"></div>
              <div className="name-tag">Achilles</div>
            </div>
            
            <div 
              className={`runner tortoise ${isRunning ? 'moving' : ''}`}
              style={{ left: `${tortoisePosition}px` }}
            >
              <GiTortoise className={`runner-icon ${!isRunning ? 'facing-right' : 'facing-left'}`} />
              <div className="runner-shadow"></div>
              <div className="name-tag">Tortoise</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;