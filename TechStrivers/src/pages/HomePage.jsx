import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Award, Bot, Brain, Briefcase, ChevronLeft, ChevronRight, Cpu,
  GraduationCap, Layers, ShieldCheck, Star, Users, Wrench, Zap, Image as ImageIcon, Eye
} from 'lucide-react';
import { statsData, servicesData, whyChooseUsData, testimonialsData, partnerUniversities } from '../data/websiteData';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

export default function HomePage({ setActivePage, openEnquireModal }) {
  const { projects, gallery } = useData();
  const navigate = useNavigate();
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [galleryTab, setGalleryTab] = useState('all');

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const visibleTestimonials = [0, 1, 2].map(
    (offset) => testimonialsData[(activeTestimonialIdx + offset) % testimonialsData.length]
  );

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://techstrivers.com/#organization",
        "name": "TechStrivers",
        "url": "https://techstrivers.com",
        "logo": "https://techstrivers.com/favicon.svg",
        "description": "Hands-on engineering projects, technology training, and innovation programs in IoT, Embedded Systems, Robotics, AI, Electronics, and Automation.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.instagram.com/techstrivers",
          "https://youtube.com/@techstrivers"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://techstrivers.com/#localbusiness",
        "name": "TechStrivers Innovation & Training Center",
        "image": "https://techstrivers.com/images/hero_lab.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <SEO 
        title="TechStrivers | IoT, Robotics & AI Engineering Projects"
        description="Empowering future engineers in Bengaluru with hands-on IoT, Embedded Systems, AI, Robotics, and PCB design projects, training, and internships."
        canonical="https://techstrivers.com/"
        schema={homeSchema}
      />

      {/* ================= HERO SECTION (DEEP NAVY #071A2D + BLUEPRINT GRID) ================= */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-[#071A2D] text-white bg-tech-grid border-b border-[#0E2A47]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#0E2A47] border border-[#1769C2]/40 text-xs font-bold tracking-widest text-[#35A99A] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#FF6B16] animate-pulse" />
                LEARN · BUILD · INNOVATE
              </div>

              {/* Headline matching Section 5 & 6 guidelines */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight uppercase leading-[1.1]">
                BUILD YOUR IDEAS.<br />
                <span className="text-white">CREATE THE </span>
                <span className="text-[#FF6B16]">FUTURE.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-xl">
                Hands-on engineering projects, technology training and innovation programs in IoT, Embedded Systems, Robotics, AI, Electronics and Automation.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActivePage('courses')}
                  className="btn-tech-orange text-base"
                >
                  Explore Programs <ArrowRight className="w-5 h-5 ml-1" />
                </button>
                <button
                  onClick={openEnquireModal}
                  className="btn-tech-dark text-base"
                >
                  Start Your Project →
                </button>
              </div>

              {/* Badges Bar */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#0E2A47] max-w-lg">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <div className="p-2 rounded-md bg-[#0E2A47] text-[#FF6B16] shrink-0 border border-slate-700">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span>Hands-on Learning</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <div className="p-2 rounded-md bg-[#0E2A47] text-[#1769C2] shrink-0 border border-slate-700">
                    <Users className="w-4 h-4" />
                  </div>
                  <span>Expert Mentorship</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <div className="p-2 rounded-md bg-[#0E2A47] text-[#35A99A] shrink-0 border border-slate-700">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span>Real World Projects</span>
                </div>
              </div>

            </div>

            {/* Right Graphic Frame */}
            <div className="lg:col-span-6">
              <div className="hero-photo-wrapper">
                
                <img 
                  src="/images/hero_lab.jpg" 
                  alt="TechStrivers Engineering Workbench" 
                  className="w-full h-[400px] sm:h-[460px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2D]/90 via-transparent to-transparent" />

                {/* Hexagon floating badge */}
                <div className="absolute top-5 left-5 z-20">
                  <div className="bg-[#071A2D]/90 border border-[#1769C2]/50 px-4 py-2 flex items-center gap-3 text-white rounded-md backdrop-blur-md">
                    <div className="hex-container" style={{ width: '34px', height: '38px' }}>
                      <div className="hex-inner" style={{ width: '28px', height: '32px', fontSize: '0.8rem' }}>TS</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#FF6B16] uppercase tracking-widest">TECHSTRIVERS</div>
                      <div className="text-xs font-extrabold text-white">ENGINEERS OF A BETTER TOMORROW</div>
                    </div>
                  </div>
                </div>

                {/* Corner Technical Label */}
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="bg-[#071A2D]/95 border border-[#35A99A] px-4 py-2 rounded-md text-white text-xs font-mono font-bold flex items-center gap-2">
                    REAL HARDWARE. REAL POSSIBILITIES. <span className="text-[#FF6B16]">&lt;/&gt;</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= STATS COUNTER BAR (DEEP NAVY #071A2D) ================= */}
      <section className="bg-[#071A2D] text-white py-10 border-b border-[#0E2A47]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#0E2A47]">
            {statsData.map((stat, idx) => (
              <div key={idx} className="pt-4 md:pt-0 px-2 space-y-1">
                <div className="text-3xl sm:text-4xl font-black font-heading text-[#FF6B16] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-300 tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= WHAT WE DO (SERVICES) ================= */}
      <section className="py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#FF6B16] uppercase">WHAT WE DO</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#102A43] mt-1 uppercase">
                TURNING IDEAS INTO <span className="text-[#1769C2]">REAL SOLUTIONS</span>
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl">
                TechStrivers provides end-to-end support for students, educators and innovators — from learning to building real-world technology.
              </p>
            </div>
            <div>
              <button
                onClick={() => setActivePage('courses')}
                className="text-[#1769C2] font-bold text-sm hover:text-[#FF6B16] flex items-center gap-1 border-none bg-transparent cursor-pointer transition-colors"
              >
                View All Services <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>

          {/* 6 Engineering Module Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service) => {
              const IconComponent = {
                GraduationCap, Cpu, Bot, Brain, Zap, Users
              }[service.icon] || Cpu;

              return (
                <div 
                  key={service.id} 
                  className="card-engineering p-6 sm:p-8 flex flex-col justify-between space-y-4 group cursor-pointer"
                  onClick={openEnquireModal}
                >
                  <div className="space-y-4">
                    <div 
                      className="w-12 h-12 rounded-md flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-sm"
                      style={{ backgroundColor: service.color === '#FF6B00' ? '#FF6B16' : service.color }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold font-heading text-[#102A43] group-hover:text-[#1769C2] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#EAF3FA]">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6B16] group-hover:translate-x-1 transition-transform">
                      {service.linkText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ================= FEATURED PROJECTS SECTION (DEEP NAVY #071A2D) ================= */}
      <section className="py-20 bg-[#071A2D] text-white bg-tech-grid relative overflow-hidden border-y border-[#0E2A47]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <span className="text-xs font-bold tracking-widest text-[#FF6B16] uppercase">FEATURED PROJECTS</span>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-white uppercase leading-tight">
                REAL PROJECTS.<br />
                <span className="text-[#FF6B16]">REAL IMPACT.</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Explore some of our innovative hardware projects developed by our students and engineering team.
              </p>
              <div>
                <button
                  onClick={() => setActivePage('projects')}
                  className="btn-tech-dark text-sm"
                >
                  View All Projects →
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((proj) => (
                <div 
                  key={proj.id}
                  className="card-engineering-dark overflow-hidden flex flex-col justify-between group cursor-pointer"
                  onClick={() => navigate(`/projects/${proj.id}`)}
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={proj.image || '/images/hero_lab.jpg'}
                        alt={proj.title}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/hero_lab.jpg';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#FF6B16] text-white font-bold text-[10px] rounded uppercase">
                        {proj.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="font-heading font-bold text-base text-white group-hover:text-[#FF6B16] transition-colors line-clamp-2">
                        {proj.title}
                      </h3>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(Array.isArray(proj.tags) ? proj.tags : (typeof proj.tags === 'string' ? proj.tags.split(',') : [])).map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 bg-[#071A2D] text-[#35A99A] border border-[#1769C2]/30 text-[10px] font-bold rounded">
                            #{typeof tag === 'string' ? tag.trim() : tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex justify-end">
                    <div className="w-8 h-8 rounded-md bg-[#071A2D] group-hover:bg-[#FF6B16] text-white flex items-center justify-center transition-colors border border-slate-700">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ================= WHY TECHSTRIVERS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#FF6B16] uppercase">WHY TECHSTRIVERS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#102A43] mt-1 uppercase">
                MORE THAN JUST A <span className="text-[#FF6B16]">PROJECT CENTRE</span>
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                We focus on practical learning, real skills and future-ready technology.
              </p>
            </div>
            <div>
              <button
                onClick={() => setActivePage('about')}
                className="text-[#1769C2] font-bold text-sm hover:text-[#FF6B16] flex items-center gap-1 border-none bg-transparent cursor-pointer transition-colors"
              >
                Know More <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {whyChooseUsData.map((item, idx) => {
              const IconComp = {
                Wrench, Award, Layers, Briefcase, ShieldCheck, Zap
              }[item.icon] || Wrench;

              return (
                <div key={idx} className="p-5 rounded-md bg-[#F5F7FA] border border-[#EAF3FA] hover:border-[#1769C2] transition-all space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-md bg-[#EAF3FA] text-[#1769C2] flex items-center justify-center">
                    <IconComp className="w-6 h-6 text-[#1769C2]" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#102A43]">{item.title}</h4>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ================= STUDENT TESTIMONIALS ================= */}
      <section className="py-20 bg-[#F5F7FA] border-t border-[#EAF3FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-bold tracking-widest text-[#FF6B16] uppercase">STUDENT TESTIMONIALS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#102A43] uppercase">
                WHAT OUR <span className="text-[#FF6B16]">STUDENTS SAY</span>
              </h2>
              <p className="text-slate-600 text-sm">
                Hear from our students who turned their ideas into working prototypes with TechStrivers.
              </p>
              
              <div className="flex items-center gap-3 pt-4">
                <button 
                  onClick={prevTestimonial}
                  className="p-2.5 rounded-md bg-white border border-[#CBD5E1] text-[#102A43] hover:bg-[#FF6B16] hover:text-white hover:border-[#FF6B16] transition-colors border-none cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="p-2.5 rounded-md bg-white border border-[#CBD5E1] text-[#102A43] hover:bg-[#FF6B16] hover:text-white hover:border-[#FF6B16] transition-colors border-none cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleTestimonials.map((item, idx) => (
                <div key={idx} className="card-engineering p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[#FF6B16] text-3xl font-serif leading-none">“</span>
                    <p className="text-[#102A43] text-sm leading-relaxed italic">
                      {item.quote}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EAF3FA] flex items-center justify-between">
                    <div>
                      <div className="font-heading font-bold text-sm text-[#102A43]">{item.name}</div>
                      <div className="text-[11px] text-slate-500">{item.branch}, {item.college}</div>
                    </div>
                    <div className="flex text-[#F5A623]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#F5A623]" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* ================= PUBLIC WEBPAGE GALLERY SHOWCASE SECTION ================= */}
      <section className="py-16 bg-[#071A2D] text-white bg-tech-grid border-t border-[#0E2A47]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#0E2A47] border border-[#1769C2]/40 text-xs font-bold tracking-widest text-[#35A99A] uppercase">
                <ImageIcon className="w-3.5 h-3.5 text-[#FF6B16]" /> INNOVATION & HARDWARE GALLERY
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-white uppercase tracking-tight">
                EXPLORE OUR <span className="text-[#FF6B16]">HARDWARE GALLERY</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Browse through working prototypes, lab training sessions, PCB fabrication designs, and student achievements.
              </p>
            </div>

            <button
              onClick={() => setActivePage('gallery')}
              className="btn-tech-orange text-xs py-2.5 px-4 gap-2 shrink-0 self-start md:self-auto"
            >
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#0E2A47]">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'Projects', label: 'Projects' },
              { id: 'Internships', label: 'Internship' },
              { id: 'Courses', label: 'Courses' },
              { id: 'Workshops', label: 'Workshops' }
            ].map((tab) => {
              const isActive = galleryTab === tab.id;
              const count = tab.id === 'all'
                ? gallery.length
                : gallery.filter(i => i.category?.toLowerCase() === tab.id.toLowerCase() || i.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setGalleryTab(tab.id)}
                  className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors border-none cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#FF6B16] text-white shadow-md font-extrabold'
                      : 'bg-[#0E2A47] text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.5 text-[10px] rounded ${isActive ? 'bg-white text-[#FF6B16]' : 'bg-slate-900 text-slate-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Gallery Items Cards */}
          {gallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {(galleryTab === 'all' 
                ? gallery 
                : gallery.filter(i => i.category?.toLowerCase() === galleryTab.toLowerCase() || i.category === galleryTab)
              ).slice(0, 8).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActivePage('gallery')}
                  className="group bg-[#0E2A47] rounded-lg border border-[#1769C2]/30 overflow-hidden flex flex-col justify-between hover:border-[#FF6B16] transition-all cursor-pointer shadow-md"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/hero_lab.jpg';
                      }}
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#FF6B16] text-white font-extrabold text-[9px] rounded uppercase shadow-sm">
                      {item.category}
                    </span>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="p-3.5 space-y-1">
                    <h3 className="font-bold text-xs text-white line-clamp-2 group-hover:text-[#FF6B16] transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Category: {item.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-[#0E2A47] rounded-lg border border-slate-700 text-slate-400 text-xs">
              No gallery images uploaded yet.
            </div>
          )}

        </div>
      </section>


      {/* ================= TRUSTED BY UNIVERSITIES ================= */}
      <section className="py-14 bg-white border-y border-[#EAF3FA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <p className="text-xs font-bold tracking-widest text-[#102A43] uppercase">
            TRUSTED BY STUDENTS FROM TOP UNIVERSITIES
          </p>

          {/* Marquee Ticker Container */}
          <div className="marquee-container relative w-full overflow-hidden py-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 sm:before:w-24 before:bg-gradient-to-r before:from-white before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 sm:after:w-24 after:bg-gradient-to-l after:from-white after:to-transparent after:z-10">
            <div className="animate-marquee flex items-center">
              {[...partnerUniversities, ...partnerUniversities].map((uni, idx) => (
                <div 
                  key={idx} 
                  title={uni.name}
                  className="w-48 sm:w-56 h-36 sm:h-40 p-3.5 shrink-0 flex flex-col items-center justify-between rounded-xl border border-[#EAF3FA] bg-white hover:shadow-xl hover:border-[#FF6B16]/50 transition-all duration-300 transform hover:-translate-y-1 mx-2.5 cursor-pointer group relative overflow-hidden"
                >
                  <div className="w-full h-20 sm:h-22 flex items-center justify-center overflow-hidden">
                    <img
                      src={uni.logo}
                      alt={`${uni.name} Logo`}
                      loading="lazy"
                      className="w-full h-full max-h-20 object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="w-full text-[11px] sm:text-xs font-bold font-heading text-[#102A43] group-hover:text-[#FF6B16] tracking-tight text-center line-clamp-2 mt-1.5 transition-colors">
                    {uni.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ================= BOTTOM CTA BANNER (DEEP NAVY #071A2D) ================= */}
      <section className="py-16 bg-[#071A2D] text-white bg-tech-grid relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white uppercase">
              READY TO BUILD <span className="text-[#FF6B16]">YOUR FUTURE?</span>
            </h2>
            <p className="text-slate-300 text-sm">
              Join thousands of learners who are building innovative projects and real-world skills with TechStrivers.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={openEnquireModal}
              className="btn-tech-orange text-base py-3.5 px-8"
            >
              Get Started Today <ArrowRight className="w-5 h-5 ml-1" />
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="btn-tech-dark text-base py-3.5 px-6"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
