import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

export default function BlogPage() {
  const { blogs } = useData();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const publishedBlogs = blogs.filter(b => b.status === 'Published' || !b.status);

  const categories = ['All', ...new Set(publishedBlogs.map(b => b.category))];

  const filteredBlogs = publishedBlogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "TechStrivers Engineering Blog",
    "url": "https://techstrivers.com/blog",
    "blogPost": publishedBlogs.map((b) => ({
      "@type": "BlogPosting",
      "headline": b.title,
      "url": `https://techstrivers.com/blog/${b.slug || b.id}`,
      "datePublished": b.publishDate,
      "author": {
        "@type": "Person",
        "name": b.author || "TechStrivers Team"
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-12">
      <SEO 
        title="Engineering Blog & Tutorials | TechStrivers"
        description="Read the latest articles, tutorials, and guides on Edge AI, IoT microcontrollers, Altium PCB design, and ROS 2 Robotics by TechStrivers."
        canonical="https://techstrivers.com/blog"
        schema={blogListSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold tracking-widest text-[#FF6B16] uppercase bg-[#EAF3FA] px-3.5 py-1 rounded-full border border-[#1769C2]/20">
            ENGINEERING INSIGHTS & HARDWARE TUTORIALS
          </span>
          <h1 className="text-4xl font-extrabold font-heading text-[#102A43]">
            TECHSTRIVERS <span className="text-[#FF6B16]">BLOG & ARTICLES</span>
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Read technical tutorials, embedded systems guides, hardware schematics breakdowns, and R&D updates published by our engineering team.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-none cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#FF6B16] text-white shadow-md'
                    : 'bg-slate-100 text-[#102A43] hover:bg-[#EAF3FA] hover:text-[#1769C2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F7FA] border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#102A43] focus:outline-none focus:border-[#FF6B16]"
            />
          </div>

        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div 
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => navigate(`/blog/${blog.slug || blog.id}`)}
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={blog.coverImage || '/images/hero_lab.jpg'}
                    alt={blog.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/hero_lab.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3.5 py-1 bg-[#FF6B16] text-white text-[11px] font-extrabold rounded-md uppercase tracking-wider shadow-sm">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#FF6B16]" /> {blog.publishDate}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#1769C2]" /> {blog.readTime || '6 min read'}</span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-[#102A43] group-hover:text-[#FF6B16] transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs font-extrabold text-[#FF6B16] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Full Article →
                </span>
                <span className="text-[11px] font-bold text-[#1769C2] bg-[#EAF3FA] px-2.5 py-1 rounded">
                  {blog.author}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
