import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SecureAuthRoutes from "./utils/SecureAuthRoutes"; // Auth Middleware
import NotFound from "./pages/NotFound"; // 404 Page
import LoadingSpinner from "./components/LoadingSpinner"; // Loader Component
import './App.css';



// Lazy load components for efficiency
const UserSignup = React.lazy(() => import("./components/user/UserSignup"));
const UserLogin = React.lazy(() => import("./components/user/UserLogin"));


// Admin Pages



// User Pages
const Dashboard = React.lazy(() => import("./components/user/Dashboard"));



function App() {
  return (
    <Router>
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
               
                <Route path="/" element={<UserLogin />} />

                {/* Public Routes */}
                <Route path="/signup" element={<UserSignup />} />
                

                {/* Protected Routes (User) */}
                <Route element={<SecureAuthRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                {/* Not Found Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    </Router>
);
}

export default App;
