import React from "react";
import AnimatedText from "./AnimatedText";
import BackgroundLayer from "./BackgroundLayer";
import { SectionData } from "../types";

interface SplashSectionProps {
  section: SectionData;
  cameraZ: number;  // current scroll position
  sectionIndex: number;
  sectionHeight: number; // height in px (usually window.innerHeight)
}

const SplashSection: React.FC<SplashSectionProps> = ({ section, cameraZ, sectionIndex, sectionHeight }) => {
  // Compute section’s start and end scroll positions
  const startZ = sectionIndex * sectionHeight;
  const endZ = startZ + sectionHeight;

  // Calculate local progress (0 to 1) within this section
  let localProgress = (cameraZ - startZ) / sectionHeight;
  localProgress = Math.max(0, Math.min(localProgress, 1)); // clamp between 0 and 1

  // Smooth fade + scale
  const opacity = sectionIndex === 0 ? 1 : localProgress; // first section always fully visible
  const scale = 0.8 + opacity * 0.2;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center h-full w-full preserve-3d"
      style={{
        transform: `translateZ(${-section.depthZ}px)`,
        willChange: "transform",
      }}
    >
      <BackgroundLayer
        scrollProgress={opacity}
        imageUrl={section.backgroundImage ?? "/placeholder.jpg"}
        alt={section.backgroundAlt ?? "Background"}
        opacity={0.5}
      />

      <div
        className="relative z-10 text-center max-w-4xl px-4"
        style={{
          opacity,
          transform: `scale(${scale})`,
          transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
        }}
      >
        <AnimatedText
          text={section.title}
          delay={150}
          scrollTrigger={0}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground"
        />

        {section.subtitle && (
          <AnimatedText
            text={section.subtitle}
            delay={400}
            scrollTrigger={0}
            className="text-2xl md:text-4xl text-primary mt-4"
          />
        )}

        {section.description && (
          <AnimatedText
            text={section.description}
            delay={700}
            scrollTrigger={0}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-6"
          />
        )}
      </div>
    </div>
  );
};

export default SplashSection;
