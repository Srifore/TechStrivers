import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Check, BookOpen, Tag, MessageSquare } from 'lucide-react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

export default function BlogDetailPage({ openEnquireModal }) {
  const { idOrSlug } = useParams();
  const navigate = useNavigate();
  const { blogs } = useData();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [idOrSlug]);

  const blog = blogs.find(b => b.slug === idOrSlug || b.id === idOrSlug);

  if (!blog) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <SEO
          title="Article Not Found | TechStrivers"
          description="The requested blog article could not be located."
          noindex
        />
        <h2 className="text-2xl font-bold text-[#102A43] mb-2">Article Not Found</h2>
        <p className="text-slate-600 text-sm mb-6">The requested blog article could not be located.</p>
        <Link to="/blog" className="btn-tech-orange text-xs py-2.5 px-6">
          ← Back to All Articles
        </Link>
      </div>
    );
  }

  const relatedBlogs = blogs.filter(b => b.id !== blog.id).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const articleUrl = `https://techstrivers.com/blog/${blog.slug || blog.id}`;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blog.coverImage ? `https://techstrivers.com${blog.coverImage}` : "https://techstrivers.com/images/hero_lab.jpg",
    "datePublished": blog.publishDate,
    "dateModified": blog.updatedDate || blog.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "author": {
      "@type": "Person",
      "name": blog.author || "TechStrivers Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TechStrivers",
      "logo": {
        "@type": "ImageObject",
        "url": "https://techstrivers.com/favicon.svg"
      }
    }
  };

  // Helper to render Markdown-style text blocks (Headings, Code, Lists, Paragraphs)
  const renderFormattedContent = (content) => {
    if (!content) return null;

    const blocks = content.split('\n\n');

    return blocks.map((block, idx) => {
      const trimmed = block.trim();

      // Heading 3: ### Heading
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-bold font-heading text-[#102A43] mt-8 mb-4 border-b border-[#EAF3FA] pb-2 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#FF6B16] rounded-full inline-block shrink-0" />
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // Heading 2: ## Heading
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl sm:text-3xl font-bold font-heading text-[#102A43] mt-10 mb-4 border-b-2 border-[#1769C2]/20 pb-2">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      // Code Block ```python or ```
      if (trimmed.startsWith('```')) {
        const lines = trimmed.split('\n');
        const lang = lines[0].replace('```', '').trim() || 'code';
        const codeText = lines.slice(1, lines.length - 1).join('\n');

        return (
          <div key={idx} className="my-6 rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-[#071A2D]">
            <div className="bg-[#0E2A47] px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300 font-mono">
              <span className="uppercase text-[11px] font-bold text-[#35A99A] tracking-wider">{lang} Snippet</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(codeText);
                  alert('Code snippet copied to clipboard!');
                }}
                className="text-[10px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded border border-slate-700 cursor-pointer"
              >
                Copy Code
              </button>
            </div>
            <pre className="p-4 overflow-x-auto font-mono text-xs text-[#35A99A] leading-relaxed bg-[#071A2D]">
              <code>{codeText || trimmed.replace(/```[a-z]*/g, '')}</code>
            </pre>
          </div>
        );
      }

      // Bullet List (- Item or 1. Item)
      if (trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
        const items = trimmed.split('\n');
        return (
          <ul key={idx} className="space-y-2.5 my-4 pl-2 text-slate-800">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B16] mt-2 shrink-0" />
                <span>{item.replace(/^[-*1-9.]+\s+/, '')}</span>
              </li>
            ))}
          </ul>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className="text-slate-800 text-sm leading-relaxed mb-4 font-normal">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-8 sm:py-12">
      <SEO 
        title={blog.title}
        description={blog.excerpt}
        canonical={articleUrl}
        ogImage={blog.coverImage ? `https://techstrivers.com${blog.coverImage}` : "https://techstrivers.com/images/hero_lab.jpg"}
        ogType="article"
        schema={blogSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Link to="/" className="hover:text-[#FF6B16] text-slate-600 text-decoration-none">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#FF6B16] text-slate-600 text-decoration-none">Blog</Link>
            <span>/</span>
            <span className="text-[#102A43] font-bold truncate max-w-[200px] sm:max-w-xs">{blog.title}</span>
          </div>

          <button
            onClick={() => navigate('/blog')}
            className="btn-tech-outline py-1.5 px-3.5 text-xs gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
          </button>
        </div>

        {/* Article Header & Hero Section */}
        <div className="space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 bg-[#FF6B16] text-white font-extrabold text-xs rounded-md uppercase tracking-wider shadow-xs">
              {blog.category}
            </span>
            <span className="px-3 py-1 bg-[#EAF3FA] text-[#1769C2] font-bold text-xs rounded-md border border-[#1769C2]/30 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {blog.readTime || '6 min read'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading text-[#102A43] leading-tight tracking-tight">
            {blog.title}
          </h1>

          {/* Author Strip & Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-xl border border-[#EAF3FA] shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1769C2] text-white flex items-center justify-center font-bold text-sm shadow-md">
                TS
              </div>
              <div>
                <div className="font-bold text-[#102A43] text-xs sm:text-sm">{blog.author}</div>
                <div className="text-[11px] text-slate-500 flex items-center gap-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#FF6B16]" /> {blog.publishDate}</span>
                  <span>·</span>
                  <span>TechStrivers R&D Division</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="px-3.5 py-2 bg-[#EAF3FA] hover:bg-[#1769C2] text-[#1769C2] hover:text-white rounded-md text-xs font-bold transition-all border border-[#1769C2]/30 cursor-pointer flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>
        </div>

        {/* Featured Cover Banner Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 max-h-[480px]">
          <img 
            src={blog.coverImage || '/images/hero_lab.jpg'} 
            alt={blog.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/hero_lab.jpg';
            }}
            className="w-full h-full object-cover max-h-[480px]" 
          />
        </div>

        {/* Main Article Body & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
          
          {/* Main Article Column */}
          <div className="lg:col-span-8 space-y-8">
            
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#EAF3FA] shadow-sm space-y-6">
              
              {/* Excerpt Highlight Box */}
              {blog.excerpt && (
                <div className="p-5 bg-[#EAF3FA] border-l-4 border-[#1769C2] rounded-r-xl text-[#102A43] font-semibold text-sm leading-relaxed shadow-xs">
                  {blog.excerpt}
                </div>
              )}

              {/* Formatted Article Body */}
              <div className="prose max-w-none text-[#102A43]">
                {renderFormattedContent(blog.content)}
              </div>

              {/* Author Bio Box */}
              <div className="pt-8 border-t border-slate-200">
                <div className="bg-[#071A2D] text-white p-6 rounded-xl border border-[#1769C2]/40 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FF6B16] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md">
                    TS
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold font-heading text-sm uppercase text-white flex items-center gap-2">
                      Written by {blog.author}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Engineering Research & Development team at TechStrivers. Specializing in embedded systems, IoT prototyping, microcontrollers, and edge AI applications.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article Footer Controls */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => navigate('/blog')}
                  className="btn-tech-dark text-xs py-2 px-5 gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> All Articles
                </button>

                <button
                  onClick={openEnquireModal}
                  className="btn-tech-orange text-xs py-2 px-5 gap-1.5"
                >
                  Ask Technical Question <MessageSquare className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* CTA Box */}
            <div className="bg-[#0E2A47] text-white p-6 rounded-2xl border border-[#1769C2]/40 shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-md bg-[#FF6B16] text-white flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold font-heading text-white uppercase tracking-wider">
                Want to Build Projects Like This?
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Join TechStrivers hands-on workshops & hardware courses. Build physical IoT & AI prototypes with complete mentorship.
              </p>
              <button
                onClick={openEnquireModal}
                className="w-full btn-tech-orange justify-center text-xs py-3"
              >
                Enquire for Hardware Training →
              </button>
            </div>

            {/* Related Articles Box */}
            <div className="bg-white p-6 rounded-2xl border border-[#EAF3FA] shadow-sm space-y-4">
              <h4 className="text-sm font-bold font-heading text-[#102A43] uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#FF6B16]" /> Related Articles
              </h4>

              <div className="space-y-4">
                {relatedBlogs.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => navigate(`/blog/${rel.slug || rel.id}`)}
                    className="flex gap-3 group cursor-pointer p-2 rounded-lg hover:bg-[#F5F7FA] transition-colors border-b border-slate-100 last:border-none"
                  >
                    <img
                      src={rel.coverImage || '/images/hero_lab.jpg'}
                      alt={rel.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/hero_lab.jpg';
                      }}
                      className="w-16 h-14 object-cover rounded-md shrink-0 border border-slate-200"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#FF6B16] uppercase">{rel.category}</span>
                      <h5 className="text-xs font-bold text-[#102A43] group-hover:text-[#1769C2] transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
