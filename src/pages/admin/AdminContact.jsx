import { useEffect, useState } from "react";
import { api } from "../../api/client";

function AdminContact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all contact messages from backend
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/contact/");
        setContacts(res.data);
      } catch (err) {
        console.error("Failed to load contact messages:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Delete message
  async function deleteContact(id) {
    if (!confirm("Delete this contact message?")) return;

    try {
      await api.delete(`/contact/${id}`);
      setContacts(contacts.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  }

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black shadow-lg rounded-xl mt-10">

      <h2 className="text-3xl font-bold mb-6 text-center">Contact Messages</h2>

      {contacts.length === 0 ? (
        <p className="text-center text-gray-600">No messages submitted yet.</p>
      ) : (
        <div className="space-y-6">
          {contacts.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-gray-100 rounded-lg border border-gray-300"
            >
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.email}</p>

              <p className="my-3">{item.message}</p>

              <p className="text-xs text-gray-500 mb-4">
                Sent: {new Date(item.time_stamp).toLocaleString()}
              </p>

              <button
                onClick={() => deleteContact(item.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default AdminContact;
