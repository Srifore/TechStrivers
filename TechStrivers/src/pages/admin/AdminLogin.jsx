import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff, KeyRound, QrCode } from 'lucide-react';
import TechStriversLogo from '../../components/TechStriversLogo';
import { useData } from '../../context/DataContext';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const { adminProfile } = useData();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // 2FA state step
  const [step, setStep] = useState('credentials'); // 'credentials' | '2fa'
  const [otp, setOtp] = useState('');

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    const targetEmail = (adminProfile?.email || 'admin@techstrivers.in').trim().toLowerCase();
    const targetPass = adminProfile?.password || 'admin123';

    if (email.trim().toLowerCase() === targetEmail && password === targetPass) {
      setErrorMsg('');
      if (adminProfile?.twoFactorEnabled) {
        setStep('2fa');
      } else {
        onLoginSuccess();
      }
    } else {
      setErrorMsg('Invalid administrator credentials. Please try again.');
    }
  };

  const handle2FASubmit = (e) => {
    e.preventDefault();
    if (otp.trim() === '123456') {
      setErrorMsg('');
      onLoginSuccess();
    } else {
      setErrorMsg('Invalid 2FA Verification Code. Enter 6-digit authenticator code (e.g. 123456).');
    }
  };

  return (
    <div className="min-h-screen bg-[#071A2D] bg-tech-grid text-white flex flex-col justify-between p-4 sm:p-6 font-sans">
      
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <TechStriversLogo variant="light" size="sm" />

        <button
          onClick={onBackToSite}
          className="btn-tech-dark text-xs py-2 px-4"
        >
          ← Return to Website
        </button>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-[#0E2A47] border border-[#1769C2]/40 rounded-lg p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B16] via-[#1769C2] to-[#35A99A]" />

          {/* Card Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-md bg-[#071A2D] border border-[#1769C2]/50 text-[#FF6B16] flex items-center justify-center mx-auto shadow-inner">
              {step === '2fa' ? <KeyRound className="w-6 h-6 text-[#35A99A]" /> : <ShieldCheck className="w-6 h-6 text-[#FF6B16]" />}
            </div>
            <h2 className="text-2xl font-black font-heading text-white tracking-wide uppercase">
              {step === '2fa' ? '2-FACTOR AUTHENTICATION' : 'ADMINISTRATOR LOGIN'}
            </h2>
            <p className="text-xs text-slate-300">
              {step === '2fa'
                ? `Enter 6-digit OTP code from your ${adminProfile?.twoFactorMethod === 'sms' ? 'SMS' : 'Authenticator App'} to verify login.`
                : 'Sign in to access the TechStrivers ERP Admin Management Portal.'}
            </p>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs rounded-md flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Step 1: Credentials */}
          {step === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                  Admin Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input-erp has-icon-left"
                    placeholder="admin@techstrivers.in"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input-erp has-icon-left pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-transparent border-none cursor-pointer p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-[#071A2D] border-slate-700 text-[#FF6B16] focus:ring-0"
                  />
                  <span>Remember session</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-tech-orange justify-center py-3 text-sm font-extrabold uppercase tracking-wider"
                >
                  Sign In to ERP Panel <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

            </form>
          )}

          {/* Step 2: 2FA Verification */}
          {step === '2fa' && (
            <form onSubmit={handle2FASubmit} className="space-y-4 text-xs">
              <div className="p-3 bg-[#071A2D] border border-[#35A99A]/50 rounded text-slate-300 text-xs flex items-center gap-3">
                <QrCode className="w-8 h-8 text-[#35A99A] shrink-0" />
                <div>
                  <div className="font-bold text-white uppercase text-[10px] tracking-wider">2FA Guard Activated</div>
                  <div className="text-[11px] text-slate-400">Enter the current code from your authenticator app to continue.</div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider">
                  6-Digit Verification OTP Code *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="e.g. 123456"
                    className="w-full bg-[#071A2D] border border-slate-700 rounded-md pl-9 pr-4 py-2.5 text-sm font-mono tracking-widest text-center text-[#35A99A] focus:outline-none focus:border-[#35A99A]"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="btn-tech-dark py-2.5 text-xs flex-1 justify-center"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="btn-tech-orange py-2.5 text-xs flex-2 justify-center font-bold uppercase tracking-wider"
                >
                  Verify & Enter ERP <ShieldCheck className="w-4 h-4 ml-1" />
                </button>
              </div>
            </form>
          )}

        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-slate-500 py-2">
        © 2024 TechStrivers ERP Management Portal · All Rights Reserved
      </div>

    </div>
  );
}
