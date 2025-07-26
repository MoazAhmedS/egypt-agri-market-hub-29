
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const EmailVerificationSent = () => {
  const { language, t } = useLanguage();
  
  // Get email from URL params or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email') || localStorage.getItem('signupEmail') || 'your email';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/login" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
            {language === 'ar' ? 'العودة لتسجيل الدخول' : 'Back to Login'}
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <Mail className="h-16 w-16 text-blue-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'ar' ? 'تحقق من بريدك الإلكتروني' : 'Check Your Email'}
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                {language === 'ar' 
                  ? 'تم إرسال رابط التحقق إلى'
                  : 'We sent a verification link to'
                }
              </p>
              <p className="font-medium text-gray-900 mb-4">{email}</p>
              <p className="text-gray-600 text-sm">
                {language === 'ar' 
                  ? 'انقر على الرابط في البريد الإلكتروني لتأكيد حسابك. إذا لم تر الرسالة، تحقق من مجلد البريد المزعج.'
                  : "Click the link in the email to verify your account. If you don't see it, check your spam folder."
                }
              </p>
            </div>

            <div className="space-y-4">
              <Button asChild variant="ghost" className="w-full">
                <Link to="/login">
                  {language === 'ar' ? 'العودة لتسجيل الدخول' : 'Back to Login'}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerificationSent;
