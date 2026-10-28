// ============================================================
// Delta Agrimech — Admin Authentication Utilities
// ============================================================

const TOKEN_KEY = 'delta_agrimech_admin_token';
const USER_KEY = 'delta_agrimech_admin_user';

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getAdminUser() {
  const user = localStorage.getItem(USER_KEY);
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch (e) {
    return null;
  }
}

export function setAdminAuth(token, admin) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(admin));
}

export function clearAdminAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAdminAuthenticated() {
  const token = getAdminToken();
  if (!token) return false;
  try {
    // Simple client-side expiry check for JWT
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return false;
    const payload = JSON.parse(atob(payloadBase64));
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      clearAdminAuth();
      return false;
    }
    return true;
  } catch (err) {
    clearAdminAuth();
    return false;
  }
}

export async function adminLogin(username, password) {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Authentication failed. Please check your credentials.');
  }

  setAdminAuth(data.token, data.admin);
  return data;
}

export async function adminFetch(endpoint, options = {}) {
  const token = getAdminToken();
  if (!token) {
    clearAdminAuth();
    throw new Error('Not authenticated');
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...(options.headers || {}),
  };

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearAdminAuth();
    window.location.href = '/admin/login?expired=1';
    throw new Error('Session expired. Please log in again.');
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'API request failed.');
  }

  return data;
}
