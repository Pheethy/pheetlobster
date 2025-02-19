"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodepen } from "@fortawesome/free-brands-svg-icons";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faImage,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

interface FormState {
  email: string;
  password: string;
  comfirm_password: string;
  profilePicture: File | null;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
    comfirm_password: "",
    profilePicture: null,
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;

    if (id === "profilePicture" && files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({
          ...prev,
          profilePicture: file,
        }));
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        alert("กรุณาอัพโหลดไฟล์รูปภาพเท่านั้น");
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [id === "confirm-password" ? "comfirm_password" : id]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <form className="backdrop-blur-lg bg-black/30 rounded-2xl shadow-2xl p-8 space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <div className="inline-block p-3 rounded-full bg-purple-500/10 mb-2">
              <FontAwesomeIcon
                icon={faCodepen}
                className="text-3xl text-purple-400"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">
              Create Your Account
            </h1>
            <p className="text-gray-400 text-sm">
              Join us and start your journey
            </p>
          </div>

          {/* Profile Picture Section */}
          <div className="flex justify-center">
            <label htmlFor="profilePicture" className="cursor-pointer group">
              <div className="w-32 h-32 rounded-full border-2 border-purple-500/30 bg-purple-500/5 flex items-center justify-center overflow-hidden group-hover:border-purple-400 group-hover:scale-105 transition duration-300">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <FontAwesomeIcon
                      icon={faImage}
                      className="text-3xl text-purple-400 group-hover:scale-110 transition duration-300"
                    />
                    <span className="text-xs text-purple-400">Add Photo</span>
                  </div>
                )}
              </div>
            </label>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
            />
          </div>

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
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className={`transition-colors duration-300 
                      ${focusedField === "email" ? "text-purple-400" : "text-gray-500"}`}
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  placeholder="name@example.com"
                  className="w-full bg-transparent text-white pl-10 pr-4 py-3 text-sm rounded-xl focus:outline-none"
                />
              </div>
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
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <FontAwesomeIcon
                    icon={faLock}
                    className={`transition-colors duration-300 
                      ${focusedField === "password" ? "text-purple-400" : "text-gray-500"}`}
                  />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-white pl-10 pr-12 py-3 text-sm rounded-xl focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="text-sm text-gray-400 block"
              >
                Confirm Password
              </label>
              <div
                className={`group relative border-2 rounded-xl transition-all duration-300 
                ${
                  focusedField === "confirm-password"
                    ? "border-purple-500 bg-purple-500/5"
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <FontAwesomeIcon
                    icon={faLock}
                    className={`transition-colors duration-300 
                      ${focusedField === "confirm-password" ? "text-purple-400" : "text-gray-500"}`}
                  />
                </div>
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.comfirm_password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("confirm-password")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Confirm your password"
                  className="w-full bg-transparent text-white pl-10 pr-12 py-3 text-sm rounded-xl focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl font-medium 
                hover:bg-purple-700 focus:bg-purple-700 focus:outline-none
                transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                shadow-lg hover:shadow-purple-500/25"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
