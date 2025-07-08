
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, UserPlus, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SignupRole = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"farmer" | "buyer" | "">("");

  useEffect(() => {
    // Clear any existing signup data when starting fresh
    localStorage.removeItem("signupData");
  }, []);

  const handleRoleSelect = (role: "farmer" | "buyer") => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (selectedRole) {
      // Save role to localStorage
      const signupData = { role: selectedRole };
      localStorage.setItem("signupData", JSON.stringify(signupData));
      navigate("/signup/basic-info");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للرئيسية
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">إنشاء حساب جديد</h2>
          <p className="text-xl text-gray-600">اختر نوع الحساب الذي تريد إنشاؤه</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedRole === "farmer" ? "ring-2 ring-green-500 bg-green-50" : ""
            }`}
            onClick={() => handleRoleSelect("farmer")}
          >
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-green-100 p-6 rounded-full">
                  <User className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold">مزارع</h3>
                <p className="text-gray-600">
                  أبيع المحاصيل والمنتجات الزراعية
                </p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedRole === "buyer" ? "ring-2 ring-green-500 bg-green-50" : ""
            }`}
            onClick={() => handleRoleSelect("buyer")}
          >
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-orange-100 p-6 rounded-full">
                  <UserPlus className="h-12 w-12 text-orange-600" />
                </div>
                <h3 className="text-2xl font-semibold">مشتري / تاجر</h3>
                <p className="text-gray-600">
                  أشتري المحاصيل بالجملة من المزارعين
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center pt-6">
          <Button
            onClick={handleNext}
            disabled={!selectedRole}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2 px-8 py-3 text-lg"
          >
            التالي
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            لديك حساب بالفعل؟{" "}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupRole;
