import { useState } from "react";
import styles from "./index.module.css";
import clsx from "clsx";

const LoginCard = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative flex h-[425px] w-[700px] overflow-hidden rounded-3xl bg-white shadow-xl">
      {/* Sign In Form */}
      <div className="h-full w-6/12 p-12">
        <h1 className="mb-8 text-3xl font-light text-gray-900">Sign In</h1>
        <form className="flex flex-col gap-6">
          <input className={styles.input} placeholder="Email" type="email" />
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
          />
          <button className={styles.submitButton}>Sign In</button>
        </form>
      </div>

      {/* Sign Up Form */}
      <div className="h-full w-6/12 p-12">
        <h1 className="mb-8 text-3xl font-light text-gray-900">Sign Up</h1>
        <form className="flex flex-col gap-6">
          <input className={styles.input} placeholder="Email" type="email" />
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
          <button className={styles.submitButton}>Create Account</button>
        </form>
      </div>

      {/* Sliding Overlay */}
      <div
        className={clsx(
          "absolute top-0 h-full w-6/12 bg-black p-12 text-white transition-all duration-500 ease-in-out",
          styles.overlay,
          isSignUp && styles.slideLeft,
        )}
      >
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="mb-4 text-3xl font-light">
            {isSignUp ? "Welcome Back" : "Hello, Friend!"}
          </h1>
          <p className="mb-8 max-w-[80%] text-center leading-relaxed text-gray-300">
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
