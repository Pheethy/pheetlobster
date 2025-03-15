"use client";

import { useState, FormEvent } from "react";
import { User } from "../../models/users";
import { signIn } from "../../services/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEye,
  faEyeSlash,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import StartShopingModal from "../../components/modals/start-shopping";

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function SignIn() {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string>("");
  const [showLoginSuccessModal, setShowLoginSuccessModal] = useState(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const user: User = {
        id: "",
        username: formData.email.split("@")[0],
        email: formData.email,
        password: formData.password,
        role: "user",
        images: [],
        created_at: "",
        updated_at: "",
      };

      const passport = await signIn(user);
      localStorage.setItem("access_token", passport.token.access_token);
      localStorage.setItem("refresh_token", passport.token.refresh_token);
      setShowLoginSuccessModal(true);
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "An error occurred during sign in",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-start justify-center p-4">
      {showLoginSuccessModal && (
        <StartShopingModal onClose={() => setShowLoginSuccessModal(false)} />
      )}
      <div className="max-w-md w-full">
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-lg bg-gray-700/30 rounded-2xl shadow-2xl p-8 space-y-8 mt-36"
          noValidate
        >
          {/* Header Section */}
          <div className="text-center space-y-2">
            <div className="inline-block p-3 rounded-full bg-purple-500/10 mb-2">
              <img src="/imppily.gif" alt="imppily" className="w-48 h-48" />
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 text-sm">
              Sign in to continue your journey
            </p>
          </div>

          {/* Social Login Section */}
          <div className="flex justify-center gap-6">
            <button
              type="button"
              className="p-3 rounded-full bg-purple-500/10 hover:bg-purple-500/20 transition duration-300 group"
            >
              <FontAwesomeIcon
                icon={faGoogle}
                className="text-xl text-purple-400 group-hover:scale-110 transition duration-300"
              />
            </button>
            <button
              type="button"
              className="p-3 rounded-full bg-purple-500/10 hover:bg-purple-500/20 transition duration-300 group"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-xl text-purple-400 group-hover:scale-110 transition duration-300"
              />
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black/30 text-gray-400">
                or continue with
              </span>
            </div>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl text-sm">
              {errors.general}
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-400 block">
                Email Address
              </label>
              <div
                className={`group relative border-2 rounded-xl transition-all duration-300 
                ${
                  focusedField === "email"
                    ? "border-purple-500 bg-purple-500/5"
                    : errors.email
                      ? "border-red-500 bg-red-500/5"
                      : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className={`transition-colors duration-300 
                      ${
                        focusedField === "email"
                          ? "text-purple-400"
                          : errors.email
                            ? "text-red-400"
                            : "text-gray-500"
                      }`}
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  placeholder="name@example.com"
                  className="w-full bg-transparent text-white pl-10 pr-4 py-3 text-sm rounded-xl focus:outline-none"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-xs pl-1">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-400 block">
                Password
              </label>
              <div
                className={`group relative border-2 rounded-xl transition-all duration-300 
                ${
                  focusedField === "password"
                    ? "border-purple-500 bg-purple-500/5"
                    : errors.password
                      ? "border-red-500 bg-red-500/5"
                      : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <FontAwesomeIcon
                    icon={faLock}
                    className={`transition-colors duration-300 
                      ${
                        focusedField === "password"
                          ? "text-purple-400"
                          : errors.password
                            ? "text-red-400"
                            : "text-gray-500"
                      }`}
                  />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-white pl-10 pr-12 py-3 text-sm rounded-xl focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs pl-1">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                Forgot your password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl font-medium 
                hover:bg-purple-700 focus:bg-purple-700 focus:outline-none
                transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                shadow-lg hover:shadow-purple-500/25
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
