import { useEffect, useState } from "react";
import {api} from "../../api/client";

function AdminAbout(){
    const[about,setAbout]=useState(null);
    const[loading,setLoading] =useState(true);
    const[previewImage,setPreviewImage]=useState(null);
    const[message,setMessage]=useState("");
    useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await api.get("/about/");
        setAbout(res.data);
        setPreviewImage(`data:image/jpeg;base64,${btoa(
          String.fromCharCode(...res.data.profile_picture.data)
        )}`);
      } catch (err) {
        console.log("No about found.");
      } finally {
        setLoading(false);
      }
    }
    fetchAbout();
  }, []);

  // Convert uploaded file → Base64
  function convertToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result.split(",")[1]);
    reader.readAsDataURL(file);
  }

  // Handle profile picture upload
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    convertToBase64(file, (base64) => {
      setAbout({ ...about, profile_picture: base64 });
      setPreviewImage(URL.createObjectURL(file));
    });
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      let res;

      if (about?.id) {
        // Update existing
        res = await api.put(`/about/${about.id}`, about);
      } else {
        // Create new
        res = await api.post("/about/", about);
      }

      setMessage("Saved successfully!");
      setTimeout(() => setMessage(""), 2500);
      setAbout(res.data);

    } catch (err) {
      console.error(err);
      setMessage("Failed to save.");
    }
  }

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white text-black shadow-lg rounded-xl mt-10">

      <h2 className="text-2xl font-bold mb-6 text-center">Edit About Section</h2>

      {message && (
        <p className="text-center mb-4 text-green-600 font-semibold">{message}</p>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        <div>
          <label className="font-semibold">Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={about?.name || ""}
            onChange={(e) => setAbout({ ...about, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="font-semibold">Degree</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={about?.degree || ""}
            onChange={(e) => setAbout({ ...about, degree: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="font-semibold">Bio</label>
          <textarea
            rows="4"
            className="w-full border p-2 rounded"
            value={about?.bio || ""}
            onChange={(e) => setAbout({ ...about, bio: e.target.value })}
            required
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Years of Experience</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={about?.years_of_experience || ""}
            onChange={(e) =>
              setAbout({ ...about, years_of_experience: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="font-semibold">Resume URL</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={about?.resume_url || ""}
            onChange={(e) => setAbout({ ...about, resume_url: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="font-semibold">Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {previewImage && (
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-32 h-32 mt-3 rounded-full object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-900"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default AdminAbout;