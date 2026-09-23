import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Briefcase, Calendar, Clock, MapPin, Users, CheckCircle2, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminInternships() {
  const { internships, workshops, addInternship, updateInternship, deleteInternship, addWorkshop, updateWorkshop, deleteWorkshop } = useData();

  const [activeSubTab, setActiveSubTab] = useState('internships');
  const [isInternModalOpen, setIsInternModalOpen] = useState(false);
  const [editingInternId, setEditingInternId] = useState(null);

  const [isWsModalOpen, setIsWsModalOpen] = useState(false);
  const [editingWsId, setEditingWsId] = useState(null);

  // Internship Form State
  const [internFormData, setInternFormData] = useState({
    title: '',
    duration: '4 Weeks',
    category: 'Fast-Track',
    popular: false,
    highlights: 'Hands-on Prototyping, Live Project, Certificate'
  });

  // Workshop Form State
  const [wsFormData, setWsFormData] = useState({
    title: '',
    date: '2026-10-15',
    time: '10:00 AM - 4:00 PM',
    venue: 'TechStrivers Bengaluru Lab / Online',
    domain: 'IoT & Embedded',
    seatsLeft: 15,
    fee: 'Free / Sponsored',
    instructor: 'Senior Hardware Engineer'
  });

  // Internship Modal Handlers
  const handleOpenAddIntern = () => {
    setEditingInternId(null);
    setInternFormData({
      title: '',
      duration: '4 Weeks',
      category: 'Fast-Track',
      popular: false,
      highlights: 'Hands-on Prototyping, Live Project, Certificate'
    });
    setIsInternModalOpen(true);
  };

  const handleOpenEditIntern = (item) => {
    setEditingInternId(item.id);
    setInternFormData({
      title: item.title,
      duration: item.duration,
      category: item.category || 'Fast-Track',
      popular: !!item.popular,
      highlights: (item.highlights || []).join(', ')
    });
    setIsInternModalOpen(true);
  };

  const handleInternSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: internFormData.title,
      duration: internFormData.duration,
      category: internFormData.category,
      popular: internFormData.popular,
      highlights: internFormData.highlights.split(',').map(h => h.trim()).filter(Boolean),
      color: internFormData.popular ? 'border-amber-300 bg-amber-50/50 shadow-md' : 'border-blue-200 bg-blue-50/30'
    };

    if (editingInternId) {
      updateInternship(editingInternId, data);
    } else {
      addInternship(data);
    }
    setIsInternModalOpen(false);
  };

  // Workshop Modal Handlers
  const handleOpenAddWs = () => {
    setEditingWsId(null);
    setWsFormData({
      title: '',
      date: '2026-10-15',
      time: '10:00 AM - 4:00 PM',
      venue: 'TechStrivers Lab / Online',
      domain: 'IoT & Embedded',
      seatsLeft: 15,
      fee: 'Free',
      instructor: 'Lead Engineer'
    });
    setIsWsModalOpen(true);
  };

  const handleOpenEditWs = (item) => {
    setEditingWsId(item.id);
    setWsFormData({
      title: item.title,
      date: item.date,
      time: item.time,
      venue: item.venue,
      domain: item.domain,
      seatsLeft: item.seatsLeft,
      fee: item.fee,
      instructor: item.instructor
    });
    setIsWsModalOpen(true);
  };

  const handleWsSubmit = (e) => {
    e.preventDefault();
    if (editingWsId) {
      updateWorkshop(editingWsId, wsFormData);
    } else {
      addWorkshop(wsFormData);
    }
    setIsWsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white uppercase tracking-tight">
            Internships & Workshops Manager
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">Post and manage experiential internship tiers and upcoming hands-on workshop schedules.</p>
        </div>

        {/* SubTab Toggle & Add Action */}
        <div className="flex items-center gap-3">
          <div className="bg-[#071A2D] border border-[#1769C2]/40 p-1 rounded-md flex items-center">
            <button
              onClick={() => setActiveSubTab('internships')}
              className={`px-3 py-1 text-xs font-bold rounded transition-all border-none cursor-pointer ${
                activeSubTab === 'internships' ? 'bg-[#FF6B16] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Internship Tiers ({internships.length})
            </button>
            <button
              onClick={() => setActiveSubTab('workshops')}
              className={`px-3 py-1 text-xs font-bold rounded transition-all border-none cursor-pointer ${
                activeSubTab === 'workshops' ? 'bg-[#FF6B16] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Upcoming Workshops ({workshops.length})
            </button>
          </div>

          <button
            onClick={activeSubTab === 'internships' ? handleOpenAddIntern : handleOpenAddWs}
            className="btn-tech-orange text-xs py-2 px-4 gap-1.5"
          >
            <Plus className="w-4 h-4" /> {activeSubTab === 'internships' ? 'Post Internship Tier' : 'Add Workshop Event'}
          </button>
        </div>
      </div>

      {/* View 1: Internships */}
      {activeSubTab === 'internships' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {internships.map((tier) => (
            <div key={tier.id} className="bg-[#0E2A47] rounded-md border border-[#1769C2]/30 p-6 flex flex-col justify-between space-y-4 relative">
              {tier.popular && (
                <span className="absolute -top-3 right-6 px-3 py-0.5 bg-[#FF6B16] text-white font-extrabold text-[10px] rounded uppercase">
                  Most Popular
                </span>
              )}

              <div className="space-y-3">
                <div className="text-xs font-extrabold text-[#35A99A] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#FF6B16]" /> {tier.duration}
                </div>
                <h3 className="font-heading font-bold text-xl text-white">{tier.title}</h3>

                <div className="pt-2 space-y-1.5">
                  {(tier.highlights || []).map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#35A99A] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#071A2D] flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-bold">● Published Live</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditIntern(tier)}
                    className="p-1.5 bg-[#071A2D] hover:bg-slate-800 text-slate-200 rounded transition-colors border border-slate-700 cursor-pointer"
                    title="Edit Internship"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteInternship(tier.id)}
                    className="p-1.5 bg-[#071A2D] hover:bg-red-900/50 text-slate-400 hover:text-red-400 rounded transition-colors border border-slate-700 cursor-pointer"
                    title="Delete Internship"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 2: Workshops */}
      {activeSubTab === 'workshops' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workshops.map((ws) => (
            <div key={ws.id} className="bg-[#0E2A47] rounded-md border border-[#1769C2]/30 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-0.5 bg-[#1769C2]/20 text-[#1769C2] border border-[#1769C2]/40 text-[10px] font-bold rounded">
                    {ws.domain}
                  </span>
                  <span className="text-xs font-bold text-[#FF6B16]">{ws.fee}</span>
                </div>

                <h3 className="font-heading font-bold text-xl text-white">{ws.title}</h3>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#35A99A]" />
                    <span>Date: {ws.date} ({ws.time})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6B16]" />
                    <span>Venue: {ws.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#1769C2]" />
                    <span>Instructor: {ws.instructor} · <strong className="text-amber-400">{ws.seatsLeft} Seats Available</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#071A2D] flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-bold">● Published Live</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditWs(ws)}
                    className="p-1.5 bg-[#071A2D] hover:bg-slate-800 text-slate-200 rounded transition-colors border border-slate-700 cursor-pointer"
                    title="Edit Workshop"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteWorkshop(ws.id)}
                    className="p-1.5 bg-[#071A2D] hover:bg-red-900/50 text-slate-400 hover:text-red-400 rounded transition-colors border border-slate-700 cursor-pointer"
                    title="Delete Workshop"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Internship Modal Form */}
      {isInternModalOpen && (
        <div className="modal-overlay" onClick={() => setIsInternModalOpen(false)}>
          <div className="modal-content-erp p-6 sm:p-8" onClick={e => e.stopPropagation()}>
            
            <div className="flex items-center justify-between mb-4 border-b border-[#1769C2]/40 pb-3">
              <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#FF6B16]" />
                {editingInternId ? 'Edit Internship Program' : 'Post New Internship Program'}
              </h3>
              <button
                onClick={() => setIsInternModalOpen(false)}
                className="p-1.5 bg-[#071A2D] text-slate-400 hover:text-white rounded border border-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInternSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Program Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3-Month Advanced Hardware Internship"
                  value={internFormData.title}
                  onChange={(e) => setInternFormData({ ...internFormData, title: e.target.value })}
                  className="form-input-erp"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Duration *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4 Weeks"
                    value={internFormData.duration}
                    onChange={(e) => setInternFormData({ ...internFormData, duration: e.target.value })}
                    className="form-input-erp"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Category / Tier *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fast-Track"
                    value={internFormData.category}
                    onChange={(e) => setInternFormData({ ...internFormData, category: e.target.value })}
                    className="form-input-erp"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Perks & Highlights (Comma Separated)</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Hands-on Prototyping, Live Project, Certificate"
                  value={internFormData.highlights}
                  onChange={(e) => setInternFormData({ ...internFormData, highlights: e.target.value })}
                  className="form-textarea-erp"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="popularCheck"
                  checked={internFormData.popular}
                  onChange={(e) => setInternFormData({ ...internFormData, popular: e.target.checked })}
                  className="rounded bg-[#071A2D] border-slate-700 text-[#FF6B16]"
                />
                <label htmlFor="popularCheck" className="text-white font-bold cursor-pointer">Mark as "Most Popular" Badge</label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1769C2]/30">
                <button
                  type="button"
                  onClick={() => setIsInternModalOpen(false)}
                  className="px-4 py-2 bg-[#071A2D] border border-slate-700 text-white font-bold rounded cursor-pointer hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-tech-orange text-xs py-2 px-6">
                  {editingInternId ? 'Save Changes' : 'Publish Internship'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Workshop Modal Form */}
      {isWsModalOpen && (
        <div className="modal-overlay" onClick={() => setIsWsModalOpen(false)}>
          <div className="modal-content-erp p-6 sm:p-8" onClick={e => e.stopPropagation()}>
            
            <div className="flex items-center justify-between mb-4 border-b border-[#1769C2]/40 pb-3">
              <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#FF6B16]" />
                {editingWsId ? 'Edit Workshop Event' : 'Add Upcoming Workshop Event'}
              </h3>
              <button
                onClick={() => setIsWsModalOpen(false)}
                className="p-1.5 bg-[#071A2D] text-slate-400 hover:text-white rounded border border-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleWsSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Workshop Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hands-on ESP32 & Cloud IoT Bootcamp"
                  value={wsFormData.title}
                  onChange={(e) => setWsFormData({ ...wsFormData, title: e.target.value })}
                  className="form-input-erp"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={wsFormData.date}
                    onChange={(e) => setWsFormData({ ...wsFormData, date: e.target.value })}
                    className="form-input-erp"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Timing *</label>
                  <input
                    type="text"
                    required
                    placeholder="10:00 AM - 4:00 PM"
                    value={wsFormData.time}
                    onChange={(e) => setWsFormData({ ...wsFormData, time: e.target.value })}
                    className="form-input-erp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Domain *</label>
                  <input
                    type="text"
                    required
                    placeholder="IoT & Embedded / Robotics"
                    value={wsFormData.domain}
                    onChange={(e) => setWsFormData({ ...wsFormData, domain: e.target.value })}
                    className="form-input-erp"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Fee / Pricing *</label>
                  <input
                    type="text"
                    required
                    placeholder="Free / ₹499"
                    value={wsFormData.fee}
                    onChange={(e) => setWsFormData({ ...wsFormData, fee: e.target.value })}
                    className="form-input-erp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Venue / Platform</label>
                  <input
                    type="text"
                    required
                    value={wsFormData.venue}
                    onChange={(e) => setWsFormData({ ...wsFormData, venue: e.target.value })}
                    className="form-input-erp"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Available Seats</label>
                  <input
                    type="number"
                    required
                    value={wsFormData.seatsLeft}
                    onChange={(e) => setWsFormData({ ...wsFormData, seatsLeft: parseInt(e.target.value) || 0 })}
                    className="form-input-erp"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Instructor Name</label>
                <input
                  type="text"
                  placeholder="Senior Embedded Engineer"
                  value={wsFormData.instructor}
                  onChange={(e) => setWsFormData({ ...wsFormData, instructor: e.target.value })}
                  className="form-input-erp"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1769C2]/30">
                <button
                  type="button"
                  onClick={() => setIsWsModalOpen(false)}
                  className="px-4 py-2 bg-[#071A2D] border border-slate-700 text-white font-bold rounded cursor-pointer hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-tech-orange text-xs py-2 px-6">
                  {editingWsId ? 'Save Changes' : 'Publish Workshop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
