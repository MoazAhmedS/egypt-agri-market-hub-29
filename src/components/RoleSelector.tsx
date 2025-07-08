
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RoleSelectorProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

const RoleSelector = ({ selectedRole, onRoleChange }: RoleSelectorProps) => {
  return (
    <div className="w-48">
      <Select value={selectedRole} onValueChange={onRoleChange}>
        <SelectTrigger className="bg-white border border-gray-300">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
          <SelectItem value="admin">Admin Dashboard</SelectItem>
          <SelectItem value="farmer">Farmer Dashboard</SelectItem>
          <SelectItem value="buyer">Buyer Dashboard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleSelector;
