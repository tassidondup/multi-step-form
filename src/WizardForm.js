import React from "react";
import { useData } from "./DataContext";
import { Navigate } from "react-router-dom";
import PersonalInformation from "./PersonalInformation";
import MoneyInflow from "./MoneyInflow";
import OnlineAccount from "./OnlineAccount";

const WizardForm = () => {
  // const { id } = useParams();
  // console.log("params id", id);
  const { formSteps, activeUser, previousStep } = useData();
  // const activeUser = data.activeUser;
  //  const [formStep, setFormStep] = useState(activeUser.currentStep);
  // const formSteps = data.formSteps;
  // const [user, setUser] = useState(activeUser);

  console.log("active user", activeUser);

  // useEffect(() => {
  //   setUser(data.activeUser);
  // }, []);

  const goToStep = (index) => {
    if (index < activeUser.currentStep && activeUser.currentStep > 0) {
      previousStep();
    }
  };

  // console.log("user", user);

  const renderForm = () => {
    switch (activeUser.currentStep) {
      case 0:
        return <PersonalInformation />;

      case 1:
        return <MoneyInflow />;

      case 2:
        return <OnlineAccount />;

      default:
        // return <PersonalInformation />;
        break;
    }
  };

  return !activeUser ? (
    <Navigate to="/" />
  ) : (
    <>
      <div className="max-w-3xl w-full mt-10 mb-10 rounded-lg shadow-2xl bg-white mx-auto overflow-hidden z-10">
        <div className="w-full border h-28 flex justify-between border-0">
          {formSteps.map((step, index) => (
            <div
              key={index}
              className={`h-full w-full text-center text-gray-200 grid content-center first-of-type:border-r-2 last-of-type:border-l-2 capitalize cursor-pointer ${
                index === activeUser.currentStep
                  ? "bg-pink-500"
                  : "bg-indigo-400"
              }`}
              onClick={() => goToStep(index)}
            >
              {index + 1}. {step}
            </div>
          ))}
        </div>
        <div className="px-16 py-10">{renderForm()}</div>
      </div>
    </>
  );
};

export default WizardForm;
