
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FarmerDashboard = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Farmer Dashboard</CardTitle>
          <CardDescription>Coming soon - Manage your crops and orders</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">This dashboard will include:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
            <li>Crop management</li>
            <li>Order tracking</li>
            <li>Sales analytics</li>
            <li>Profile management</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerDashboard;
