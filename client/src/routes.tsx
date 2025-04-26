import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Layout from "./components/layout/layout";
import HomePage from "./pages/home-page/home-page";
import SignInPage from "./pages/auth/sign-in";
import SignUpPage from "./pages/auth/sign-up";
import ResetPasswordPage from "./pages/auth/reset-password";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import CalendarConnectionsPage from "./pages/dashboard/calendar-connections";
import AvailabilitySettingsPage from "./pages/dashboard/availability-settings";
import WidgetPreviewPage from "./pages/dashboard/widget-preview";
import StandaloneAvailabilityPage from "./pages/public/availability";

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const { isSignedIn, isLoaded } = useUser();

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return <>{element}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth routes */}
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/reset-password/*" element={<ResetPasswordPage />} />
        <Route path="/forgot-password/*" element={<ForgotPasswordPage />} />

        {/* Public availability page */}
        <Route
          path="/availability/:userId"
          element={<StandaloneAvailabilityPage />}
        />

        {/* Protected dashboard routes */}
        <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
        <Route
          path="/dashboard/calendars"
          element={<ProtectedRoute element={<CalendarConnectionsPage />} />}
        />
        <Route
          path="/dashboard/availability-settings"
          element={<ProtectedRoute element={<AvailabilitySettingsPage />} />}
        />
        <Route
          path="/dashboard/widget"
          element={<ProtectedRoute element={<WidgetPreviewPage />} />}
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
