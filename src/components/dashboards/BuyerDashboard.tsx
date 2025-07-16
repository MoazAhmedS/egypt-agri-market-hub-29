
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, TrendingUp, ShoppingCart, Package, X, Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
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

interface WalletTransaction {
  id: number;
  date: string;
  type: 'topUp' | 'withdrawal' | 'payment' | 'refund';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

const BuyerDashboard = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // Wallet state
  const [walletBalance, setWalletBalance] = useState(1250);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([
    { id: 1, date: "2024-01-22", type: "payment", amount: -1500, description: t('orderPayment') + " - " + t('tomato'), status: "completed" },
    { id: 2, date: "2024-01-21", type: "topUp", amount: 2000, description: t('walletTopUp'), status: "completed" },
    { id: 3, date: "2024-01-20", type: "payment", amount: -600, description: t('orderPayment') + " - " + t('orange'), status: "completed" },
    { id: 4, date: "2024-01-19", type: "refund", amount: 480, description: t('orderRefund') + " - " + t('carrot'), status: "completed" },
    { id: 5, date: "2024-01-18", type: "payment", amount: -1600, description: t('orderPayment') + " - " + t('wheat'), status: "completed" },
  ]);
  
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

  const handleTopUp = () => {
    const newTransaction: WalletTransaction = {
      id: walletTransactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: 'topUp',
      amount: 1000,
      description: t('walletTopUp'),
      status: 'completed'
    };
    setWalletTransactions([newTransaction, ...walletTransactions]);
    setWalletBalance(walletBalance + 1000);
    toast({
      title: "Top Up Successful",
      description: `Your wallet has been topped up with ${t('currency')} 1000`,
    });
  };

  const handleWithdraw = () => {
    if (walletBalance < 100) {
      toast({
        title: "Insufficient Balance",
        description: "You need at least 100 EGP to withdraw.",
        variant: "destructive",
      });
      return;
    }
    
    const newTransaction: WalletTransaction = {
      id: walletTransactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: 'withdrawal',
      amount: -100,
      description: t('walletWithdrawal'),
      status: 'completed'
    };
    setWalletTransactions([newTransaction, ...walletTransactions]);
    setWalletBalance(walletBalance - 100);
    toast({
      title: "Withdrawal Successful",
      description: `${t('currency')} 100 has been withdrawn from your wallet`,
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{t('purchaseAnalytics')}</TabsTrigger>
          <TabsTrigger value="orders">{t('orderHistory')}</TabsTrigger>
          <TabsTrigger value="wallet">{t('wallet')}</TabsTrigger>
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

        <TabsContent value="wallet" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('currentBalance')}</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t('currency')} {walletBalance}</div>
                <p className="text-xs text-muted-foreground">Available balance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">{t('topUpNow')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={handleTopUp} className="w-full">
                  <ArrowUpCircle className="h-4 w-4 mr-2" />
                  {t('topUpNow')}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">{t('withdraw')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={handleWithdraw} variant="outline" className="w-full">
                  <ArrowDownCircle className="h-4 w-4 mr-2" />
                  {t('withdraw')}
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('transactionHistory')}</CardTitle>
              <CardDescription>Your recent wallet transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('date')}</TableHead>
                    <TableHead>{t('type')}</TableHead>
                    <TableHead>{t('description')}</TableHead>
                    <TableHead>{t('amount')}</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {walletTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Badge variant={
                          transaction.type === 'topUp' ? 'default' : 
                          transaction.type === 'refund' ? 'secondary' : 
                          transaction.type === 'payment' ? 'destructive' : 'outline'
                        }>
                          {t(transaction.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                        {transaction.amount > 0 ? '+' : ''}{t('currency')} {Math.abs(transaction.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                          {transaction.status}
                        </Badge>
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
