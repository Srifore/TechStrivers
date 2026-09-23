import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import ProjectDetailModal from './components/ProjectDetailModal';
import { DataProvider } from './context/DataContext';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import CoursesPage from './pages/CoursesPage';
import InternshipsPage from './pages/InternshipsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import NotFoundPage from './pages/NotFoundPage';

function PublicLayout({ openEnquireModal, setSelectedProject }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F5F7FA] text-[#102A43]">
      
      {/* Top Header Navigation */}
      <Navbar 
        openEnquireModal={openEnquireModal}
      />

      {/* Main Page View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <HomePage
              setActivePage={(page) => navigate(`/${page === 'home' ? '' : page}`)}
              openEnquireModal={openEnquireModal}
            />
          } />
          <Route path="/about" element={
            <AboutPage 
              setActivePage={(page) => navigate(`/${page === 'home' ? '' : page}`)} 
              openEnquireModal={openEnquireModal}
            />
          } />
          <Route path="/projects" element={
            <ProjectsPage
              setSelectedProject={setSelectedProject}
              openEnquireModal={openEnquireModal}
            />
          } />
          <Route path="/projects/:id" element={
            <ProjectsPage
              setSelectedProject={setSelectedProject}
              openEnquireModal={openEnquireModal}
            />
          } />
          <Route path="/courses" element={
            <CoursesPage 
              openEnquireModal={openEnquireModal}
            />
          } />
          <Route path="/internships" element={
            <InternshipsPage 
              openEnquireModal={openEnquireModal}
            />
          } />
          <Route path="/gallery" element={
            <GalleryPage
              openEnquireModal={openEnquireModal}
            />
          } />
          <Route path="/gallery/:id" element={
            <GalleryPage
              openEnquireModal={openEnquireModal}
            />
          } />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:idOrSlug" element={<BlogDetailPage openEnquireModal={openEnquireModal} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer openEnquireModal={openEnquireModal} />

    </div>
  );
}

function MainApp() {
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const closeProjectModal = () => {
    setSelectedProject(null);
    if (location.pathname.startsWith('/projects/')) {
      navigate('/projects');
    }
  };

  return (
    <>
      <Routes>
        {/* Admin ERP Portal now runs as its own app - see admin.html / src/AdminApp.jsx */}
        <Route path="/*" element={
          <PublicLayout 
            openEnquireModal={() => setIsEnquireModalOpen(true)}
            setSelectedProject={setSelectedProject}
          />
        } />
      </Routes>

      {/* Global Enquiry Modal */}
      <EnquiryModal 
        isOpen={isEnquireModalOpen}
        onClose={() => setIsEnquireModalOpen(false)}
      />

      {/* Global Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={closeProjectModal}
        openEnquireModal={() => setIsEnquireModalOpen(true)}
      />
    </>
  );
}

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </DataProvider>
  );
}
