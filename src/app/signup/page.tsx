"use client";
import { useState, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodepen } from "@fortawesome/free-brands-svg-icons";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

interface FormState {
  email: string;
  password: string;
  comfirm_password: string;
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
  });
  const [errors, setErrors] = useState<FormErrors>({});

  return (
    <>
      <div className="min-h-screen w-full bg-surface flex items-center justify-center">
        <div className="max-w-md px-6 py-8 w-full">
          <form
            className="flex flex-col bg-black rounded-lg shadow-lg p-8 gap-6 justify-center item-center"
            noValidate
          >
            <section className="flex flex-col justify-center item-center">
              <FontAwesomeIcon
                icon={faCodepen}
                className="text-2xl text-white pb-2"
              />
              <h1 className="text-2xl font-bold text-center text-white">
                Get Started With Your Account
              </h1>
            </section>
            <section className="flex flex-col gap-2">
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
                  onChange={() => {
                    "hello";
                  }}
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
                  onChange={() => {
                    "hello";
                  }}
                  placeholder="Enter your password..."
                  className="w-full bg-black text-white py-3 text-sm rounded-lg focus:outline-none"
                />
              </div>
              <label htmlFor="email" className="text-sm font-thin text-white">
                Confirm Password
              </label>
              <div
                className={`flex items-center border rounded-lg focus:border-purple_dark_mode ${
                  errors.email ? "border-red-500" : "border-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faLock} className="p-2" />
                <input
                  id="confirm-password"
                  type="confirm-password"
                  value={formData.comfirm_password}
                  onChange={() => {
                    "hello";
                  }}
                  placeholder="Confirm your password..."
                  className="w-full bg-black text-white py-3 text-sm rounded-lg focus:outline-none"
                />
              </div>
              <button className="px-2 py-2 bg-purple_dark_mode rounded-lg font-thin mt-2 hover:bg-green_dark_mode transition duration-500">
                Sign Up
              </button>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}
