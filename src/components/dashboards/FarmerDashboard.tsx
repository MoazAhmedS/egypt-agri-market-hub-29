
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Wallet, TrendingUp, Package, Eye, Users, DollarSign } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import AddCropModal from "@/components/modals/AddCropModal";
import CropReviewModal from "@/components/modals/CropReviewModal";
import WithdrawModal from "@/components/modals/WithdrawModal";

// Mock data for farmer crops
const mockCrops = [
  {
    id: 1,
    name: "Organic Tomatoes",
    quantity: "500 kg",
    price: 150,
    status: "available",
    orders: 12,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Fresh Cucumbers",
    quantity: "300 kg", 
    price: 80,
    status: "low_stock",
    orders: 8,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Bell Peppers",
    quantity: "200 kg",
    price: 120,
    status: "out_of_stock", 
    orders: 15,
    image: "/placeholder.svg"
  }
];

const FarmerDashboard = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAddCropModalOpen, setIsAddCropModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const handleAddCrop = (cropData: any) => {
    console.log("Adding crop:", cropData);
    toast({
      title: "Crop Added",
      description: "Your crop has been successfully added to the marketplace.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case "low_stock":
        return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const handleTopUp = () => {
    navigate("/top-up");
  };

  const handleWithdraw = (amount: number, method: string) => {
    console.log("Withdrawing:", amount, method);
    toast({
      title: "Withdrawal Requested",
      description: `${t('currency')} ${amount} withdrawal request has been submitted.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t('currency')} 2,450</div>
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={handleTopUp}>
                <Plus className="h-3 w-3 mr-1" />
                Top Up
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsWithdrawModalOpen(true)}>
                <DollarSign className="h-3 w-3 mr-1" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t('currency')} 12,350</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">3 low stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+8 this week</p>
          </CardContent>
        </Card>
      </div>

      {/* My Crops Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">My Crops</CardTitle>
          <Button onClick={() => setIsAddCropModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Crop
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCrops.map((crop) => (
              <Card key={crop.id} className="relative">
                <CardContent className="p-4">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-sm">{crop.name}</h3>
                      {getStatusBadge(crop.status)}
                    </div>
                    <p className="text-sm text-gray-600">Quantity: {crop.quantity}</p>
                    <p className="text-sm font-semibold">{t('currency')} {crop.price}</p>
                    <p className="text-xs text-gray-500">{crop.orders} orders</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedCrop(crop)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddCropModal
        isOpen={isAddCropModalOpen}
        onClose={() => setIsAddCropModalOpen(false)}
        onAddCrop={handleAddCrop}
      />

      {selectedCrop && (
        <CropReviewModal
          isOpen={!!selectedCrop}
          onClose={() => setSelectedCrop(null)}
          crop={selectedCrop}
        />
      )}

      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onWithdraw={handleWithdraw}
        currentBalance={2450}
      />
    </div>
  );
};

export default FarmerDashboard;
