import React from 'react';
import { X, Cpu, Code2, CheckCircle, ArrowRight } from 'lucide-react';

export default function ProjectDetailModal({ project, onClose, openEnquireModal }) {
  if (!project) return null;

  return (
    <div className="modal-overlay animate-fadeIn" onClick={onClose}>
      <div 
        className="modal-content max-w-3xl overflow-hidden p-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-900/80 text-white hover:bg-amber-600 p-2 rounded-full transition-colors border-none cursor-pointer backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="inline-block px-3 py-1 bg-amber-500/90 backdrop-blur-md text-white font-bold text-xs rounded-full uppercase tracking-wider">
              {project.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading">{project.title}</h3>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Overview</h4>
            <p className="text-slate-700 text-sm leading-relaxed">{project.fullDesc || project.shortDesc}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-md border border-slate-200">
                #{tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            
            {/* Hardware */}
            {project.hardware && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-3">
                  <Cpu className="w-4 h-4 text-amber-600" /> Hardware Components
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {project.hardware.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Software */}
            {project.software && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-3">
                  <Code2 className="w-4 h-4 text-blue-600" /> Software & Stack
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {project.software.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Action CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div>
              <p className="text-xs text-slate-500">Need complete project source code, schematics, and mentorship?</p>
            </div>
            <button
              onClick={() => {
                onClose();
                openEnquireModal();
              }}
              className="btn-primary text-sm py-2.5 px-6 shrink-0 w-full sm:w-auto"
            >
              Get Project Kit & Code <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
