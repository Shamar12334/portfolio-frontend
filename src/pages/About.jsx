import { useEffect, useState } from "react";
import { api } from "../api/client";

function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAbout() {
      try {
        const res = await api.get("/about/");
        setAbout(res.data);
      } catch (err) {
        console.error("Failed to load about info:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAbout();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="text-xl opacity-80">Loading...</p>
      </div>
    );

  if (!about)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="text-xl opacity-80">No About info found.</p>
      </div>
    );

  return (
    <section className="min-h-screen bg-black text-white py-24 px-6 lg:px-32">
      
      {/* Heading */}
      <h1 className="text-center text-5xl font-extrabold mb-20 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        About Me
      </h1>

      <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
        
        {/* Image Section */}
        <div className="relative">
          {/* Glow behind image */}
          <div className="absolute inset-0 blur-3xl bg-purple-600/30 rounded-full"></div>

          {/* Profile image */}
          <img
            src={`data:image/jpeg;base64,${about.profile_picture}`}
            alt="Profile"
            className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-3xl object-cover shadow-2xl border border-white/10"
          />
        </div>

        {/* Text Content */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-xl max-w-xl">

          {/* Name */}
          <h2 className="text-4xl font-bold mb-4">{about.name}</h2>

          {/* Degree */}
          <p className="text-lg opacity-90 mb-2">
            🎓 <span className="font-semibold">Degree:</span> {about.degree}
          </p>

          {/* Experience */}
          <p className="text-lg opacity-90 mb-4">
            💼 <span className="font-semibold">Experience:</span>{" "}
            {about.years_of_experience}+ years
          </p>

          {/* Bio */}
          <p className="opacity-80 leading-relaxed mb-8 text-lg">
            {about.bio}
          </p>

          {/* Resume Button */}
          {about.resume_url && (
            <a
              href={about.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-lg font-semibold transition inline-block shadow-md"
            >
              View Resume
            </a>
          )}
        </div>

      </div>
    </section>
  );
}

export default About;
