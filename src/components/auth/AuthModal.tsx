
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { LogIn, User } from "lucide-react";
import SignupFlow from "./SignupFlow";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

const AuthModal = ({ isOpen, onClose, initialMode = "login" }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", loginData);
    // Here you would typically handle the login logic
    onClose();
  };

  const handleLoginChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  if (mode === "signup") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              إنشاء حساب جديد
            </DialogTitle>
          </DialogHeader>
          <SignupFlow onBack={() => setMode("login")} onClose={onClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            تسجيل الدخول
          </DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardContent className="p-6">
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
                <button
                  onClick={() => setMode("signup")}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  إنشاء حساب جديد
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
