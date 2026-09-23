import React from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

const topicKeywords = {
  iot: ['iot', 'embed'],
  robotics: ['robot', 'ros'],
  ai: ['ai', 'vision'],
  pcb: ['pcb', 'altium']
};

export default function CoursesPage({ openEnquireModal }) {
  const { courses } = useData();
  const location = useLocation();
  const topicParam = new URLSearchParams(location.search).get('topic');
  const activeKeywords = topicParam && topicKeywords[topicParam];
  const filteredCourses = activeKeywords
    ? courses.filter((c) =>
        activeKeywords.some((kw) => c.title.toLowerCase().includes(kw) || c.id.toLowerCase().includes(kw))
      )
    : courses;

  const coursesSchema = {
    "@context": "https://schema.org",
    "@graph": (courses || []).map((c) => ({
      "@type": "Course",
      "name": c.title,
      "description": c.description,
      "provider": {
        "@type": "Organization",
        "name": "TechStrivers",
        "sameAs": "https://techstrivers.com"
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <SEO 
        title="IoT, Robotics & AI Courses | TechStrivers"
        description="Master IoT, Embedded Systems, ROS 2 Robotics, Edge AI, and PCB Design with TechStrivers' hands-on training courses and physical hardware kits."
        canonical="https://techstrivers.com/courses"
        schema={coursesSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">HANDS-ON TRAINING</span>
          <h1 className="text-4xl font-extrabold font-heading text-slate-900">
            TECHNICAL COURSES & <span className="text-amber-600">MASTERCLASSES</span>
          </h1>
          <p className="text-slate-600 text-sm">
            Practical hardware and software training programs designed by expert engineers to turn theoretical concepts into working prototypes.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCourses.map((course) => (
            <div 
              key={course.id}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                    {course.level}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold font-heading text-slate-900">
                  {course.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {course.description}
                </p>

                {/* Topics Covered */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Curriculum Highlights</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {(course.topics || []).map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500 font-medium">Includes Physical Hardware Kit</div>
                <button
                  onClick={openEnquireModal}
                  className="btn-primary text-xs py-2.5 px-5"
                >
                  Enroll Now <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
