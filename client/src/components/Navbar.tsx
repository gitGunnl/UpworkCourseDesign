import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-icons text-primary-600">school</span>
          <Link href="/" className="text-primary-600 font-bold text-xl">
            LearnHub
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/"
            className="text-gray-600 hover:text-primary-600 transition-colors"
          >
            Courses
          </Link>
          <Link
            href="/control"
            className="text-gray-600 hover:text-primary-600 transition-colors bg-gray-100 px-3 py-1 rounded-md"
          >
            Control Panel
          </Link>
          <a
            href="#"
            className="text-gray-600 hover:text-primary-600 transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-primary-600 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-primary-600 transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-primary-600 text-primary-600 hover:bg-primary-50"
              >
                <Link href="/auth">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth">Sign up</Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Welcome, User</span>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-primary-600 text-primary-600 hover:bg-primary-50"
              >
                Log out
              </Button>
              <Link href="/panel" className="text-primary-600">
                <span className="material-icons">account_circle</span>
              </Link>
            </div>
          )}
          <button
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/control"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors bg-gray-100 px-3 py-1 rounded-md my-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Control Panel
            </Link>
            <a
              href="#"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-primary-600 py-2 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
