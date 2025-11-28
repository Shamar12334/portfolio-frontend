import { useEffect, useState } from "react";
import { api } from "../../api/client";

function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [skillImage, setSkillImage] = useState(null);
  const [message, setMessage] = useState("");

  // load skills on mount
  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await api.get("/skills/");
        setSkills(res.data);
      } catch (err) {
        console.error("Failed to load skills", err);
      }
    }
    fetchSkills();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setMessage("");

    if (!skillImage) {
      setMessage("Please choose an image.");
      return;
    }

    const formData = new FormData();
    formData.append("skill_name", skillName);
    formData.append("skill_image", skillImage);

    try {
      await api.post("/skills/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Skill added!");

      // clear form
      setSkillName("");
      setSkillImage(null);

      // reload skills
      const res = await api.get("/skills/");
      setSkills(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Error saving skill.");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this skill?")) return;

    try {
      await api.delete(`/skills/${id}`);
      setSkills(skills.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white text-black p-8 rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Skills</h2>

      {message && (
        <p className="text-center mb-4 text-green-600 font-semibold">
          {message}
        </p>
      )}

      {/* FORM */}
      <form onSubmit={handleSave} className="space-y-4 mb-10">
        <div>
          <label className="block font-semibold mb-1">Skill Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Skill Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSkillImage(e.target.files[0])}
            className="w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-900"
        >
          Add Skill
        </button>
      </form>

      {/* LIST */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex flex-col items-center bg-gray-100 p-4 rounded-lg"
          >
            {/* Pydantic returns bytes as base64 string */}
            <img
              src={`data:image/png;base64,${skill.skill_image}`}
              alt={skill.skill_name}
              className="w-16 h-16 rounded mb-2 object-cover"
            />
            <p className="font-semibold mb-2">{skill.skill_name}</p>
            <button
              onClick={() => handleDelete(skill.id)}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSkills;
