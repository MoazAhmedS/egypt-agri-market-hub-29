
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", loginData);
    // Here you would typically handle the login logic
    navigate("/");
  };

  const handleLoginChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للرئيسية
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">تسجيل الدخول</h2>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="h-5 w-5" />
              تسجيل الدخول
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => handleLoginChange("email", e.target.value)}
                  placeholder="example@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => handleLoginChange("password", e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                تسجيل الدخول
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                ليس لديك حساب؟{" "}
                <Link
                  to="/signup"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
