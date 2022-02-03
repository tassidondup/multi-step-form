import React from "react";
import { useData } from "../DataContext";
import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { DataProvider } from "../DataContext/DataContext";

const Intro = () => {
  const { users, setActiveUser, activeUser } = useData();
  // const { users } = data;
  const navigate = useNavigate();

  console.log("user in context", users);
  console.log("active user", activeUser);

  const selectUser = (id) => {
    setActiveUser(id);
    navigate(`/wizard-form`);
  };

  return (
    <>
      {/* <div className="mx-auto z-10 mt-10 text-center">
        <h1 className="text-white text-5xl font-semibold">
          Welcome to <span className="text-yellow-500">OPAA POC</span>
        </h1>
        <p className="text-green-200 mt-2">
          Become a new member in 3 easy steps
        </p>
      </div> */}
      <div className="max-w-xl w-full mt-10 mb-10 rounded-lg shadow-2xl bg-white mx-auto overflow-hidden z-10">
        <div className="px-16 py-10 flex justify-between">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => selectUser(user.id)}
              className="p-10 shadow bg-blue-500 rounded cursor-pointer"
            >
              <h1>
                {user.personalDetails.firstName} {user.personalDetails.lastName}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Intro;
