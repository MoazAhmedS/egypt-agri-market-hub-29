
import { useState } from "react";
import Header from "@/components/Header";
import RoleSelector from "@/components/RoleSelector";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import FarmerDashboard from "@/components/dashboards/FarmerDashboard";
import BuyerDashboard from "@/components/dashboards/BuyerDashboard";

const Dashboard = () => {
  const [selectedRole, setSelectedRole] = useState<string>("admin");

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <RoleSelector selectedRole={selectedRole} onRoleChange={setSelectedRole} />
          </div>
          <p className="text-gray-600">
            {selectedRole === "admin" && "Manage users, crops, and orders"}
            {selectedRole === "farmer" && "Manage your crops and orders"}
            {selectedRole === "buyer" && "Browse crops and manage your orders"}
          </p>
        </div>

        {renderDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;
