import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useIsLoggedIn } from "@/context/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = useIsLoggedIn();
  const [location] = useLocation();

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="flex items-center">
                <svg
                  className="h-8 w-8 text-primary-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-900">
                  LearnHub
                </span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {isLoggedIn ? (
              <>
                <Link
                  href="/courses"
                  className={`text-gray-600 hover:text-primary-600 font-medium transition-colors px-3 py-2 rounded-md ${
                    location === "/courses" ? "bg-gray-100 text-primary-600" : ""
                  }`}
                >
                  All Courses
                </Link>
                <Link
                  href="/my-courses"
                  className={`text-gray-600 hover:text-primary-600 font-medium transition-colors px-3 py-2 rounded-md ${
                    location === "/my-courses" ? "bg-gray-100 text-primary-600" : ""
                  }`}
                >
                  My Courses
                </Link>
                <Link
                  href="/contact"
                  className={`text-gray-600 hover:text-primary-600 font-medium transition-colors px-3 py-2 rounded-md ${
                    location === "/contact" ? "bg-gray-100 text-primary-600" : ""
                  }`}
                >
                  Contact
                </Link>
                <div className="flex items-center ml-6 space-x-3 border-l pl-6 border-gray-200">
                  <div className="text-gray-700 font-medium">John Doe</div>
                  <Link
                    href="/logout"
                    className="text-primary-600 hover:text-primary-800 font-medium transition-colors"
                  >
                    Logout
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/courses"
                  className={`text-gray-600 hover:text-primary-600 font-medium transition-colors px-3 py-2 rounded-md ${
                    location === "/courses" ? "bg-gray-100 text-primary-600" : ""
                  }`}
                >
                  Courses
                </Link>
                <Link
                  href="/contact"
                  className={`text-gray-600 hover:text-primary-600 font-medium transition-colors px-3 py-2 rounded-md ${
                    location === "/contact" ? "bg-gray-100 text-primary-600" : ""
                  }`}
                >
                  Contact
                </Link>
                <Link
                  href="/auth"
                  className="ml-6 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  Login / Register
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-white border-b border-gray-200`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/courses"
                className={`block px-3 py-2 rounded-md font-medium ${
                  location === "/courses"
                    ? "bg-gray-100 text-primary-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                All Courses
              </Link>
              <Link
                href="/my-courses"
                className={`block px-3 py-2 rounded-md font-medium ${
                  location === "/my-courses"
                    ? "bg-gray-100 text-primary-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                My Courses
              </Link>
              <Link
                href="/contact"
                className={`block px-3 py-2 rounded-md font-medium ${
                  location === "/contact"
                    ? "bg-gray-100 text-primary-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="px-3 font-medium text-gray-700">John Doe</div>
                <Link
                  href="/logout"
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:text-primary-800 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Logout
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/courses"
                className={`block px-3 py-2 rounded-md font-medium ${
                  location === "/courses"
                    ? "bg-gray-100 text-primary-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                href="/contact"
                className={`block px-3 py-2 rounded-md font-medium ${
                  location === "/contact"
                    ? "bg-gray-100 text-primary-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/auth"
                className="block mt-4 w-full text-center px-4 py-2 rounded-md font-medium text-white bg-primary-600 hover:bg-primary-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login / Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;