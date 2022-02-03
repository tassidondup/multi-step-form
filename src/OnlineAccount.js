import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useData } from "./DataContext";
import { useParams, useNavigate } from "react-router-dom";
import { getValue } from "@testing-library/user-event/dist/utils";

const OnlineAccount = () => {
  const { id } = useParams();
  const {
    activeUser,
    setOnlineAccountSetup,
    previousStep,
    saveAndExit,
    cancelApplication,
  } = useData();
  // const user = data.users.find((user) => user.id === id);
  const [formValues, setFormValues] = useState(activeUser.onlineAccountSetup);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setFormValues(activeUser.onlineAccountSetup);
  // }, []);

  // const onlineAccountSetup = user.onlineAccountSetup;
  console.log("user in online account component", activeUser);
  console.log("online account formValues", formValues);
  const {
    watch,
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "all", defaultValues: formValues });

  const values = getValues();

  const submitForm = (values) => {
    // console.log("online account submiiting");
    setOnlineAccountSetup(values);
    console.log("consolidation values", values);
    // navigate("/");
    // alert(JSON.stringify(user, null, 2));
  };

  console.log("form default values", values);

  // const watchFields = watch(["consolidate"], ["amount"]);
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Funds Consolidation</h3>
      <p className="text-xs">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution
      </p>
      <form onSubmit={handleSubmit(submitForm)} className="mt-10">
        <div>
          <p className="text-lg font-semibold mb-2">
            Do you want to consolidate your super funds now ?
          </p>
          <div className="flex">
            <div className="form-check form-check-inline">
              <input
                {...register("consolidate", {
                  required: true,
                  message: "Please choose amount",
                })}
                className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="consolidate"
                id="consolidate"
                value="yes"
                // checked={formValues.consolidate === "yes" ? true : false}
              />
              <label
                className="form-check-label inline-block text-gray-800 mr-2"
                htmlFor="consolidate"
              >
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                {...register("consolidate", {
                  required: true,
                  message: "Please choose amount",
                })}
                className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                id="consolidate-no"
                name="consolidate"
                value="no"
                // checked={formValues.consolidate === "no" ? true : false}
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="consolidate-no"
              >
                No
              </label>
            </div>
            {errors.consolidate && (
              <p className="text-sm text-red-500">Please choose amount</p>
            )}
          </div>
          {watch().consolidate && watch().consolidate === "yes" && (
            <>
              <div className="mt-5">
                <label className="block mb-2" htmlFor="fundName">
                  Enter your Fund name
                </label>
                <input
                  type="text"
                  name="fundName"
                  id="fundName"
                  className="form-input w-1/2 border-gray-400"
                  {...register("fundName", {
                    required: { value: true, message: "Fund name is required" },
                  })}
                />
                {errors.fundName && (
                  <p className="text-sm text-red-500">
                    {errors.fundName.message}
                  </p>
                )}
              </div>
              <div className="mt-5">
                <label className="block mb-2" htmlFor="ABN">
                  ABN
                </label>
                <input
                  type="text"
                  name="abn"
                  id="ABN"
                  className="form-input w-1/2 border-gray-400"
                  {...register("abn", {
                    required: { value: true, message: "ABN is required" },
                  })}
                />
                {errors.abn && (
                  <p className="text-sm text-red-500">{errors.usi.message}</p>
                )}
              </div>
              <div className="mt-5">
                <label className="block mb-2" htmlFor="USI">
                  USI
                </label>
                <input
                  type="text"
                  name="usi"
                  id="USI"
                  className="form-input  w-1/2 border-gray-400"
                  {...register("usi", {
                    required: { value: true, message: "USI is required" },
                  })}
                />
                {errors.USI && (
                  <p className="text-sm text-red-500">{errors.usi.message}</p>
                )}
              </div>

              <div className="mt-5">
                <label htmlFor="amount" className="block mb-2">
                  Enter your amount
                </label>
                <input
                  type="number"
                  name="transferAmount"
                  id="amount"
                  className="form-input w-1/2 border-gray-400"
                  {...register("transferAmount", {
                    required: { value: true, message: "USI is required" },
                  })}
                />
                {errors.transferAmount && (
                  <p className="text-red-500 text-xs">
                    {errors.transferAmount.message}
                  </p>
                )}
              </div>
            </>
          )}
          <section className="flex justify-between mt-10">
            <button
              type="button"
              className="bg-gray-900 text-white px-10 py-3 rounded hover:bg-gray-800"
              onClick={() => previousStep(id)}
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
                  const values = getValues();
                  saveAndExit(values);
                }}
              >
                Save and Exit
              </button>
              <button
                type="submit"
                // disabled={!isValid}
                className={`text-white bg-indigo-800 px-6 py-3 rounded ml-10 hover:bg-indigo-900`}
              >
                Submit
              </button>
            </div>
          </section>

          {/* <p>{JSON.stringify(watch(), null, 2)}</p> */}
        </div>
      </form>
      {/* <p>{JSON.stringify(errors, null, 2)}</p> */}
    </div>
  );
};

export default OnlineAccount;
