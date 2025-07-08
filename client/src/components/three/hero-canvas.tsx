import { useEffect, useRef } from 'react';
import { ThreeScene } from '@/lib/three-scene';

interface HeroCanvasProps {
  className?: string;
  titleSize?: number;
  subtitleSize?: number;
}

export function HeroCanvas({ className, titleSize, subtitleSize }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ThreeScene | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      sceneRef.current = new ThreeScene(containerRef.current, {
        titleSize,
        subtitleSize
      });
    } catch (error) {
      console.error('Failed to initialize Three.js scene:', error);
    }

    return () => {
      if (sceneRef.current) {
        sceneRef.current.dispose();
        sceneRef.current = null;
      }
    };
  }, []);

  // Update scale when typography sizes change
  useEffect(() => {
    if (sceneRef.current && titleSize && subtitleSize) {
      sceneRef.current.updateScale(titleSize, subtitleSize);
    }
  }, [titleSize, subtitleSize]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className || ''}`}
      style={{ minHeight: '400px', height: '400px' }}
    />
  );
}
