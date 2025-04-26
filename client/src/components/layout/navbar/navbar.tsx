import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import { Calendar, Clock, Code, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const navLinks = [
    {
      text: "Calendar Connections",
      path: "/dashboard/calendars",
      icon: <Calendar size={18} className="mr-2" />,
    },
    {
      text: "Availability Settings",
      path: "/dashboard/availability-settings",
      icon: <Clock size={18} className="mr-2" />,
    },
    {
      text: "Widget Preview",
      path: "/dashboard/widget",
      icon: <Code size={18} className="mr-2" />,
    },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and main navigation */}
          <div className="flex">
            <Link
              to="/"
              className="flex items-center text-xl font-semibold text-primary"
            >
              Avail
            </Link>

            {/* Desktop navigation */}
            {isLoaded && isSignedIn && (
              <div className="hidden md:ml-10 md:flex md:items-center md:space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(link.path)
                        ? "text-primary bg-primary/10"
                        : "text-gray-600 hover:text-primary hover:bg-gray-50"
                    }`}
                  >
                    {link.icon}
                    {link.text}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* User profile or auth buttons */}
          <div className="flex items-center">
            {isLoaded ? (
              isSignedIn ? (
                <div className="flex items-center">
                  <UserButton afterSignOutUrl="/sign-in" />

                  {/* Mobile menu button */}
                  <button
                    type="button"
                    className="ml-4 md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    <span className="sr-only">Open menu</span>
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
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
                    className="ml-4 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
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
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isLoaded && isSignedIn && mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-4 py-2 text-base font-medium ${
                  isActive(link.path)
                    ? "text-primary bg-primary/10"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
