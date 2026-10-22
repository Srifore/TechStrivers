import React, { useState } from 'react';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import { DataProvider, useData } from './context/DataContext';
import { PUBLIC_SITE_URL } from './config';

function AdminRoot() {
  const { logout, loading, adminProfile } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('ts_admin_auth') === 'true';
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  const goToPublicSite = () => {
    window.location.href = PUBLIC_SITE_URL;
  };

  // While a remembered session's profile/leads are still being fetched,
  // hold off rendering AdminLayout - its children assume adminProfile is set.
  if (isAuthenticated && loading) {
    return (
      <div className="min-h-screen bg-[#071A2D] flex items-center justify-center text-slate-300 text-sm">
        Loading ERP Portal...
      </div>
    );
  }

  // A stale "remember session" flag with no matching profile means the
  // token was invalid/expired server-side - fall back to the login screen.
  if (!isAuthenticated || !adminProfile) {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onBackToSite={goToPublicSite}
      />
    );
  }

  return (
    <AdminLayout
      onExitAdmin={goToPublicSite}
      onLogout={handleLogout}
    />
  );
}

export default function AdminApp() {
  return (
    <DataProvider>
      <AdminRoot />
    </DataProvider>
  );
}
