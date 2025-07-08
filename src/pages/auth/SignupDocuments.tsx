
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileImage, Upload, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SignupDocuments = () => {
  const navigate = useNavigate();
  const [uploadStep, setUploadStep] = useState(0);
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File | null }>({
    idFront: null,
    idBack: null,
    selfie: null
  });

  const uploadSteps = [
    { key: "idFront", title: "الهوية الشخصية - الوجه الأمامي", description: "قم بتصوير الوجه الأمامي لبطاقة الهوية بوضوح" },
    { key: "idBack", title: "الهوية الشخصية - الوجه الخلفي", description: "قم بتصوير الوجه الخلفي لبطاقة الهوية بوضوح" },
    { key: "selfie", title: "صورة شخصية", description: "التقط صورة شخصية واضحة لوجهك" }
  ];

  const currentUploadStep = uploadSteps[uploadStep];

  useEffect(() => {
    // Check if user has completed previous steps
    const savedData = localStorage.getItem("signupData");
    if (!savedData) {
      navigate("/signup");
    }
  }, [navigate]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviews(prev => ({ ...prev, [currentUploadStep.key]: result }));
      };
      reader.readAsDataURL(file);
      
      setUploadedFiles(prev => ({ ...prev, [currentUploadStep.key]: file }));
    }
  };

  const handleNext = () => {
    if (uploadStep < uploadSteps.length - 1) {
      setUploadStep(uploadStep + 1);
    }
  };

  const handlePrevious = () => {
    if (uploadStep > 0) {
      setUploadStep(uploadStep - 1);
    }
  };

  const handleBack = () => {
    navigate("/signup/location");
  };

  const handleComplete = () => {
    if (isAllStepsComplete()) {
      const savedData = localStorage.getItem("signupData");
      if (savedData) {
        const signupData = JSON.parse(savedData);
        console.log("Signup completed:", { ...signupData, documents: uploadedFiles });
        // Here you would typically handle the signup logic
        localStorage.removeItem("signupData");
        navigate("/");
      }
    }
  };

  const isCurrentStepComplete = () => {
    return uploadedFiles[currentUploadStep.key] !== null;
  };

  const isAllStepsComplete = () => {
    return Object.values(uploadedFiles).every(file => file !== null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للرئيسية
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">تحميل الوثائق</h2>
          <p className="text-gray-600 mt-2">الخطوة 4 من 4</p>
        </div>

        {/* Upload Steps Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          {uploadSteps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index < uploadStep ? 'bg-green-600 text-white' : 
                index === uploadStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index < uploadStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
              </div>
              {index < uploadSteps.length - 1 && (
                <div className={`w-8 h-1 mx-2 ${
                  index < uploadStep ? 'bg-green-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileImage className="h-5 w-5" />
              {currentUploadStep.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-gray-600 text-sm">{currentUploadStep.description}</p>
              
              {previews[currentUploadStep.key] ? (
                <div className="space-y-4">
                  <img
                    src={previews[currentUploadStep.key]}
                    alt="Preview"
                    className="mx-auto max-w-xs rounded-lg border"
                  />
                  <div className="flex items-center justify-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    تم تحميل الصورة بنجاح
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Label htmlFor={`file-${currentUploadStep.key}`} className="cursor-pointer">
                          <Button variant="outline" type="button" className="mt-2">
                            اختر الصورة
                          </Button>
                        </Label>
                        <input
                          id={`file-${currentUploadStep.key}`}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation for upload steps */}
        {uploadSteps.length > 1 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={uploadStep === 0 ? handleBack : handlePrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              السابق
            </Button>
            
            {uploadStep === uploadSteps.length - 1 ? (
              <Button
                onClick={handleComplete}
                disabled={!isAllStepsComplete()}
                className="bg-green-600 hover:bg-green-700"
              >
                إنهاء التسجيل
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!isCurrentStepComplete()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                التالي
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupDocuments;
