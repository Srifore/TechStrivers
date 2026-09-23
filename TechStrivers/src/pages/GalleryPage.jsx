import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Image as ImageIcon, Sparkles, X, ArrowRight, Eye } from 'lucide-react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

export default function GalleryPage({ openEnquireModal }) {
  const { gallery } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  // A direct /gallery/:id link (shared, bookmarked, or crawled) opens the
  // matching image - giving each gallery item a real, unique, indexable URL
  // instead of being trapped behind a click-only lightbox.
  useEffect(() => {
    if (!id) return;
    const match = gallery.find((item) => item.id === id);
    if (match) {
      setSelectedImage(match);
    }
  }, [id, gallery]);

  const openImage = (item) => {
    navigate(`/gallery/${item.id}`);
  };

  const closeImage = () => {
    setSelectedImage(null);
    if (id) {
      navigate('/gallery');
    }
  };

  const categories = [
    { id: 'all', label: 'All Showcase' },
    { id: 'Projects', label: 'Projects' },
    { id: 'Internships', label: 'Internships' },
    { id: 'Courses', label: 'Courses' },
    { id: 'Workshops', label: 'Workshops' }
  ];

  const filteredGallery = activeTab === 'all'
    ? gallery
    : gallery.filter(item => item.category?.toLowerCase() === activeTab.toLowerCase() || item.category === activeTab);

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "TechStrivers Innovation Gallery",
    "description": "Photos of hands-on engineering projects, workshops, internships, and courses at TechStrivers Bengaluru.",
    "image": gallery.slice(0, 12).map((item) => `https://techstrivers.com${item.image}`)
  };

  const getCategoryBadgeStyle = (cat) => {
    switch (cat) {
      case 'Projects': return 'bg-[#FF6B16] text-white';
      case 'Internships': return 'bg-purple-600 text-white';
      case 'Courses': return 'bg-[#1769C2] text-white';
      case 'Workshops': return 'bg-[#35A99A] text-slate-950';
      default: return 'bg-slate-700 text-white';
    }
  };

  const activeImageSchema = selectedImage ? {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "name": selectedImage.title,
    "description": selectedImage.description,
    "contentUrl": `https://techstrivers.com${selectedImage.image}`,
    "uploadDate": selectedImage.date
  } : null;

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {selectedImage ? (
        <SEO
          title={`${selectedImage.title} | TechStrivers Gallery`}
          description={selectedImage.description || `${selectedImage.category} photo from TechStrivers Bengaluru.`}
          canonical={`https://techstrivers.com/gallery/${selectedImage.id}`}
          ogImage={`https://techstrivers.com${selectedImage.image}`}
          schema={activeImageSchema}
        />
      ) : (
        <SEO
          title="Innovation Gallery | TechStrivers Bengaluru"
          description="View photos of TechStrivers' hands-on engineering lab, student prototypes, robotics workshops, and PCB hardware development in Bengaluru."
          canonical="https://techstrivers.com/gallery"
          schema={gallerySchema}
        />
      )}
      
      {/* Hero Header Section */}
      <section className="relative pt-16 pb-20 bg-[#071A2D] text-white bg-tech-grid border-b border-[#0E2A47]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#0E2A47] border border-[#1769C2]/40 text-xs font-bold tracking-widest text-[#35A99A] uppercase mx-auto">
            <Sparkles className="w-4 h-4 text-[#FF6B16]" />
            TECHSTRIVERS INNOVATION GALLERY
          </div>

          <h1 className="text-4xl sm:text-5xl font-black font-heading tracking-tight uppercase">
            OUR HARDWARE & LAB <span className="text-[#FF6B16]">GALLERY</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Explore physical prototypes, hands-on hardware builds, active lab workshops, student internship sessions, and technical accomplishments.
          </p>

        </div>
      </section>

      {/* Main Gallery Content Section */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Tabs Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((tab) => {
            const count = tab.id === 'all' 
              ? gallery.length 
              : gallery.filter(item => item.category?.toLowerCase() === tab.id.toLowerCase() || item.category === tab.id).length;

            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-md text-xs font-extrabold uppercase tracking-wider transition-all duration-200 border cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#071A2D] text-[#FF6B16] border-[#FF6B16] shadow-md scale-105'
                    : 'bg-white text-[#102A43] border-[#EAF3FA] hover:border-[#1769C2] hover:text-[#1769C2]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 text-[10px] rounded-full ${
                  isActive ? 'bg-[#FF6B16] text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Image Grid */}
        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => openImage(item)}
                className="group relative bg-white rounded-lg border border-[#EAF3FA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                {/* Image Wrap */}
                <div className="relative h-60 overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/hero_lab.jpg';
                    }}
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A2D]/90 via-[#071A2D]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Badge */}
                  <span className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-extrabold uppercase rounded shadow-md tracking-wider ${getCategoryBadgeStyle(item.category)}`}>
                    {item.category}
                  </span>

                  {/* Hover Eye Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="p-3 bg-[#FF6B16] text-white rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Eye className="w-5 h-5" />
                    </span>
                  </div>

                  {/* Bottom Title on Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                    <h2 className="font-bold text-sm leading-tight text-white group-hover:text-[#FF6B16] transition-colors line-clamp-2">
                      {item.title}
                    </h2>
                    {item.description && (
                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">
                        {item.description}
                      </p>
                    )}
                    <div className="text-[10px] text-slate-300 font-mono">
                      {item.date ? `Uploaded: ${item.date}` : 'Hardware Showcase'}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300 space-y-3">
            <ImageIcon className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-[#102A43] uppercase">No Images Found</h3>
            <p className="text-xs text-slate-500">There are no showcase photos in the category "{activeTab}".</p>
          </div>
        )}

      </section>

      {/* Lightbox / Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#071A2D] border border-[#1769C2]/50 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden relative text-white">
            
            {/* Modal Top Header */}
            <div className="px-6 py-4 bg-[#0E2A47] border-b border-slate-700 flex items-center justify-between">
              <span className={`px-3 py-1 text-[10px] font-extrabold uppercase rounded ${getCategoryBadgeStyle(selectedImage.category)}`}>
                {selectedImage.category}
              </span>

              <button
                onClick={closeImage}
                className="p-1.5 text-slate-400 hover:text-white rounded-md bg-transparent border-none cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Image Box */}
            <div className="relative max-h-[60vh] overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full max-h-[60vh] object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/hero_lab.jpg';
                }}
              />
            </div>

            {/* Modal Description & CTA */}
            <div className="p-6 space-y-4 bg-[#071A2D]">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold font-heading text-white">
                    {selectedImage.title}
                  </h2>
                  <p className="text-xs text-[#35A99A] font-semibold">
                    Category: {selectedImage.category} {selectedImage.date ? `• Uploaded: ${selectedImage.date}` : ''}
                  </p>
                  {selectedImage.description && (
                    <p className="text-sm text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
                      {selectedImage.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => {
                    closeImage();
                    openEnquireModal();
                  }}
                  className="btn-tech-orange text-xs py-2.5 px-4 gap-2 shrink-0"
                >
                  Enquire Hardware <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
