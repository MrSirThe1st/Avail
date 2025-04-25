import React from "react";
import { useUser } from "@clerk/clerk-react";
import Button from "../../components/base/button/button";

const HomePage: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to Avail</h1>

          {user && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold mb-2">
                Hello, {user.firstName || user.username}!
              </h2>
              <p className="text-gray-600">
                You're successfully signed in with{" "}
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          )}

          <p className="mb-6">
            Your application is now running with Clerk authentication. Use the
            buttons below to explore the features.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button>Get Started</Button>
            <Button variant="outlined">Learn More</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
