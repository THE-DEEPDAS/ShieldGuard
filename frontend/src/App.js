import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Courses from "./Pages/Courses/Courses";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import AdminLogin from "./Pages/Login/AdminLogin";
import Admin from "./Pages/Components/Admin/Admin";
import ChatBot from "./components/ChatBot/ChatBot";

// Protected Route Component
const ProtectedAdminRoute = ({ children }) => {
  const adminToken = document.cookie.includes("Accesstoken");

  if (!adminToken) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/healthchat" element={<ChatBot />} />
        <Route
          path="/admin/:id"
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
