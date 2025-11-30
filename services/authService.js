// API Base URL - Update this to match your local network IP when testing on a physical device
// For Android Emulator: use 10.0.2.2
// For iOS Simulator: use localhost
// For Physical Device: use your computer's local IP (e.g., 192.168.1.xxx)
const API_BASE_URL = "http://10.0.2.2/phpauthsystem/api";
/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Response object with success status and data
 */
export const login = async (email, password) => {
  try {
    console.log('Attempting login to:', `${API_BASE_URL}/login.php`);
    console.log('Request body:', { email, password: '***' });

    const response = await fetch(`${API_BASE_URL}/login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    // Get the raw response text first
    const responseText = await response.text();
    console.log('Raw response:', responseText);

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse JSON. Response was:', responseText);
      throw new Error('Server returned invalid response. Please check if the API is running correctly.');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Register a new user
 * @param {string} name - User full name
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Response object with success status and data
 */
export const register = async (username, email, password) => {
  try {
    console.log('Attempting registration to:', `${API_BASE_URL}/register.php`);
    console.log('Request body:', { username, email, password: '***' });

    const response = await fetch(`${API_BASE_URL}/register.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    console.log('Response status:', response.status);

    // Get the raw response text first
    const responseText = await response.text();
    console.log('Raw response:', responseText);

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse JSON. Response was:', responseText);
      throw new Error('Server returned invalid response. Please check if the API is running correctly.');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
