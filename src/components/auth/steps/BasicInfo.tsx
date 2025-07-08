
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignupData } from "../SignupFlow";

interface BasicInfoProps {
  data: SignupData;
  onUpdate: (updates: Partial<SignupData>) => void;
}

const BasicInfo = ({ data, onUpdate }: BasicInfoProps) => {
  const handleChange = (field: keyof SignupData, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">الاسم الكامل</Label>
        <Input
          id="fullName"
          value={data.fullName}
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
          value={data.phone}
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
          value={data.email}
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
          value={data.password}
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
          value={data.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          placeholder="••••••••"
          required
        />
        {data.password && data.confirmPassword && data.password !== data.confirmPassword && (
          <p className="text-red-500 text-sm">كلمات المرور غير متطابقة</p>
        )}
      </div>
    </div>
  );
};

export default BasicInfo;
