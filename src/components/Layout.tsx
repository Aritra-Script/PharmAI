// // // // import React, { useState } from "react";
// // // // import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
// // // // import { Beaker, Moon, Sun, LogOut } from "lucide-react";
// // // // import { useAuth } from "../contexts/AuthContext";
// // // // import { useTheme } from "../contexts/ThemeContext";
// // // // import { Dashboard } from "./dashboard/Dashboard";

// // // // export function Layout() {
// // // //   const [activeTab, setActiveTab] = useState("PharmaGenius");
// // // //   const { user, logout } = useAuth();
// // // //   const { theme, toggleTheme } = useTheme();
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();

// // // //   const handleLogout = () => {
// // // //     logout();
// // // //     navigate("/");
// // // //   };

// // // //   const isHome = location.pathname === "/";
// // // //   const isAuthPage = ["/login", "/register"].includes(location.pathname);

// // // //   return (
// // // //     <div className="min-h-screen bg-background">
// // // //       <header className="border-b border-border">
// // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //           <div className="flex items-center justify-between h-16">
// // // //             <Link to="/" className="flex items-center space-x-2">
// // // //               <Beaker className="h-6 w-6 text-primary" />
// // // //               <span className="text-lg font-semibold">Pharm.AI</span>
// // // //             </Link>
// // // //             {/* Navigation Tabs */}
// // // //             <div className="flex items-center space-x-4 ">
// // // //               {["upload", "Visualise & Predict", "PharmaGenius"].map((tab) => (
// // // //                 <button
// // // //                   key={tab}
// // // //                   onClick={() => setActiveTab(tab)}
// // // //                   className={`px-4 py-2 rounded-lg capitalize transition-colors ${
// // // //                     activeTab === tab
// // // //                       ? "bg-primary text-primary-foreground"
// // // //                       : "bg-background hover:bg-primary/10"
// // // //                   }`}
// // // //                 >
// // // //                   {tab}
// // // //                 </button>
// // // //               ))}
// // // //             </div>
// // // //             <div className="flex items-center space-x-4">
// // // //               <button
// // // //                 onClick={toggleTheme}
// // // //                 className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
// // // //                 aria-label="Toggle theme"
// // // //               >
// // // //                 {theme === "dark" ? (
// // // //                   <Sun className="h-5 w-5" />
// // // //                 ) : (
// // // //                   <Moon className="h-5 w-5" />
// // // //                 )}
// // // //               </button>
// // // //               {user && !isAuthPage && (
// // // //                 <button
// // // //                   onClick={handleLogout}
// // // //                   className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
// // // //                   aria-label="Logout"
// // // //                 >
// // // //                   <LogOut className="h-5 w-5" />
// // // //                 </button>
// // // //               )}
// // // //               {!user && !isAuthPage && (
// // // //                 <div className="flex items-center space-x-2">
// // // //                   <Link
// // // //                     to="/login"
// // // //                     className="px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
// // // //                   >
// // // //                     Sign In
// // // //                   </Link>
// // // //                   <Link
// // // //                     to="/register"
// // // //                     className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
// // // //                   >
// // // //                     Get Started
// // // //                   </Link>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </header>
// // // //       <main className={!isHome ? "max-w-7xl mx-auto" : ""}>
// // // //         <Outlet />
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }
// // // import React, { useState } from "react";
// // // import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
// // // import { Beaker, Moon, Sun, LogOut } from "lucide-react";
// // // import { useAuth } from "../contexts/AuthContext";
// // // import { useTheme } from "../contexts/ThemeContext";

