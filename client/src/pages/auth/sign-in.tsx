import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const SignInPage: React.FC = () => {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/"
        />
      </div>
    </div>
  );
};

export default SignInPage;
