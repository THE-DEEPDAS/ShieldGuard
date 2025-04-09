import React, { useEffect, useState } from "react";
import teachingImg from "../../Images/Teaching.svg";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import logo from "../../Images/logo.jpg";

function StudentDashboard() {
  const { ID } = useParams();
  const navigator = useNavigate();
  const [data, setdata] = useState([]);
  const [error, setError] = useState(null);

  const Handlelogout = async () => {
    const response = await fetch(`/api/student/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.statusCode == 200) {
      navigator("/");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/Student/StudentDocument/${ID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const user = await response.json();
        setdata(user.data);
      } catch (error) {
        setError(error.message);
      }
    };
    getData();
  }, []);

  return (
    <>
      {/* navbar */}
      <nav className="bg-[#2d0808] px-10 py-3 flex justify-between items-center fixed top-0 left-64 w-[calc(100%-16rem)] z-10">
        <NavLink to="/">
          <div className="flex items-center gap-3">
            <img src={logo} className="w-14" alt="" />
            <h1 className="text-2xl text-[#caae71] font-bold">ShieldGuard</h1>
          </div>
        </NavLink>
        <div className="bg-[#caae71] text-[#2d0808] py-2 px-5 rounded-full">
          <p onClick={Handlelogout}>logout</p>
        </div>
      </nav>

      <div className="flex mt-16">
        {/* Sidebar */}
        <div className="bg-[#2d0808] w-64 min-h-screen fixed top-0 left-0">
          <div className="flex flex-col gap-1 mt-20">
            <NavLink
              to={`/Student/Dashboard/${ID}/Search`}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#caae71] p-3 text-center font-semibold text-[#2d0808]"
                  : "p-3 text-center font-semibold text-[#caae71]"
              }
            >
              Teacher
            </NavLink>
            <NavLink
              to={`/Student/Dashboard/${ID}/Classes`}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#caae71] p-3 text-center font-semibold text-[#2d0808]"
                  : "p-3 text-center font-semibold text-[#caae71]"
              }
            >
              Classes
            </NavLink>
            <NavLink
              to={`/Student/Dashboard/${ID}/Courses`}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#caae71] p-3 text-center font-semibold text-[#2d0808]"
                  : "p-3 text-center font-semibold text-[#caae71]"
              }
            >
              Courses
            </NavLink>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 overflow-x-auto mt-16 p-5">
          <div className="bg-[#caae71] flex justify-between items-center w-full p-5 rounded-md">
            <div className="text-[#2d0808] font-semibold text-5xl">
              <h1 className="mb-5">
                Welcome to <span className="text-[#2d0808]">ShieldGuard</span>
              </h1>
              <h3 className="text-[#2d0808]">
                {data.Firstname} {data.Lastname}
              </h3>
            </div>
            <div>
              <img src={teachingImg} alt="teaching" width={300} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
