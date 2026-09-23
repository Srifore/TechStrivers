import React, { useState } from 'react';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import { DataProvider } from './context/DataContext';
import { PUBLIC_SITE_URL } from './config';

function AdminRoot() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('ts_admin_auth') === 'true';
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('ts_admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ts_admin_auth');
  };

  const goToPublicSite = () => {
    window.location.href = PUBLIC_SITE_URL;
  };

  if (!isAuthenticated) {
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
