'use client'
import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';

interface Particle {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  color: string;
  opacity: number;
  originalAlpha: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  speed: number;
  floatingOffsetX: number;
  floatingOffsetY: number;
  floatingSpeed: number;
  floatingAngle: number;
  targetOpacity: number;
  sparkleSpeed: number;
}

interface MagicTextRevealProps {
  text?: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  spread?: number;
  speed?: number;
  density?: number;
  resetOnMouseLeave?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const MagicTextReveal: React.FC<MagicTextRevealProps> = ({
  text = "Magic Text",
  color = "rgba(255, 255, 255, 1)",
  fontSize = 70,
  fontFamily = "Jakarta Sans, sans-serif",
  fontWeight = 600,
  spread = 40,
  speed = 0.5,
  density = 4,
  resetOnMouseLeave = true,
  className = "",
  style = {}
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const transformedDensity = 6 - density;
  const globalDpr = useMemo(() => {
    if (typeof window !== "undefined") return window.devicePixelRatio * 1.5 || 1;
    return 1;
  }, []);

  // Track dark mode state
  useEffect(() => {
    const checkDarkMode = () => {
      const hasDarkClass = document.documentElement.classList.contains('dark');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(hasDarkClass || prefersDark);
    };
    
    checkDarkMode();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);
    
    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkDarkMode);
    };
  }, []);

  // Resolve CSS variables to actual values for canvas API
  const resolvedColor = useMemo(() => {
    if (typeof window === "undefined") {
      return 'rgb(26, 26, 26)'; // Default to dark for SSR
    }
    
    // Simple approach: use white for dark mode, dark for light mode
    // This ensures particles are always visible
    const hasDarkClass = document.documentElement.classList.contains('dark');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentDarkMode = hasDarkClass || prefersDark;
    
    if (currentDarkMode) {
      return 'rgb(255, 255, 255)'; // White particles for dark mode
    } else {
      return 'rgb(26, 26, 26)'; // Dark particles for light mode
    }
  }, [isDarkMode]);

  const resolvedFontFamily = useMemo(() => {
    if (typeof window === "undefined") return fontFamily;
    if (fontFamily.includes('var(')) {
      // Create a temporary element to get computed value
      const tempEl = document.createElement('div');
      tempEl.style.fontFamily = fontFamily;
      tempEl.style.position = 'absolute';
      tempEl.style.visibility = 'hidden';
      tempEl.style.pointerEvents = 'none';
      document.body.appendChild(tempEl);
      const computedFont = window.getComputedStyle(tempEl).fontFamily;
      document.body.removeChild(tempEl);
      return computedFont || fontFamily;
    }
    return fontFamily;
  }, [fontFamily]);

  // Measure text dimensions
  const measureText = useCallback((text: string, fontSize: number, fontWeight: number, fontFamily: string) => {
    if (typeof window === "undefined") return { width: 200, height: 60 };
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return { width: 200, height: 60 };
    
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    const metrics = ctx.measureText(text);
    
    return {
      width: Math.ceil(metrics.width + fontSize * 0.5), // Add padding
      height: Math.ceil(fontSize * 1.4) // Line height approximation
    };
  }, []);

  // Update text dimensions when text or font properties change
  useEffect(() => {
    const dimensions = measureText(text, fontSize, fontWeight, resolvedFontFamily);
    setTextDimensions(dimensions);
  }, [text, fontSize, fontWeight, resolvedFontFamily, measureText]);

  // Create particles from text
  const createParticles = useCallback((
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    text: string,
    textX: number,
    textY: number,
    font: string,
    color: string,
    transformedDensity: number
  ): Particle[] => {
    const particles: Particle[] = [];
    
    // Ensure we have a valid color
    const particleColor = color || 'rgb(26, 26, 26)';
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set text properties
    ctx.fillStyle = particleColor;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.imageSmoothingEnabled = true;
    
    // Render text for sampling
    ctx.fillText(text, textX, textY);
    
    // Sample the rendered text
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Calculate sampling rate based on DPR
    const currentDPR = canvas.width / parseInt(canvas.style.width);
    const baseSampleRate = Math.max(2, Math.round(currentDPR));
    const sampleRate = baseSampleRate * transformedDensity;
    
    // Calculate text bounds
    let minX = canvas.width;
    let maxX = 0;
    let minY = canvas.height;
    let maxY = 0;
    
    // First pass: find text bounds
    for (let y = 0; y < canvas.height; y += sampleRate) {
      for (let x = 0; x < canvas.width; x += sampleRate) {
        const index = (y * canvas.width + x) * 4;
        const alpha = data[index + 3];
        if (alpha > 0) {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      }
    }
    
    // Calculate spread area
    const textWidth = maxX - minX;
    const textHeight = maxY - minY;
    const spreadRadius = Math.max(textWidth, textHeight) * 0.1;
    
    // Second pass: create particles with random initial positions
    for (let y = 0; y < canvas.height; y += sampleRate) {
      for (let x = 0; x < canvas.width; x += sampleRate) {
        const index = (y * canvas.width + x) * 4;
        const alpha = data[index + 3];
        if (alpha > 0) {
          const originalAlpha = alpha / 255;
          
          // Calculate random initial position within spread radius
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * spreadRadius;
          const initialX = x + Math.cos(angle) * distance;
          const initialY = y + Math.sin(angle) * distance;
          
          // Use the resolved color instead of sampled color for better visibility
          const rgbMatch = particleColor.match(/\d+/g);
          let finalParticleColor: string;
          
          if (rgbMatch && rgbMatch.length >= 3) {
            const r = rgbMatch[0];
            const g = rgbMatch[1];
            const b = rgbMatch[2];
            finalParticleColor = `rgba(${r}, ${g}, ${b}, ${originalAlpha})`;
          } else {
            // Fallback to sampled color if color parsing fails
            finalParticleColor = `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${originalAlpha})`;
          }
          
          const particle: Particle = {
            x: initialX,
            y: initialY,
            originalX: x,
            originalY: y,
            color: finalParticleColor,
            opacity: originalAlpha * 0.8, // Increased initial opacity for better visibility
            originalAlpha,
            velocityX: 0,
            velocityY: 0,
            angle: Math.random() * Math.PI * 2,
            speed: 0,
            floatingOffsetX: 0,
            floatingOffsetY: 0,
            floatingSpeed: Math.random() * 2 + 1,
            floatingAngle: Math.random() * Math.PI * 2,
            targetOpacity: Math.random() * originalAlpha * 0.5,
            sparkleSpeed: Math.random() * 2 + 1
          };
          particles.push(particle);
        }
      }
    }
    
    // Clear canvas after sampling
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return particles;
  }, []);

  // Update particles animation
  const updateParticles = useCallback((
    particles: Particle[],
    deltaTime: number,
    isHovered: boolean,
    showText: boolean,
    setShowText: (show: boolean) => void,
    spread: number,
    speed: number
  ) => {
    const FLOAT_RADIUS = spread;
    const RETURN_SPEED = 3;
    const FLOAT_SPEED = speed;
    const TRANSITION_SPEED = 5 * FLOAT_SPEED;
    const NOISE_SCALE = 0.6;
    const CHAOS_FACTOR = 1.3;
    const FADE_SPEED = 13; 

    particles.forEach(particle => {
      if (isHovered) {
        // When hovered, gradually return to original position
        const dx = particle.originalX - particle.x;
        const dy = particle.originalY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0.1) {
          particle.x += (dx / distance) * RETURN_SPEED * deltaTime * 60;
          particle.y += (dy / distance) * RETURN_SPEED * deltaTime * 60;
        } else {
          particle.x = particle.originalX;
          particle.y = particle.originalY;
        }
        
        // Fade out particles when hovered
        particle.opacity = Math.max(0, particle.opacity - FADE_SPEED * deltaTime);
      } else {
        // Update particle's unique movement pattern
        particle.floatingAngle += deltaTime * particle.floatingSpeed * (1 + Math.random() * CHAOS_FACTOR);
        
        // Generate base movement using improved noise
        const time = Date.now() * 0.001;
        const uniqueOffset = particle.floatingSpeed * 2000;
        const noiseX = (
          Math.sin(time * particle.floatingSpeed + particle.floatingAngle) * 1.2 +
          Math.sin((time + uniqueOffset) * 0.5) * 0.8 +
          (Math.random() - 0.5) * CHAOS_FACTOR
        ) * NOISE_SCALE;
        const noiseY = (
          Math.cos(time * particle.floatingSpeed + particle.floatingAngle * 1.5) * 0.6 +
          Math.cos((time + uniqueOffset) * 0.5) * 0.4 +
          (Math.random() - 0.5) * CHAOS_FACTOR
        ) * NOISE_SCALE;
        
        // Calculate target position with random offset
        const randomOffsetX = FLOAT_RADIUS * noiseX;
        const randomOffsetY = FLOAT_RADIUS * noiseY;
        const targetX = particle.originalX + randomOffsetX;
        const targetY = particle.originalY + randomOffsetY;
        
        // Smooth movement towards target with variable speed
        const dx = targetX - particle.x;
        const dy = targetY - particle.y;
        
        // Add dynamic jitter based on distance
        const distanceFromTarget = Math.sqrt(dx * dx + dy * dy);
        const jitterScale = Math.min(1, distanceFromTarget / (FLOAT_RADIUS * 1.5));
        const jitterX = (Math.random() - 0.5) * FLOAT_SPEED * jitterScale;
        const jitterY = (Math.random() - 0.5) * FLOAT_SPEED * jitterScale;
        
        particle.x += dx * TRANSITION_SPEED * deltaTime + jitterX;
        particle.y += dy * TRANSITION_SPEED * deltaTime + jitterY;
        
        // Contain particles within bounds with soft boundary
        const distanceFromOrigin = Math.sqrt(
          Math.pow(particle.x - particle.originalX, 2) + 
          Math.pow(particle.y - particle.originalY, 2)
        );
        if (distanceFromOrigin > FLOAT_RADIUS) {
          const angle = Math.atan2(particle.y - particle.originalY, particle.x - particle.originalX);
          const pullBack = (distanceFromOrigin - FLOAT_RADIUS) * 0.1;
          particle.x -= Math.cos(angle) * pullBack;
          particle.y -= Math.sin(angle) * pullBack;
        }
        
        // Enhanced continuous sparkling effect
        const opacityDiff = particle.targetOpacity - particle.opacity;
        particle.opacity += opacityDiff * particle.sparkleSpeed * deltaTime * 3;
        
        // When particle reaches its target opacity, set a new random target
        if (Math.abs(opacityDiff) < 0.01) {
          particle.targetOpacity = Math.random() < 0.5 
            ? Math.random() * 0.1 * particle.originalAlpha
            : particle.originalAlpha * 3;
          particle.sparkleSpeed = Math.random() * 3 + 1;
        }
      }
    });

    if (isHovered && !showText) {
      setShowText(true);
    }
    if (!isHovered && showText) {
      setShowText(false);
    }
  }, []);

  // Render particles
  const renderParticles = useCallback((
    ctx: CanvasRenderingContext2D,
    particles: Particle[],
    globalDpr: number
  ) => {
    ctx.save();
    ctx.scale(globalDpr, globalDpr);
    
    // Batch similar colored particles together
    const particlesByColor = new Map<string, Array<{x: number, y: number}>>();
    
    particles.forEach(particle => {
      if (particle.opacity <= 0) return;
      const color = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`);
      if (!particlesByColor.has(color)) {
        particlesByColor.set(color, []);
      }
      particlesByColor.get(color)!.push({
        x: particle.x / globalDpr,
        y: particle.y / globalDpr
      });
    });
    
    // Render particles in batches by color
    particlesByColor.forEach((positions, color) => {
      ctx.fillStyle = color;
      positions.forEach(({ x, y }) => {
        ctx.fillRect(x, y, 1, 1);
      });
    });
    
    ctx.restore();
  }, []);

  // Render canvas
  const renderCanvas = useCallback(() => {
    if (!wrapperRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = wrapperRef.current.getBoundingClientRect();
    let width = rect.width || wrapperSize.width;
    let height = rect.height || wrapperSize.height;
    
    // Ensure minimum dimensions
    if (width <= 0 || height <= 0) {
      width = 300;
      height = 150;
    }
    
    canvas.width = width * globalDpr;
    canvas.height = height * globalDpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Calculate text position
    const textX = canvas.width / 2;
    const textY = canvas.height / 2;
    
    // Create font string
    const font = `${fontWeight} ${fontSize * globalDpr}px ${resolvedFontFamily}`;
    
    // Create particles from text - pass resolvedColor to ensure correct color
    // Ensure resolvedColor is valid
    const colorToUse = resolvedColor || (isDarkMode ? 'rgb(255, 255, 255)' : 'rgb(26, 26, 26)');
    const particles = createParticles(ctx, canvas, text, textX, textY, font, colorToUse, transformedDensity);
    
    // Store particles for later use
    particlesRef.current = particles;
    
    // Render particles immediately
    if (particles.length > 0) {
      renderParticles(ctx, particles, globalDpr);
    }
  }, [wrapperSize, globalDpr, text, fontSize, resolvedFontFamily, fontWeight, resolvedColor, transformedDensity, createParticles, renderParticles]);

  // Animation loop
  useEffect(() => {
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;
      
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      
      if (!canvas || !ctx || !particlesRef.current.length) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      updateParticles(
        particlesRef.current,
        deltaTime,
        isHovered,
        showText,
        setShowText,
        spread,
        speed
      );
      
      renderParticles(ctx, particlesRef.current, globalDpr);
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, showText, spread, speed, globalDpr, updateParticles, renderParticles]);

  // Handle resize - calculate once on mount, only update on window resize (not parent resize)
  useEffect(() => {
    const calculateSize = () => {
      if (wrapperRef.current) {
        const parentRect = wrapperRef.current.parentElement?.getBoundingClientRect();
        if (parentRect && parentRect.width > 0 && parentRect.height > 0) {
          // Use parent container dimensions, accounting for padding
          const padding = 16; // Account for card padding (p-6 sm:p-8)
          const width = Math.max(parentRect.width - padding * 2, 200);
          const height = Math.max(parentRect.height - padding * 2, 100);
          setWrapperSize({ width, height });
        } else {
          // Fallback: use wrapper's own dimensions if parent not available
          const rect = wrapperRef.current.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            setWrapperSize({ width: rect.width, height: rect.height });
          }
        }
      }
    };

    // Initial calculation with multiple attempts to ensure DOM is ready
    const initTimer1 = setTimeout(() => {
      calculateSize();
    }, 100);
    
    const initTimer2 = setTimeout(() => {
      calculateSize();
    }, 300);
    
    // Only listen to window resize, not parent resize (prevents feedback loop)
    const handleWindowResize = () => {
      calculateSize();
    };
    
    window.addEventListener('resize', handleWindowResize);
    
    return () => {
      clearTimeout(initTimer1);
      clearTimeout(initTimer2);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []); // Empty deps - only run once on mount

  // Render canvas when size changes, color changes, or component mounts
  useEffect(() => {
    if (!wrapperRef.current || !canvasRef.current) return;
    
    // Clear existing particles when color changes
    particlesRef.current = [];
    
    // Render with new color
    const timer1 = setTimeout(() => {
      if (wrapperRef.current && canvasRef.current) {
        renderCanvas();
      }
    }, 50);
    
    const timer2 = setTimeout(() => {
      if (wrapperRef.current && canvasRef.current) {
        renderCanvas();
      }
    }, 200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [renderCanvas, wrapperSize, resolvedColor, isDarkMode]);

  // Event handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setHasBeenShown(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (resetOnMouseLeave || !hasBeenShown) {
      setIsHovered(false);
    }
  }, [resetOnMouseLeave, hasBeenShown]);

  return (
    <div
      ref={wrapperRef}
      className={`relative flex items-center justify-center overflow-hidden rounded-lg transition-all duration-300 ${className}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: 'transparent',
        border: 'none',
        backdropFilter: 'none',
        cursor: 'pointer',
        ...style
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated text that appears on hover */}
      <div
        className={`absolute z-10 transition-opacity duration-200 ${
          showText ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          color: resolvedColor,
          fontFamily: resolvedFontFamily,
          fontWeight,
          fontSize: `${fontSize}px`,
          userSelect: 'none',
          whiteSpace: 'nowrap',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}
      >
        {text}
      </div>
      
      {/* Canvas for particle system */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};
