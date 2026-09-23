import React from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Eye, Heart, Target } from 'lucide-react';
import { statsData, journeyTimeline, missionVisionValues } from '../data/websiteData';
import SEO from '../components/SEO';

export default function AboutPage({ setActivePage, openEnquireModal }) {
  const aboutBreadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://techstrivers.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://techstrivers.com/about"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <SEO 
        title="About TechStrivers | Engineering Innovation Lab"
        description="Learn about TechStrivers' mission, vision, and team in Bengaluru. We bridge the gap between academic theory and practical engineering through hands-on projects."
        canonical="https://techstrivers.com/about"
        schema={aboutBreadcrumbSchema}
      />
      
      {/* ================= HERO (DEEP NAVY #071A2D) ================= */}
      <section className="relative pt-12 pb-20 bg-[#071A2D] text-white bg-tech-grid border-b border-[#0E2A47]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6">
            <button onClick={() => setActivePage('home')} className="hover:text-[#FF6B16] border-none bg-transparent cursor-pointer text-slate-400">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-[#1769C2]" />
            <span className="text-[#FF6B16]">About Us</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#35A99A] uppercase">ABOUT TECHSTRIVERS</span>
              
              <h1 className="text-4xl sm:text-5xl font-black font-heading text-white uppercase leading-tight">
                BUILDING A <br />
                <span className="text-[#FF6B16]">BRIGHTER TOMORROW </span>
                <span className="text-[#1769C2]">THROUGH TECHNOLOGY</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                At TechStrivers, we believe in the power of practical learning. We help students, engineers and innovators transform ideas into real-world solutions through hands-on projects, training and mentorship.
              </p>

              <div className="pt-2">
                <button
                  onClick={openEnquireModal}
                  className="btn-tech-orange text-sm"
                >
                  Join Our Platform <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="hero-photo-wrapper">
                <img 
                  src="/images/team_collaboration.jpg" 
                  alt="TechStrivers Engineering Team" 
                  className="w-full h-[380px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2D]/90 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 bg-[#071A2D]/95 border border-[#1769C2]/50 p-4 rounded-md text-white">
                  <div className="text-xs font-bold text-[#FF6B16] uppercase tracking-wider">Ideas · Skills · Innovation</div>
                  <div className="text-sm font-extrabold text-white mt-0.5">A Better Tomorrow Through Hardware & Software</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ================= WHO WE ARE ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#FF6B16] uppercase">WHO WE ARE</span>
              <h2 className="text-3xl font-extrabold font-heading text-[#102A43] uppercase">
                More Than Just a <span className="text-[#FF6B16]">Project Centre</span>
              </h2>
              
              <p className="text-slate-600 text-sm leading-relaxed">
                TechStrivers is a technology-focused learning and innovation platform dedicated to helping students and aspiring engineers build real-world skills through practical education, projects, internships and workshops.
              </p>

              <p className="text-slate-600 text-sm leading-relaxed">
                We specialise in IoT, Embedded Systems, Robotics, AI, Electronics, PCB Design and Automation, offering end-to-end support from learning to prototyping and deployment.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setActivePage('projects')}
                  className="btn-tech-orange text-sm"
                >
                  Our Projects <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              
              <div className="bg-[#F5F7FA] p-6 sm:p-8 rounded-md border border-[#EAF3FA] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="hex-container" style={{ width: '38px', height: '42px' }}>
                    <div className="hex-inner" style={{ width: '32px', height: '36px', fontSize: '0.9rem' }}>TS</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1769C2] uppercase tracking-widest">OUR PURPOSE</span>
                    <h3 className="text-xl font-bold font-heading text-[#102A43]">Empowering Future Innovators</h3>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We aim to bridge the gap between academic knowledge and real-world application by providing industry-relevant training, project development and innovation opportunities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="card-engineering p-6 space-y-3">
                  <div className="w-10 h-10 rounded-md bg-[#EAF3FA] text-[#FF6B16] flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#FF6B16]" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-[#102A43]">Our Mission</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To make advanced technology accessible through practical learning, mentorship and innovation.
                  </p>
                </div>

                <div className="card-engineering p-6 space-y-3">
                  <div className="w-10 h-10 rounded-md bg-[#EAF3FA] text-[#1769C2] flex items-center justify-center">
                    <Eye className="w-5 h-5 text-[#1769C2]" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-[#102A43]">Our Vision</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To build a generation of engineers who don't just understand technology — they create it.
                  </p>
                </div>

                <div className="card-engineering p-6 space-y-3">
                  <div className="w-10 h-10 rounded-md bg-[#EAF3FA] text-[#35A99A] flex items-center justify-center">
                    <Heart className="w-5 h-5 text-[#35A99A]" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-[#102A43]">Our Values</h4>
                  <ul className="space-y-1.5 text-sm text-[#102A43]">
                    {missionVisionValues.values.map((v, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#35A99A] shrink-0" />
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= STATS BAR ================= */}
      <section className="bg-[#071A2D] text-white py-10 border-y border-[#0E2A47]">
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


      {/* ================= OUR JOURNEY TIMELINE ================= */}
      <section className="py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="hero-photo-wrapper">
                <img
                  src="/images/journey_office.jpg"
                  alt="TechStrivers Innovation Laboratory"
                  loading="lazy"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#FF6B16] uppercase">OUR JOURNEY</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#102A43] mt-1 uppercase">
                  A Journey of Innovation <br />
                  <span className="text-[#1769C2]">and Impact</span>
                </h2>
                <p className="text-slate-600 text-sm mt-2">
                  From a small idea to a growing community of learners and innovators, TechStrivers has continuously evolved.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                {journeyTimeline.map((item, idx) => (
                  <div key={idx} className="card-engineering p-6 space-y-2">
                    <div className="inline-block px-3 py-1 bg-[#EAF3FA] text-[#1769C2] font-extrabold text-xs rounded-md">
                      {item.year}
                    </div>
                    <h4 className="font-heading font-bold text-base text-[#102A43]">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
