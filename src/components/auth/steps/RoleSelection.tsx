
import { Card, CardContent } from "@/components/ui/card";
import { SignupData } from "../SignupFlow";
import { User, UserPlus } from "lucide-react";

interface RoleSelectionProps {
  data: SignupData;
  onUpdate: (updates: Partial<SignupData>) => void;
}

const RoleSelection = ({ data, onUpdate }: RoleSelectionProps) => {
  const handleRoleSelect = (role: "farmer" | "buyer") => {
    onUpdate({ role });
  };

  return (
    <div className="space-y-4">
      <p className="text-center text-gray-600 mb-6">
        اختر نوع الحساب الذي تريد إنشاؤه
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            data.role === "farmer" ? "ring-2 ring-green-500 bg-green-50" : ""
          }`}
          onClick={() => handleRoleSelect("farmer")}
        >
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-green-100 p-4 rounded-full">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">مزارع</h3>
              <p className="text-gray-600 text-sm">
                أبيع المحاصيل والمنتجات الزراعية
              </p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            data.role === "buyer" ? "ring-2 ring-green-500 bg-green-50" : ""
          }`}
          onClick={() => handleRoleSelect("buyer")}
        >
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <UserPlus className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold">مشتري / تاجر</h3>
              <p className="text-gray-600 text-sm">
                أشتري المحاصيل بالجملة من المزارعين
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoleSelection;
