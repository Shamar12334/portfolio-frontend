import { Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-black">

      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6 space-y-6">
        <h1 className="font-bold text-xl">Admin Panel</h1>

        <nav className="flex flex-col gap-3">
          <a href="/admin/dashboard" className="hover:text-gray-300">Dashboard</a>
          <a href="/admin/about" className="hover:text-gray-300">About</a>
          <a href="/admin/skills" className="hover:text-gray-300">Skills</a>
          <a href="/admin/projects" className="hover:text-gray-300">Project</a>
          <a href="/admin/contacts" className="hover:text-gray-300">Contact</a>
        </nav>

        <button 
          onClick={logout}
          className="mt-10 bg-red-600 w-full py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      {/* Page content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
