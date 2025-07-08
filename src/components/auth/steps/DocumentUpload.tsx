
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { SignupData } from "../SignupFlow";
import { FileImage, Upload, CheckCircle } from "lucide-react";

interface DocumentUploadProps {
  data: SignupData;
  onUpdate: (updates: Partial<SignupData>) => void;
}

const DocumentUpload = ({ data, onUpdate }: DocumentUploadProps) => {
  const [uploadStep, setUploadStep] = useState(0);
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});

  const uploadSteps = [
    { key: "idFront", title: "الهوية الشخصية - الوجه الأمامي", description: "قم بتصوير الوجه الأمامي لبطاقة الهوية بوضوح" },
    { key: "idBack", title: "الهوية الشخصية - الوجه الخلفي", description: "قم بتصوير الوجه الخلفي لبطاقة الهوية بوضوح" },
    { key: "selfie", title: "صورة شخصية", description: "التقط صورة شخصية واضحة لوجهك" }
  ];

  const currentUploadStep = uploadSteps[uploadStep];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviews(prev => ({ ...prev, [currentUploadStep.key]: result }));
      };
      reader.readAsDataURL(file);
      
      onUpdate({ [currentUploadStep.key]: file });
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

  const isCurrentStepComplete = () => {
    return data[currentUploadStep.key as keyof SignupData] !== null;
  };

  return (
    <div className="space-y-6">
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
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-blue-100 p-4 rounded-full">
                <FileImage className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold">{currentUploadStep.title}</h3>
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
                        <Button variant="outline" className="mt-2">
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
            onClick={handlePrevious}
            disabled={uploadStep === 0}
          >
            السابق
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={uploadStep === uploadSteps.length - 1 || !isCurrentStepComplete()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            التالي
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
