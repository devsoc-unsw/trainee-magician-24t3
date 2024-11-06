import { useState } from "react";
import styles from "./index.module.css";
import clsx from "clsx";

const LoginCard = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative flex w-[700px] h-[425px] shadow-xl rounded-3xl overflow-hidden bg-white">
      {/* Sign In Form */}
      <div className="w-6/12 h-full p-12">
        <h1 className="text-3xl font-light mb-8 text-gray-900">Sign In</h1>
        <form className="flex flex-col gap-6">
          <input 
            className={styles.input}
            placeholder="Email"
            type="email"
          />
          <input 
            className={styles.input}
            placeholder="Password"
            type="password"
          />
          <button className={styles.submitButton}>
            Sign In
          </button>
        </form>
      </div>

      {/* Sign Up Form */}
      <div className="w-6/12 h-full p-12">
        <h1 className="text-3xl font-light mb-8 text-gray-900">Sign Up</h1>
        <form className="flex flex-col gap-6">
          <input 
            className={styles.input}
            placeholder="Email"
            type="email"
          />
          <input 
            className={styles.input}
            placeholder="Password"
            type="password"
          />
          <input 
            className={styles.input}
            placeholder="Confirm password"
            type="password"
          />
          <button className={styles.submitButton}>
            Create Account
          </button>
        </form>
      </div>

      {/* Sliding Overlay */}
      <div 
        className={clsx(
          "absolute top-0 w-6/12 h-full bg-black text-white p-12 transition-all duration-500 ease-in-out",
          styles.overlay,
          isSignUp && styles.slideLeft
        )}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-light mb-4">
            {isSignUp ? "Welcome Back" : "Hello, Friend!"}
          </h1>
          <p className="mb-8 text-center text-gray-300 max-w-[80%] leading-relaxed">
            {isSignUp 
              ? "To keep connected with us please login with your personal info" 
              : "Enter your personal details and start your journey with us"}
          </p>
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className={styles.overlayButton}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
