
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import RoleSelection from "./steps/RoleSelection";
import BasicInfo from "./steps/BasicInfo";
import LocationInfo from "./steps/LocationInfo";

interface SignupFlowProps {
  onBack: () => void;
  onClose: () => void;
}

export interface SignupData {
  role: "farmer" | "buyer" | "";
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  governorate: string;
  address: string;
}

const SignupFlow = ({ onBack, onClose }: SignupFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [signupData, setSignupData] = useState<SignupData>({
    role: "",
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    governorate: "",
    address: ""
  });

  const steps = [
    { title: "نوع الحساب", component: RoleSelection },
    { title: "المعلومات الأساسية", component: BasicInfo },
    { title: "معلومات الموقع", component: LocationInfo }
  ];

  const currentStepData = steps[currentStep];
  const StepComponent = currentStepData.component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleComplete = () => {
    console.log("Signup completed:", signupData);
    // Here you would typically handle the signup logic
    onClose();
  };

  const updateSignupData = (updates: Partial<SignupData>) => {
    setSignupData(prev => ({ ...prev, ...updates }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return signupData.role !== "";
      case 1:
        return signupData.fullName && signupData.phone && signupData.email && 
               signupData.password && signupData.password === signupData.confirmPassword;
      case 2:
        return signupData.governorate && signupData.address;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              index <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-1 mx-2 ${
                index < currentStep ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Title */}
      <h3 className="text-xl font-semibold text-center mb-6">
        {currentStepData.title}
      </h3>

      {/* Step Content */}
      <StepComponent 
        data={signupData} 
        onUpdate={updateSignupData}
      />

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          className="flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          السابق
        </Button>

        {currentStep === steps.length - 1 ? (
          <Button
            onClick={handleComplete}
            disabled={!isStepValid()}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            تأكيد التسجيل
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            التالي
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignupFlow;
