import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ResetPasswordPage: React.FC = () => {
  const { isSignedIn } = useUser();

  // Redirect if already signed in
  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {/* Clerk doesn't have a separate Reset component - this functionality is built into the SignIn flow */}
        <p className="text-center mb-4">
          Please return to the sign-in page and click "Forgot password".
        </p>
        <div className="text-center">
          <a href="/sign-in" className="text-primary hover:underline">
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
