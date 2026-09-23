import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import TechStriversLogo from './TechStriversLogo';

export default function Navbar({ openEnquireModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    {
      path: '/projects',
      label: 'Projects',
      hasDropdown: true,
      children: [
        { path: '/projects', label: 'All Projects' },
        { path: '/projects?category=IoT', label: 'IoT & Embedded Systems' },
        { path: '/projects?category=AI/ML', label: 'AI & Robotics' },
        { path: '/projects?category=Sensors', label: 'Sensors & Circuitry' }
      ]
    },
    {
      path: '/courses',
      label: 'Courses',
      hasDropdown: true,
      children: [
        { path: '/courses', label: 'All Courses' },
        { path: '/courses?topic=iot', label: 'IoT Masterclass' },
        { path: '/courses?topic=robotics', label: 'Robotics & ROS' },
        { path: '/courses?topic=ai', label: 'Computer Vision & AI' },
        { path: '/courses?topic=pcb', label: 'PCB Design' }
      ]
    },
    { path: '/internships', label: 'Internships' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/blog', label: 'Blog & News' },
    { path: '/contact', label: 'Contact' }
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#EAF3FA] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link 
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center text-left border-none bg-transparent cursor-pointer p-0 text-decoration-none"
          >
            <TechStriversLogo variant="dark" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));

              return (
                <div key={item.path} className="relative group">
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`px-3.5 py-2 text-sm font-bold rounded-md transition-colors flex items-center gap-1 border-none bg-transparent cursor-pointer ${
                      isActive
                        ? 'text-[#1769C2] bg-[#EAF3FA]'
                        : 'text-[#102A43] hover:text-[#1769C2] hover:bg-[#F5F7FA]'
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5 text-[#1769C2] opacity-70 group-hover:rotate-180 transition-transform duration-200" />}
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-[#EAF3FA] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 py-2 z-50">
                      {item.children.map((child, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavClick(child.path)}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-[#102A43] hover:text-[#FF6B16] hover:bg-[#EAF3FA] transition-colors border-none bg-transparent cursor-pointer"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={openEnquireModal}
              className="btn-tech-orange"
            >
              Enquire Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={openEnquireModal}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#FF6B16] rounded-md border-none cursor-pointer"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#102A43] hover:bg-[#F5F7FA] border-none bg-transparent cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EAF3FA] px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <div key={item.path} className="py-1">
              <button
                onClick={() => handleNavClick(item.path)}
                className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-bold border-none bg-transparent cursor-pointer ${
                  location.pathname === item.path ? 'text-[#1769C2] bg-[#EAF3FA]' : 'text-[#102A43] hover:bg-[#F5F7FA]'
                }`}
              >
                {item.label}
              </button>
            </div>
          ))}

          <div className="pt-4 border-t border-[#EAF3FA]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEnquireModal();
              }}
              className="w-full btn-tech-orange justify-center"
            >
              Enquire Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
