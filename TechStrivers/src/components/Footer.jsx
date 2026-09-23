import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import TechStriversLogo from './TechStriversLogo';
import { InstagramIcon, WhatsAppIcon, YoutubeIcon } from './SocialIcons';
import { ADMIN_PORTAL_URL } from '../config';

export default function Footer({ openEnquireModal }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#071A2D] text-slate-300 pt-16 pb-8 border-t border-[#0E2A47] bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#0E2A47]">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <TechStriversLogo variant="light" size="md" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              TechStrivers is a technology-focused learning and innovation platform dedicated to helping students and aspiring engineers build real-world skills through practical education, hardware projects, internships and workshops.
            </p>
            <div className="pt-2">
              <button
                onClick={openEnquireModal}
                className="btn-tech-orange text-xs py-2 px-5"
              >
                Get In Touch With Us <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-white text-sm mb-4 tracking-wider uppercase border-b border-[#1769C2]/30 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-[#FF6B16] transition-colors text-slate-300 text-decoration-none">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#FF6B16] transition-colors text-slate-300 text-decoration-none">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-[#FF6B16] transition-colors text-slate-300 text-decoration-none">Projects</Link></li>
              <li><Link to="/courses" className="hover:text-[#FF6B16] transition-colors text-slate-300 text-decoration-none">Courses</Link></li>
            </ul>
          </div>

          {/* Col 3: Programs & Support */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-white text-sm mb-4 tracking-wider uppercase opacity-0 hidden lg:block">Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/internships" className="hover:text-[#FF6B16] transition-colors text-slate-300 text-decoration-none">Internships</Link></li>
              <li><Link to="/blog" className="hover:text-[#FF6B16] transition-colors text-slate-300 text-decoration-none">Blog & News</Link></li>
              <li><Link to="/contact" className="hover:text-[#FF6B16] transition-colors text-slate-300 text-decoration-none">Contact Us</Link></li>
              <li><a href={ADMIN_PORTAL_URL} className="hover:text-[#35A99A] transition-colors text-slate-400 text-decoration-none flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#35A99A]" /> ERP Portal</a></li>
            </ul>
          </div>

          {/* Col 4: Connect With Us */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading font-bold text-white text-sm mb-4 tracking-wider uppercase border-b border-[#1769C2]/30 pb-2 inline-block">
              Connect With Us
            </h4>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF6B16] shrink-0 mt-0.5" />
                <span>Srinagar, Bengaluru, Karnataka - 560050</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#1769C2] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href="tel:+918549990019" className="hover:text-[#FF6B16] transition-colors text-slate-300 decoration-none">
                    +91 85499 90019
                  </a>
                  <a href="tel:+918549990014" className="hover:text-[#FF6B16] transition-colors text-slate-300 decoration-none">
                    +91 85499 90014
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#35A99A] shrink-0" />
                <a href="mailto:info@techstrivers.in" className="hover:text-[#FF6B16] transition-colors text-slate-300 decoration-none">
                  info@techstrivers.in
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://www.instagram.com/techstrivers?stkn=M2NnOHZnOHZzb2Fi" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-md bg-[#0E2A47] border border-slate-700 flex items-center justify-center hover:border-[#FF6B16] hover:-translate-y-0.5 transition-all overflow-hidden">
                <InstagramIcon className="w-7 h-7 rounded" />
              </a>
              <a href="https://wa.me/918549990019" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-11 h-11 rounded-md bg-[#0E2A47] border border-slate-700 flex items-center justify-center hover:border-[#FF6B16] hover:-translate-y-0.5 transition-all overflow-hidden">
                <WhatsAppIcon className="w-7 h-7 rounded-full" />
              </a>
              <a href="https://youtube.com/@techstrivers?si=a0OHwDD_4wo1WNva" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-11 h-11 rounded-md bg-[#0E2A47] border border-slate-700 flex items-center justify-center hover:border-[#FF6B16] hover:-translate-y-0.5 transition-all overflow-hidden">
                <YoutubeIcon className="w-7 h-7" />
              </a>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-3">
              <h5 className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Stay Updated</h5>
              {subscribed ? (
                <div className="text-emerald-400 text-xs font-medium bg-emerald-950/60 border border-emerald-800 p-2 rounded-md">
                  ✓ Thanks for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="bg-[#0E2A47] border border-slate-700 rounded-md px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B16] flex-1"
                  />
                  <button
                    type="submit"
                    className="bg-[#FF6B16] hover:bg-[#E55B05] text-white font-bold text-xs px-3.5 py-1.5 rounded-md transition-colors border-none cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2024 TechStrivers. All rights reserved.</p>
          <div className="flex items-center gap-3 text-slate-400 font-bold">
            <span>LEARN</span>
            <span>·</span>
            <span>BUILD</span>
            <span>·</span>
            <span>INNOVATE</span>
            <span>·</span>
            <span className="text-[#FF6B16]">CONNECT TOWARDS FUTURE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
