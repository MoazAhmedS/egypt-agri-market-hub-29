
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
    // Store email for verification page
    localStorage.setItem('signupEmail', signupData.email);
    // Here you would typically handle the signup logic
    onClose();
    // Navigate to email verification page
    navigate(`/email-verification-sent?email=${encodeURIComponent(signupData.email)}`);
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
      <div className="flex items-center justify-center max-w-md mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              index <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {index + 1}
            </div>
            <span className={`mx-2 text-sm font-medium ${
              index <= currentStep ? 'text-green-600' : 'text-gray-400'
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`mx-4 h-1 w-20 ${
                index < currentStep ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

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
