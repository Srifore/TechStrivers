import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, Phone, Mail, User, Building, MessageSquare } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function EnquiryModal({ isOpen, onClose }) {
  const { addLead } = useData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    domain: 'Mini/Major Project',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to dynamic DataContext -> ERP leads store
    addLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      college: formData.college,
      domain: formData.domain,
      message: formData.message
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        college: '',
        domain: 'Mini/Major Project',
        message: ''
      });
      onClose();
    }, 2200);
  };

  return (
    <div className="modal-overlay animate-fadeIn" onClick={onClose}>
      <div 
        className="modal-content p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors border-none cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">Enquiry Submitted!</h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Thank you for reaching out to <strong>TechStrivers</strong>. Your request has been logged in our ERP system and our team will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading">Enquire Now</h3>
            </div>
            <p className="text-slate-600 text-sm mb-6">
              Fill out the form below to get complete guidance, project lists, hardware kit options, or customized training schedules.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">
                    College / Organization
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. RVCE, REVA, BMSCE"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className="form-input pl-9"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">
                  Interest / Requirement *
                </label>
                <select
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="form-select"
                >
                  <option value="Mini/Major Project" style={{ backgroundColor: '#071A2D', color: '#ffffff' }}>Mini & Major Engineering Project</option>
                  <option value="IoT & Embedded" style={{ backgroundColor: '#071A2D', color: '#ffffff' }}>IoT & Embedded Systems Training</option>
                  <option value="Robotics & AI" style={{ backgroundColor: '#071A2D', color: '#ffffff' }}>Robotics & AI / Computer Vision</option>
                  <option value="PCB Design" style={{ backgroundColor: '#071A2D', color: '#ffffff' }}>PCB Design & Manufacturing</option>
                  <option value="Internship Program" style={{ backgroundColor: '#071A2D', color: '#ffffff' }}>Hands-on Internship Program</option>
                  <option value="College Workshop" style={{ backgroundColor: '#071A2D', color: '#ffffff' }}>College Workshop / Seminar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">
                  Project Title or Message
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <textarea
                    rows={3}
                    placeholder="Tell us about your project topic or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-input pl-9"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-primary justify-center text-base py-3"
                >
                  Submit Enquiry <Send className="w-4 h-4 ml-1" />
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
}
