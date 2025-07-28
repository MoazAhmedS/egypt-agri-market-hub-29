import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Package, TrendingUp, User, CreditCard, Upload, X, Wallet, ArrowUp, ArrowDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import AddCropModal from "@/components/modals/AddCropModal";
import ShipOrderModal from "@/components/modals/ShipOrderModal";
import ProfileModal from "@/components/modals/ProfileModal";
import WithdrawModal from "@/components/modals/WithdrawModal";
import { Link } from "react-router-dom";

interface Crop {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: string;
  status: 'active' | 'closed';
  createdAt: string;
}

interface Order {
  id: number;
  cropName: string;
  buyer: string;
  quantity: string;
  amount: number;
  status: 'pending' | 'shipped' | 'delivered';
  orderDate: string;
}

interface Transaction {
  id: number;
  type: 'topUp' | 'withdrawal' | 'earning' | 'payment';
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
  description: string;
}

const FarmerDashboard = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Modal states
  const [isAddCropModalOpen, setIsAddCropModalOpen] = useState(false);
  const [isShipOrderModalOpen, setIsShipOrderModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Subscription state (mock data)
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Wallet state
  const [walletBalance, setWalletBalance] = useState(2580.50);

  // Mock data
  const [crops, setCrops] = useState<Crop[]>([
    { id: 1, name: "Tomatoes", category: "Vegetables", price: 15, quantity: "500 kg", status: "active", createdAt: "2024-01-15" },
    { id: 2, name: "Oranges", category: "Fruits", price: 12, quantity: "300 kg", status: "active", createdAt: "2024-01-10" },
    { id: 3, name: "Wheat", category: "Grains", price: 8, quantity: "1000 kg", status: "closed", createdAt: "2024-01-05" },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    { id: 1, cropName: "Tomatoes", buyer: "Ahmed Store", quantity: "100 kg", amount: 1500, status: "pending", orderDate: "2024-01-20" },
    { id: 2, cropName: "Oranges", buyer: "Fresh Market", quantity: "50 kg", amount: 600, status: "shipped", orderDate: "2024-01-18" },
    { id: 3, cropName: "Wheat", buyer: "Bakery Co.", quantity: "200 kg", amount: 1600, status: "delivered", orderDate: "2024-01-15" },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: 'earning', amount: 1600, status: 'completed', date: '2024-01-20', description: 'Payment for Wheat order #3' },
    { id: 2, type: 'topUp', amount: 1000, status: 'completed', date: '2024-01-18', description: 'Wallet top-up' },
    { id: 3, type: 'withdrawal', amount: 500, status: 'pending', date: '2024-01-15', description: 'Withdrawal to bank account' },
    { id: 4, type: 'earning', amount: 600, status: 'completed', date: '2024-01-12', description: 'Payment for Oranges order #2' },
  ]);

  const handleAddCrop = (cropData: any) => {
    const newCrop: Crop = {
      id: crops.length + 1,
      name: cropData.name,
      category: cropData.category,
      price: cropData.price,
      quantity: cropData.quantity,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCrops([...crops, newCrop]);
    toast({
      title: "Crop Added",
      description: `${cropData.name} has been added successfully.`,
    });
  };

  const handleCloseCrop = (cropId: number) => {
    setCrops(crops.map(crop => 
      crop.id === cropId ? { ...crop, status: 'closed' as const } : crop
    ));
    toast({
      title: "Crop Closed",
      description: "Crop has been closed successfully.",
    });
  };

  const handleShipOrder = (orderId: number) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'shipped' as const } : order
    ));
    toast({
      title: "Order Shipped",
      description: "Order has been marked as shipped successfully.",
    });
  };

  const handleWithdraw = (amount: number, method: string, accountDetails: string) => {
    setWalletBalance(prev => prev - amount);
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      type: 'withdrawal',
      amount: amount,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      description: `Withdrawal to ${method}`
    };
    setTransactions(prev => [newTransaction, ...prev]);
    toast({
      title: "Withdrawal Request Submitted",
      description: "Your withdrawal request has been submitted for approval.",
    });
  };

  const openShipModal = (order: Order) => {
    setSelectedOrder(order);
    setIsShipOrderModalOpen(true);
  };

  // Analytics data
  const totalSales = orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.amount, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const activeCrops = crops.filter(c => c.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Sales Analytics - Always visible at top */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t('currency')} {totalSales}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
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
            <p className="text-xs text-muted-foreground">Awaiting action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCrops}</div>
            <p className="text-xs text-muted-foreground">Currently listed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="crops" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="crops">{t('cropManagement')}</TabsTrigger>
          <TabsTrigger value="orders">{t('orderTracking')}</TabsTrigger>
          <TabsTrigger value="wallet">{t('wallet')}</TabsTrigger>
          <TabsTrigger value="profile">{t('profileManagement')}</TabsTrigger>
          <TabsTrigger value="subscription">{t('subscription')}</TabsTrigger>
        </TabsList>

        <TabsContent value="crops" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t('cropManagement')}</CardTitle>
                  <CardDescription>Manage your crop listings</CardDescription>
                </div>
                <Button onClick={() => setIsAddCropModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('addCrop')}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('cropName')}</TableHead>
                    <TableHead>{t('category')}</TableHead>
                    <TableHead>{t('price')}</TableHead>
                    <TableHead>{t('quantity')}</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {crops.map((crop) => (
                    <TableRow key={crop.id}>
                      <TableCell className="font-medium">{crop.name}</TableCell>
                      <TableCell>{crop.category}</TableCell>
                      <TableCell>{t('currency')} {crop.price}</TableCell>
                      <TableCell>{crop.quantity}</TableCell>
                      <TableCell>
                        <Badge variant={crop.status === 'active' ? 'default' : 'secondary'}>
                          {t(crop.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {crop.status === 'active' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCloseCrop(crop.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            {t('closeCrop')}
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

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('orderTracking')}</CardTitle>
              <CardDescription>Track and manage your orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>{t('buyer')}</TableHead>
                    <TableHead>{t('quantity')}</TableHead>
                    <TableHead>{t('amount')}</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell className="font-medium">{order.cropName}</TableCell>
                      <TableCell>{order.buyer}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{t('currency')} {order.amount}</TableCell>
                      <TableCell>
                        <Badge variant={
                          order.status === 'delivered' ? 'default' : 
                          order.status === 'shipped' ? 'secondary' : 'outline'
                        }>
                          {t(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {order.status === 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openShipModal(order)}
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            {t('markAsShipped')}
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
          {/* Wallet Balance Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    {t('walletManagement')}
                  </CardTitle>
                  <CardDescription>{t('currentBalance')}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{t('currency')} {walletBalance.toFixed(2)}</div>
                  <div className="flex gap-2 mt-2">
                    <Link to="/top-up">
                      <Button size="sm">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        {t('topUpNow')}
                      </Button>
                    </Link>
                    <Button onClick={() => setIsWithdrawModalOpen(true)} variant="outline" size="sm">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      {t('withdraw')}
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>{t('transactionHistory')}</CardTitle>
              <CardDescription>View your recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>{t('transactionType')}</TableHead>
                    <TableHead>{t('amount')}</TableHead>
                    <TableHead>{t('status')}</TableHead>
                    <TableHead>{t('transactionDate')}</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>#{transaction.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {t(transaction.type)}
                        </Badge>
                      </TableCell>
                      <TableCell className={transaction.type === 'withdrawal' || transaction.type === 'payment' ? 'text-red-600' : 'text-green-600'}>
                        {transaction.type === 'withdrawal' || transaction.type === 'payment' ? '-' : '+'}
                        {t('currency')} {transaction.amount}
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          transaction.status === 'completed' ? 'default' : 
                          transaction.status === 'pending' ? 'secondary' : 'destructive'
                        }>
                          {t(transaction.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
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
                  <p className="text-lg">Mohamed Hassan</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-lg">+20 123 456 789</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Governorate</label>
                  <p className="text-lg">Giza</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <p className="text-lg">123 Main Street, Giza</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    {t('subscription')}
                  </CardTitle>
                  <CardDescription>
                    {isSubscribed ? t('subscribed') : t('notSubscribed')}
                  </CardDescription>
                </div>
                <Badge variant={isSubscribed ? "default" : "secondary"}>
                  {isSubscribed ? t('premiumPlan') : t('notSubscribed')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {!isSubscribed ? (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">{t('premiumPlan')}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      • {t('unlimited')} crop listings
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      • Advanced analytics
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      • Priority {t('support')}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">$29/{t('monthlyPlan')}</span>
                      <Link to="/payment">
                        <Button>{t('subscribe')}</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-green-600">You have access to all premium features</p>
                  <Button variant="outline">{t('manageSubscription')}</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddCropModal
        isOpen={isAddCropModalOpen}
        onClose={() => setIsAddCropModalOpen(false)}
        onAddCrop={handleAddCrop}
      />

      <ShipOrderModal
        order={selectedOrder}
        isOpen={isShipOrderModalOpen}
        onClose={() => setIsShipOrderModalOpen(false)}
        onShipOrder={handleShipOrder}
      />

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

      {/* Withdraw Modal */}
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onWithdraw={handleWithdraw}
        currentBalance={walletBalance}
      />
    </div>
  );
};

export default FarmerDashboard;
