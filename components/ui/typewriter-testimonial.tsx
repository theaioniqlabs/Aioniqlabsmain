'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Testimonial = {
  image: string;
  audio?: string; // Optional - audio files may not exist
  text: string;
  name: string;
  jobtitle: string;
};

type TypewriterTestimonialProps = {
  testimonials: Testimonial[];
};

export const TypewriterTestimonial: React.FC<TypewriterTestimonialProps> = ({ testimonials }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const audioPlayerRef = useRef<HTMLAudioElement | null>(null); 
  const [hasBeenHovered, setHasBeenHovered] = useState<boolean[]>(new Array(testimonials.length).fill(false));
  const [typedText, setTypedText] = useState('');
  const typewriterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentTextRef = useRef('');

  const stopAudio = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause(); 
      audioPlayerRef.current.currentTime = 0; 
      audioPlayerRef.current.src = ''; 
      audioPlayerRef.current.load(); 
      audioPlayerRef.current = null; 
    }
  }, []); 

  const startTypewriter = useCallback((text: string) => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
    }
    setTypedText('');
    currentTextRef.current = text;
    
    let i = 0;
    const type = () => {
      if (i <= text.length) {
        setTypedText(text.slice(0, i));
        i++;
        typewriterTimeoutRef.current = setTimeout(type, 50);
      }
    };
    type();
  }, []);

  const stopTypewriter = useCallback(() => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
      typewriterTimeoutRef.current = null;
    }
    setTypedText('');
    currentTextRef.current = '';
  }, []); 

  const handleMouseEnter = useCallback((index: number) => {
    stopAudio(); 

    setHoveredIndex(index);
  
    // Only attempt to load and play audio if it's provided
    const audioFile = testimonials[index].audio;
    if (audioFile) {
      try {
        const newAudio = new Audio(`/audio/${audioFile}`);
        audioPlayerRef.current = newAudio;
        
        // Check if audio can be loaded before attempting to play
        newAudio.addEventListener('error', () => {
          // Audio file not found or failed to load - silently fail
          audioPlayerRef.current = null;
        });
        
        newAudio.play().catch(() => {
          // Audio playback failed (user interaction required, file missing, etc.) - silently fail
          audioPlayerRef.current = null;
        });
      } catch {
        // Failed to create audio element - silently fail
        audioPlayerRef.current = null;
      }
    }
    
    setHasBeenHovered(prev => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
    startTypewriter(testimonials[index].text);
  }, [testimonials, stopAudio, startTypewriter]); 

  const handleMouseLeave = useCallback(() => {
    stopAudio(); 
    setHoveredIndex(null);
    stopTypewriter();
  }, [stopAudio, stopTypewriter]);

  useEffect(() => {
    return () => {
      stopAudio(); 
      stopTypewriter(); 
    };
  }, [stopAudio, stopTypewriter]);

  return (
    <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 flex-wrap p-4 sm:p-6 w-full h-full min-h-[200px] relative overflow-visible">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={`${testimonial.name}-${testimonial.image}`}
          className="relative flex flex-col items-center justify-center overflow-visible"
          onMouseEnter={() => handleMouseEnter(index)} 
          onMouseLeave={handleMouseLeave}
          onTouchStart={() => handleMouseEnter(index)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img
            src={testimonial.image}
            alt={`Testimonial from ${testimonial.name}`}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-4 hover:animate-pulse border-gray-300"
            animate={{ 
              borderColor: (hoveredIndex === index || hasBeenHovered[index]) ? '#ACA0FB' : '#E5E7EB'
            }}
            transition={{ duration: 0.3 }}
          />
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-full mb-2 sm:mb-3 md:mb-4 bg-white text-black text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-2xl max-w-[200px] sm:max-w-xs w-[180px] sm:w-48 md:w-56 left-1/2 -translate-x-1/2 z-50"
              >
                <div className="h-16 sm:h-20 md:h-24 overflow-hidden whitespace-pre-wrap text-xs sm:text-sm">
                  {typedText}
                  <span className="animate-blink">|</span>
                </div>
                <p className="mt-1 sm:mt-2 text-right font-semibold text-xs sm:text-sm">{testimonial.name}</p>
                <p className="text-right text-gray-500 text-[10px] sm:text-xs md:text-sm">{testimonial.jobtitle}</p>
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full shadow-lg"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shadow-lg mt-0.5 sm:mt-1"></div>
                  <div className="w-1 h-1 bg-white rounded-full shadow-lg mt-0.5 sm:mt-1"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

