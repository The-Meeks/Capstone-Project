import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import PresentationsGallery from "./pages/presentationsGallery";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/dashboard";
import VideoPresentationsPage from "./pages/videoPresentation";
import PhotoEssayGallery from "./pages/photoEssay";
import ResumeViewer from "./pages/resume";
import EssayDocumentViewer from "./pages/essayDocuments";


const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your routes here */}
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/video-presentations" element={<VideoPresentationsPage />} />
        <Route path="/photo-essay-gallery" element={<PhotoEssayGallery />} />
        <Route path="/resume-viewer" element={<ResumeViewer />} />
        <Route path="/essay-document-viewer" element={<EssayDocumentViewer />} />
        <Route path="/presentations-gallery" element={<PresentationsGallery />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
