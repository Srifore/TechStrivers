import React, { useState } from 'react';
import { Plus, Edit2, Trash2, FileText, Calendar, User } from 'lucide-react';
import { useData } from '../../context/DataContext';
import ImageUploader from '../../components/ImageUploader';

export default function AdminBlogs() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'AI & Embedded',
    author: 'TechStrivers R&D Team',
    coverImage: '/images/drone_detection.jpg',
    excerpt: '',
    content: ''
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'AI & Embedded',
      author: 'TechStrivers R&D Team',
      coverImage: '/images/drone_detection.jpg',
      excerpt: '',
      content: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      category: blog.category,
      author: blog.author,
      coverImage: blog.coverImage,
      excerpt: blog.excerpt,
      content: blog.content
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateBlog(editingId, formData);
    } else {
      addBlog(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Blog & Articles Engine</h1>
          <p className="text-slate-400 text-xs mt-0.5">Publish engineering tutorials, hardware guides, and tech news onto the website.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="btn-primary text-xs py-2.5 px-4 gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create Blog Post
        </button>
      </div>

      {/* Blogs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-44 overflow-hidden">
                <img src={blog.coverImage || '/images/hero_lab.jpg'} alt={blog.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-amber-500 text-slate-950 font-extrabold text-[10px] rounded-full uppercase">
                  {blog.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-500" /> {blog.publishDate}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-blue-500" /> {blog.author}</span>
                </div>

                <h3 className="font-heading font-bold text-lg text-white leading-snug">{blog.title}</h3>
                <p className="text-slate-400 text-xs line-clamp-2">{blog.excerpt}</p>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-800/80">
              <span className="text-[10px] text-emerald-400 font-bold">● Published Live</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(blog)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border-none cursor-pointer"
                  title="Edit Post"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="p-1.5 bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-400 rounded-lg transition-colors border-none cursor-pointer"
                  title="Delete Post"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Blog Editor Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content-erp p-6 sm:p-8 max-w-2xl" onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#071A2D] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#FF6B16]" />
                <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wider">
                  {editingId ? 'Edit Article' : 'Write & Publish New Article'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-md bg-[#071A2D] hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Article Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="Article Headline..."
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
                    <option value="AI & Embedded">AI & Embedded</option>
                    <option value="IoT & Automation">IoT & Automation</option>
                    <option value="Robotics & ROS">Robotics & ROS</option>
                    <option value="PCB & Hardware">PCB & Hardware</option>
                    <option value="Career & Industry">Career & Industry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Author Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TechStrivers R&D Team"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="form-input-erp"
                  />
                </div>

              <div>
                <ImageUploader
                  label="Article Cover Image / Photo *"
                  required
                  value={formData.coverImage}
                  onChange={(url) => setFormData({ ...formData, coverImage: url })}
                />
              </div>
              </div>

              <div>
                <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Short Summary / Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Brief summary for article card preview..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="form-textarea-erp"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Article Content Body (Markdown / Plain Text) *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write full article body here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="form-textarea-erp font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#071A2D]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-tech-dark text-xs py-2 px-5"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-tech-orange text-xs py-2 px-6">
                  {editingId ? 'Save Article Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
