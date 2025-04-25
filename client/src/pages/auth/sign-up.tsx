import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const SignUpPage: React.FC = () => {
  const { isSignedIn } = useUser();

  // Redirect if already signed in
  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
