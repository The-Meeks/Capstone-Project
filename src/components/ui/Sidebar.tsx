import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

interface SidebarProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  section: "main" | "group";
  children?: NavItem[];
}

const Sidebar = ({
  isCollapsed = false,
  isMobileOpen = false,
  onMobileClose,
}: SidebarProps) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(["documents", "media"]);

  // Hide-on-scroll for mobile
  const [hideOnScroll, setHideOnScroll] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY <= 0) return setHideOnScroll(false);

      if (currentY > lastY) setHideOnScroll(true);

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems: NavItem[] = [
    { id: "dashboard", label: "Home", path: "/dashboard", icon: "LayoutDashboard", section: "main" },
  
    {
      id: "documents",
      label: "Academic Documents",
      icon: "FileText",
      section: "group",
      children: [
        { id: "resume", label: "Resume Viewer", path: "/dashboard/resume", icon: "FileUser", section: "main" },
        { id: "essays", label: "Essay Documents", path: "/dashboard/essays", icon: "BookOpen", section: "main" },
      ],
    },
  
    { id: "presentations", label: "Presentations", path: "/dashboard/presentations", icon: "Presentation", section: "main" },
  
    { id: "presence", label: "Online Presence", path: "/dashboard/presence", icon: "Globe", section: "main" },
  
    {
      id: "media",
      label: "Media Portfolio",
      icon: "Image",
      section: "group",
      children: [
        { id: "videos", label: "Video Presentations", path: "/dashboard/videos", icon: "Video", section: "main" },
        { id: "photos", label: "Photo Essay Gallery", path: "/dashboard/photos", icon: "Camera", section: "main" },
      ],
    },
  ];
  

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isActive = (path?: string) => (path ? location.pathname === path : false);

  const handleNavigation = (path?: string) => {
    if (!path) return;
    onMobileClose?.();
    setTimeout(() => (window.location.href = path), 100);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static
          top-16
          h-[calc(100vh-4rem)]
          z-50

          bg-[#FAFAFA] border-r border-[#E2E8F0]
          shadow-sm

          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"}

          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              if (item.section === "group") {
                const expanded = expandedSections.includes(item.id);

                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={() => toggleSection(item.id)}
                      className={`w-full flex items-center justify-between 
                        p-3 rounded-lg text-sm font-medium
                        hover:bg-[#E8F5E9] transition-all
                        ${isCollapsed ? "justify-center" : ""}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={item.icon} size={18} />
                        {!isCollapsed && <span>{item.label}</span>}
                      </div>

                      {!isCollapsed && (
                        <Icon
                          name="ChevronDown"
                          size={16}
                          className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>

                    {expanded && !isCollapsed && (
                      <div className="ml-6 space-y-1">
                        {item.children?.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => handleNavigation(child.path)}
                            className={`
                              w-full flex items-center 
                              p-2 space-x-3 rounded-md text-sm
                              transition-all

                              ${
                                isActive(child.path)
                                  ? "bg-[#43A047] text-white shadow-sm"
                                  : "text-[#555] hover:bg-[#E8F5E9]"
                              }
                            `}
                          >
                            <Icon name={child.icon} size={16} />
                            <span>{child.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center p-3 space-x-3 
                    rounded-lg text-sm font-medium transition-all
                    ${isCollapsed ? "justify-center" : ""}
                    
                    ${
                      isActive(item.path)
                        ? "bg-[#43A047] text-white shadow-sm"
                        : "text-[#444] hover:bg-[#E8F5E9]"
                    }
                  `}
                >
                  <Icon name={item.icon} size={18} />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Bottom section */}
          {!isCollapsed && (
            <div className="p-4 border-t border-[#E2E8F0] space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Icon name="Settings" size={16} /> Settings
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Icon name="HelpCircle" size={16} /> Help & Support
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
