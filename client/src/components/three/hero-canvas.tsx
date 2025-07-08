import { useEffect, useRef } from 'react';
import { ThreeScene } from '@/lib/three-scene';

interface HeroCanvasProps {
  className?: string;
}

export function HeroCanvas({ className }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ThreeScene | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      sceneRef.current = new ThreeScene(containerRef.current);
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

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className || ''}`}
      style={{ minHeight: '500px', height: '70vh' }}
    />
  );
}
