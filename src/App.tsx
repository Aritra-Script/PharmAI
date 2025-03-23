// // // import React from 'react';
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // import { Layout } from './components/Layout';
// // // import { Home } from './components/home/Home';
// // // import { Login } from './components/auth/Login';
// // // import { Register } from './components/auth/Register';
// // // import { Dashboard } from './components/dashboard/Dashboard';
// // // import { AuthProvider } from './contexts/AuthContext';
// // // import { ThemeProvider } from './contexts/ThemeContext';
// // // import { useAuth } from './contexts/AuthContext';

// // // function PrivateRoute({ children }: { children: React.ReactNode }) {
// // //   const { user } = useAuth();
// // //   return user ? children : <Navigate to="/login" />;
// // // }

// // // function App() {
// // //   return (
// // //     <ThemeProvider>
// // //       <AuthProvider>
// // //         <Router>
// // //           <Routes>
// // //             <Route path="/" element={<Layout />}>
// // //               <Route index element={<Home />} />
// // //               <Route path="login" element={<Login />} />
// // //               <Route path="register" element={<Register />} />
// // //               <Route
// // //                 path="dashboard"
// // //                 element={
// // //                   <PrivateRoute>
// // //                     <Dashboard />
// // //                   </PrivateRoute>
// // //                 }
// // //               />
// // //             </Route>
// // //           </Routes>
// // //         </Router>
// // //       </AuthProvider>
// // //     </ThemeProvider>
// // //   );
// // // }

// // // export default App;
// // import React, { useState, useEffect } from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { Layout } from './components/Layout';
// // import { Home } from './components/home/Home';
// // import { Login } from './components/auth/Login';
// // import { Register } from './components/auth/Register';
// // import { Dashboard } from './components/dashboard/Dashboard';
// // import { AuthProvider } from './contexts/AuthContext';
// // import { ThemeProvider } from './contexts/ThemeContext';
// // import { useAuth } from './contexts/AuthContext';
// // import Loader from './components/common/Loader'; // Import the Loader component

// // function PrivateRoute({ children }: { children: React.ReactNode }) {
// //   const { user } = useAuth();
// //   return user ? children : <Navigate to="/login" />;
// // }

// // function App() {
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     // Simulate a delay for resource loading
// //     setTimeout(() => {
// //       setIsLoading(false);
// //     }, 3000); // Adjust time based on actual load times
// //   }, []);

// //   if (isLoading) {
// //     return <Loader />; // Show Loader until resources are loaded
// //   }

// //   return (
// //     <ThemeProvider>
// //       <AuthProvider>
// //         <Router>
// //           <Routes>
// //             <Route path="/" element={<Layout />}>
// //               <Route index element={<Home />} />
// //               <Route path="login" element={<Login />} />
// //               <Route path="register" element={<Register />} />
// //               <Route
// //                 path="dashboard"
// //                 element={
// //                   <PrivateRoute>
// //                     <Dashboard />
// //                   </PrivateRoute>
// //                 }
// //               />
// //             </Route>
// //           </Routes>
// //         </Router>
// //       </AuthProvider>
// //     </ThemeProvider>
// //   );
// // }

// // export default App;
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Layout } from './components/Layout';
// import { Home } from './components/home/Home';
// import { Login } from './components/auth/Login';
// import { Register } from './components/auth/Register';
// import { Dashboard } from './components/dashboard/Dashboard';
// import { AuthProvider } from './contexts/AuthContext';
// import { ThemeProvider } from './contexts/ThemeContext';
// import { useAuth } from './contexts/AuthContext';
// import Loader from './components/common/Loader'; // Import the Loader component
// import styled from 'styled-components';

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh; /* Full screen height */
//   width: 100vw;  /* Full screen width */
//   background-color: #f4f4f4; /* Optional: Background color */
// `;

// function PrivateRoute({ children }: { children: React.ReactNode }) {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" />;
// }

// function App() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate a delay for resource loading
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 3000); // Adjust time based on actual load times
//   }, []);

//   if (isLoading) {
//     return (
//       <LoaderWrapper>
//         <Loader />
//       </LoaderWrapper>
//     );
//   }

//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <Router>
//           <Routes>
//             <Route path="/" element={<Layout />}>
//               <Route index element={<Home />} />
//               <Route path="login" element={<Login />} />
//               <Route path="register" element={<Register />} />
//               <Route
//                 path="dashboard"
//                 element={
//                   <PrivateRoute>
//                     <Dashboard />
//                   </PrivateRoute>
//                 }
//               />
//             </Route>
//           </Routes>
//         </Router>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/home/Home';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Dashboard } from './components/dashboard/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';
import Loader from './components/common/Loader'; // Import the Loader component
import styled from 'styled-components';

const LoaderWrapper = styled.div<{ themeMode: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full screen height */
  width: 100vw;  /* Full screen width */
  background-color: ${({ themeMode }) => (themeMode === 'dark' ? '#121212' : '#f4f4f4')}; /* Adapts to theme */
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#ffffff' : '#000000')}; /* Text color */
`;

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme(); // Get current theme

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <LoaderWrapper themeMode={theme}>
        <Loader />
      </LoaderWrapper>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
