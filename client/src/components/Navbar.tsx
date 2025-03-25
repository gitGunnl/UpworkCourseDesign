import { createContext, useContext, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-xl font-bold text-primary">LearnHub</a>
        </Link>

        <nav className="space-x-4">
          <Link href="/">
            <a className="text-gray-600 hover:text-primary">Home</a>
          </Link>
          <Link href="/course/ai">
            <a className="text-gray-600 hover:text-primary">AI Course</a>
          </Link>
          <Link href="/control">
            <a className="text-gray-600 hover:text-primary">Control Panel</a>
          </Link>

          {isLoggedIn ? (
            <Button variant="outline" onClick={logout}>Logout</Button>
          ) : (
            <Link href="/auth">
              <a>
                <Button>Login</Button>
              </a>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;