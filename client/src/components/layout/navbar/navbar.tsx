import React from "react";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";

const Navbar: React.FC = () => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">
          Avail
        </Link>

        <div className="flex items-center gap-4">
          {isLoaded ? (
            isSignedIn ? (
              <UserButton afterSignOutUrl="/sign-in" />
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
                >
                  Sign Up
                </Link>
              </>
            )
          ) : (
            // Loading state
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
