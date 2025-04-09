import React, { useEffect, useState } from "react";
import teachingImg from "../../Images/Teaching.svg";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import logo from "../../Images/logo.jpg";

function TeacherDashboard() {
  const { ID } = useParams();
  const navigator = useNavigate();
  const [data, setdata] = useState([]);

  const Handlelogout = async () => {
    const response = await fetch(`/api/teacher/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.statusCode == 200) {
      navigator("/");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/Teacher/TeacherDocument/${ID}`, {
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
        // console.log(user)
      } catch (error) {
        // setError(error.message)
      }
    };
    getData();
  }, []);

  return (
    <>
      {/* navbar */}
      <nav className="bg-[#2d0808] px-10 py-3 flex justify-between items-center">
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

      <div className="bg-[#caae71] flex justify-between items-center w-full">
        <div className="text-[#2d0808] font-semibold text-5xl ml-20">
          <h1 className="mb-5">
            Welcome to <span className="text-[#2d0808]">ShieldGuard</span>
          </h1>
          <h3 className="ml-16 text-[#2d0808]">
            {data.Firstname} {data.Lastname}
          </h3>
        </div>
        <div className="m-5 mr-20">
          <img src={teachingImg} alt="teaching" width={300} />
        </div>
      </div>

      {/* sidebar */}
      <div className="bg-[#2d0808] w-52 min-h-screen fixed top-20 left-0">
        <div className="flex flex-col gap-5 text-xl items-center text-[#caae71] mt-8 mb-10">
          <img
            src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
            alt="profile_img"
            width={50}
          />
          <p>
            {data.Firstname} {data.Lastname}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <NavLink
            to={`/Teacher/Dashboard/${ID}/Home`}
            className={({ isActive }) =>
              isActive
                ? "bg-[#caae71] p-3 px-[4.61rem] text-center font-semibold text-[#2d0808]"
                : "p-3 text-center font-semibold text-[#caae71]"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to={`/Teacher/Dashboard/${ID}/Classes`}
            className={({ isActive }) =>
              isActive
                ? "bg-[#caae71] p-3 px-[4.61rem] text-center font-semibold text-[#2d0808]"
                : "p-3 text-center font-semibold text-[#caae71]"
            }
          >
            Classes
          </NavLink>

          <NavLink
            to={`/Teacher/Dashboard/${ID}/Courses`}
            className={({ isActive }) =>
              isActive
                ? "bg-[#caae71] p-3 px-[4.61rem] text-center font-semibold text-[#2d0808]"
                : "p-3 text-center font-semibold text-[#caae71]"
            }
          >
            Courses
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
