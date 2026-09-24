import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, adminLogin, verifyOTP, resendOTP } from "../services/api.js";

const AuthContext = createContext(null);

const STORAGE_KEY = "timecybermedia_auth"
function loadStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, token: null };

    const parsed = JSON.parse(raw);

    // Ensure the parsed JSON is actually an object and not a primitive string/boolean/number
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }

    return { user: null, token: null };
  } catch {
    return { user: null, token: null };
  }
}


function storeAuth(value) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    const { user: storedUser, token: storedToken } = loadStoredAuth();
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setInitialised(true);
  }, []);

  const handleAuthSuccess = (payload) => {
    const { user: nextUser, token: nextToken } = payload;
    setUser(nextUser);
    setToken(nextToken);
    storeAuth({ user: nextUser, token: nextToken });
  };

  const login = async (email, password) => {
    try {
      // 1. Try to make the API call
      const data = await loginUser({ email, password });

      // 2. If successful, update storage and state
      handleAuthSuccess(data);
      return data;

    } catch (error) {
      // 3. Catch bad passwords or network errors here
      console.error("Login failed:", error.response?.data || error.message);

      // Re-throw or return an error object so your UI can display a message
      throw error;
    }
  };

  const register = async (name, email, password, secretCode) => {
    try {
      const data = await registerUser({ name, email, password, secretCode });

      // Registration successful! The component calling this can now safely
      // navigate to the OTP verification page.
      return data;

    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      // Throwing the error lets your form component catch it and display a 
      // "Email already exists" or "Invalid secret code" alert.
      throw error;
    }
  };



  const verifyEmail = async (email, otp) => {
    const data = await verifyOTP({ email, otp });
    handleAuthSuccess(data);
    return data;
  };

  const resendVerificationOTP = async (email) => {
    return await resendOTP({ email });
  };

  const loginAsAdmin = async (email, password) => {
    const data = await adminLogin({ email, password });
    handleAuthSuccess(data);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    user,
    token,
    initialised,
    isAuthenticated: Boolean(user && token),
    login,
    register,
    verifyEmail,
    resendVerificationOTP,
    setExternalAuth: handleAuthSuccess,
    loginAsAdmin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}







