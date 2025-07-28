
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface SignupData {
  role: "farmer" | "buyer" | "";
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupBasicInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupData>({
    role: "",
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    // Load existing signup data
    const savedData = localStorage.getItem("signupData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(prev => ({ ...prev, ...parsed }));
    } else {
      // If no role selected, redirect to role selection
      navigate("/signup");
    }
  }, [navigate]);

  const handleChange = (field: keyof SignupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (isFormValid()) {
      // Save to localStorage
      localStorage.setItem("signupData", JSON.stringify(formData));
      navigate("/signup/location");
    }
  };

  const handleBack = () => {
    navigate("/signup");
  };

  const isFormValid = () => {
    return formData.fullName && 
           formData.phone && 
           formData.email && 
           formData.password && 
           formData.password === formData.confirmPassword;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للرئيسية
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">المعلومات الأساسية</h2>
          <p className="text-gray-600 mt-2">الخطوة 2 من 3</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              أدخل معلوماتك الأساسية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">الاسم الكامل</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="أدخل اسمك الكامل"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="01xxxxxxxxx"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                placeholder="••••••••"
                required
              />
              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-500 text-sm">كلمات المرور غير متطابقة</p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            السابق
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isFormValid()}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            التالي
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupBasicInfo;
