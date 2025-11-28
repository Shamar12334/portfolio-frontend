import { useEffect, useState } from "react";
import { api } from "../api/client";

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/skills/");
        setSkills(res.data);
      } catch (err) {
        console.error("Failed to load skills", err);
      }
    }
    load();
  }, []);

  return (
    <section className="section text-white py-20 px-6 lg:px-28">
      <h1 className="text-4xl font-bold mb-10 text-center">Skills</h1>

      {skills.length === 0 ? (
        <p className="text-center text-gray-400">No skills added yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white/10 border border-white/10 rounded-xl shadow-xl overflow-hidden hover:scale-105 transition duration-300"
            >
              {/* Full-width top image */}
              <img
                src={`data:image/png;base64,${skill.skill_image}`}
                alt={skill.skill_name}
                className="max-w-full max-h-full object-contain"
              />

              <div className="p-4 text-center">
                <p className="text-lg font-semibold">{skill.skill_name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Skills;
