import { useEffect, useState } from "react";
import { api } from "../api/client";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await api.get("/projects/");
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="text-xl opacity-80">Loading projects...</p>
      </div>
    );

  return (
    <section className="min-h-screen bg-black text-white py-20 px-6 lg:px-28">
      <h1 className="text-4xl font-bold mb-12 text-center">My Projects</h1>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white/10 border border-white/10 rounded-xl shadow-xl overflow-hidden hover:scale-105 transition duration-300"
          >
            {/* IMAGE */}
            {project.project_image ? (
              <img
                src={`data:image/png;base64,${project.project_image}`}
                alt={project.title}
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="w-full h-56 bg-white/5 flex items-center justify-center text-white/40">
                No Image
              </div>
            )}

            {/* CONTENT */}
            <div className="p-6">
              {/* Title */}
              <h2 className="text-2xl font-semibold mb-2">
                {project.title}
              </h2>

              {/* Description */}
              <p className="opacity-80 mb-4">
                {project.description}
              </p>

              {/* Tech stack badges */}
              {project.tech_stack && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack.split(",").map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition"
                  >
                    GitHub
                  </a>
                )}

                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
