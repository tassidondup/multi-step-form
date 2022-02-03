import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useData } from "./DataContext";
import { useParams, navigate, useNavigate } from "react-router-dom";

const PersonalInformation = () => {
  const { id } = useParams();
  const {
    activeUser,
    setPersonalDetails,
    nextStep,
    saveAndExit,
    setPersonalDetailsAndMove,
    cancelApplication,
  } = useData();
  // const personalDetails = activeUser.personalDetails;
  const [formValues, setFormValues] = useState(activeUser.personalDetails);
  const navigate = useNavigate();
  // console.log("user in personal information component", user);
  const {
    watch,
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "all", defaultValues: formValues });

  const workingStatus = watch("workingStatus");
  console.log("active user", activeUser);

  // useEffect(() => {
  //   setFormValues(activeUser.personalDetails);
  // }, []);

  const submitForm = (values) => {
    // console.log("personal details form values", values);
    setPersonalDetailsAndMove(values);
    // console.log(personalDetails);
    // nextStep();
  };

  const saveExit = (values) => {
    console.log("formValues", values);
    // setPersonalDetails(values);
    saveAndExit(values);
    // navigate("/");
  };

  // console.log("form values", formValues);

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <section>
        <h5 className="text-3xl font-bold">Hi {formValues.firstName}</h5>
        <div className="mt-5">
          <h6 className="text-lg">My date of birth is</h6>
          <p className="text-sm">
            Based on your age and work status, product will be selected
          </p>
          <input
            readOnly
            type="date"
            id="dob"
            name="dob"
            className="form-input mt-3 bg-gray-200 border border-gray-400"
            {...register("dob", {
              required: {
                value: true,
                message: "dob is required",
              },
            })}
            value={activeUser.dob}
          />
          {errors.dob && (
            <p className="text-red-400 text-xs mt-2">{errors.dob.message}</p>
          )}
        </div>
        <div className="mt-5">
          <h2 className="mb-2 text-lg">My current work status is</h2>
          <div className="flex">
            <div className="form-check form-check-inline">
              <input
                {...register("workingStatus", {
                  required: true,
                  message: "Please choose your working status",
                })}
                className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="workingStatus"
                id="working"
                value="working"
                // checked={}
              />
              <label
                className="form-check-label inline-block text-gray-800 mr-4"
                htmlFor="working"
              >
                Working
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                {...register("workingStatus", {
                  required: true,
                  message: "Please choose your working status",
                })}
                className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="workingStatus"
                id="retired"
                value="retired"
              />
              <label
                className="form-check-label inline-block text-gray-800 mr-4"
                htmlFor="retired"
              >
                Retired
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                {...register("workingStatus", {
                  required: true,
                  message: "Please choose your working status",
                })}
                className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
                type="radio"
                name="workingStatus"
                id="disable"
                value="disable"
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="disable"
              >
                Unable to work TPD
              </label>
            </div>
          </div>
          {errors.workingStatus && (
            <p className="text-red-400 text-xs mt-4 ">
              Please choose your working status
            </p>
          )}
          {workingStatus ? (
            workingStatus === "working" ? (
              <h2 className="text-xl font-semibold mt-4">
                You are eligible for{" "}
                <span className="font-bold">TTR Pension Account</span>
              </h2>
            ) : (
              <h2 className="text-xl font-semibold mt-4">
                You are eligible for{" "}
                <span className="font-bold">ABP Pension Account</span>
              </h2>
            )
          ) : null}
        </div>
        <hr className="my-5" />
        <h5 className="text-2xl font-semibold mb-5">
          Edit your personal details
        </h5>
        <div className="mb-5">
          <label htmlFor="firstName" className="block mb-2 text-lg">
            First name <span className="text-red-500 ">*</span>
          </label>
          <input
            {...register("firstName", {
              required: {
                value: true,
                message: "First Name is required",
              },
            })}
            type="text"
            className="form-input w-1/2 border-gray-400"
            id="firstName"
            // value={formValues.firstName}
          />
          {errors?.firstName && (
            <p className="text-red-500 text-xs mt-2">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="lastName" className="block mb-2 text-lg">
            Last name <span className="text-red-500 ">*</span>
          </label>
          <input
            {...register("lastName", {
              required: {
                value: true,
                message: "Last Name is required",
              },
            })}
            type="text"
            className="form-input  w-1/2 border-gray-400"
            id="lastName"
            // value={formValues.lastName}
          />
          {errors?.lastName && (
            <p className="text-red-500 text-xs mt-2">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="address" className="block mb-2 text-lg">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register("address", {
              required: {
                value: true,
                message: "Address is required",
              },
            })}
            type="text"
            className="form-input w-1/2 border-gray-400"
            id="address"
            // value={formValues.address}
          />
          {errors.address && (
            <p className="text-red-400 text-xs mt-2">
              {errors.address.message}
            </p>
          )}
        </div>
      </section>
      <section className="flex justify-between mt-10">
        <button
          type="button"
          className="bg-gray-200 text-white px-10 py-3 rounded cursor-not-allowed"
          disabled
        >
          Previous
        </button>
        <button
          type="button"
          className="hover:underline"
          onClick={cancelApplication}
        >
          Cancel Application
        </button>
        <div className=" flex justify-end">
          <button
            type="button"
            className="text-indigo-500 border border-indigo-800 px-6 py-3 rounded hover:bg-indigo-800 hover:text-white"
            onClick={() => {
              const formValues = getValues();
              saveExit(formValues);
            }}
          >
            Save and Exit
          </button>
          <button
            type="submit"
            className="text-white bg-indigo-800 px-6 py-3 rounded ml-10 hover:bg-indigo-900"
          >
            Continue
          </button>
        </div>
      </section>
    </form>
  );
};

export default PersonalInformation;
