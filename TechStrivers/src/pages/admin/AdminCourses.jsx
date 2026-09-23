import React, { useState } from 'react';
import { Plus, Edit2, Trash2, GraduationCap, Clock, CheckCircle2, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminCourses() {
  const { courses, addCourse, updateCourse, deleteCourse } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    duration: '6 Weeks',
    level: 'Beginner to Advanced',
    topics: 'Microcontrollers, Sensor Interfacing, Cloud Dashboard, PCB Basics',
    description: ''
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      duration: '6 Weeks',
      level: 'Beginner to Advanced',
      topics: 'Microcontrollers, Sensor Interfacing, Cloud Dashboard, PCB Basics',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course) => {
    setEditingId(course.id);
    setFormData({
      title: course.title,
      duration: course.duration,
      level: course.level,
      topics: (course.topics || []).join(', '),
      description: course.description
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      title: formData.title,
      duration: formData.duration,
      level: formData.level,
      topics: formData.topics.split(',').map(t => t.trim()).filter(Boolean),
      description: formData.description
    };

    if (editingId) {
      updateCourse(editingId, formattedData);
    } else {
      addCourse(formattedData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white uppercase tracking-tight">Courses & Masterclasses Manager</h1>
          <p className="text-slate-400 text-xs mt-0.5">Manage training curricula and masterclass listings published on the website.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="btn-tech-orange text-xs py-2.5 px-4 gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add New Course
        </button>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-[#0E2A47] rounded-md border border-[#1769C2]/30 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-0.5 bg-[#1769C2]/20 text-[#1769C2] border border-[#1769C2]/40 text-[10px] font-bold rounded">
                  {course.level}
                </span>
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#FF6B16]" /> {course.duration}
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-white">{course.title}</h3>
              <p className="text-slate-300 text-xs leading-relaxed">{course.description}</p>

              <div className="pt-2">
                <div className="text-[10px] font-bold text-[#35A99A] uppercase tracking-wider mb-2">Curriculum Highlights</div>
                <ul className="space-y-1 text-xs text-slate-200">
                  {(course.topics || []).map((t, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#35A99A] shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#071A2D] flex items-center justify-between">
              <span className="text-[10px] text-emerald-400 font-bold">Includes Physical Hardware Kit</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(course)}
                  className="p-1.5 bg-[#071A2D] hover:bg-slate-800 text-slate-200 rounded transition-colors border border-slate-700 cursor-pointer"
                  title="Edit Course"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="p-1.5 bg-[#071A2D] hover:bg-red-900/50 text-slate-400 hover:text-red-400 rounded transition-colors border border-slate-700 cursor-pointer"
                  title="Delete Course"
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
          <div className="modal-content-erp p-6 sm:p-8 max-w-xl" onClick={e => e.stopPropagation()}>
            
            <div className="flex items-center justify-between mb-4 border-b border-[#1769C2]/40 pb-3">
              <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#FF6B16]" />
                {editingId ? 'Edit Course Details' : 'Add New Training Masterclass'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 bg-[#071A2D] text-slate-400 hover:text-white rounded border border-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IoT & Embedded Systems Masterclass"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input-erp"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Duration *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6 Weeks"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="form-input-erp"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Level *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Intermediate"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="form-input-erp"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Topics (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="ESP32, Sensor Interfacing, Cloud Dashboards, PCB Layout"
                  value={formData.topics}
                  onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                  className="form-input-erp"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Course Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Master hardware development..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-textarea-erp"
                />
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
                  {editingId ? 'Save Changes' : 'Publish Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
