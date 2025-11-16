import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ScrollController from "../../components/ui/ScrollController";
import SplashSection from "./components/SplashSection";
import ExploreButton from "../../components/ui/ExploreButton";
import culture from "../../assets/peakpx.jpg"

import { AnimationState, SectionData } from "./types";

const SplashLanding: React.FC = () => {
  const navigate = useNavigate();

  const [animationState, setAnimationState] = useState<AnimationState>({
    isLoading: true,
    isScrollActive: false,
    isFlyingThrough: false,
    scrollProgress: 0,
  });

  /** -------------------------
   * SECTION DATA
   * ------------------------ */
  const sections: SectionData[] = [
    {
      id: "welcome",
      title: "WELCOME",
      subtitle: "TO MY PROFILE",
      description:
        "Discover my journey, skills, and projects with smooth scrolling and visually engaging sections.",
      backgroundImage:
        "https://images.unsplash.com/photo-1565273601018-d1da7cfed4f7?auto=format&fit=crop&w=1200&q=80",
      backgroundAlt: "Futuristic digital space with glowing blue circuits",
      depthZ: 0,
      scrollTrigger: 0.0,
    },
    {
      id: "skills",
      title: "SKILLS",
      subtitle: "WHAT I DO",
      description:
        "I blend modern technology with African-inspired creativity. From web development to digital art influenced by African patterns and colors, I craft interactive and visually engaging experiences.",
      backgroundImage:
        "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=1200&q=80",
      backgroundAlt:
        "Abstract digital tech shapes glowing in neon",
      depthZ: -800,
      scrollTrigger: 0.25,
    },
    {
      id: "projects",
      title: "PROJECTS",
      subtitle: "MY WORK",
      description:
        "Selected projects showcasing innovation at the intersection of technology and African heritage.",
      backgroundImage:
        "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg",
      backgroundAlt:
        "Grey laptop on a desk with dark workspace",
      depthZ: -1600,
      scrollTrigger: 0.5,
    }
    ,
    {
      id: "culture",
      title: "CULTURE",
      subtitle: "HERITAGE + FUTURE",
      description:
        "Celebrating African heritage reimagined through a futuristic lens — where tradition meets innovation in visually rich, tech-infused forms.",
      backgroundImage: culture,
      backgroundAlt:
        "Colorful geometric African pattern in digital style",
      depthZ: -2000,
      scrollTrigger: 0.625,
    },
    {
      id: "contact",
      title: "CONTACT",
      subtitle: "LET'S CONNECT",
      description:
        "I’m open to collaborations, freelance opportunities, and cultural-tech projects. Reach out and let's create something innovative together.",
      backgroundImage:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      backgroundAlt:
        "Digital neon cityscape with stars and light trails",
      depthZ: -2400,
      scrollTrigger: 0.75,
    },
  ];
  
  
  /** -------------------------
   * LOADING COMPLETE
   * ------------------------ */
  const handleLoadingComplete = useCallback(() => {
    setAnimationState((prev) => ({
      ...prev,
      isLoading: false,
      isScrollActive: true,
    }));
  }, []);

  /** -------------------------
   * SCROLL HANDLER
   * ------------------------ */
  const handleScrollChange = useCallback((progress: number) => {
    setAnimationState((prev) => ({
      ...prev,
      scrollProgress: progress,
    }));
  }, []);

  /** -------------------------
   * EXPLORE BUTTON CLICK
   * ------------------------ */
  const handleExplore = useCallback(() => {
    navigate("/dashboard/");
  }, [navigate]);

  /** -------------------------
   * CURRENT SECTION INDEX
   * ------------------------ */
  const currentSectionIndex = Math.floor(
    animationState.scrollProgress * sections.length
  );

  /** -------------------------
   * BACKGROUND GRADIENT
   * ------------------------ */
  const getBackgroundGradient = (p: number): string => {
    if (p < 0.33) return "linear-gradient(135deg, #ECFDF5 0%, #FFFBEB 100%)";
    if (p < 0.66) return "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)";
    return "linear-gradient(135deg, #FEF3C7 0%, #ECFDF5 100%)";
  };

  /** -------------------------
   * RENDER
   * ------------------------ */
  return (
    <div className="relative w-full h-screen overflow-scroll">
      {/* LOADING OVERLAY */}
      <LoadingSpinner
        isVisible={animationState.isLoading}
        onComplete={handleLoadingComplete}
      />

      {!animationState.isLoading && (
        <>
          {/* BACKGROUND GRADIENT */}
          <div
            className="fixed inset-0 -z-20 transition-all duration-1000"
            style={{
              background: getBackgroundGradient(animationState.scrollProgress),
            }}
          />

          {/* SCROLLABLE SECTIONS */}
          <ScrollController
            onScrollChange={handleScrollChange}
            isActive={animationState.isScrollActive}
          >
            <div className="relative">
              {sections.map((section, i) => (
                <div key={section.id} className="relative h-screen">
                  <SplashSection
                    section={section}
                    cameraZ={
                      animationState.scrollProgress *
                      sections.length *
                      window.innerHeight
                    }
                    sectionIndex={i}
                    sectionHeight={window.innerHeight}
                  />
                </div>
              ))}
            </div>
          </ScrollController>

          {/* EXPLORE BUTTON */}
          <ExploreButton
            onExplore={handleExplore}
            scrollProgress={animationState.scrollProgress}
          />

          {/* RIGHT SCROLL BAR */}
          <div className="fixed bottom-4 right-4 z-40">
            <div className="w-1 h-20 bg-muted rounded-full overflow-hidden">
              <div
                className="w-full bg-primary transition-all duration-300 rounded-full"
                style={{ height: `${animationState.scrollProgress * 100}%` }}
              />
            </div>
          </div>

          {/* LEFT DOT NAV */}
          <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 space-y-3">
            {sections.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentSectionIndex
                    ? "bg-primary scale-125 shadow-lg"
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SplashLanding;
