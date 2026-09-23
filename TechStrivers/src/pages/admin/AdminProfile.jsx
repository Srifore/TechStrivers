import React, { useState } from 'react';
import {
  User, Mail, Phone, Lock, ShieldCheck, Key, QrCode, Smartphone,
  CheckCircle2, AlertCircle, Save, ToggleLeft, ToggleRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminProfile() {
  const { adminProfile, updateAdminProfile, updateAdminPassword, toggle2FA } = useData();

  // Profile info state
  const [name, setName] = useState(adminProfile.name);
  const [email, setEmail] = useState(adminProfile.email);
  const [phone, setPhone] = useState(adminProfile.phone);
  const [profileMsg, setProfileMsg] = useState('');

  // Password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMsg, setPassMsg] = useState({ type: '', text: '' });

  // 2FA state
  const [is2FA, setIs2FA] = useState(adminProfile.twoFactorEnabled);
  const [twoFaMethod, setTwoFaMethod] = useState(adminProfile.twoFactorMethod || 'authenticator');
  const [otpSuccessMsg, setOtpSuccessMsg] = useState('');

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateAdminProfile({ name, email, phone });
    setProfileMsg('Admin profile information updated successfully!');
    setTimeout(() => setProfileMsg(''), 3500);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setPassMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    const res = updateAdminPassword(currentPass, newPass);
    if (res.success) {
      setPassMsg({ type: 'success', text: res.message });
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    } else {
      setPassMsg({ type: 'error', text: res.message });
    }
    setTimeout(() => setPassMsg({ type: '', text: '' }), 4000);
  };

  const handle2FAToggle = () => {
    const nextState = !is2FA;
    setIs2FA(nextState);
    toggle2FA(nextState, twoFaMethod);
    setOtpSuccessMsg(nextState ? '2FA Enabled! Authenticator code will be required during sign-in.' : '2FA Security Disabled.');
    setTimeout(() => setOtpSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl">
      
      {/* Header */}
      <div className="bg-[#0E2A47] p-6 rounded-md border border-[#1769C2]/40 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white uppercase tracking-wider flex items-center gap-2">
            <User className="w-6 h-6 text-[#FF6B16]" />
            Admin Profile & Security Settings
          </h1>
          <p className="text-slate-300 text-xs mt-1">Manage administrator account credentials, password authentication, and 2-Factor Security.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#071A2D] rounded border border-[#35A99A]/40 text-xs font-bold text-[#35A99A]">
          <ShieldCheck className="w-4 h-4 text-[#35A99A]" />
          <span>{adminProfile.twoFactorEnabled ? '2FA Active' : 'Standard Auth'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Account Details & Password */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Card 1: Account Information */}
          <div className="bg-[#0E2A47] p-6 rounded-md border border-[#1769C2]/30 space-y-6">
            <h3 className="text-lg font-bold font-heading text-white border-b border-[#071A2D] pb-3 uppercase flex items-center gap-2">
              <User className="w-5 h-5 text-[#1769C2]" /> Administrator Account Info
            </h3>

            {profileMsg && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs rounded font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {profileMsg}
              </div>
            )}

            <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Full Name *</label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input-erp has-icon-left"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Email Address (Login) *</label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input-erp has-icon-left"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Phone / WhatsApp</label>
                  <div className="relative flex items-center">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input-erp has-icon-left"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button type="submit" className="btn-tech-orange text-xs py-2 px-6 gap-1.5">
                  <Save className="w-4 h-4" /> Save Profile Info
                </button>
              </div>
            </form>
          </div>

          {/* Card 2: Password Management */}
          <div className="bg-[#0E2A47] p-6 rounded-md border border-[#1769C2]/30 space-y-6">
            <h3 className="text-lg font-bold font-heading text-white border-b border-[#071A2D] pb-3 uppercase flex items-center gap-2">
              <Key className="w-5 h-5 text-[#FF6B16]" /> Change Admin Password
            </h3>

            {passMsg.text && (
              <div className={`p-3 text-xs rounded font-bold flex items-center gap-2 ${
                passMsg.type === 'error' ? 'bg-red-950/80 border border-red-800 text-red-300' : 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
              }`}>
                {passMsg.type === 'error' ? <AlertCircle className="w-4 h-4 text-red-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                <span>{passMsg.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Current Password *</label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    className="form-input-erp has-icon-left"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">New Password *</label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="password"
                      required
                      placeholder="New password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="form-input-erp has-icon-left"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-bold mb-1.5 uppercase tracking-wider">Confirm New Password *</label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="password"
                      required
                      placeholder="Confirm new password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      className="form-input-erp has-icon-left"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button type="submit" className="btn-tech-orange text-xs py-2 px-6 gap-1.5">
                  <Lock className="w-4 h-4" /> Update Password
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Right Column: 2-Factor Authentication (2FA) Security Module */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#0E2A47] p-6 rounded-md border border-[#35A99A]/40 space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#071A2D] pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#35A99A]" />
                <h3 className="text-lg font-bold font-heading text-white uppercase">2-Factor Authentication (2FA)</h3>
              </div>

              {/* 2FA Toggle Switch */}
              <button
                type="button"
                onClick={handle2FAToggle}
                className="bg-transparent border-none cursor-pointer focus:outline-none"
                title={is2FA ? "Disable 2FA" : "Enable 2FA"}
              >
                {is2FA ? (
                  <ToggleRight className="w-10 h-10 text-[#FF6B16] transition-transform scale-110" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-slate-600 hover:text-slate-400" />
                )}
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Two-Factor Authentication adds an extra layer of security to your ERP Administrator account by requiring a 6-digit verification code from your authenticator app during sign-in.
            </p>

            {otpSuccessMsg && (
              <div className="p-3 bg-[#071A2D] border border-[#35A99A] text-[#35A99A] text-xs rounded font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {otpSuccessMsg}
              </div>
            )}

            {is2FA ? (
              <div className="space-y-6 pt-2">
                
                {/* 2FA Method Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-white uppercase tracking-wider">Select 2FA Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTwoFaMethod('authenticator')}
                      className={`p-3 rounded-md text-xs font-bold border cursor-pointer flex flex-col items-center gap-1.5 ${
                        twoFaMethod === 'authenticator'
                          ? 'bg-[#071A2D] border-[#FF6B16] text-[#FF6B16]'
                          : 'bg-[#071A2D]/50 border-slate-700 text-slate-400'
                      }`}
                    >
                      <QrCode className="w-5 h-5" /> Authenticator App
                    </button>
                    <button
                      type="button"
                      onClick={() => setTwoFaMethod('sms')}
                      className={`p-3 rounded-md text-xs font-bold border cursor-pointer flex flex-col items-center gap-1.5 ${
                        twoFaMethod === 'sms'
                          ? 'bg-[#071A2D] border-[#FF6B16] text-[#FF6B16]'
                          : 'bg-[#071A2D]/50 border-slate-700 text-slate-400'
                      }`}
                    >
                      <Smartphone className="w-5 h-5" /> SMS OTP
                    </button>
                  </div>
                </div>

                {/* Authenticator QR Code & Key Box */}
                {twoFaMethod === 'authenticator' && (
                  <div className="bg-[#071A2D] p-5 rounded-md border border-slate-700 space-y-4 text-center">
                    <div className="font-bold text-xs text-white uppercase">Scan with Google Authenticator / Authy</div>
                    
                    {/* Visual QR Code Generator Graphic */}
                    <div className="w-36 h-36 mx-auto bg-white p-2 rounded-md shadow-lg flex items-center justify-center border-2 border-[#1769C2]">
                      <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                        <path d="M0 0h35v35H0zM65 0h35v35H65zM0 65h35v35H0z" fill="#071A2D" />
                        <path d="M5 5h25v25H5zM70 5h25v25H70zM5 70h25v25H5z" fill="#FFF" />
                        <path d="M10 10h15v15H10zM75 10h15v15H75zM10 75h15v15H10z" fill="#FF6B16" />
                        <path d="M40 0h15v15H40zM40 25h20v20H40zM25 40h15v15H25zM65 45h35v15H65zM45 65h15v35H45zM70 70h25v10H70zM80 85h15v15H80z" fill="#1769C2" />
                      </svg>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest">Secret Key (Manual Entry)</div>
                      <div className="font-mono text-xs font-extrabold text-[#35A99A] bg-[#0E2A47] p-2 rounded border border-slate-700">
                        {adminProfile.secretKey}
                      </div>
                    </div>
                  </div>
                )}

                {/* Status Indicator */}
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>2FA Security Guard Active</span>
                </div>

              </div>
            ) : (
              <div className="p-4 bg-[#071A2D] border border-amber-800/40 rounded text-amber-300 text-xs space-y-1">
                <div className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" /> 2FA is currently Disabled
                </div>
                <p className="text-slate-400 text-[11px]">
                  Turn on 2FA above to protect your ERP system against unauthorized access.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
