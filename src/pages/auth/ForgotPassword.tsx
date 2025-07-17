
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/login" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              العودة لتسجيل الدخول
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">تم إرسال الرسالة</h2>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900">
                  تحقق من بريدك الإلكتروني
                </h3>
                <p className="text-gray-600">
                  تم إرسال رابط إعادة تعيين كلمة المرور إلى
                </p>
                <p className="font-medium text-gray-900">{email}</p>
                <p className="text-sm text-gray-500">
                  لم تتلق الرسالة؟ تحقق من مجلد البريد المزعج أو
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full"
                >
                  أعد المحاولة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/login" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة لتسجيل الدخول
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">نسيت كلمة المرور</h2>
          <p className="mt-2 text-gray-600">
            أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              إعادة تعيين كلمة المرور
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                />
              </div>
              
              <Alert>
                <AlertDescription>
                  سنرسل لك رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني
                </AlertDescription>
              </Alert>
              
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
