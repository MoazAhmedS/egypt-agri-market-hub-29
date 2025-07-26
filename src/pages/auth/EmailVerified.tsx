
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, LogIn, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const EmailVerified = () => {
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setVerificationStatus('error');
      setErrorMessage(language === 'ar' ? 'رمز التحقق مفقود' : 'Verification token is missing');
      return;
    }

    // Simulate API call to verify email
    const verifyEmail = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate success (you can add actual verification logic here)
        const isValid = true;
        
        if (isValid) {
          setVerificationStatus('success');
          // Clear any stored signup email
          localStorage.removeItem('signupEmail');
        } else {
          setVerificationStatus('error');
          setErrorMessage(language === 'ar' ? 'رمز التحقق غير صالح أو منتهي الصلاحية' : 'Invalid or expired verification token');
        }
      } catch (error) {
        setVerificationStatus('error');
        setErrorMessage(language === 'ar' ? 'حدث خطأ أثناء التحقق' : 'An error occurred during verification');
      }
    };

    verifyEmail();
  }, [searchParams, language]);

  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-md w-full space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Loader2 className="h-16 w-16 text-blue-600 mx-auto animate-spin" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {language === 'ar' ? 'جاري التحقق من البريد الإلكتروني...' : 'Verifying your email...'}
                </h2>
                <p className="text-gray-600">
                  {language === 'ar' ? 'يرجى الانتظار' : 'Please wait'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-md w-full space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-red-100 rounded-full p-3">
                    <XCircle className="h-16 w-16 text-red-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-red-600">
                  {language === 'ar' ? 'فشل التحقق' : 'Verification Failed'}
                </h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  {errorMessage}
                </p>
              </div>

              <div className="space-y-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/signup">
                    {language === 'ar' ? 'إنشاء حساب جديد' : 'Sign Up Again'}
                  </Link>
                </Button>
                
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
  }

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
                {language === 'ar' ? 'تم التحقق من البريد الإلكتروني' : 'Email Verified Successfully'}
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                {language === 'ar' 
                  ? 'تم تأكيد بريدك الإلكتروني بنجاح! يمكنك الآن تسجيل الدخول إلى حسابك.'
                  : 'Your email has been verified successfully! You can now log in to your account.'
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

export default EmailVerified;
