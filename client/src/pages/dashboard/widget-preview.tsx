import React, { useState,} from "react";
import { useUser } from "@clerk/clerk-react";
import Layout from "../../components/layout/layout";
import AvailabilityWidget from "../../components/widgets/availability-widget";
import { Button } from "../../components/ui/button";
import {
  Copy,
  Check,
  Code,
  ExternalLink,
  Smartphone,
  Monitor,
} from "lucide-react";

const WidgetPreviewPage: React.FC = () => {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  // Widget customization options
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("light");
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [showDays, setShowDays] = useState(7);
  const [actionLabel, setActionLabel] = useState("Contact Me");
  const [actionUrl, setActionUrl] = useState("");

  // Generate embed code based on current settings
  const getEmbedCode = (): string => {
    const userId = user?.id || "user_123";
    const baseUrl = window.location.origin;

    return `<!-- Avail Availability Widget -->
<div id="avail-widget"></div>
<script src="${baseUrl}/widgets/availability.js"></script>
<script>
  AvailWidget.init({
    container: "#avail-widget",
    userId: "${userId}",
    theme: "${theme}",
    size: "${size}",
    showDays: ${showDays},
    actionLabel: "${actionLabel}",
    actionUrl: "${actionUrl}"
  });
</script>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getEmbedCode());
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Widget Preview</h1>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Widget Preview */}
            <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Live Preview</h2>
                <div className="flex rounded-md overflow-hidden">
                  <Button
                    variant={viewMode === "desktop" ? "default" : "secondary"}
                    size="sm"
                    className="rounded-r-none"
                    onClick={() => setViewMode("desktop")}
                  >
                    <Monitor size={16} className="mr-1" /> Desktop
                  </Button>
                  <Button
                    variant={viewMode === "mobile" ? "default" : "secondary"}
                    size="sm"
                    className="rounded-l-none"
                    onClick={() => setViewMode("mobile")}
                  >
                    <Smartphone size={16} className="mr-1" /> Mobile
                  </Button>
                </div>
              </div>

              <div
                className={`border rounded-md p-4 ${viewMode === "mobile" ? "max-w-[320px] mx-auto" : ""}`}
              >
                <AvailabilityWidget
                  userId={user?.id || "user_123"}
                  theme={theme}
                  size={size}
                  showDays={showDays}
                  actionLabel={actionLabel}
                  actionUrl={actionUrl}
                />
              </div>
            </div>

            {/* Widget Settings */}
            <div className="md:col-span-3 bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Widget Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">Theme</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio text-primary"
                        name="theme"
                        value="light"
                        checked={theme === "light"}
                        onChange={() => setTheme("light")}
                      />
                      <span className="ml-2">Light</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio text-primary"
                        name="theme"
                        value="dark"
                        checked={theme === "dark"}
                        onChange={() => setTheme("dark")}
                      />
                      <span className="ml-2">Dark</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio text-primary"
                        name="theme"
                        value="auto"
                        checked={theme === "auto"}
                        onChange={() => setTheme("auto")}
                      />
                      <span className="ml-2">
                        Auto (follows user's preference)
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium">Size</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio text-primary"
                        name="size"
                        value="small"
                        checked={size === "small"}
                        onChange={() => setSize("small")}
                      />
                      <span className="ml-2">Small</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio text-primary"
                        name="size"
                        value="medium"
                        checked={size === "medium"}
                        onChange={() => setSize("medium")}
                      />
                      <span className="ml-2">Medium</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio text-primary"
                        name="size"
                        value="large"
                        checked={size === "large"}
                        onChange={() => setSize("large")}
                      />
                      <span className="ml-2">Large</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Days to Display
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="14"
                    step="1"
                    value={showDays}
                    onChange={(e) => setShowDays(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1 day</span>
                    <span>{showDays} days</span>
                    <span>14 days</span>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Call-to-Action
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Button Label</label>
                      <input
                        type="text"
                        value={actionLabel}
                        onChange={(e) => setActionLabel(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="Contact Me"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">
                        Button URL (optional)
                      </label>
                      <input
                        type="url"
                        value={actionUrl}
                        onChange={(e) => setActionUrl(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="https://example.com/contact"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Leave URL blank to hide the button.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t">
                <h3 className="font-medium mb-3 flex items-center">
                  <Code size={18} className="mr-2" /> Embed Code
                </h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                    {getEmbedCode()}
                  </pre>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={handleCopyCode}
                    className="flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check size={16} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} /> Copy Code
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white shadow rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">How to Use</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Customize your widget using the settings above.</li>
              <li>Copy the generated embed code.</li>
              <li>
                Paste the code into your website's HTML where you want the
                widget to appear.
              </li>
              <li>
                The widget will automatically update to show your current
                availability.
              </li>
            </ol>
            <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-md">
              <h3 className="font-medium flex items-center mb-2">
                <ExternalLink size={18} className="mr-2" /> Standalone Page
              </h3>
              <p>
                Don't have a website? You can also share your availability
                through a dedicated page:{" "}
                <a
                  href={`/availability/${user?.id}`}
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {window.location.origin}/availability/{user?.id}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WidgetPreviewPage;
