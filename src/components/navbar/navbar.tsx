"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodepen } from "@fortawesome/free-brands-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const fName: string = "Pheet'Chy";
  const lName: string = "Unruffled";
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleMenuItemClick = (action?: string) => {
    setIsMenuVisible(false);
    if (action === "signin") {
      window.location.href = "/signin";
    }
  };

  return (
    <nav className="w-full h-20 bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto h-full flex justify-between items-center p-4">
        {/* logo */}
        <section className="flex items-center text-white font-light text-sm">
          <FontAwesomeIcon className="mr-2 h-5 w-5" icon={faCodepen} />
          <a href="/">ODOR</a>
        </section>

        {/* menus */}
        <section className="flex justify-between items-center gap-x-4 font-light text-sm">
          <Link
            href="/portal"
            className="hover:scale-110 transition duration-300"
          >
            Portal
          </Link>
          <Link
            href="/dashboard"
            className="hover:scale-110 transition duration-300"
          >
            Dashboard
          </Link>
          <Link
            href="/products"
            className="hover:scale-110 transition duration-300"
          >
            Products
          </Link>
          <Link href="#" className="hover:scale-110 transition duration-300">
            Support
          </Link>
        </section>

        {/* profile */}
        <section className="flex justify-center items-center gap-x-2 text-sm font-light">
          <img
            alt="profile"
            src="./mootoo.jpg"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <div>{fName}</div>
            <div>{lName}</div>
          </div>
          <button
            ref={buttonRef}
            className="relative focus:outline-none"
            onClick={toggleMenu}
            aria-expanded={isMenuVisible}
            aria-haspopup="true"
          >
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`text-white w-4 h-4 transform transition-transform duration-300 ${isMenuVisible ? "rotate-180" : ""}`}
            />
            {isMenuVisible && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded-lg shadow-lg py-2 px-3 z-50"
              >
                <div className="flex flex-col gap-2">
                  <div
                    onClick={() => handleMenuItemClick("profile")}
                    className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <img
                      alt="profile"
                      src="./mootoo.jpg"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col text-sm">
                      <span className="text-white">{fName}</span>
                      <span className="text-gray-400 text-xs">
                        View Profile
                      </span>
                    </div>
                  </div>
                  <hr className="border-gray-800" />
                  <div
                    onClick={() => handleMenuItemClick("profile")}
                    className="text-left text-sm text-gray-300 p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Profile Settings
                  </div>
                  <div
                    onClick={() => handleMenuItemClick("profile")}
                    className="text-left text-sm text-gray-300 p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Help Center
                  </div>
                  <div
                    onClick={() => handleMenuItemClick("signin")}
                    className="text-left text-sm text-gray-300 p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                  >
                    {isLogIn ? "Sign Out" : "Sign In"}
                  </div>
                </div>
              </div>
            )}
          </button>
        </section>
      </div>
    </nav>
  );
}
