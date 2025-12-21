import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:3000/api'; // Change to your IP address for physical device

// Helper function to get auth token
const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('authToken');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Helper function to make authenticated requests
const authenticatedFetch = async (url, options = {}) => {
  const token = await getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userData');
    throw new Error('Session expired. Please login again.');
  }

  return response;
};

// ==================== AUTH API ====================

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Store token and user data
      await AsyncStorage.setItem('authToken', data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userData');
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

// ==================== APPOINTMENT API ====================

export const getAllAppointments = async () => {
  try {
    const response = await authenticatedFetch(`${API_URL}/appointments`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get appointments error:', error);
    return { success: false, error: error.message };
  }
};

export const getStudentAppointments = async (studentId) => {
  try {
    const response = await authenticatedFetch(`${API_URL}/appointments/student/${studentId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get student appointments error:', error);
    return { success: false, error: error.message };
  }
};

export const getTutorAppointments = async (tutorId) => {
  try {
    const response = await authenticatedFetch(`${API_URL}/appointments/tutor/${tutorId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get tutor appointments error:', error);
    return { success: false, error: error.message };
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await authenticatedFetch(`${API_URL}/appointments`, {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Create appointment error:', error);
    return { success: false, error: error.message };
  }
};

export const updateAppointment = async (appointmentId, appointmentData) => {
  try {
    const response = await authenticatedFetch(`${API_URL}/appointments/${appointmentId}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Update appointment error:', error);
    return { success: false, error: error.message };
  }
};

export const cancelAppointment = async (appointmentId, cancelReason) => {
  try {
    const response = await authenticatedFetch(`${API_URL}/appointments/${appointmentId}`, {
      method: 'DELETE',
      body: JSON.stringify({ cancelReason }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Cancel appointment error:', error);
    return { success: false, error: error.message };
  }
};

// ==================== USER API ====================

export const getAllStudents = async () => {
  try {
    const response = await authenticatedFetch(`${API_URL}/students`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get students error:', error);
    return { success: false, error: error.message };
  }
};

export const getAllTutors = async () => {
  try {
    const response = await authenticatedFetch(`${API_URL}/tutors`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get tutors error:', error);
    return { success: false, error: error.message };
  }
};

export const getPendingTutors = async () => {
  try {
    const response = await authenticatedFetch(`${API_URL}/tutors/pending`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get pending tutors error:', error);
    return { success: false, error: error.message };
  }
};

export const approveTutor = async (tutorId) => {
  try {
    const response = await authenticatedFetch(`${API_URL}/tutors/${tutorId}/approve`, {
      method: 'PUT',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Approve tutor error:', error);
    return { success: false, error: error.message };
  }
};

export const rejectTutor = async (tutorId) => {
  try {
    const response = await authenticatedFetch(`${API_URL}/tutors/${tutorId}/reject`, {
      method: 'DELETE',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Reject tutor error:', error);
    return { success: false, error: error.message };
  }
};

// ==================== SPECIALIZATION API ====================

export const getTutorSpecializations = async (tutorId) => {
  try {
    const response = await authenticatedFetch(`${API_URL}/specializations/${tutorId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get specializations error:', error);
    return { success: false, error: error.message };
  }
};