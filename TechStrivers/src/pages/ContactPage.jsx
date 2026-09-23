import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const contactLocalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "TechStrivers Innovation & Learning Center",
    "image": "https://techstrivers.com/images/hero_lab.jpg",
    "telephone": "+91-8549990019",
    "email": "info@techstrivers.in",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.instagram.com/techstrivers",
      "https://youtube.com/@techstrivers"
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <SEO 
        title="Contact Us | TechStrivers Bengaluru Center"
        description="Get in touch with TechStrivers in Bengaluru for engineering project inquiries, course admissions, internship applications, or workshop partnerships."
        canonical="https://techstrivers.com/contact"
        schema={contactLocalBusinessSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">GET IN TOUCH</span>
          <h1 className="text-4xl font-extrabold font-heading text-slate-900">
            CONTACT <span className="text-amber-600">TECHSTRIVERS</span>
          </h1>
          <p className="text-slate-600 text-sm">
            Have questions about engineering projects, hardware training, or internship enrollment? Reach out to our team in Bengaluru.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Cards Left */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold font-heading text-slate-900">Reach Us Directly</h2>
              
              <div className="space-y-4 text-slate-700 text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-xl shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Main Campus & Lab</h3>
                    <p className="text-slate-600 text-sm mt-0.5">Srinagar, Bengaluru, Karnataka - 560050</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Phone / WhatsApp</h3>
                    <p className="text-slate-600 text-sm mt-0.5">+91 85499 90019</p>
                    <p className="text-slate-600 text-sm">+91 85499 90014</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Email Address</h3>
                    <p className="text-slate-600 text-sm mt-0.5">info@techstrivers.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-xl shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Lab Hours</h3>
                    <p className="text-slate-600 text-sm mt-0.5">Mon - Sat: 9:30 AM - 7:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder card */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-2 border border-slate-800">
              <h2 className="font-bold text-base text-amber-400">Located in Bengaluru Tech Hub</h2>
              <p className="text-sm text-slate-400">Conveniently accessible for engineering students across RVCE, BMSCE, REVA, MSRIT, PES, and BIT.</p>
            </div>

          </div>

          {/* Contact Form Right */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold font-heading text-slate-900">Message Sent Successfully!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you for writing to TechStrivers. We have received your query and will respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6">Send Us a Message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Project Query / Internship"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can TechStrivers help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="btn-primary text-base py-3 px-8 w-full sm:w-auto justify-center">
                    Send Message <Send className="w-4 h-4 ml-1" />
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
