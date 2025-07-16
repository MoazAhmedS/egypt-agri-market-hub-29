
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, TrendingUp, ShoppingCart, Package, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import ProfileModal from "@/components/modals/ProfileModal";

interface Order {
  id: number;
  cropName: string;
  farmer: string;
  quantity: string;
  amount: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
}

const BuyerDashboard = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // Mock data
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, cropName: "Tomatoes", farmer: "Ahmed Hassan", quantity: "100 kg", amount: 1500, status: "pending", orderDate: "2024-01-20" },
    { id: 2, cropName: "Oranges", farmer: "Omar Ali", quantity: "50 kg", amount: 600, status: "shipped", orderDate: "2024-01-18" },
    { id: 3, cropName: "Wheat", farmer: "Mohamed Ibrahim", quantity: "200 kg", amount: 1600, status: "delivered", orderDate: "2024-01-15" },
    { id: 4, cropName: "Apples", farmer: "Sara Mohamed", quantity: "75 kg", amount: 900, status: "pending", orderDate: "2024-01-22" },
    { id: 5, cropName: "Carrots", farmer: "Khaled Salem", quantity: "120 kg", amount: 480, status: "cancelled", orderDate: "2024-01-12" },
  ]);

  const handleCancelOrder = (orderId: number) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' as const } : order
    ));
    toast({
      title: "Order Cancelled",
      description: "Order has been cancelled successfully.",
    });
  };

  // Analytics data
  const totalSpent = orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.amount, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

  // Purchase analytics by category
  const purchasesByCategory = [
    { category: 'Vegetables', amount: 2000, orders: 8 },
    { category: 'Fruits', amount: 1500, orders: 5 },
    { category: 'Grains', amount: 1600, orders: 3 },
  ];

  const topFarmers = [
    { name: 'Ahmed Hassan', totalOrders: 5, totalAmount: 2100 },
    { name: 'Omar Ali', totalOrders: 3, totalAmount: 1800 },
    { name: 'Mohamed Ibrahim', totalOrders: 2, totalAmount: 1600 },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">{t('purchaseAnalytics')}</TabsTrigger>
          <TabsTrigger value="orders">{t('orderHistory')}</TabsTrigger>
          <TabsTrigger value="profile">{t('profileManagement')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t('currency')} {totalSpent}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('pendingOrders')}</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingOrders}</div>
                <p className="text-xs text-muted-foreground">Awaiting processing</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Delivered Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{deliveredOrders}</div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Purchase Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Purchases by Category</CardTitle>
                <CardDescription>Your spending breakdown by crop category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchasesByCategory.map((category) => (
                    <div key={category.category} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{category.category}</p>
                        <p className="text-sm text-gray-600">{category.orders} orders</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{t('currency')} {category.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Farmers</CardTitle>
                <CardDescription>Farmers you've ordered from most</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topFarmers.map((farmer) => (
                    <div key={farmer.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{farmer.name}</p>
                        <p className="text-sm text-gray-600">{farmer.totalOrders} orders</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{t('currency')} {farmer.totalAmount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('orderHistory')}</CardTitle>
              <CardDescription>View and manage your orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>{t('farmer')}</TableHead>
                    <TableHead>{t('quantity')}</TableHead>
                    <TableHead>{t('amount')}</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>{t('orderDate')}</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell className="font-medium">{order.cropName}</TableCell>
                      <TableCell>{order.farmer}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{t('currency')} {order.amount}</TableCell>
                      <TableCell>
                        <Badge variant={
                          order.status === 'delivered' ? 'default' : 
                          order.status === 'shipped' ? 'secondary' : 
                          order.status === 'cancelled' ? 'destructive' : 'outline'
                        }>
                          {t(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>
                        {order.status === 'pending' && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            {t('cancelOrder')}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t('profileManagement')}</CardTitle>
                  <CardDescription>Manage your profile information</CardDescription>
                </div>
                <Button onClick={() => setIsProfileModalOpen(true)}>
                  <User className="h-4 w-4 mr-2" />
                  {t('update')} Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">{t('name')}</label>
                  <p className="text-lg">Fatma Ahmed</p>
                </div>
                <div>
                  <label className="text-sm font-medium">{t('email')}</label>
                  <p className="text-lg">fatma@example.com</p>
                </div>
                <div>
                  <label className="text-sm font-medium">{t('location')}</label>
                  <p className="text-lg">Cairo, Egypt</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-lg">+20 123 456 789</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onUpdateProfile={() => {
          toast({
            title: "Profile Updated",
            description: "Your profile has been updated successfully.",
          });
        }}
      />
    </div>
  );
};

export default BuyerDashboard;
