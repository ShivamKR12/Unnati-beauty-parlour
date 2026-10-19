// Unnati Beauty - Core JS Utils & API calls
const API_BASE = 'http://localhost:5000/api';

let currentUser = null;
let token = localStorage.getItem('token') || null;

// Check auth on load
if (token) {
  checkAuth();
}

async function checkAuth() {
  try {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      currentUser = await res.json();
      updateUIForAuth();
    } else {
      logout();
    }
  } catch (err) {
    logout();
  }
}

function updateUIForAuth() {
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.textContent = `Hi, ${currentUser.name}`;
    loginBtn.onclick = logout;
  }
  // Show dashboard links etc.
}

function login(tokenData) {
  token = tokenData.token;
  currentUser = tokenData.user;
  localStorage.setItem('token', token);
  updateUIForAuth();
  // Redirect based on page
}

function logout() {
  token = null;
  currentUser = null;
  localStorage.removeItem('token');
}

// API Helpers
async function apiCall(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };
  const res = await fetch(`${API_BASE}${endpoint}`, config);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.msg || 'API error');
  }
  return res.json();
}

// Services
async function getServices() {
  return apiCall('/services');
}

async function createService(data) {
  return apiCall('/services', { method: 'POST', body: JSON.stringify(data) });
}

// Products
async function getProducts() {
  return apiCall('/products');
}

// Bookings
async function getBookings() {
  return apiCall('/bookings');
}

async function createBooking(data) {
  return apiCall('/bookings', { method: 'POST', body: JSON.stringify(data) });
}

// Auth
async function registerCustomer(data) {
  const res = await apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  login(res);
  return res;
}

async function loginCustomer(email, password) {
  const res = await fetch(`${API_BASE}/auth/login-customer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Invalid credentials');
  const data = await res.json();
  login(data);
}

async function loginAdmin(email, password) {
  const res = await fetch(`${API_BASE}/auth/login-admin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Invalid admin credentials');
  const data = await res.json();
  login(data);
}

// Show loading
function showLoading(btn) {
  btn.innerHTML = '<span class="loading"></span> Loading...';
  btn.disabled = true;
}

function hideLoading(btn, text) {
  btn.innerHTML = text;
  btn.disabled = false;
}

// Show modal
function showModal(id) {
  document.getElementById(id).style.display = 'block';
}

function hideModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Form submit helper
function handleFormSubmit(formId, callback) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type=\"submit\"]');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    showLoading(submitBtn);
    try {
      await callback(data);
    } catch (err) {
      alert(err.message);
    } finally {
      hideLoading(submitBtn, 'Submit');
    }
  });
}

// Export for page scripts
window.App = {
  apiCall, getServices, getProducts, getBookings, createBooking,
  registerCustomer, loginCustomer, loginAdmin,
  login, logout, currentUser, checkAuth,
  showModal, hideModal, handleFormSubmit
};

