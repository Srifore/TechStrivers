import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-[#F5F7FA]">
      <SEO
        title="Page Not Found | TechStrivers"
        description="The page you're looking for doesn't exist or may have moved."
        noindex
      />
      <Compass className="w-14 h-14 text-slate-300 mb-4" />
      <h1 className="text-3xl font-bold text-[#102A43] mb-2">Page Not Found</h1>
      <p className="text-slate-600 text-sm mb-6 max-w-md">
        The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
      </p>
      <Link to="/" className="btn-tech-orange text-sm py-2.5 px-6">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}
