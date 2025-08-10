
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

  const handleGoogleSignup = () => {
    console.log("Google signup attempt");
    // Here you would typically handle Google signup
    onClose();
    navigate("/");
  };

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

  // Show Google signup option only on the first step
  if (currentStep === 0) {
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

        <Button
          onClick={handleGoogleSignup}
          variant="outline"
          className="w-full mb-4 flex items-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          إنشاء حساب بـ Google
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">أو</span>
          </div>
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

          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            التالي
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

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
