
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface SignupData {
  role: string;
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  governorate: string;
  address: string;
}

const SignupLocation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupData>({
    role: "",
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    governorate: "",
    address: ""
  });

  const governorates = [
    "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "القليوبية",
    "كفر الشيخ", "الغربية", "المنوفية", "البحيرة", "الإسماعيلية", "بور سعيد",
    "السويس", "شمال سيناء", "جنوب سيناء", "الفيوم", "بني سويف", "المنيا",
    "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد",
    "مطروح", "دمياط"
  ];

  useEffect(() => {
    // Load existing signup data
    const savedData = localStorage.getItem("signupData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(prev => ({ ...prev, ...parsed }));
    } else {
      // If no previous data, redirect to start
      navigate("/signup");
    }
  }, [navigate]);

  const handleChange = (field: keyof SignupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (isFormValid()) {
      console.log("Signup completed:", formData);
      // Store email for verification page
      localStorage.setItem('signupEmail', formData.email);
      // Clear signup data
      localStorage.removeItem("signupData");
      // Navigate to email verification page
      navigate(`/email-verification-sent?email=${encodeURIComponent(formData.email)}`);
    }
  };

  const handleBack = () => {
    navigate("/signup/basic-info");
  };

  const isFormValid = () => {
    return formData.governorate && formData.address;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للرئيسية
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">معلومات الموقع</h2>
          <p className="text-gray-600 mt-2">الخطوة 3 من 3</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              أدخل معلومات موقعك
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="governorate">المحافظة</Label>
              <Select value={formData.governorate} onValueChange={(value) => handleChange("governorate", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المحافظة" />
                </SelectTrigger>
                <SelectContent>
                  {governorates.map((gov) => (
                    <SelectItem key={gov} value={gov}>
                      {gov}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">العنوان التفصيلي</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="أدخل عنوانك التفصيلي"
                required
              />
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
            تأكيد التسجيل
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupLocation;
