import React, { useState } from 'react';
import {
  LayoutDashboard, Users, Cpu, GraduationCap, Briefcase, FileText,
  LogOut, ExternalLink, UserCheck, Image as ImageIcon
} from 'lucide-react';
import AdminAnalytics from './AdminAnalytics';
import AdminLeads from './AdminLeads';
import AdminProjects from './AdminProjects';
import AdminCourses from './AdminCourses';
import AdminInternships from './AdminInternships';
import AdminBlogs from './AdminBlogs';
import AdminGallery from './AdminGallery';
import AdminProfile from './AdminProfile';
import TechStriversLogo from '../../components/TechStriversLogo';
import { useData } from '../../context/DataContext';

export default function AdminLayout({ onExitAdmin, onLogout }) {
  const [activeTab, setActiveTab] = useState('analytics');
  const { leads, projects, courses, internships, blogs, gallery, adminProfile } = useData();

  const newLeadsCount = leads.filter(l => l.status === 'New').length;

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AdminAnalytics setActiveTab={setActiveTab} />;
      case 'leads':
        return <AdminLeads />;
      case 'projects':
        return <AdminProjects />;
      case 'courses':
        return <AdminCourses />;
      case 'internships':
        return <AdminInternships />;
      case 'blogs':
        return <AdminBlogs />;
      case 'gallery':
        return <AdminGallery />;
      case 'profile':
        return <AdminProfile />;
      default:
        return <AdminAnalytics setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="h-screen max-h-screen bg-[#071A2D] text-slate-100 flex flex-col font-sans bg-tech-grid overflow-hidden">
      
      {/* Top ERP Bar */}
      <header className="h-16 shrink-0 bg-[#071A2D] border-b border-[#0E2A47] px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <TechStriversLogo variant="light" size="sm" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#35A99A] bg-[#0E2A47] px-2.5 py-1 rounded border border-[#35A99A]/40 hidden sm:inline-block">
            ERP Admin Portal
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExitAdmin}
            className="btn-tech-dark text-xs py-1.5 px-3.5 gap-1.5"
          >
            Public Site <ExternalLink className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={onLogout}
            className="px-3 py-1.5 bg-red-950/80 hover:bg-red-900 text-red-300 text-xs font-bold rounded-md flex items-center gap-1 border-none cursor-pointer"
            title="Sign Out of ERP Admin Panel"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Main ERP Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-64 bg-[#071A2D] border-r border-[#0E2A47] flex flex-col justify-between shrink-0 p-4">
          
          <div className="space-y-6">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-[#0E2A47] pb-1">
              ERP Management
            </div>

            <nav className="space-y-1">
              
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors border-none cursor-pointer ${
                  activeTab === 'analytics' ? 'bg-[#FF6B16] text-white' : 'text-slate-300 hover:bg-[#0E2A47] hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> ERP Overview
              </button>

              <button
                onClick={() => setActiveTab('leads')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors border-none cursor-pointer ${
                  activeTab === 'leads' ? 'bg-[#FF6B16] text-white' : 'text-slate-300 hover:bg-[#0E2A47] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" /> Leads Inbox
                </div>
                {newLeadsCount > 0 && (
                  <span className="px-2 py-0.5 bg-[#35A99A] text-slate-950 font-extrabold text-[10px] rounded">
                    {newLeadsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors border-none cursor-pointer ${
                  activeTab === 'projects' ? 'bg-[#FF6B16] text-white' : 'text-slate-300 hover:bg-[#0E2A47] hover:text-white'
                }`}
              >
                <Cpu className="w-4 h-4" /> Projects ({projects.length})
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors border-none cursor-pointer ${
                  activeTab === 'courses' ? 'bg-[#FF6B16] text-white' : 'text-slate-300 hover:bg-[#0E2A47] hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" /> Courses ({courses.length})
              </button>

              <button
                onClick={() => setActiveTab('internships')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors border-none cursor-pointer ${
                  activeTab === 'internships' ? 'bg-[#FF6B16] text-white' : 'text-slate-300 hover:bg-[#0E2A47] hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" /> Internships & Workshops ({internships.length})
              </button>

              <button
                onClick={() => setActiveTab('blogs')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors border-none cursor-pointer ${
                  activeTab === 'blogs' ? 'bg-[#FF6B16] text-white' : 'text-slate-300 hover:bg-[#0E2A47] hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" /> Blog Articles ({blogs.length})
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors border-none cursor-pointer ${
                  activeTab === 'gallery' ? 'bg-[#FF6B16] text-white' : 'text-slate-300 hover:bg-[#0E2A47] hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Gallery ({gallery.length})
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors border-none cursor-pointer ${
                  activeTab === 'profile' ? 'bg-[#FF6B16] text-white' : 'text-slate-300 hover:bg-[#0E2A47] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserCheck className="w-4 h-4 text-[#35A99A]" /> Admin Profile & 2FA
                </div>
                {adminProfile.twoFactorEnabled && (
                  <span className="w-2 h-2 rounded-full bg-[#35A99A]" title="2FA Enabled" />
                )}
              </button>

            </nav>
          </div>

          {/* Admin User Footer */}
          <div className="pt-4 border-t border-[#0E2A47]">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-md bg-[#0E2A47] hover:border-[#FF6B16] border transition-colors cursor-pointer ${
                activeTab === 'profile' ? 'border-[#FF6B16]' : 'border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-7 h-7 rounded bg-[#FF6B16] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {adminProfile.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="text-xs truncate">
                  <div className="font-bold text-white text-[11px] truncate">{adminProfile.name}</div>
                  <div className="text-[10px] text-[#35A99A] truncate">{adminProfile.email}</div>
                </div>
              </div>
            </button>
          </div>

        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#071A2D]">
          {renderContent()}
        </main>

      </div>

    </div>
  );
}
