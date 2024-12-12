import { useState } from "react";
import styles from "./index.module.css";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
console.log('API URL:', API_URL);

const LoginCard = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('Attempting login with:', formData);

    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email: formData.email,
        password: formData.password,
      });

      console.log('Login successful:', response.data);
      if (response.data.userId) {
        localStorage.setItem('userId', response.data.userId);
        navigate('/');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      const error = err as AxiosError<{error: string}>;
      console.error('Login error:', error);
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('Attempting registration with:', formData);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      console.log('Registration successful:', response.data);
      setIsSignUp(false); // Switch to login form
    } catch (err) {
      const error = err as AxiosError<{error: string}>;
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="relative flex h-[425px] w-[700px] overflow-hidden rounded-3xl bg-white shadow-xl">
      {/* Sign In Form */}
      <div className="h-full w-6/12 p-12">
        <h1 className="mb-8 text-3xl font-light text-gray-800">Sign In</h1>
        <form className="flex flex-col gap-14" onSubmit={handleLogin}>
          <input 
            className={styles.input} 
            placeholder="Email" 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required 
          />
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className={styles.submitButton}>Sign In</button>
        </form>
      </div>

      {/* Sign Up Form */}
      <div className="h-full w-6/12 p-12 overflow-auto">
        <h1 className="mb-8 text-3xl font-light text-gray-800">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <input
            className={styles.input}
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            className={styles.input}
            placeholder="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            className={styles.input}
            placeholder="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            className={styles.input}
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Create Account
          </button>
        </form>
      </div>

      {/* Sliding Overlay */}
      <motion.div
        initial={{
          x: 0,
          borderRadius: "80px 30px 30px 80px",
        }}
        animate={{
          x: isSignUp ? "-100%" : "0%",
          borderRadius: isSignUp
            ? "30px 80px 80px 30px"
            : "80px 30px 30px 80px",
        }}
        style={{
          right: 0,
          boxShadow: "-5px 0 15px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ type: "spring", duration: 0.7, bounce: 0 }}
        className="absolute top-0 h-full w-6/12 bg-gray-900 px-4 py-12 text-white"
      >
        <MotionConfig transition={{ duration: 0.6 }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={isSignUp ? "signIn" : "signUp"}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSignUp ? -100 : 100 }}
              className="flex h-full flex-col items-center justify-between"
            >
              <h1 className="mb-4 text-3xl font-light">
                {isSignUp ? "Welcome Back" : "Hello, Friend!"}
              </h1>
              <div className="mb-8 max-w-[80%] text-center leading-relaxed text-gray-300">
                {isSignUp ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-pretty">
                      To keep connected with us please login with your personal
                      info.
                    </p>
                    <p className="text-pretty">
                      Pick up right where you left off and continue your
                      adventure!
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <p className="text-pretty">
                      Enter your personal details and start your journey with
                      us.
                    </p>
                    <p className="text-pretty">
                      Join our community today and discover amazing features!
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className={styles.overlayButton}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </motion.div>
          </AnimatePresence>
        </MotionConfig>
      </motion.div>
    </div>
  );
};

export default LoginCard;