// // // export function Layout() {
// // //   const [activeTab, setActiveTab] = useState("PharmaGenius");
// // //   const { user, logout } = useAuth();
// // //   const { theme, toggleTheme } = useTheme();
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const handleLogout = () => {
// // //     logout();
// // //     navigate("/");
// // //   };

// // //   const isHome = location.pathname === "/";
// // //   const isAuthPage = ["/login", "/register"].includes(location.pathname);

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       <header className="border-b border-border">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="flex items-center justify-between h-16">
// // //             <Link to="/" className="flex items-center space-x-2">
// // //               <Beaker className="h-6 w-6 text-primary" />
// // //               <span className="text-lg font-semibold">Pharm.AI</span>
// // //             </Link>

// // //             <div className="flex items-center space-x-4">
// // //               <button
// // //                 onClick={toggleTheme}
// // //                 className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
// // //                 aria-label="Toggle theme"
// // //               >
// // //                 {theme === "dark" ? (
// // //                   <Sun className="h-5 w-5" />
// // //                 ) : (
// // //                   <Moon className="h-5 w-5" />
// // //                 )}
// // //               </button>
// // //               {user && !isAuthPage && (
// // //                 <button
// // //                   onClick={handleLogout}
// // //                   className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
// // //                   aria-label="Logout"
// // //                 >
// // //                   <LogOut className="h-5 w-5" />
// // //                 </button>
// // //               )}
// // //               {!user && !isAuthPage && (
// // //                 <div className="flex items-center space-x-2">
// // //                   <Link
// // //                     to="/login"
// // //                     className="px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
// // //                   >
// // //                     Sign In
// // //                   </Link>
// // //                   <Link
// // //                     to="/register"
// // //                     className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
// // //                   >
// // //                     Get Started
// // //                   </Link>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       {/* Navigation Tabs (only show when not on auth pages) */}
// // //       {!isAuthPage && (
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // //           <div className="flex items-center space-x-4">
// // //             {["upload", "Visualise & Predict", "PharmaGenius"].map((tab) => (
// // //               <button
// // //                 key={tab}
// // //                 onClick={() => setActiveTab(tab)}
// // //                 className={`px-4 py-2 rounded-lg capitalize transition-colors ${
// // //                   activeTab === tab
// // //                     ? "bg-primary text-primary-foreground"
// // //                     : "bg-background hover:bg-primary/10"
// // //                 }`}
// // //               >
// // //                 {tab}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       <main className={!isHome ? "max-w-7xl mx-auto" : ""}>
// // //         {/* Pass activeTab as context or prop if needed, or use nested routing */}
// // //         <Outlet context={{ activeTab }} />
// // //       </main>
// // //     </div>
// // //   );
// // // }
// // import React, { useState } from "react";
// // import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
// // import { Beaker, Moon, Sun, LogOut } from "lucide-react";
// // import { useAuth } from "../contexts/AuthContext";
// // import { useTheme } from "../contexts/ThemeContext";

// // export function Layout() {
// //   const [activeTab, setActiveTab] = useState("PharmaGenius");
// //   const { user, logout } = useAuth();
// //   const { theme, toggleTheme } = useTheme();
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const handleLogout = () => {
// //     logout();
// //     navigate("/");
// //   };

// //   const isHome = location.pathname === "/";
// //   const isAuthPage = ["/login", "/register"].includes(location.pathname);

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <header className="border-b border-border">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           {/* Top Row: Logo & Right Icons */}
// //           <div className="flex items-center justify-between h-16">
// //             <Link to="/" className="flex items-center space-x-2">
// //               <Beaker className="h-6 w-6 text-primary" />
// //               <span className="text-lg font-semibold">Pharm.AI</span>
// //             </Link>

// //             <div className="flex items-center space-x-4">
// //               <button
// //                 onClick={toggleTheme}
// //                 className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
// //                 aria-label="Toggle theme"
// //               >
// //                 {theme === "dark" ? (
// //                   <Sun className="h-5 w-5" />
// //                 ) : (
// //                   <Moon className="h-5 w-5" />
// //                 )}
// //               </button>

// //               {user && !isAuthPage && (
// //                 <button
// //                   onClick={handleLogout}
// //                   className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
// //                   aria-label="Logout"
// //                 >
// //                   <LogOut className="h-5 w-5" />
// //                 </button>
// //               )}

// //               {!user && !isAuthPage && (
// //                 <div className="flex items-center space-x-2">
// //                   <Link
// //                     to="/login"
// //                     className="px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
// //                   >
// //                     Sign In
// //                   </Link>
// //                   <Link
// //                     to="/register"
// //                     className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
// //                   >
// //                     Get Started
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Second Row (Tabs) - Only show when not on auth pages */}
// //           {!isAuthPage && (
// //             <div className="flex items-center space-x-4 pb-3">
// //               {["upload", "Visualise & Predict", "PharmaGenius"].map((tab) => (
// //                 <button
// //                   key={tab}
// //                   onClick={() => setActiveTab(tab)}
// //                   className={`px-4 py-2 rounded-lg capitalize transition-colors ${
// //                     activeTab === tab
// //                       ? "bg-primary text-primary-foreground"
// //                       : "bg-background hover:bg-primary/10"
// //                   }`}
// //                 >
// //                   {tab}
// //                 </button>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className={!isHome ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" : ""}>
// //         {/* Pass activeTab as needed */}
// //         <Outlet context={{ activeTab }} />
// //       </main>
// //     </div>
// //   );
// // }
// import React, { useState } from "react";
// import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
// import { Beaker, Moon, Sun, LogOut } from "lucide-react";
// import { useAuth } from "../contexts/AuthContext";
// import { useTheme } from "../contexts/ThemeContext";

// export function Layout() {
//   const [activeTab, setActiveTab] = useState("PharmaGenius");
//   const { user, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const isHome = location.pathname === "/";
//   const isAuthPage = ["/login", "/register"].includes(location.pathname);

//   return (
//     <div className="min-h-screen bg-background">
//       <header className="border-b border-border">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Top Navbar: Logo, Tabs, Theme Toggle, etc. */}
//           <div className="flex items-center justify-between h-16">
//             {/* Left Section: Logo + Tabs (if user is not on auth pages) */}
//             <div className="flex items-center space-x-6">
//               <Link to="/" className="flex items-center space-x-2">
//                 <Beaker className="h-6 w-6 text-primary" />
//                 <span className="text-lg font-semibold">Pharm.AI</span>
//               </Link>

//               {/* Navigation Tabs (only show when not on auth pages) */}
//               {!isAuthPage && (
//                 <div className="flex items-center space-x-2">
//                   {["upload", "Visualise & Predict", "PharmaGenius"].map((tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`px-4 py-2 rounded-lg capitalize transition-colors ${
//                         activeTab === tab
//                           ? "bg-primary text-primary-foreground"
//                           : "bg-background hover:bg-primary/10"
//                       }`}
//                     >
//                       {tab}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Right Section: Theme Toggle, Auth Buttons */}
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={toggleTheme}
//                 className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
//                 aria-label="Toggle theme"
//               >
//                 {theme === "dark" ? (
//                   <Sun className="h-5 w-5" />
//                 ) : (
//                   <Moon className="h-5 w-5" />
//                 )}
//               </button>

//               {user && !isAuthPage && (
//                 <button
//                   onClick={handleLogout}
//                   className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
//                   aria-label="Logout"
//                 >
//                   <LogOut className="h-5 w-5" />
//                 </button>
//               )}

//               {!user && !isAuthPage && (
//                 <div className="flex items-center space-x-2">
//                   <Link
//                     to="/login"
//                     className="px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
//                   >
//                     Get Started
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className={!isHome ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" : ""}>
//         <Outlet context={{ activeTab }} />
//       </main>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { Beaker, Moon, Sun, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navbar */}
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + Tabs (if not on auth pages) */}
            <div className="flex items-center space-x-6">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <Beaker className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">Pharm.AI</span>
              </Link>

              {/* Tabs */}
              {!isAuthPage && (
                <div className="flex items-center space-x-2">
                  {["upload", "Visualise & Predict", "PharmaGenius"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                        activeTab === tab
                          ? "bg-primary text-primary-foreground"
                          : "bg-background hover:bg-primary/10"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Theme Toggle, Auth */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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

      {/* Main Content */}
      <main className={!isHome ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" : ""}>
        {/* Provide activeTab and setActiveTab to children */}
        <Outlet context={{ activeTab, setActiveTab }} />
      </main>
    </div>
  );
}
