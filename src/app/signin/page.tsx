"use client";
import { useState, FormEvent } from "react";
import { User } from "../../models/users";
import { signIn } from "../../services/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faInstagram } from "@fortawesome/free-brands-svg-icons";

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
    // Clear error when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form
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
      // 1. Store the token in localStorage/cookies
      localStorage.setItem("access_token", passport.token.access_token);
      localStorage.setItem("refresh_token", passport.token.refresh_token);

      window.location.href = "/";
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
    <div className="min-h-screen w-full bg-surface flex items-center justify-center">
      <div className="w-full max-w-md px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-black rounded-lg shadow-lg p-8 gap-6"
          noValidate
        >
          <div className="flex items-center justify-center gap-4">
            <FontAwesomeIcon icon={faGoogle} />
            <FontAwesomeIcon icon={faInstagram} />
          </div>
          <h2 className="text-2xl font-bold text-center text-white">Sign In</h2>

          {errors.general && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-2 rounded text-sm">
              {errors.general}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-thin text-white">
              Email
            </label>
            <div
              className={`flex items-center border rounded-lg focus:border-purple_dark_mode ${errors.email ? "border-red-500" : "border-gray-700"}`}
            >
              <FontAwesomeIcon icon={faUser} className="p-2" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email..."
                className="w-full bg-black text-white py-3 text-sm rounded-lg focus:outline-none"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-thin text-white">
              Password
            </label>
            <div
              className={`flex items-center rounded-lg border focus:border-purple_dark_mode ${errors.password ? "border-red-500" : "border-gray-700"}`}
            >
              <FontAwesomeIcon icon={faLock} className="p-2" />
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password..."
                className="w-full bg-black text-white py-3 text-sm rounded-lg border-none focus:outline-none"
                disabled={isLoading}
              />
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-purple_dark_mode hover:bg-blue_dark_mode text-white px-6 py-3 rounded-lg text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
