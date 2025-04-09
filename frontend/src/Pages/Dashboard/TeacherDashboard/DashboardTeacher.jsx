import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import Withdrawal from "./Withdrawal";
import { TbMessage2Star } from "react-icons/tb";

function DashboardTeacher() {
  const { ID } = useParams();
  const [data, setdata] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState([]);
  const [popup, setPopup] = useState(false);
  const [notification, setNotification] = useState(false);
  const [amount, setAmount] = useState(0);
  const [subjectForm, setsubjectForm] = useState("Math");
  const [Tdec, setTeacherDetails] = useState(null);
  const [starCount, setStar] = useState(5);

  const [formPopup, setFormPopup] = useState(false);

  const price = {
    math: 700,
    physics: 800,
    computer: 1000,
    chemistry: 600,
    biology: 500,
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
        // console.log(user.data);
      } catch (error) {
        setError(error.message);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const Data = await fetch("/api/teacher/teacherdocuments", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacherID: data.Teacherdetails }),
      });
      const res = await Data.json();
      // console.log(res.data);
      setTeacherDetails(res.data);
    };

    getData();
  }, [courses]);

  useEffect(() => {
    const getAmount = async () => {
      try {
        const response = await fetch(`/api/payment/teacher/${ID}/balance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const user = await response.json();
        setAmount(user.data.newTeacher.Balance);
        // console.log(user)
      } catch (error) {
        // setError(error.message)
        console.log(error);
      }
    };
    getAmount();
  }, [amount, popup]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetch(`/api/course/Teacher/${ID}/enrolled`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const res = await response.json();
        setCourses(res.data);
        console.log(res.data);
      } catch (error) {
        setError(error.message);
      }
    };
    getCourses();
  }, []);

  return (
    <>
      <div className="flex mt-16">
        {/* Sidebar */}
        <div className="bg-[#2d0808] w-64 min-h-screen fixed top-0 left-0">
          <div className="flex flex-col gap-5 text-xl items-center text-[#caae71] mt-20 mb-10">
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
                  ? "bg-[#caae71] p-3 text-center font-semibold text-[#2d0808]"
                  : "p-3 text-center font-semibold text-[#caae71]"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to={`/Teacher/Dashboard/${ID}/Classes`}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#caae71] p-3 text-center font-semibold text-[#2d0808]"
                  : "p-3 text-center font-semibold text-[#caae71]"
              }
            >
              Classes
            </NavLink>
            <NavLink
              to={`/Teacher/Dashboard/${ID}/Courses`}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#caae71] p-3 text-center font-semibold text-[#2d0808]"
                  : "p-3 text-center font-semibold text-[#caae71]"
              }
            >
              Courses
            </NavLink>
            <NavLink
              to={`/Teacher/Dashboard/${ID}/Profile`}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#caae71] p-3 text-center font-semibold text-[#2d0808]"
                  : "p-3 text-center font-semibold text-[#caae71]"
              }
            >
              Profile
            </NavLink>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 overflow-x-auto mt-16 p-5">
          <div className="m-5 text-[#caae71] flex flex-col gap-7">
            <div className="text-[1.1rem] w-full flex justify-between items-center">
              <div className="bg-[#2d0808] p-3 rounded-md cursor-pointer text-[#caae71]">
                Details
              </div>
              <div className="bg-[#2d0808] p-3 rounded-md cursor-pointer text-[#caae71]">
                Remuneration
              </div>
            </div>
            <hr />
            <div className="flex gap-10">
              <div className="flex flex-col gap-5">
                <p>
                  Name:{" "}
                  <span className="text-[#2d0808]">
                    {data.Firstname} {data.Lastname}
                  </span>
                </p>
                <p>
                  Email: <span className="text-[#2d0808]">{data.Email}</span>
                </p>
                <p>
                  Phone: <span className="text-[#2d0808]">{Tdec?.Phone}</span>
                </p>
                <p>
                  Address:{" "}
                  <span className="text-[#2d0808]">{Tdec?.Address}</span>
                </p>
                <p>
                  Experience:{" "}
                  <span className="text-[#2d0808]">
                    {Tdec?.Experience} years
                  </span>
                </p>
              </div>
              <div>
                <div className="flex gap-3 flex-col">
                  <p className="bg-[#2d0808] py-1 px-2 w-fit text-[#caae71]">
                    Courses
                  </p>
                  {courses &&
                    courses
                      .filter((course) => course.isapproved)
                      .map((course) => (
                        <p
                          key={course._id}
                          className="py-1 px-2 rounded-xl w-fit text-[#caae71]"
                        >
                          {course.coursename} :{" "}
                          <span className="text-[#2d0808]">
                            {" [ "}
                            {course.schedule
                              .map(
                                (days) =>
                                  `${daysOfWeek[days.day]} ${Math.floor(
                                    days.starttime / 60
                                  )}:${
                                    days.starttime % 60 === 0
                                      ? "00"
                                      : days.starttime % 60
                                  } - ${Math.floor(days.endtime / 60)}:${
                                    days.endtime % 60 === 0
                                      ? "00"
                                      : days.endtime % 60
                                  }`
                              )
                              .join(", ")}
                            {" ] "}
                          </span>
                          <span className="text-[#2d0808] font-bold">
                            {" => "}
                            Rs. {price[course.coursename]} per student / per
                            month
                          </span>
                        </p>
                      ))}
                </div>
              </div>
            </div>

            {popup && (
              <Withdrawal onClose={() => setPopup(false)} TA={amount} />
            )}

            {formPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-[#5be0de] text-black w-[70vw] px-14 py-10 rounded-sm">
                  <p className="text-3xl">Teacher Feedback Form</p>
                  <p className=" border-b-2 py-2">
                    We highly appreciate your involvement. Please help us
                    improve by filling out this teacher feedback form. Thank
                    you!
                  </p>

                  <div className="flex flex-col gap-3 my-5 pb-5 border-b-2">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="p-2"
                      placeholder="Teacher / Instructor Name"
                    />
                    <label>Course Name</label>

                    <input
                      type="text"
                      className="p-2"
                      placeholder="Course Name"
                    />
                    <label>Number of Years Teaching ?</label>
                    <input type="text" className="p-2" placeholder="in years" />
                  </div>

                  <div className="py-3 flex flex-col justify-center items-center">
                    <p className="pb-3 text-center">
                      Do you have suggestions on what we can do to provide you
                      with a better service?
                    </p>
                    <textarea
                      className=" rounded-md w-[80%] h-32 p-2"
                      placeholder="Type here ..."
                    ></textarea>
                  </div>

                  <div className="flex justify-center mt-3">
                    <button className="w-[10rem]">Submit Form</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardTeacher;
