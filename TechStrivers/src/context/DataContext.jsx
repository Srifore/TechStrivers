import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config';

const DataContext = createContext();

const TOKEN_KEY = 'ts_admin_token';
const REQUEST_TIMEOUT_MS = 15000;

async function apiFetch(path, { method = 'GET', body, auth = false } = {}) {
  // Only send Content-Type when there is a body: on a plain GET it turns the
  // request into a non-simple CORS request and doubles it with a preflight.
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  // A request that never settles would leave the ERP stuck on its loading
  // screen forever, so abort anything that takes too long.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  let res;
  try {
    res = await fetch(`${API_BASE_URL}/${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: 'no-store',
      signal: controller.signal,
    });
  } catch (err) {
    if (err.name === 'AbortError') throw new Error(`Request timed out (${path})`);
    throw new Error(`Network error - could not reach the server (${path})`);
  } finally {
    clearTimeout(timer);
  }

  if (res.status === 401 && auth) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('ts_admin_auth');
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // no JSON body
  }

  if (!res.ok) {
    const message = (data && data.error) || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}

export function DataProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [adminProfile, setAdminProfile] = useState(null);
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [internships, setInternships] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [gallery, setGallery] = useState([]);

  const isAuthenticated = () => !!localStorage.getItem(TOKEN_KEY);

  const loadPublicData = useCallback(async () => {
    const [projectsRes, coursesRes, internshipsRes, workshopsRes, blogsRes, galleryRes] = await Promise.all([
      apiFetch('projects.php'),
      apiFetch('courses.php'),
      apiFetch('internships.php'),
      apiFetch('workshops.php'),
      apiFetch('blogs.php'),
      apiFetch('gallery.php'),
    ]);
    setProjects(projectsRes || []);
    setCourses(coursesRes || []);
    setInternships(internshipsRes || []);
    setWorkshops(workshopsRes || []);
    setBlogs(blogsRes || []);
    setGallery(galleryRes || []);
  }, []);

  const loadAdminData = useCallback(async () => {
    if (!isAuthenticated()) return;
    try {
      const [profileRes, leadsRes] = await Promise.all([
        apiFetch('profile.php', { auth: true }),
        apiFetch('leads.php', { auth: true }),
      ]);
      setAdminProfile(profileRes);
      setLeads(leadsRes || []);
    } catch (err) {
      console.warn('Failed to load admin data:', err.message);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([loadPublicData(), loadAdminData()]);
      } catch (err) {
        console.error('Failed to load site data:', err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [loadPublicData, loadAdminData]);

  // --- Auth ---
  const login = async (email, password, otp) => {
    const res = await apiFetch('auth.php', { method: 'POST', body: { email, password, otp } });
    if (res.token) {
      localStorage.setItem(TOKEN_KEY, res.token);
      localStorage.setItem('ts_admin_auth', 'true');
      setAdminProfile(res.profile);
      await apiFetch('leads.php', { auth: true }).then(setLeads).catch(() => {});
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('ts_admin_auth');
    setAdminProfile(null);
    setLeads([]);
  };

  // --- Admin Profile ---
  const updateAdminProfile = async (data) => {
    await apiFetch('profile.php', { method: 'PUT', auth: true, body: data });
    setAdminProfile(prev => ({ ...prev, ...data }));
  };

  const updateAdminPassword = async (currentPass, newPass) => {
    const res = await apiFetch('profile.php?action=password', {
      method: 'PUT',
      auth: true,
      body: { currentPassword: currentPass, newPassword: newPass },
    });
    return res;
  };

  // 2FA is enabled in two steps: setup issues a fresh secret (still disabled),
  // confirm verifies a code from the authenticator app and switches it on.
  const start2FASetup = async (method = 'authenticator') => {
    return apiFetch('profile.php?action=2fa-setup', { method: 'PUT', auth: true, body: { method } });
  };

  const confirm2FA = async (code) => {
    const res = await apiFetch('profile.php?action=2fa-confirm', { method: 'PUT', auth: true, body: { code } });
    if (res.success) {
      setAdminProfile(prev => ({ ...prev, twoFactorEnabled: true, twoFactorMethod: 'authenticator' }));
    }
    return res;
  };

  const disable2FA = async () => {
    await apiFetch('profile.php?action=2fa-disable', { method: 'PUT', auth: true });
    setAdminProfile(prev => ({ ...prev, twoFactorEnabled: false }));
  };

  // --- Lead Methods ---
  const addLead = async (leadData) => {
    const newLead = await apiFetch('leads.php', { method: 'POST', body: leadData });
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = async (id, newStatus, newNote) => {
    await apiFetch(`leads.php?id=${encodeURIComponent(id)}`, {
      method: 'PUT',
      auth: true,
      body: { status: newStatus, notes: newNote },
    });
    setLeads(prev => prev.map(lead =>
      lead.id === id ? { ...lead, status: newStatus, notes: newNote !== undefined ? newNote : lead.notes } : lead
    ));
  };

  const deleteLead = async (id) => {
    await apiFetch(`leads.php?id=${encodeURIComponent(id)}`, { method: 'DELETE', auth: true });
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  // --- Project Methods ---
  const addProject = async (projectData) => {
    const newProj = await apiFetch('projects.php', { method: 'POST', auth: true, body: projectData });
    setProjects(prev => [newProj, ...prev]);
  };

  const updateProject = async (id, projectData) => {
    await apiFetch(`projects.php?id=${encodeURIComponent(id)}`, { method: 'PUT', auth: true, body: projectData });
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...projectData } : p));
  };

  const deleteProject = async (id) => {
    await apiFetch(`projects.php?id=${encodeURIComponent(id)}`, { method: 'DELETE', auth: true });
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // --- Course Methods ---
  const addCourse = async (courseData) => {
    const newCourse = await apiFetch('courses.php', { method: 'POST', auth: true, body: courseData });
    setCourses(prev => [newCourse, ...prev]);
  };

  const updateCourse = async (id, courseData) => {
    await apiFetch(`courses.php?id=${encodeURIComponent(id)}`, { method: 'PUT', auth: true, body: courseData });
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...courseData } : c));
  };

  const deleteCourse = async (id) => {
    await apiFetch(`courses.php?id=${encodeURIComponent(id)}`, { method: 'DELETE', auth: true });
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  // --- Internship Methods ---
  const addInternship = async (data) => {
    const item = await apiFetch('internships.php', { method: 'POST', auth: true, body: data });
    setInternships(prev => [item, ...prev]);
  };

  const updateInternship = async (id, data) => {
    await apiFetch(`internships.php?id=${encodeURIComponent(id)}`, { method: 'PUT', auth: true, body: data });
    setInternships(prev => prev.map(i => i.id === id ? { ...i, ...data } : i));
  };

  const deleteInternship = async (id) => {
    await apiFetch(`internships.php?id=${encodeURIComponent(id)}`, { method: 'DELETE', auth: true });
    setInternships(prev => prev.filter(i => i.id !== id));
  };

  // --- Workshop Methods ---
  const addWorkshop = async (data) => {
    const item = await apiFetch('workshops.php', { method: 'POST', auth: true, body: data });
    setWorkshops(prev => [item, ...prev]);
  };

  const updateWorkshop = async (id, data) => {
    await apiFetch(`workshops.php?id=${encodeURIComponent(id)}`, { method: 'PUT', auth: true, body: data });
    setWorkshops(prev => prev.map(w => w.id === id ? { ...w, ...data } : w));
  };

  const deleteWorkshop = async (id) => {
    await apiFetch(`workshops.php?id=${encodeURIComponent(id)}`, { method: 'DELETE', auth: true });
    setWorkshops(prev => prev.filter(w => w.id !== id));
  };

  // --- Blog Methods ---
  const addBlog = async (blogData) => {
    const payload = {
      slug: blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      publishDate: new Date().toISOString().substring(0, 10),
      readTime: '5 min read',
      status: 'Published',
      ...blogData,
    };
    const newBlog = await apiFetch('blogs.php', { method: 'POST', auth: true, body: payload });
    setBlogs(prev => [newBlog, ...prev]);
  };

  const updateBlog = async (id, blogData) => {
    await apiFetch(`blogs.php?id=${encodeURIComponent(id)}`, { method: 'PUT', auth: true, body: blogData });
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...blogData } : b));
  };

  const deleteBlog = async (id) => {
    await apiFetch(`blogs.php?id=${encodeURIComponent(id)}`, { method: 'DELETE', auth: true });
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  // --- Gallery Methods ---
  const addGalleryItem = async (galleryData) => {
    const payload = { date: new Date().toISOString().substring(0, 10), ...galleryData };
    const newItem = await apiFetch('gallery.php', { method: 'POST', auth: true, body: payload });
    setGallery(prev => [newItem, ...prev]);
    return newItem;
  };

  const updateGalleryItem = async (id, galleryData) => {
    await apiFetch(`gallery.php?id=${encodeURIComponent(id)}`, { method: 'PUT', auth: true, body: galleryData });
    setGallery(prev => prev.map(item => item.id === id ? { ...item, ...galleryData } : item));
  };

  const deleteGalleryItem = async (id) => {
    await apiFetch(`gallery.php?id=${encodeURIComponent(id)}`, { method: 'DELETE', auth: true });
    setGallery(prev => prev.filter(item => item.id !== id));
  };

  return (
    <DataContext.Provider value={{
      loading,
      adminProfile,
      login,
      logout,
      updateAdminProfile,
      updateAdminPassword,
      start2FASetup,
      confirm2FA,
      disable2FA,
      leads,
      projects,
      courses,
      internships,
      workshops,
      blogs,
      gallery,
      addLead,
      updateLeadStatus,
      deleteLead,
      addProject,
      updateProject,
      deleteProject,
      addCourse,
      updateCourse,
      deleteCourse,
      addInternship,
      updateInternship,
      deleteInternship,
      addWorkshop,
      updateWorkshop,
      deleteWorkshop,
      addBlog,
      updateBlog,
      deleteBlog,
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
