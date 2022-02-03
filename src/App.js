import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./components/Intro";
import WizardForm from "./WizardForm";
import { DataProvider } from "./DataContext";

function App() {
  return (
    <div className="min-h-screen bg-pink-400 flex flex-col items-start text-gray-900 antialiased relative">
      <div
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 80%, 0% 100%)",
          height: "34rem",
        }}
        className="absolute bg-pink-500 inset-x-0 top-0"
      ></div>
      {/* // <ClubForm /> */}
      {/* <Header /> */}
      <div className="mx-auto z-10 mt-10 text-center">
        <h1 className="text-white text-5xl font-semibold">
          Welcome to <span className="text-yellow-500">OPAA POC</span>
        </h1>
        <p className="text-green-200 mt-2">
          Become a new member in 3 easy steps
        </p>
      </div>
      <DataProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Intro />} />
            <Route exact path="/wizard-form" element={<WizardForm />} />
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
