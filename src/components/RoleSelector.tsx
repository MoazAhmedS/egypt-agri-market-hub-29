
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface RoleSelectorProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

const RoleSelector = ({ selectedRole, onRoleChange }: RoleSelectorProps) => {
  const { t } = useLanguage();

  return (
    <div className="w-48">
      <Select value={selectedRole} onValueChange={onRoleChange}>
        <SelectTrigger className="bg-white border border-gray-300">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
          <SelectItem value="admin">{t('adminDashboard')}</SelectItem>
          <SelectItem value="farmer">{t('farmerDashboard')}</SelectItem>
          <SelectItem value="buyer">{t('buyerDashboard')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleSelector;
