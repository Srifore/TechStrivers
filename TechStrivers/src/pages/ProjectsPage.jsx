import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Search, ArrowRight, Layers } from 'lucide-react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

export default function ProjectsPage({ setSelectedProject, openEnquireModal }) {
  const { projects } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync category filter from URL query param if present e.g. /projects?category=IoT
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
      setFilterCategory(cat);
    }
  }, [location.search]);

  // A direct /projects/:id link (shared, bookmarked, or crawled) opens the
  // matching project - giving each project a real, unique, indexable URL
  // instead of being trapped behind a click-only modal.
  useEffect(() => {
    if (!id) return;
    const match = (projects || []).find((p) => p.id === id);
    if (match) {
      setSelectedProject(match);
    }
  }, [id, projects, setSelectedProject]);

  const openProject = (proj) => {
    navigate(`/projects/${proj.id}`);
  };

  const activeProject = id ? (projects || []).find((p) => p.id === id) : null;

  const projectDetailSchema = activeProject ? {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": activeProject.title,
    "description": activeProject.fullDesc || activeProject.shortDesc,
    "image": activeProject.image ? `https://techstrivers.com${activeProject.image}` : undefined,
    "keywords": (Array.isArray(activeProject.tags) ? activeProject.tags : []).join(', '),
    "creator": {
      "@type": "Organization",
      "name": "TechStrivers",
      "sameAs": "https://techstrivers.com"
    }
  } : null;

  const categories = ['All', 'IoT', 'AI/ML', 'Sensors', 'Robotics'];

  const filteredProjects = (projects || []).filter((project) => {
    if (!project) return false;

    // Flexible category matching
    const projCat = (project.category || '').toLowerCase();
    const targetCat = filterCategory.toLowerCase();

    let matchesCategory = filterCategory === 'All';
    if (!matchesCategory) {
      if (projCat === targetCat || projCat.includes(targetCat) || targetCat.includes(projCat)) {
        matchesCategory = true;
      } else if (targetCat === 'iot' && (projCat.includes('iot') || projCat.includes('embed'))) {
        matchesCategory = true;
      } else if (targetCat === 'ai/ml' && (projCat.includes('ai') || projCat.includes('ml') || projCat.includes('vision'))) {
        matchesCategory = true;
      } else if (targetCat === 'sensors' && (projCat.includes('sensor') || projCat.includes('circuit'))) {
        matchesCategory = true;
      } else if (targetCat === 'robotics' && (projCat.includes('robot') || projCat.includes('auto'))) {
        matchesCategory = true;
      }
    }

    // Safe tags handling
    const tagList = Array.isArray(project.tags) 
      ? project.tags 
      : (typeof project.tags === 'string' ? project.tags.split(',') : []);

    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = !searchLower || 
      (project.title && project.title.toLowerCase().includes(searchLower)) ||
      (project.shortDesc && project.shortDesc.toLowerCase().includes(searchLower)) ||
      tagList.some(t => typeof t === 'string' && t.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  const projectsItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Engineering Projects Catalog",
    "itemListElement": (projects || []).map((proj, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": proj.title,
      "description": proj.shortDesc || proj.fullDesc
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      {activeProject ? (
        <SEO
          title={`${activeProject.title} | TechStrivers Projects`}
          description={activeProject.shortDesc}
          canonical={`https://techstrivers.com/projects/${activeProject.id}`}
          ogImage={activeProject.image ? `https://techstrivers.com${activeProject.image}` : undefined}
          schema={projectDetailSchema}
        />
      ) : (
        <SEO
          title="Engineering Projects | IoT, AI & Robotics | TechStrivers"
          description="Explore TechStrivers' catalog of mini, major, and final year engineering projects in IoT, AI, Robotics, Computer Vision, and PCB Design."
          canonical="https://techstrivers.com/projects"
          schema={projectsItemListSchema}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">PROJECT PORTFOLIO</span>
          <h1 className="text-4xl font-extrabold font-heading text-slate-900">
            ENGINEERING & INNOVATION <span className="text-amber-600">PROJECTS</span>
          </h1>
          <p className="text-slate-600 text-sm">
            Explore our repository of hardware prototypes, IoT systems, AI vision applications, and robotics projects developed with complete technical documentation.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-none cursor-pointer whitespace-nowrap ${
                  filterCategory === cat
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by topic or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
            <Layers className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800">No Projects Found</h3>
            <p className="text-slate-500 text-xs">Try selecting another category or clear your search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <div 
                key={proj.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                onClick={() => openProject(proj)}
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
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
                    <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white text-[11px] font-bold rounded-full uppercase tracking-wider">
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-heading font-bold text-xl text-slate-900 group-hover:text-amber-600 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {proj.shortDesc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {(Array.isArray(proj.tags) ? proj.tags : (typeof proj.tags === 'string' ? proj.tags.split(',') : [])).map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md border border-slate-200">
                          #{typeof tag === 'string' ? tag.trim() : tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100">
                  <span className="text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    View Specs & Schematics <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Custom Project CTA Banner */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold font-heading">Have a Custom Project Idea in Mind?</h3>
            <p className="text-amber-100 text-xs sm:text-sm">We provide tailored hardware design, PCB fabrication, and programming support.</p>
          </div>
          <button
            onClick={openEnquireModal}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs rounded-full transition-colors shrink-0 border-none cursor-pointer"
          >
            Submit Custom Idea →
          </button>
        </div>

      </div>
    </div>
  );
}
