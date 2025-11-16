import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaCopy,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";

type Profile = {
  id: number;
  name: string;
  description: string;
  url: string;
  icon: JSX.Element;
};

const profiles: Profile[] = [
  {
    id: 1,
    name: "Facebook",
    description:
      "Follow our official Facebook page to get updates, community news, and exclusive content about our activities and events. Engage with our community, comment, and share posts to spread cultural awareness.",
    url: "https://www.facebook.com/YourProfile",
    icon: <FaFacebook size={36} className="text-blue-600" />,
  },
  {
    id: 2,
    name: "Twitter",
    description:
      "Stay connected via our Twitter handle for real-time posts, announcements, and interactive threads. Join discussions, retweet important updates, and stay informed with concise daily updates.",
    url: "https://twitter.com/YourProfile",
    icon: <FaTwitter size={36} className="text-blue-400" />,
  },
  {
    id: 3,
    name: "Instagram",
    description:
      "See behind-the-scenes photos, stories, and visual highlights of our projects on Instagram. Follow for creative snapshots, community interactions, and cultural storytelling through imagery.",
    url: "https://www.instagram.com/YourProfile",
    icon: <FaInstagram size={36} className="text-pink-500" />,
  },
  {
    id: 4,
    name: "LinkedIn",
    description:
      "Professional updates, collaborations, and networking opportunities on LinkedIn. Connect with us to explore projects, share professional insights, and engage in educational discussions.",
    url: "https://www.linkedin.com/in/YourProfile",
    icon: <FaLinkedin size={36} className="text-blue-700" />,
  },
  {
    id: 5,
    name: "YouTube",
    description:
      "Watch our video content, tutorials, and presentations on YouTube. Subscribe to stay updated with new videos, cultural documentaries, and educational series for a visual learning experience.",
    url: "https://www.youtube.com/YourProfile",
    icon: <FaYoutube size={36} className="text-red-600" />,
  },
];

const OnlinePresence: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="pt-28 p-6 min-h-screen bg-gray-50">
      {/* Title & Intro */}
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          My Online Presence
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            Explore My active social media accounts and online platforms. Connect with
            me on multiple channels to stay updated with my latest activities, cultural
            insights, educational content, and multimedia resources. Each profile provides
            a unique way to engage with my work and community. Click on a card to explore
            further, copy the link, or visit the platform directly.
          </p>
        </div>
      </div>

      {/* Social Media Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => setSelectedProfile(profile)}
            className="cursor-pointer bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-xl"
          >
            <div className="mb-4">{profile.icon}</div>
            <h2 className="text-gray-900 font-semibold text-lg mb-2">{profile.name}</h2>
            <p className="text-gray-600 text-sm line-clamp-4">{profile.description}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative text-gray-900 shadow-lg">
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>

            <div className="flex items-center mb-4 gap-4">
              {selectedProfile.icon}
              <h2 className="text-2xl font-bold">{selectedProfile.name}</h2>
            </div>

            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <p className="text-gray-700 leading-relaxed">{selectedProfile.description}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleCopy(selectedProfile.url)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                <FaCopy /> Copy Link
              </button>
              <a
                href={selectedProfile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                <FaExternalLinkAlt /> Open in New Tab
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlinePresence;
