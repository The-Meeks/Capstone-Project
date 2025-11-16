import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";

import ResumeViewer from "./pages/resume";
import PresentationsGallery from "./pages/presentationsGallery";
import VideoPresentationsPage from "./pages/videoPresentation";
import PhotoEssayGallery from "./pages/photoEssay";
import EssayDocumentViewer from "./pages/essayDocuments";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import StudentDashboardHome from "./pages/dashboard/index";
import DashboardLayout from "./pages/dashboard/dashboardLayout";
import OnlinePresence from "./pages/presence";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Dashboard parent route */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Child routes */}
            <Route index element={<StudentDashboardHome />} />
            <Route path="resume" element={<ResumeViewer />} />
            <Route path="essays" element={<EssayDocumentViewer />} />
            <Route path="presentations" element={<PresentationsGallery />} />
            <Route path="videos" element={<VideoPresentationsPage />} />
            <Route path="photos" element={<PhotoEssayGallery />} />
            <Route path="presence" element={<OnlinePresence />} />
            {/* Redirect unknown dashboard paths to home */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>

          {/* Public or non-dashboard routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;


