import React, { useRef } from 'react';
import { Upload, Image as ImageIcon, X, Check, Link } from 'lucide-react';

export default function ImageUploader({ 
  value = '', 
  onChange, 
  label = 'Cover Image / Upload Photo *',
  required = false 
}) {
  const fileInputRef = useRef(null);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const maxWidth = 1000;
          const maxHeight = 1000;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.onerror = () => resolve(event.target.result);
        img.src = event.target.result;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (PNG, JPG, WebP, etc.)');
        return;
      }

      try {
        const compressedDataUrl = await compressImage(file);
        if (compressedDataUrl) {
          onChange(compressedDataUrl);
        }
      } catch (err) {
        console.error('Image compression error:', err);
        const reader = new FileReader();
        reader.onload = (event) => onChange(event.target.result);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleClear = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-white font-bold mb-1.5 uppercase tracking-wider text-xs">
        {label}
      </label>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="bg-[#071A2D] p-3 rounded-lg border border-[#1769C2]/40 space-y-3">
        
        {/* Upload Controls Row */}
        <div className="flex flex-wrap items-center gap-2">
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn-tech-orange text-xs py-2 px-3.5 gap-2 cursor-pointer shadow-md"
          >
            <Upload className="w-4 h-4" /> Upload Image File
          </button>

          <span className="text-[11px] text-slate-400 font-semibold uppercase">Or enter URL / Path</span>
        </div>

        {/* Text Input for Image URL or Path */}
        <div className="relative flex items-center">
          <Link className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            required={required && !value}
            placeholder="/images/project.jpg or data:image/..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="form-input-erp has-icon-left text-xs"
          />
        </div>

        {/* Image Preview Box */}
        {value ? (
          <div className="flex items-center justify-between p-2 bg-[#0E2A47] rounded border border-slate-700">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={value}
                alt="Preview"
                className="w-14 h-12 object-cover rounded border border-[#1769C2]/40 shrink-0"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/hero_lab.jpg';
                }}
              />
              <div className="text-xs truncate">
                <div className="font-bold text-emerald-400 flex items-center gap-1 text-[11px]">
                  <Check className="w-3.5 h-3.5" /> Image Attached
                </div>
                <div className="text-[10px] text-slate-400 truncate max-w-[200px] sm:max-w-[260px]">
                  {value.startsWith('data:') ? 'Custom File Uploaded' : value}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-red-950 rounded transition-colors border-none cursor-pointer"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 italic">
            <ImageIcon className="w-3.5 h-3.5 text-[#35A99A]" /> No image selected yet. Upload a file from your computer or paste an image URL.
          </div>
        )}

      </div>
    </div>
  );
}
