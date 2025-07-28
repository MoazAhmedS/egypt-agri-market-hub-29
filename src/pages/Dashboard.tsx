
import { useState } from "react";
import Header from "@/components/Header";
import RoleSelector from "@/components/RoleSelector";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import FarmerDashboard from "@/components/dashboards/FarmerDashboard";
import BuyerDashboard from "@/components/dashboards/BuyerDashboard";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const [selectedRole, setSelectedRole] = useState<string>("admin");
  const { t } = useLanguage();

  const renderDashboard = () => {
    switch (selectedRole) {
      case "admin":
        return <AdminDashboard />;
      case "farmer":
        return <FarmerDashboard />;
      case "buyer":
        return <BuyerDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  const getDescription = () => {
    switch (selectedRole) {
      case "admin":
        return "Manage users, crops, and orders";
      case "farmer":
        return t('cropManagement') + " & " + t('orderTracking');
      case "buyer":
        return "Browse crops and manage your orders";
      default:
        return "Manage users, crops, and orders";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('dashboard')}</h1>
            <RoleSelector selectedRole={selectedRole} onRoleChange={setSelectedRole} />
          </div>
          <p className="text-sm sm:text-base text-gray-600">
            {getDescription()}
          </p>
        </div>

        {renderDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;
