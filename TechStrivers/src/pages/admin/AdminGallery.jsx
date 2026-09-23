import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, X, Check, Eye } from 'lucide-react';
import { useData } from '../../context/DataContext';
import ImageUploader from '../../components/ImageUploader';

export default function AdminGallery() {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useData();
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Projects',
    image: '',
    description: ''
  });

  const showSuccessNotification = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'Projects', label: 'Projects' },
    { id: 'Internships', label: 'Internship' },
    { id: 'Courses', label: 'Courses' },
    { id: 'Workshops', label: 'Workshops' }
  ];

  const categoryOptions = [
    { value: 'Projects', label: 'Projects' },
    { value: 'Internships', label: 'Internships' },
    { value: 'Courses', label: 'Courses' },
    { value: 'Workshops', label: 'Workshops' }
  ];

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: activeTab !== 'all' ? activeTab : 'Projects',
      image: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category || 'Projects',
      image: item.image || '',
      description: item.description || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter an image title.');
      return;
    }
    if (!formData.image) {
      alert('Please upload an image file or provide an image URL.');
      return;
    }

    const titleSaved = formData.title;
    const categorySaved = formData.category;

    if (editingId) {
      updateGalleryItem(editingId, {
        title: formData.title,
        category: formData.category,
        image: formData.image,
        description: formData.description
      });
      const msg = `Image "${titleSaved}" updated successfully!`;
      showSuccessNotification(msg);
      alert(`Success: ${msg}`);
    } else {
      addGalleryItem({
        title: formData.title,
        category: formData.category,
        image: formData.image,
        description: formData.description
      });
      const msg = `Image "${titleSaved}" added successfully to ${categorySaved}!`;
      showSuccessNotification(msg);
      alert(`Success: ${msg}`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}" from the gallery?`)) {
      deleteGalleryItem(id);
      showSuccessNotification(`Image "${title}" deleted from gallery.`);
    }
  };

  const filteredGallery = activeTab === 'all'
    ? gallery
    : gallery.filter(item => item.category?.toLowerCase() === activeTab.toLowerCase() || item.category === activeTab);

  const getCategoryBadgeColor = (cat) => {
    switch (cat) {
      case 'Projects': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Internships': return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Courses': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Workshops': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default: return 'bg-slate-700 text-slate-200 border-slate-600';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Success Notification Banner */}
      {toastMessage && (
        <div className="p-4 bg-emerald-950/90 border border-emerald-500/60 rounded-lg text-emerald-200 text-xs font-bold flex items-center justify-between shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-400 hover:text-white p-1 rounded bg-transparent border-none cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header with Top Right Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E2A47] p-5 rounded-lg border border-[#1769C2]/30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-heading text-white uppercase tracking-tight">Gallery Manager</h1>
            <span className="px-2.5 py-0.5 bg-[#FF6B16] text-white font-extrabold text-[10px] rounded uppercase">
              {gallery.length} Images
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Upload hardware photos, workshop moments, and project showcases. Uploaded images instantly reflect in the public website gallery.
          </p>
        </div>

        {/* Top Right Corner Add Button */}
        <button
          onClick={handleOpenAdd}
          className="btn-tech-orange text-xs py-2.5 px-4 gap-2 cursor-pointer shrink-0 self-start sm:self-auto shadow-md"
        >
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#0E2A47]">
        {categories.map((tab) => {
          const count = tab.id === 'all' 
            ? gallery.length 
            : gallery.filter(item => item.category?.toLowerCase() === tab.id.toLowerCase() || item.category === tab.id).length;

          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-t-md text-xs font-bold transition-all flex items-center gap-2 border-b-2 cursor-pointer border-none whitespace-nowrap ${
                isActive
                  ? 'bg-[#0E2A47] text-[#FF6B16] border-[#FF6B16] font-extrabold'
                  : 'bg-transparent text-slate-400 hover:text-white hover:bg-[#0E2A47]/50'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
                isActive ? 'bg-[#FF6B16] text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      {filteredGallery.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredGallery.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#0E2A47] rounded-lg border border-[#1769C2]/30 overflow-hidden flex flex-col justify-between group hover:border-[#FF6B16] transition-all shadow-md"
            >
              <div>
                {/* Image Container with View overlay on click */}
                <div 
                  onClick={() => setViewingItem(item)}
                  className="relative h-48 bg-slate-900 overflow-hidden cursor-pointer"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/hero_lab.jpg';
                    }}
                  />
                  <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold rounded border uppercase shadow-sm ${getCategoryBadgeColor(item.category)}`}>
                    {item.category}
                  </span>
                  
                  {/* Hover Eye Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 bg-slate-950/80 rounded text-xs font-bold text-white flex items-center gap-1.5 backdrop-blur-xs">
                      <Eye className="w-4 h-4 text-[#35A99A]" /> View Details
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h3 
                    onClick={() => setViewingItem(item)}
                    className="font-bold text-sm text-white line-clamp-2 group-hover:text-[#FF6B16] transition-colors cursor-pointer"
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  <div className="text-[11px] text-slate-400 font-mono">
                    Added: {item.date || 'Recent'}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions (Clean single set: View, Edit, Delete) */}
              <div className="px-4 pb-4 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Category: <strong className="text-slate-200">{item.category}</strong>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewingItem(item)}
                    className="text-[11px] text-[#35A99A] hover:underline font-bold border-none bg-transparent cursor-pointer"
                  >
                    View
                  </button>
                  <span className="text-slate-600">•</span>
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="text-[11px] text-amber-400 hover:underline font-bold border-none bg-transparent cursor-pointer"
                  >
                    Edit
                  </button>
                  <span className="text-slate-600">•</span>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="text-[11px] text-red-400 hover:underline font-bold border-none bg-transparent cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0E2A47] p-12 rounded-lg border border-dashed border-slate-700 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
            <ImageIcon className="w-7 h-7 text-[#FF6B16]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase">No Images In This Category</h3>
            <p className="text-slate-400 text-xs mt-1">There are no uploaded images for the tab "{activeTab}". Click below to add one.</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="btn-tech-orange text-xs py-2 px-4 gap-2 mx-auto inline-flex"
          >
            <Plus className="w-4 h-4" /> Upload First Image
          </button>
        </div>
      )}

      {/* Upload/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#071A2D] border border-[#1769C2]/40 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0E2A47] border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#FF6B16]" />
                <h2 className="text-base font-bold font-heading text-white uppercase">
                  {editingId ? 'Edit Gallery Image' : 'Add New Gallery Image'}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md bg-transparent border-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              {/* Title Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Image Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ESP32 Sensor Hardware Prototype"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input-erp"
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Category (Where image should be stored) *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-input-erp cursor-pointer"
                >
                  {categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#071A2D] text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 italic">
                  Image will automatically appear under "All" and the selected category "{formData.category}" tab both in ERP and on the public website gallery.
                </p>
              </div>

              {/* Description Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter details about this image, hardware prototype, or workshop event..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-input-erp resize-none"
                />
              </div>

              {/* File / Image Upload Component */}
              <ImageUploader
                value={formData.image}
                onChange={(newImg) => setFormData({ ...formData, image: newImg })}
                label="Image File (Upload or Select) *"
                required={true}
              />

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-md border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-tech-orange text-xs py-2 px-5 gap-2"
                >
                  <Check className="w-4 h-4" /> {editingId ? 'Save Changes' : 'Upload Image'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Admin View Details Modal */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#071A2D] border border-[#1769C2]/50 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden relative text-white">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0E2A47] border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#35A99A]" />
                <h2 className="text-base font-bold font-heading text-white uppercase">
                  Gallery Image Details
                </h2>
              </div>
              <button
                onClick={() => setViewingItem(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md bg-transparent border-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Preview Box */}
            <div className="relative max-h-[50vh] overflow-hidden bg-slate-950 flex items-center justify-center border-b border-slate-800">
              <img
                src={viewingItem.image}
                alt={viewingItem.title}
                className="w-full h-full max-h-[50vh] object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/hero_lab.jpg';
                }}
              />
              <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold rounded border uppercase shadow-sm ${getCategoryBadgeColor(viewingItem.category)}`}>
                {viewingItem.category}
              </span>
            </div>

            {/* Details & Actions */}
            <div className="p-6 space-y-4 bg-[#071A2D]">
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  {viewingItem.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Category: <strong className="text-slate-200">{viewingItem.category}</strong> • Added: {viewingItem.date || 'Recent'}
                </p>
              </div>

              {viewingItem.description ? (
                <div className="p-3.5 bg-[#0E2A47] rounded-lg border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-[#35A99A] uppercase tracking-wider block">Description</span>
                  <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                    {viewingItem.description}
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-[#0E2A47]/50 rounded-lg border border-slate-800 text-xs text-slate-400 italic">
                  No detailed description added for this image yet.
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => {
                    const itemToEdit = viewingItem;
                    setViewingItem(null);
                    handleOpenEdit(itemToEdit);
                  }}
                  className="px-4 py-2 bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/40 font-bold text-xs rounded-md cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <Edit2 className="w-4 h-4" /> Edit Image
                </button>
                <button
                  onClick={() => {
                    const itemToDelete = viewingItem;
                    setViewingItem(null);
                    handleDelete(itemToDelete.id, itemToDelete.title);
                  }}
                  className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 font-bold text-xs rounded-md cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
                <button
                  onClick={() => setViewingItem(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-md border-none cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
