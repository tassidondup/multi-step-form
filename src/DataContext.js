import React, { createContext, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // const navigate = useNavigate();

  const [data, setData] = useState({
    formSteps: ["personal details", "money inflow", "Funds Consolidlation"],
    users: [
      {
        id: "wikd20938m3k",
        age: 70,
        dob: "1951-11-18",
        personalDetails: {
          firstName: "John",
          lastName: "Lisa",
          address: "",
        },
        moneyInflow: {
          amountType: "wholeAmount",
          account: {
            super_account: "PACIFIC SUPER",
            member_no: "1256635563",
            usi: "7548392038023982",
          },
          amount: 14000,
        },
        onlineAccountSetup: {
          consolidate: "no",
        },
        currentStep: 0,
      },
      {
        id: "kldildi23233",
        age: 61,
        dob: "1960-05-12",
        personalDetails: {
          firstName: "John",
          lastName: "Doe",
          address: "",
        },
        moneyInflow: {
          amountType: "wholeAmount",
          account: {
            super_account: "PACIFIC SUPER",
            member_no: "1256635563",
            usi: "7548392038023982",
          },
          amount: 14000,
        },
        onlineAccountSetup: {
          consolidate: "no",
        },
        currentStep: 0,
      },
    ],
    activeUser: null,
  });

  const setPersonalDetailsAndMove = (values) => {
    setData({
      ...data,
      activeUser: {
        ...data.activeUser,
        personalDetails: { ...values },
        currentStep: data.activeUser.currentStep + 1,
      },
    });
  };

  const setPersonalDetails = (values) => {
    // console.log("running setPersonalDetails and id", values);
    setData({
      ...data,
      activeUser: {
        ...data.activeUser,
        personalDetails: { ...values },
      },
    });
  };

  const setMoneyInflow = (values) => {
    setData({
      ...data,
      activeUser: {
        ...data.activeUser,
        moneyInflow: values,
      },
    });
  };

  const setMoneyInflowAndMove = (values) => {
    setData({
      ...data,
      activeUser: {
        ...data.activeUser,
        moneyInflow: { ...values },
        currentStep: data.activeUser.currentStep + 1,
      },
    });
  };

  const setOnlineAccountSetup = (values) => {
    setData({
      ...data,
      activeUser: {
        ...data.activeUser,
        onlineAccountSetup: values,
      },
    });
  };

  const setOnlineAccountSetupAndMove = (values) => {
    setData({
      ...data,
      activeUser: {
        ...data.activeUser,
        onlineAccountSetup: values,
        currentStep: data.activeUser.currentStep + 1,
      },
    });
  };

  const previousStep = () =>
    setData({
      ...data,
      activeUser: {
        ...data.activeUser,
        currentStep:
          data.activeUser.currentStep <= 2 && data.activeUser.currentStep > 0
            ? data.activeUser.currentStep - 1
            : data.activeUser.currentStep,
      },
    });

  const nextStep = () => {
    setData({
      ...data,
      activeUser: {
        ...data.activeUser,
        currentStep:
          data.activeUser.currentStep < 2
            ? data.activeUser.currentStep + 1
            : data.activeUser.currentStep,
      },
    });
  };

  const updateTransferAmount = (value, id) => {
    setData({
      ...data,
      // users: data.users.map((user) => {
      //   return user.id === id
      //     ? {
      //         ...user,
      //         moneyInflow: {
      //           ...user.moneyInflow,
      //           amount: value,
      //         },
      //       }
      //     : user;
      // }),
      activeUser: {
        ...data.activeUser,
        moneyInflow: {
          ...data.activeUser.moneyInflow,
          amount: value,
        },
      },
    });
  };

  const goToStep = (value) => {
    setData({
      ...data,
      // users: data.users.map((user) => {
      //   return user.id === id
      //     ? {
      //         ...user,
      //         currentStep: value,
      //       }
      //     : user;
      // }),
      activeUser: {
        ...data.activeUser,
        currentStep: value,
      },
    });
  };

  const setActiveUser = (id) => {
    setData({
      ...data,
      activeUser: data.users.find((user) => user.id === id),
    });
  };

  const saveAndExit = (values) => {
    switch (data.activeUser?.currentStep) {
      case 0:
        setData({
          ...data,
          users: data.users.map((user) =>
            user.id === data.activeUser.id
              ? { ...data.activeUser, personalDetails: values }
              : user
          ),
          activeUser: null,
        });
        // navigate("/");
        break;

      case 1:
        setData({
          ...data,
          users: data.users.map((user) =>
            user.id === data.activeUser.id
              ? { ...data.activeUser, moneyInflow: values }
              : user
          ),
          activeUser: null,
        });
        // navigate("/");
        break;

      case 2:
        setData({
          ...data,
          users: data.users.map((user) =>
            user.id === data.activeUser.id
              ? { ...data.activeUser, onlineAccountSetup: values }
              : user
          ),
          activeUser: null,
        });
        // navigate("/");
        break;

      default:
        break;
    }
  };

  const cancelApplication = () => {
    setData({
      ...data,
      activeUser: null,
    });
  };

  return (
    <DataContext.Provider
      value={{
        ...data,
        setPersonalDetails,
        setMoneyInflow,
        setOnlineAccountSetup,
        previousStep,
        updateTransferAmount,
        goToStep,
        nextStep,
        setActiveUser,
        saveAndExit,
        setPersonalDetailsAndMove,
        setMoneyInflowAndMove,
        setOnlineAccountSetupAndMove,
        cancelApplication,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
