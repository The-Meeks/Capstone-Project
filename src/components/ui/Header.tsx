import React from "react";
import Icon from "../AppIcon";
import Button from "./Button";

interface HeaderProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const Header = ({ onMenuToggle, isMobileMenuOpen = false }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-30 bg-white border-b border-gray-200 shadow-md">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="relative z-60"
          >
            <Icon
              name={isMobileMenuOpen ? "X" : "Menu"}
              size={24}
              className="text-gray-800"
            />
          </Button>
        </div>

        {/* Logo / Title */}
        <div className="flex items-center flex-1 lg:flex-none space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={20} color="black" />
          </div>
          <div>
            <h1 className="text-lg font-heading font-semibold text-gray-800">
              Student Portfolio
            </h1>
            <p className="text-xs text-gray-500 font-caption">
              Capstone Showcase
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
