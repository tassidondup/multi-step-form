import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useData } from "./DataContext";
import { useParams, useNavigate } from "react-router-dom";

const MoneyInflow = () => {
  const { id } = useParams();
  const {
    activeUser,
    setMoneyInflow,
    previousStep,
    updateTransferAmount,
    nextStep,
    setMoneyInflowAndMove,
    saveAndExit,
    cancelApplication,
  } = useData();
  // const user = activeUser;
  const moneyInflow = activeUser.moneyInflow;
  const navigate = useNavigate();
  // console.log("user in money info component", activeUser);
  // console.log(moneyInflow);
  // const [amountValue, setAmountValue] = useState(moneyInflow.amount);
  const {
    watch,
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      ...moneyInflow,
    },
  });

  const amountValue = watch("amountType");
  const formValues = getValues();

  const submitForm = (values) => {
    console.log("submitting form", values);
    setMoneyInflowAndMove(values);
    // nextStep();
  };

  useEffect(() => {
    if (watch().amountType === "wholeAmount") {
      updateTransferAmount(14000, id);
    } else {
      updateTransferAmount(watch().amount, id);
    }
  }, [watch().amountType]);

  // console.log("errors", errors);

  // console.log("default form values", values);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Transfer Fund</h2>
      <p className="text-xs">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum.
      </p>
      <form onSubmit={handleSubmit(submitForm)} className="mt-10">
        <h3 className="text-xl font-semibold mb-2">
          Transfer funds from your Pacific Super account
        </h3>
        <div className="p-5 border-2 border-gray-400">
          <div className="flex justify-between">
            <div>
              <p className="text-semibold mb-1 text-black font-bold">
                {moneyInflow.account.super_account}
              </p>
              <p className="font-semibold text-sm mb-1 text-black">
                Member no : {moneyInflow.account.member_no}3
              </p>
              <p className="font-semibold text-xs text-black">
                USI: {moneyInflow.account.usi}
              </p>
            </div>
            <div>
              <p className="font-semibold">Available Balance</p>
              <p className="font-bold text-indigo-600 text-right text-lg">
                ${moneyInflow.amount}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <p className="font-semibold mb-1">
              What would you like to do with this account ?
            </p>
            <div className="flex ">
              <div className="form-check form-check-inline">
                <input
                  {...register("amountType", {
                    required: true,
                    message: "Please choose amount",
                  })}
                  className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="amountType"
                  id="wholeAmount"
                  value="wholeAmount"
                  // defaultChecked
                />
                <label
                  className="form-check-label inline-block text-gray-800 mr-5"
                  htmlFor="wholeAmount"
                >
                  Transfer Whole Amount
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  {...register("amountType", {
                    required: true,
                    message: "Please choose amount",
                  })}
                  className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="amountType"
                  id="partialAmount"
                  value="partialAmount"
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="partialAmount"
                >
                  Transfer Specific Amount
                </label>
              </div>
            </div>
          </div>
          {amountValue && amountValue === "partialAmount" ? (
            <div>
              <div className="mt-5">
                <label className="block mb-2" htmlFor="amount">
                  Enter your amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="amount"
                  className="form-input"
                  name="amount"
                  {...register("amount", {
                    required: { value: true, message: "Amount is required" },
                    min: { value: 5000, message: "Minimum of $5000" },
                    max: { value: 14000, message: "Maximum of $14000" },
                  })}
                  placeholder="Enter amount"
                />
                {errors.amount && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.amount.message}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  updateTransferAmount(watch().amount, id);
                }}
                className="px-5 py-2 border-2 border-indigo-600 mb-10 rounded mt-5"
              >
                Save
              </button>
            </div>
          ) : null}
        </div>

        <section className="flex justify-between mt-10">
          <button
            type="button"
            className="bg-gray-900 text-white px-10 py-3 rounded hover:bg-gray-800"
            onClick={() => previousStep()}
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
              onClick={() => saveAndExit(formValues)}
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
    </div>
  );
};

export default MoneyInflow;
