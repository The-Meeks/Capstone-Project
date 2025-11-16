import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // <-- import Outlet

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f9fafb]">
      {/* Sidebar */}
      <Sidebar
        isMobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header
          onMenuToggle={() => setSidebarOpen(true)}
          isMobileMenuOpen={sidebarOpen}
        />

        {/* Page Content */}
        <main className="pt-16 p-4 md:p-6 overflow-y-auto bg-[#f9fafb]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
