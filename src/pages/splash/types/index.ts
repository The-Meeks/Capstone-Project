export interface ScrollProgress {
    current: number;
    target: number;
    normalized: number; // 0 to 1
  }
  
  export interface LayerTransform {
    translateZ: number;
    scale: number;
    rotateX: number;
    rotateY: number;
    opacity: number;
  }
  
  export interface AnimationState {
    isLoading: boolean;
    isScrollActive: boolean;
    isFlyingThrough: boolean;
    scrollProgress: number;
  }
  
  export interface TextAnimationProps {
    text: string;
    delay: number;
    scrollTrigger: number;
    className?: string;
  }
  
  export interface ParallaxLayerProps {
    depth: number;
    scrollProgress: number;
    children: React.ReactNode;
    className?: string;
  }
  
  export interface BackgroundLayerProps {
    scrollProgress: number;
    imageUrl: string;
    alt: string;
    opacity: number;
    className?: string;
  }
  
  export interface SectionData {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    backgroundImage?: string;
    backgroundAlt?: string;
    scrollTrigger: number;
    depthZ: number;  
  }
  