import React, { useRef, useEffect, useCallback } from 'react';

interface ScrollControllerProps {
  onScrollChange: (scrollProgress: number) => void;
  isActive: boolean;
  children: React.ReactNode;
}

const ScrollController: React.FC<ScrollControllerProps> = ({ 
  onScrollChange, 
  isActive, 
  children 
}) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const currentScrollRef = useRef(0);
  const targetScrollRef = useRef(0);

  const smoothScrollUpdate = useCallback(() => {
    if (!isActive) return;

    const c = containerRef.current;
    if (!c) return;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    currentScrollRef.current = lerp(currentScrollRef.current, targetScrollRef.current, 0.1);

    const maxScroll = c.scrollHeight - c.clientHeight;
    const progress = maxScroll > 0 ? currentScrollRef.current / maxScroll : 0;

    onScrollChange(Math.min(Math.max(progress, 0), 1));

    if (Math.abs(currentScrollRef.current - targetScrollRef.current) > 0.2) {
      animationFrameRef.current = requestAnimationFrame(smoothScrollUpdate);
    } else {
      animationFrameRef.current = undefined;
    }
  }, [isActive, onScrollChange]);

  const handleScroll = useCallback(
    (e: Event) => {
      if (!isActive) return;
      const c = e.target as HTMLDivElement;

      targetScrollRef.current = c.scrollTop;

      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(smoothScrollUpdate);
      }
    },
    [isActive, smoothScrollUpdate]
  );

  useEffect(() => {
    const c = containerRef.current;
    if (!c || !isActive) return;

    c.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      c.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isActive, handleScroll]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto perspective-1000 preserve-3d"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      }}
    >
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="gpu-accelerated">
        {children}
      </div>
    </div>
  );
};

export default ScrollController;
