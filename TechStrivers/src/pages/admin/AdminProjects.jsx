import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Cpu, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import ImageUploader from '../../components/ImageUploader';

export default function AdminProjects() {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'IoT',
    image: '/images/smart_waste.jpg',
    tags: 'IoT, ESP32, Sensors',
    shortDesc: '',
    fullDesc: '',
    hardware: 'ESP32 Microcontroller, Ultrasonic Sensors, Relay Module',
    software: 'Arduino C++, Firebase Realtime DB'
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'IoT',
      image: '/images/hero_lab.jpg',
      tags: 'IoT, ESP32, Sensors',
      shortDesc: '',
      fullDesc: '',
      hardware: 'ESP32 Microcontroller, Ultrasonic Sensors, Relay Module',
      software: 'Arduino C++, Firebase DB'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingId(proj.id);
    setFormData({
      title: proj.title,
      category: proj.category || 'IoT',
      image: proj.image || '/images/smart_waste.jpg',
      tags: (proj.tags || []).join(', '),
      shortDesc: proj.shortDesc || '',
      fullDesc: proj.fullDesc || '',
      hardware: (proj.hardware || []).join(', '),
      software: (proj.software || []).join(', ')
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      title: formData.title,
      category: formData.category,
      image: formData.image,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      shortDesc: formData.shortDesc,
      fullDesc: formData.fullDesc,
      hardware: formData.hardware.split(',').map(h => h.trim()).filter(Boolean),
      software: formData.software.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (editingId) {
      updateProject(editingId, formattedData);
    } else {
      addProject(formattedData);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white uppercase tracking-tight">Projects Manager</h1>
          <p className="text-slate-400 text-xs mt-0.5">Add, edit, or remove hardware and AI projects displayed on the public website.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="btn-tech-orange text-xs py-2.5 px-4 gap-1.5"
        >
          <Plus className="w-4 h-4" /> Post New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-[#0E2A47] rounded-md border border-[#1769C2]/30 overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="relative h-44 overflow-hidden">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#FF6B16] text-white font-extrabold text-[10px] rounded uppercase">
                  {proj.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-heading font-bold text-base text-white">{proj.title}</h3>
                <p className="text-slate-300 text-xs line-clamp-2">{proj.shortDesc}</p>
                
                <div className="flex flex-wrap gap-1 pt-2">
                  {(proj.tags || []).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[#071A2D] text-[#35A99A] text-[10px] rounded border border-slate-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-between border-t border-[#071A2D]">
              <span className="text-[10px] text-emerald-400 font-bold">● Published Live</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(proj)}
                  className="p-1.5 bg-[#071A2D] hover:bg-slate-800 text-slate-200 rounded transition-colors border border-slate-700 cursor-pointer"
                  title="Edit Project"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteProject(proj.id)}
                  className="p-1.5 bg-[#071A2D] hover:bg-red-900/50 text-slate-400 hover:text-red-400 rounded transition-colors border border-slate-700 cursor-pointer"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content-erp p-6 sm:p-8 max-w-2xl" onClick={e => e.stopPropagation()}>
            
            <div className="flex items-center justify-between mb-4 border-b border-[#1769C2]/40 pb-3">
              <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#FF6B16]" />
                {editingId ? 'Edit Project Details' : 'Post New Hardware Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 bg-[#071A2D] text-slate-400 hover:text-white rounded border border-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Autonomous Rover"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="form-input-erp"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-select-erp"
                  >
                    <option value="IoT">IoT & Embedded</option>
                    <option value="AI/ML">AI & Computer Vision</option>
                    <option value="Robotics">Robotics & Automation</option>
                    <option value="Sensors">Sensors & Electronics</option>
                  </select>
                </div>
              </div>

              <div>
                <ImageUploader
                  label="Project Photo / Image *"
                  required
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Tags (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="IoT, ESP32, Sensors"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="form-input-erp"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Short 2-line overview..."
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="form-textarea-erp"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Detailed Technical Description</label>
                <textarea
                  rows={3}
                  placeholder="Full technical overview..."
                  value={formData.fullDesc}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  className="form-textarea-erp"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Hardware Components (Comma Separated)</label>
                  <input
                    type="text"
                    placeholder="ESP32, Sensors, Motors"
                    value={formData.hardware}
                    onChange={(e) => setFormData({ ...formData, hardware: e.target.value })}
                    className="form-input-erp"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Software Stack (Comma Separated)</label>
                  <input
                    type="text"
                    placeholder="Python, ROS 2, Firebase"
                    value={formData.software}
                    onChange={(e) => setFormData({ ...formData, software: e.target.value })}
                    className="form-input-erp"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1769C2]/30">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#071A2D] border border-slate-700 text-white font-bold rounded cursor-pointer hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-tech-orange text-xs py-2 px-6">
                  {editingId ? 'Save Changes' : 'Publish Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
