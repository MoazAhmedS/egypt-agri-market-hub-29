
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BuyerDashboard = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Buyer Dashboard</CardTitle>
          <CardDescription>Coming soon - Browse crops and manage orders</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">This dashboard will include:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
            <li>Browse available crops</li>
            <li>Order history</li>
            <li>Favorite farmers</li>
            <li>Purchase analytics</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerDashboard;
