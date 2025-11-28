import { useEffect, useState } from "react";
import { api } from "../../api/client";

function AdminProjects() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [techStack, setTechStack] = useState("");
  const [projectImage, setProjectImage] = useState(null);

  const [message, setMessage] = useState("");

  // Load projects on mount
  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const res = await api.get("/projects/");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects", err);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setMessage("");

    if (!projectImage) {
      setMessage("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("github_url", githubUrl);
    formData.append("live_url", liveUrl);
    formData.append("tech_stack", techStack);
    formData.append("project_image", projectImage);

    try {
      await api.post("/projects/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Project added!");
      resetForm();
      loadProjects();
    } catch (err) {
      console.error(err);
      setMessage("Error adding project.");
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setGithubUrl("");
    setLiveUrl("");
    setTechStack("");
    setProjectImage(null);
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project?")) return;

    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white text-black p-8 rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Projects</h2>

      {message && (
        <p className="text-center mb-4 text-green-600 font-semibold">{message}</p>
      )}

      {/* FORM */}
      <form onSubmit={handleSave} className="space-y-4 mb-10">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">GitHub URL</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Live URL</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Tech Stack</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Project Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProjectImage(e.target.files[0])}
            className="w-full"
            required
          />
        </div>

        <button className="w-full bg-black text-white p-3 rounded hover:bg-gray-900">
          Add Project
        </button>
      </form>

      {/* PROJECT LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col bg-gray-100 p-4 rounded-lg"
          >
            <img
              src={`data:image/png;base64,${project.project_image}`}
              className="w-full h-40 object-cover rounded mb-3"
              alt=""
            />

            <h3 className="font-bold text-lg">{project.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{project.description}</p>

            <button
              onClick={() => handleDelete(project.id)}
              className="text-sm text-red-600 hover:text-red-800 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProjects;
