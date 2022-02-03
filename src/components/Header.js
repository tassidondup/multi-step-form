import React from "react";
import { useData } from "../DataContext";
import { useParams } from "react-router-dom";

const Header = () => {
  return (
    <div className="mx-auto z-10 mt-10 text-center">
      <h1 className="text-white text-5xl font-semibold">
        Welcome to <span className="text-yellow-500">the Club</span>
      </h1>
      <p className="text-green-200 mt-2">Become a new member in 3 easy steps</p>
    </div>
  );
};

export default Header;
