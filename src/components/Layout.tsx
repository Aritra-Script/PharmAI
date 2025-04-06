import React, { useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { Beaker, Moon, Sun, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import Footer from "./Footer";
import RippleButton from "./common/RippleButton";

export function Layout() {
  const [activeTab, setActiveTab] = useState("PharmaGenius");
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isHome = location.pathname === "/";
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-background border-b border-border shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Beaker className="h-6 w-6 text-primary glow-effect" />
              <span className="text-lg font-semibold text-foreground glow-effect">Pharm.AI</span>
            </Link>

            <div className="flex items-center space-x-4">
              {!isAuthPage && location.pathname !== "/" && (
                <div className="flex items-center space-x-1 mr-4">
                  {["Drug Target Interaction", "Computational Compounds", "Visualise & Predict", "PharmaGenius"].map((tab) => (
                    <RippleButton
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground/60 hover:bg-primary/10 hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </RippleButton>
                  ))}
                </div>
              )}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              {user && !isAuthPage && (
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              )}
              {!user && !isAuthPage && (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet context={{ activeTab, setActiveTab }} />
      </main>

      <Footer />
    </div>
  );
}