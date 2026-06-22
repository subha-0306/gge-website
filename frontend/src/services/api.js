// API client using fetch
// Automatically handles JWT token authorization headers and 401 Unauthorized responses (token expiration)

const rawBase = import.meta.env.VITE_API_URL || "https://gge-oisn.onrender.com/api";
const baseUrl = rawBase.replace(/\/+$/, "");
const API_URL = baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;

const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("gge_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (response.status === 401) {
    // Expired or invalid token — log out and redirect
    localStorage.removeItem("gge_token");
    localStorage.removeItem("gge_admin");
    if (window.location.pathname !== "/admin/login") {
      window.location.href = "/admin/login?expired=true";
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Session expired. Please login again.");
  }

  let data = {};
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json().catch(() => ({}));
  } else {
    const text = await response.text().catch(() => "");
    data = { message: text || `Server error (${response.status})` };
  }

  if (!response.ok) {
    throw new Error(data.message || "An error occurred");
  }
  return data;
};

// ── Public Endpoints ──
export const submitEnquiry = async (formData) => {
  const res = await fetch(`${API_URL}/enquiries`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(formData),
  });
  return handleResponse(res);
};

export const adminLogin = async (credentials) => {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
};

// ── Admin Endpoints (Require Auth) ──
export const getEnquiries = async (params = {}) => {
  const query = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
      query.append(key, params[key]);
    }
  });

  const res = await fetch(`${API_URL}/enquiries?${query.toString()}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getEnquiry = async (id) => {
  const res = await fetch(`${API_URL}/enquiries/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const updateStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/enquiries/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
};

export const updatePriority = async (id, priority) => {
  const res = await fetch(`${API_URL}/enquiries/${id}/priority`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ priority }),
  });
  return handleResponse(res);
};

export const addNote = async (id, text) => {
  const res = await fetch(`${API_URL}/enquiries/${id}/notes`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ text }),
  });
  return handleResponse(res);
};

export const editNote = async (id, noteId, text) => {
  const res = await fetch(`${API_URL}/enquiries/${id}/notes/${noteId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ text }),
  });
  return handleResponse(res);
};

export const deleteNote = async (id, noteId) => {
  const res = await fetch(`${API_URL}/enquiries/${id}/notes/${noteId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const updateFollowUp = async (id, data) => {
  const res = await fetch(`${API_URL}/enquiries/${id}/followup`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteEnquiry = async (id) => {
  const res = await fetch(`${API_URL}/enquiries/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(res);
};

// ── Admin Analytics ──
export const getStats = async (params = {}) => {
  const query = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
      query.append(key, params[key]);
    }
  });
  const res = await fetch(`${API_URL}/analytics?${query.toString()}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getMonthlyLeads = async (params = {}) => {
  const query = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
      query.append(key, params[key]);
    }
  });
  const res = await fetch(`${API_URL}/analytics/monthly?${query.toString()}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getServiceLeads = async (params = {}) => {
  const query = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
      query.append(key, params[key]);
    }
  });
  const res = await fetch(`${API_URL}/analytics/services?${query.toString()}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(res);
};

// ── CSV Export ──
export const exportCSV = async (params = {}) => {
  const query = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
      query.append(key, params[key]);
    }
  });

  const response = await fetch(`${API_URL}/export/csv?${query.toString()}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (response.status === 401) {
    localStorage.removeItem("gge_token");
    localStorage.removeItem("gge_admin");
    window.location.href = "/admin/login?expired=true";
    throw new Error("Session expired");
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Could not export CSV");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `GGE_Leads_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};

// ── Admin Notifications ──
export const getNotifications = async () => {
  const res = await fetch(`${API_URL}/notifications`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const markAsRead = async (id) => {
  const res = await fetch(`${API_URL}/notifications/${id}/read`, {
    method: "PATCH",
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const markAllAsRead = async () => {
  const res = await fetch(`${API_URL}/notifications/read-all`, {
    method: "PATCH",
    headers: getHeaders(),
  });
  return handleResponse(res);
};
