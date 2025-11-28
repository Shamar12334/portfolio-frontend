import { useState } from "react";
import { api } from "../api/client";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // success or error message
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await api.post("/contact/", form);

      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });

    } catch (err) {
      console.error(err);
      setStatus("Failed to send message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-black text-white py-20 px-6 lg:px-28 flex justify-center">
      <div className="w-full max-w-2xl bg-white/10 p-10 rounded-2xl shadow-xl border border-white/10 backdrop-blur">

        <h1 className="text-4xl font-bold mb-6 text-center">Contact Me</h1>
        <p className="text-center opacity-80 mb-10">
          Have a question, opportunity, or want to collaborate?
        </p>

        {status && (
          <p
            className={`text-center mb-6 font-semibold ${
              status.includes("success") ? "text-green-400" : "text-red-400"
            }`}
          >
            {status}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 font-semibold">Message</label>
            <textarea
              rows="5"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white resize-none focus:outline-none"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            ></textarea>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

      </div>
    </section>
  );
}

export default Contact;
