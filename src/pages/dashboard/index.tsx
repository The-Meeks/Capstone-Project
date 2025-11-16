import React from "react";
import { useNavigate } from "react-router-dom";

import { StudentProfile } from "../dashboard/types/index";
import StudentProfileCard from "./components/StudentProfile";

const StudentDashboardHome = () => {
  const navigate = useNavigate();

  // Updated profile data for Abraham Kioko
  const studentProfile: StudentProfile = {
    id: "student-001",
    name: "Abraham Kioko",
    tagline: "Innovative IT Student & Technology Enthusiast",
    education: {
      degree: "BSc. Information Technology",
      institution: "Dedan Kimathi University Of Technology",
      year: "2025",
      gpa: "Yet to complete course",
    },
    contact: {
      email: "abraham.kioko@university.ac.ke",
      phone: "+254 712 345 678",
      location: "Nairobi, Kenya",
      github: "https://github.com/abraham-kioko",
    },
    profileImage:
      "https://img.rocket.new/generatedImages/rocket_gen_img_1c5746a0d-1762273807933.png", // replace with your own if needed
    profileImageAlt:
      "Professional headshot of Abraham Kioko wearing a smart casual outfit",
    summary:
      "I am a passionate Information Technology student focused on building innovative solutions that bridge technology with real-world applications. My interests span software development, data analytics, and tech-driven community projects.",
      skills: [
        { id: "skill-001", name: "JavaScript", category: "technical", level: "expert" },
        { id: "skill-002", name: "React", category: "technical", level: "advanced" },
        { id: "skill-003", name: "Node.js", category: "technical", level: "advanced" },
        { id: "skill-004", name: "Python", category: "technical", level: "intermediate" },
        { id: "skill-005", name: "SQL", category: "technical", level: "intermediate" },
      ],
          languages: ["English", "Swahili"],
  };

  return (
    <div className="space-y-10 pb-10">

      {/* Welcome message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Welcome back, {studentProfile.name.split(' ')[0]} 👋
        </h1>
        <p className="text-muted-foreground text-sm">
          Here’s a quick snapshot of your profile overview.
        </p>
      </div>

      {/* Profile Card */}
      <StudentProfileCard
        profile={studentProfile}
        currentLanguage="en"
        onLanguageChange={(lang) => console.log("Language changed:", lang)}
      />

      {/* About Section */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
          About Me
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {studentProfile.summary}
        </p>
      </div>

      {/* Call to Action */}
      <div className="mt-8 bg-gradient-to-r from-[#b7e7c3]/40 to-[#f7f3e9]/60 border rounded-xl p-6">
        <h3 className="text-lg font-heading font-semibold mb-2">
          Ready to share your story?
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Preview your portfolio or download your profile document.
        </p>

        <div className="flex gap-3">
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            onClick={() => navigate("/resume-viewer")}
          >
            Preview Portfolio
          </button>

          <button
            className="px-6 py-2 border border-border rounded-lg hover:bg-muted"
            onClick={() => navigate("/presentations-gallery")}
          >
            Download PDF
          </button>
        </div>
      </div>

    </div>
  );
};

export default StudentDashboardHome;
