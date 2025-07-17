import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

interface CursorTrail {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface RippleEffect {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export default function CursorAnimation() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [trails, setTrails] = useState<CursorTrail[]>([]);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [magneticTarget, setMagneticTarget] = useState<{ x: number; y: number } | null>(null);
  
  const trailIdRef = useRef(0);
  const rippleIdRef = useRef(0);
  const lastTrailTime = useRef(0);

  // Smooth cursor position with spring physics
  const cursorX = useSpring(0, { stiffness: 400, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 400, damping: 28 });

  // Trail cursor position with more delay
  const trailX = useSpring(0, { stiffness: 200, damping: 20 });
  const trailY = useSpring(0, { stiffness: 200, damping: 20 });

  const updateMousePosition = useCallback((e: MouseEvent) => {
    const newPosition = { x: e.clientX, y: e.clientY };
    setMousePosition(newPosition);
    
    // Update spring values
    cursorX.set(newPosition.x);
    cursorY.set(newPosition.y);
    trailX.set(newPosition.x);
    trailY.set(newPosition.y);

    // Add trail points
    const now = Date.now();
    if (now - lastTrailTime.current > 16) { // ~60fps
      setTrails(prev => {
        const newTrail: CursorTrail = {
          id: trailIdRef.current++,
          x: newPosition.x,
          y: newPosition.y,
          timestamp: now
        };
        
        // Keep only recent trails (last 500ms)
        const filtered = prev.filter(trail => now - trail.timestamp < 500);
        return [...filtered, newTrail].slice(-15); // Max 15 trail points
      });
      lastTrailTime.current = now;
    }

    // Check for magnetic elements
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    let closestMagnetic: { element: Element; distance: number } | null = null;

    magneticElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      
      const distance = Math.sqrt(
        Math.pow(newPosition.x - elementCenter.x, 2) + 
        Math.pow(newPosition.y - elementCenter.y, 2)
      );
      
      const magneticRadius = 100; // Magnetic effect radius
      
      if (distance < magneticRadius) {
        if (!closestMagnetic || distance < closestMagnetic.distance) {
          closestMagnetic = { element, distance };
        }
      }
    });

    if (closestMagnetic) {
      const rect = closestMagnetic.element.getBoundingClientRect();
      const elementCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      
      const strength = Math.max(0, 1 - closestMagnetic.distance / 100);
      const pullX = (elementCenter.x - newPosition.x) * strength * 0.3;
      const pullY = (elementCenter.y - newPosition.y) * strength * 0.3;
      
      setMagneticTarget({
        x: newPosition.x + pullX,
        y: newPosition.y + pullY
      });
    } else {
      setMagneticTarget(null);
    }
  }, [cursorX, cursorY, trailX, trailY]);

  const handleMouseEnter = useCallback((e: Event) => {
  const target = e.target;
  if (target instanceof Element) {
    if (target.matches('button, a, [role="button"], .cursor-hover, [data-cursor="pointer"]')) {
      setIsHovering(true);
      setCursorVariant('pointer');
    } else if (target.matches('input, textarea, [data-cursor="text"]')) {
      setIsHovering(true);
      setCursorVariant('text');
    } else if (target.matches('[data-cursor="view"]')) {
      setIsHovering(true);
      setCursorVariant('view');
    }
  }
}, []);


  const handleMouseLeave = useCallback((e: Event) => {
  const target = e.target;
  if (target instanceof Element) {
    if (target.matches('button, a, [role="button"], .cursor-hover, [data-cursor="pointer"], input, textarea, [data-cursor="text"], [data-cursor="view"]')) {
      setIsHovering(false);
      setCursorVariant('default');
    }
  }
}, []);


  const handleClick = useCallback((e: MouseEvent) => {
    const newRipple: RippleEffect = {
      id: rippleIdRef.current++,
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  }, []);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('click', handleClick);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('click', handleClick);
    };
  }, [updateMousePosition, handleMouseEnter, handleMouseLeave, handleClick]);

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTrails(prev => prev.filter(trail => now - trail.timestamp < 500));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(59, 130, 246, 0.3)',
      border: '2px solid rgba(59, 130, 246, 0.6)',
      width: 24,
      height: 24,
    },
    pointer: {
      scale: 1.5,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      border: '2px solid rgba(59, 130, 246, 0.8)',
      width: 32,
      height: 32,
    },
    text: {
      scale: 1,
      backgroundColor: 'rgba(168, 85, 247, 0.3)',
      border: '2px solid rgba(168, 85, 247, 0.6)',
      width: 2,
      height: 24,
      borderRadius: '1px',
    },
    view: {
      scale: 2,
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      border: '2px solid rgba(16, 185, 129, 0.8)',
      width: 40,
      height: 40,
    }
  };

  const targetPosition = magneticTarget || mousePosition;

  return (
    <>
      {/* Trail Effects */}
      {trails.map((trail, index) => {
        const age = Date.now() - trail.timestamp;
        const opacity = Math.max(0, 1 - age / 500);
        const scale = 0.3 + (opacity * 0.7);
        
        return (
          <motion.div
            key={trail.id}
            className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
            style={{
              x: trail.x - 3,
              y: trail.y - 3,
              width: 6,
              height: 6,
              backgroundColor: `rgba(239, 68, 68, ${opacity * 2})`,
              scale,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale, opacity }}
            exit={{ scale: 0, opacity: 0 }}
          />
        );
      })}

      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          x: targetPosition.x - 12,
          y: targetPosition.y - 12,
        }}
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-1 h-1 bg-blue-600 rounded-full"
        style={{
          x: targetPosition.x - 2,
          y: targetPosition.y - 2,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      />

      {/* Click Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed top-0 left-0 pointer-events-none z-[9996] border-2 border-blue-500 rounded-full"
            style={{
              x: ripple.x - 20,
              y: ripple.y - 20,
            }}
            initial={{
              width: 0,
              height: 0,
              opacity: 1,
            }}
            animate={{
              width: 80,
              height: 80,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}