import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute";
import AdminContact from "./pages/admin/AdminContact";

function App() {
  return (
    <BrowserRouter>

      {/* PUBLIC SITE */}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ADMIN LOGIN (NO LAYOUT) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PAGES (Protected Layout) */}
        <Route 
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/about" element={<AdminAbout />} />
          <Route path="/admin/skills" element={<AdminSkills />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/contacts" element={<AdminContact />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
