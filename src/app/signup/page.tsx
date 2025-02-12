"use client";
import { useState, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

interface FormState {
  email: string;
  password: string;
  repassword: string;
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
    repassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  return (
    <>
      <div className="min-h-screen w-full bg-surface flex items-center justify-center">
        <div className="max-w-md px-6 py-8 w-full">
          <form
            className="flex flex-col bg-black rounded-lg shadow-lg p-8 gap-6"
            noValidate
          >
            <h2 className="text-2xl font-bold text-center text-white">
              Sign Up
            </h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-thin text-white">
                Email
              </label>
              <div
                className={`flex items-center border rounded-lg focus:border-purple_dark_mode ${
                  errors.email ? "border-red-500" : "border-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faUser} className="p-2" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={()=>{"hello"}}
                  placeholder="Enter your email..."
                  className="w-full bg-black text-white py-3 text-sm rounded-lg focus:outline-none"
                  // disabled={isLoading}
                />
              </div>
              <label htmlFor="email" className="text-sm font-thin text-white">
                Password
              </label>
              <div
                className={`flex items-center border rounded-lg focus:border-purple_dark_mode ${
                  errors.email ? "border-red-500" : "border-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faLock} className="p-2" />
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={()=>{"hello"}}
                  placeholder="Enter your password..."
                  className="w-full bg-black text-white py-3 text-sm rounded-lg focus:outline-none"
                />
              </div>
              <label htmlFor="email" className="text-sm font-thin text-white">
                Re-password
              </label>
              <div
                className={`flex items-center border rounded-lg focus:border-purple_dark_mode ${
                  errors.email ? "border-red-500" : "border-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faLock} className="p-2" />
                <input
                  id="re-password"
                  type="re-password"
                  value={formData.repassword}
                  onChange={()=>{"hello"}}
                  placeholder="Enter your re-password..."
                  className="w-full bg-black text-white py-3 text-sm rounded-lg focus:outline-none"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
