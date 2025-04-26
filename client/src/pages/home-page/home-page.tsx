import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Layout from "../../components/layout/layout";
import { Calendar, Clock, Code, ExternalLink } from "lucide-react";
import { Button } from "../../components/ui/button";

const HomePage: React.FC = () => {
  const { user } = useUser();

  const featureCards = [
    {
      title: "Connect Your Calendars",
      description:
        "Link your favorite calendar services to automatically sync your availability in real-time.",
      icon: <Calendar size={24} className="text-primary" />,
      link: "/dashboard/calendars",
    },
    {
      title: "Configure Your Availability",
      description:
        "Set your working hours and customize how your availability is displayed to others.",
      icon: <Clock size={24} className="text-primary" />,
      link: "/dashboard/availability-settings",
    },
    {
      title: "Share Your Availability",
      description:
        "Embed a widget on your website or share a dedicated availability page with anyone.",
      icon: <Code size={24} className="text-primary" />,
      link: "/dashboard/widget",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Welcome section */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4">Welcome to Avail</h1>

              {user && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6 inline-block">
                  <h2 className="text-xl font-semibold">
                    Hello, {user.firstName || user.username}!
                  </h2>
                  <p className="text-gray-600">
                    You're successfully signed in with{" "}
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              )}

              <p className="text-lg mb-6">
                Avail helps you display your real-time availability to clients
                without complex booking infrastructure. Share when you're
                available and reduce scheduling friction.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button className="flex items-center" asChild>
                  <Link to="/dashboard/calendars">
                    Get Started <ExternalLink size={16} className="ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://github.com/yourusername/avail"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {featureCards.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 mx-auto">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-4 text-center">
                  {card.description}
                </p>
                <div className="text-center">
                  <Link
                    to={card.link}
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    Get Started <ExternalLink size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial section */}
          <div className="bg-primary/5 rounded-lg p-8 mb-8">
            <blockquote className="text-center">
              <p className="text-xl italic mb-4">
                "Avail has completely transformed how I communicate my
                availability to clients. No more back-and-forth emails trying to
                find a time that works for everyone!"
              </p>
              <footer className="font-medium">
                — Sarah Johnson, Independent Consultant
              </footer>
            </blockquote>
          </div>

          {/* CTA section */}
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to simplify your scheduling?
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Start showing your real-time availability to clients and reduce
              scheduling friction today.
            </p>
            <Button size="lg" asChild>
              <Link to="/dashboard/calendars">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
