import React from 'react';
import { Briefcase, CheckCircle2, Clock, Users, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

export default function InternshipsPage({ openEnquireModal }) {
  const { internships, workshops } = useData();

  const internshipsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      ...internships.map((tier) => ({
        "@type": "EducationalOccupationalProgram",
        "name": tier.title,
        "occupationalCategory": "Engineering Internship",
        "timeToComplete": tier.duration,
        "provider": {
          "@type": "Organization",
          "name": "TechStrivers",
          "sameAs": "https://techstrivers.com"
        }
      })),
      ...workshops.map((ws) => ({
        "@type": "Event",
        "name": ws.title,
        "startDate": ws.date,
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": ws.venue
        },
        "organizer": {
          "@type": "Organization",
          "name": "TechStrivers",
          "sameAs": "https://techstrivers.com"
        }
      }))
    ]
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-12">
      <SEO 
        title="Engineering Internships & Workshops | TechStrivers"
        description="Apply for hands-on engineering internships and technology workshops in IoT, Embedded Hardware, Robotics, AI, and PCB Prototyping at TechStrivers."
        canonical="https://techstrivers.com/internships"
        schema={internshipsSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-[#FF6B16] uppercase">CAREER & EXPERIENTIAL LEARNING</span>
          <h1 className="text-4xl font-extrabold font-heading text-[#102A43] uppercase">
            HANDS-ON <span className="text-[#FF6B16]">INTERNSHIPS</span> & WORKSHOPS
          </h1>
          <p className="text-slate-600 text-sm">
            Bridge the gap between college theory and industry expectations. Work with physical microcontrollers, sensors, and live engineering projects under experienced mentors.
          </p>
        </div>

        {/* Section 1: Internship Tiers */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-[#EAF3FA] text-[#1769C2]">
              <Briefcase className="w-5 h-5 text-[#1769C2]" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-[#102A43] uppercase">
              Internship Programs & Fellowships
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {internships.map((tier) => (
              <div 
                key={tier.id}
                className="card-engineering p-8 relative flex flex-col justify-between space-y-6"
              >
                {tier.popular && (
                  <span className="absolute -top-3 right-6 px-4 py-1 bg-[#FF6B16] text-white text-[10px] font-extrabold rounded-md uppercase tracking-wider shadow-sm">
                    Most Popular
                  </span>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#1769C2]">
                    <Clock className="w-4 h-4 text-[#FF6B16]" /> {tier.duration}
                  </div>
                  <h3 className="text-2xl font-extrabold font-heading text-[#102A43]">{tier.title}</h3>
                  
                  <ul className="space-y-3 pt-2">
                    {(tier.highlights || []).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#35A99A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#EAF3FA]">
                  <button
                    onClick={openEnquireModal}
                    className="w-full btn-tech-orange justify-center text-xs py-3"
                  >
                    Apply For Internship <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Upcoming Workshops */}
        {workshops.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-[#EAF3FA]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-[#EAF3FA] text-[#FF6B16]">
                  <Calendar className="w-5 h-5 text-[#FF6B16]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-heading text-[#102A43] uppercase">
                    Upcoming Hands-on Workshops
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5">Register for interactive technical bootcamps and live lab sessions.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workshops.map((ws) => (
                <div key={ws.id} className="card-engineering p-6 flex flex-col justify-between space-y-4 border-l-4 border-l-[#1769C2]">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-[#EAF3FA] text-[#1769C2] font-bold text-xs rounded-md">
                        {ws.domain}
                      </span>
                      <span className="text-xs font-bold text-[#FF6B16]">{ws.fee}</span>
                    </div>

                    <h3 className="text-xl font-bold font-heading text-[#102A43]">{ws.title}</h3>

                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#35A99A]" />
                        <span>Date: <strong className="text-[#102A43]">{ws.date}</strong> ({ws.time})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#FF6B16]" />
                        <span>Venue: {ws.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#1769C2]" />
                        <span>Instructor: {ws.instructor} · <strong className="text-[#FF6B16]">{ws.seatsLeft} Seats Available</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#EAF3FA] flex items-center justify-between">
                    <span className="text-xs text-[#35A99A] font-bold">Includes Prototyping Hardware Access</span>
                    <button
                      onClick={openEnquireModal}
                      className="btn-tech-orange text-xs py-2 px-4"
                    >
                      Register Now <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
