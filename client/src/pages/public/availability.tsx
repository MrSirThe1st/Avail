import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AvailabilityWidget from "../../components/widgets/availability-widget";
import { ExternalLink, Mail, Phone, MapPin } from "lucide-react";

interface UserProfile {
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
  socialLinks?: {
    type: string;
    url: string;
  }[];
}

// Mock data for demonstration purposes
const mockUserProfile: UserProfile = {
  name: "John Smith",
  email: "john@example.com",
  phone: "(555) 123-4567",
  website: "https://example.com",
  location: "New York, NY",
  description:
    "Professional consultant with over 10 years of experience in business strategy and development.",
  imageUrl: "https://randomuser.me/api/portraits/men/75.jpg",
  socialLinks: [
    { type: "linkedin", url: "https://linkedin.com/in/example" },
    { type: "twitter", url: "https://twitter.com/example" },
  ],
};

const StandaloneAvailabilityPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);

        // In a real implementation, we would fetch from the API
        // const response = await axios.get(`/api/users/${userId}/public-profile`);
        // setUserProfile(response.data);

        // For now, use mock data
        setTimeout(() => {
          setUserProfile(mockUserProfile);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to load user profile");
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p>{error || "User profile not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header with user info */}
          <div className="p-6 md:p-8 border-b">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {userProfile.imageUrl && (
                <div className="flex-shrink-0">
                  <img
                    src={userProfile.imageUrl}
                    alt={userProfile.name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
              )}

              <div className="flex-grow text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {userProfile.name}
                </h1>

                {userProfile.description && (
                  <p className="text-gray-600 mb-4 max-w-2xl">
                    {userProfile.description}
                  </p>
                )}

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                  {userProfile.location && (
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-1" />
                      {userProfile.location}
                    </div>
                  )}

                  {userProfile.website && (
                    <a
                      href={userProfile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:underline"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Website
                    </a>
                  )}

                  {userProfile.email && (
                    <a
                      href={`mailto:${userProfile.email}`}
                      className="flex items-center text-blue-600 hover:underline"
                    >
                      <Mail size={16} className="mr-1" />
                      {userProfile.email}
                    </a>
                  )}

                  {userProfile.phone && (
                    <a
                      href={`tel:${userProfile.phone}`}
                      className="flex items-center text-blue-600 hover:underline"
                    >
                      <Phone size={16} className="mr-1" />
                      {userProfile.phone}
                    </a>
                  )}
                </div>

                {userProfile.socialLinks &&
                  userProfile.socialLinks.length > 0 && (
                    <div className="mt-4 flex justify-center md:justify-start gap-3">
                      {userProfile.socialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          {/* Simple representation of social icons */}
                          <span className="text-xs font-bold uppercase">
                            {link.type.charAt(0)}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Availability widget */}
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6 text-center">
              My Availability
            </h2>

            <div className="max-w-md mx-auto">
              <AvailabilityWidget
                userId={userId || ""}
                size="large"
                theme="light"
                showDays={7}
                actionLabel="Contact Me"
                actionUrl={`mailto:${userProfile.email}`}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Powered by{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Avail
          </a>
        </div>
      </div>
    </div>
  );
};

export default StandaloneAvailabilityPage;
