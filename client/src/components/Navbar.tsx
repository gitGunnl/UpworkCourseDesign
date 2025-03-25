
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, setLoginStatus } = useAuth();

  const handleLogout = () => {
    setLoginStatus(false);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-primary-600">
            Course Platform
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isLoggedIn ? (
              <>
                <Link
                  href="/courses"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  All Courses
                </Link>
                <Link
                  href="/my-courses"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  My Courses
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Contact
                </Link>
                <span className="text-gray-600">John Doe</span>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-primary-600"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/courses"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Courses
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Contact
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/courses"
                  className="block text-gray-600 hover:text-primary-600 py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Courses
                </Link>
                <Link
                  href="/my-courses"
                  className="block text-gray-600 hover:text-primary-600 py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Courses
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-600 hover:text-primary-600 py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <span className="block text-gray-600 py-2">John Doe</span>
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-primary-600 py-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/courses"
                  className="block text-gray-600 hover:text-primary-600 py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Courses
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-600 hover:text-primary-600 py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
