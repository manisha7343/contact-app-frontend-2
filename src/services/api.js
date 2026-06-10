// Centralized API Service
const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const getToken = () => localStorage.getItem("token");

// ============ CORE REQUEST HELPER ============
// NOTE: Yeh function sirf JSON requests ke liye hai
// FormData wale requests ke liye alag helper hai neeche
const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const token = getToken();

  // Sirf JSON header tab set karo jab body explicitly diya ho
  // aur Content-Type already set na ho (FormData ke liye override se bachne ke liye)
  const headers = { ...options.headers };

  if (!headers["Content-Type"] && options.body && typeof options.body === "string") {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    let data = null;
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      data = await response.json().catch(() => null);
    }

    return { response, data };
  } catch (error) {
    // Network error ya fetch fail
    console.error(`API Request failed [${endpoint}]:`, error);
    return {
      response: { ok: false, status: 0, statusText: "Network Error" },
      data: { message: "Network error. Please check your connection." },
    };
  }
};

// ============ FORMDATA REQUEST HELPER ============
// Explicitly Content-Type set mat karo — browser khud boundary set karta hai
const formDataRequest = async (endpoint, formData) => {
  const url = `${BASE_URL}${endpoint}`;
  const token = getToken();

  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // IMPORTANT: "Content-Type" yahan bilkul mat daalo
  // multipart/form-data mein boundary hoti hai jo browser automatically set karta hai
  // manually set karne par upload fail ho jata hai

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    });

    let data = null;
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      data = await response.json().catch(() => null);
    }

    return { response, data };
  } catch (error) {
    console.error(`FormData Request failed [${endpoint}]:`, error);
    return {
      response: { ok: false, status: 0, statusText: "Network Error" },
      data: { message: "Upload failed. Please check your connection." },
    };
  }
};

// ============ AUTH APIs ============
export const authAPI = {
  login: async (email, password) => {
    return await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (first_name, last_name, email, password) => {
    return await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ first_name, last_name, email, password }),
    });
  },

  forgotPassword: async (email) => {
    return await apiRequest("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token, newPassword) => {
    return await apiRequest(`/auth/reset-password/${token}`, {
      method: "POST",
      body: JSON.stringify({ password: newPassword }),
    });
  },

  verifyEmail: async (token) => {
    return await apiRequest(`/auth/verify-email/${token}`, {
      method: "POST",
    });
  },
};

// ============ USER APIs ============
export const userAPI = {
  getProfile: async () => {
    return await apiRequest("/user/profile", {
      method: "GET",
    });
  },

  updateProfile: async (userData) => {
    // Ensure userData sirf plain object ho, koi File object nahi
    // Agar koi accidentally File bhej raha tha toh yeh usse rok dega
    const safeData = { ...userData };
    delete safeData.profilePic; // File fields hata do agar koi bheja ho

    return await apiRequest("/user/profile", {
      method: "PUT",
      body: JSON.stringify(safeData),
    });
  },

  uploadProfileImage: async (file) => {
    // Validate karo pehle
    if (!file) {
      return {
        response: { ok: false, status: 400 },
        data: { message: "No file provided" },
      };
    }

    // File type check (optional but helpful)
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return {
        response: { ok: false, status: 400 },
        data: { message: "Only image files are allowed (JPEG, PNG, GIF, WEBP)" },
      };
    }

    const formData = new FormData();
    formData.append("profilePic", file);

    return await formDataRequest("/user/upload-profile-pic", formData);
  },
};

// ============ CONTACT APIs ============
export const contactAPI = {
  getContacts: async (page = 1, search = "") => {
    const params = new URLSearchParams({ page, search }).toString();
    return await apiRequest(`/contacts?${params}`, {
      method: "GET",
    });
  },

  createContact: async (contactData) => {
    return await apiRequest("/contacts/", {
      method: "POST",
      body: JSON.stringify(contactData),
    });
  },

  updateContact: async (contactId, contactData) => {
    return await apiRequest(`/contacts/${contactId}`, {
      method: "PUT",
      body: JSON.stringify(contactData),
    });
  },

  deleteContact: async (contactId) => {
    return await apiRequest(`/contacts/${contactId}`, {
      method: "PUT",
      body: JSON.stringify({ isDeleted: true }),
    });
  },
};

// Main wrapper export
const apiService = {
  auth: authAPI,
  user: userAPI,
  contact: contactAPI,
};

export default apiService;