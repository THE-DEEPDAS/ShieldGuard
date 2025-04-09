import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import Landing from "./Pages/Home/Landing/Landing";
import About from "./Pages/Home/About/About";
import Contact from "./Pages/Home/Contact/Contact";
import Courses from "./Pages/Home/Courses/Courses";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import AdminLogin from "./Pages/Login/AdminLogin";
import ChatBot from "./Pages/ChatBot/ChatBot"; // Ensure correct import path
import ThreatIntelligence from "./Pages/ThreatIntelligence/ThreatIntelligence"; // Import the new component

import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import StudentDocument from "./Pages/Components/DocumentVerification/StudentDocument";
import TeacherDocument from "./Pages/Components/DocumentVerification/TeacherDocument";
import VarifyEmail from "./Pages/Components/VarifyEmail/VarifyEmail";
import Rejected from "./Pages/Response/Rejected";
import Pending from "./Pages/Response/Pending";
import Admin from "./Pages/Components/Admin/Admin";
import VarifyDoc from "./Pages/Components/Admin/VarifyDoc";
import TeacherLayout from "./Pages/Dashboard/TeacherDashboard/TeacherLayout";
import StudentLayout from "./Pages/Dashboard/StudentDashboard/StudentLayout";
import SearchTeacher from "./Pages/Dashboard/StudentDashboard/SearchTeacher";
import StudentClasses from "./Pages/Dashboard/StudentDashboard/StudentClasses";
import StudentCourses from "./Pages/Dashboard/StudentDashboard/StudentCourses";
import DashboardTeacher from "./Pages/Dashboard/TeacherDashboard/DashboardTeacher";
import TeacherClasses from "./Pages/Dashboard/TeacherDashboard/TeacherClasses";
import TeacherCourses from "./Pages/Dashboard/TeacherDashboard/TeacherCourses";
import SearchData from "./Pages/Home/Search/Search";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Forgetpassword from "./Pages/ForgetPassword/Forgetpassword";
import ResetPassword from "./Pages/ForgetPassword/ResetPassword";
import { Toaster } from "react-hot-toast";
import ResetTeacher from "./Pages/ForgetPassword/ResetTeacher";
import Course from "./Pages/Components/Admin/Course";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path="/"
        element={
          <div className="page-content">
            <Landing />
          </div>
        }
      />
      <Route
        path="/login"
        element={
          <div className="page-content">
            <Login />
          </div>
        }
      />
      <Route
        path="/Signup"
        element={
          <div className="page-content">
            <Signup />
          </div>
        }
      />
      <Route
        path="/Search/:subject"
        element={
          <div className="page-content">
            <SearchData />
          </div>
        }
      />
      <Route
        path="/StudentDocument/:Data"
        element={
          <div className="page-content">
            <StudentDocument />
          </div>
        }
      />
      <Route
        path="/TeacherDocument/:Data"
        element={
          <div className="page-content">
            <TeacherDocument />
          </div>
        }
      />
      <Route
        path="/courses"
        element={
          <div className="page-content">
            <Courses />
          </div>
        }
      />
      <Route
        path="/contact"
        element={
          <div className="page-content">
            <Contact />
          </div>
        }
      />
      <Route
        path="/about"
        element={
          <div className="page-content">
            <About />
          </div>
        }
      />
      <Route
        path="/varifyEmail"
        element={
          <div className="page-content">
            <VarifyEmail />
          </div>
        }
      />
      <Route
        path="/adminLogin/"
        element={
          <div className="page-content">
            <AdminLogin />
          </div>
        }
      />
      <Route
        path="/rejected/:user/:ID"
        element={
          <div className="page-content">
            <Rejected />
          </div>
        }
      />
      <Route
        path="/pending"
        element={
          <div className="page-content">
            <Pending />
          </div>
        }
      />
      <Route
        path="/admin/:data"
        element={
          <div className="page-content">
            <Admin />
          </div>
        }
      />
      <Route
        path="/admin/course/:data"
        element={
          <div className="page-content">
            <Course />
          </div>
        }
      />
      <Route
        path="/VarifyDoc/:type/:adminID/:ID"
        element={
          <div className="page-content">
            <VarifyDoc />
          </div>
        }
      />
      <Route path="/Student/Dashboard/:ID" element={<StudentLayout />}>
        <Route
          path="/Student/Dashboard/:ID/Search"
          element={
            <div className="page-content">
              <SearchTeacher />
            </div>
          }
        />
        <Route
          path="/Student/Dashboard/:ID/Classes"
          element={
            <div className="page-content">
              <StudentClasses />
            </div>
          }
        />
        <Route
          path="/Student/Dashboard/:ID/Courses"
          element={
            <div className="page-content">
              <StudentCourses />
            </div>
          }
        />
      </Route>
      <Route path="/Teacher/Dashboard/:ID" element={<TeacherLayout />}>
        <Route
          path="/Teacher/Dashboard/:ID/Home"
          element={
            <div className="page-content">
              <DashboardTeacher />
            </div>
          }
        />
        <Route
          path="/Teacher/Dashboard/:ID/Classes"
          element={
            <div className="page-content">
              <TeacherClasses />
            </div>
          }
        />
        <Route
          path="/Teacher/Dashboard/:ID/Courses"
          element={
            <div className="page-content">
              <TeacherCourses />
            </div>
          }
        />
      </Route>
      <Route
        path="/forgetPassword"
        element={
          <div className="page-content">
            <Forgetpassword />
          </div>
        }
      />
      <Route
        path="/student/forgetPassword/:token"
        element={
          <div className="page-content">
            <ResetPassword />
          </div>
        }
      />
      <Route
        path="/teacher/forgetPassword/:token"
        element={
          <div className="page-content">
            <ResetTeacher />
          </div>
        }
      />
      <Route
        path="/healthchat"
        element={
          <div className="page-content">
            <ChatBot />
          </div>
        }
      />
      <Route
        path="/threat-intelligence"
        element={
          <div className="page-content">
            <ThreatIntelligence />
          </div>
        }
      />
      <Route
        path="*"
        element={
          <div className="page-content">
            <ErrorPage />
          </div>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
