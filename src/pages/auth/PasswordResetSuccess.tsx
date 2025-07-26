
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, LogIn } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PasswordResetSuccess = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 rounded-full p-3">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-green-600">
                {language === 'ar' ? 'تم إعادة تعيين كلمة المرور بنجاح' : 'Password Reset Successfully'}
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                {language === 'ar' 
                  ? 'تم إعادة تعيين كلمة المرور الخاصة بك بنجاح. يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.'
                  : 'Your password has been reset successfully. You can now log in with your new password.'
                }
              </p>
            </div>

            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link to="/login" className="flex items-center justify-center gap-2">
                <LogIn className="h-4 w-4" />
                {language === 'ar' ? 'تسجيل الدخول' : 'Log In'}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
