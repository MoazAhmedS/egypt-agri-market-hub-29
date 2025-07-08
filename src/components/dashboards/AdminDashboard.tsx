
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  ShoppingCart, 
  Wheat, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Eye,
  Ban,
  Edit,
  Trash2,
  DollarSign
} from "lucide-react";
import UserReviewModal from "@/components/modals/UserReviewModal";
import UserUpdateModal from "@/components/modals/UserUpdateModal";
import CropReviewModal from "@/components/modals/CropReviewModal";
import OrderReviewModal from "@/components/modals/OrderReviewModal";

const AdminDashboard = () => {
  // Modal states
  const [userReviewModal, setUserReviewModal] = useState<{ isOpen: boolean; user: any }>({ isOpen: false, user: null });
  const [userUpdateModal, setUserUpdateModal] = useState<{ isOpen: boolean; user: any }>({ isOpen: false, user: null });
  const [cropReviewModal, setCropReviewModal] = useState<{ isOpen: boolean; crop: any }>({ isOpen: false, crop: null });
  const [orderReviewModal, setOrderReviewModal] = useState<{ isOpen: boolean; order: any }>({ isOpen: false, order: null });

  // Mock data - in real app this would come from API
  const [pendingUsers, setPendingUsers] = useState([
    { id: 1, name: "Ahmed Hassan", email: "ahmed@example.com", role: "Farmer", status: "pending", documents: 3 },
    { id: 2, name: "Sara Mohamed", email: "sara@example.com", role: "Buyer", status: "pending", documents: 2 },
    { id: 3, name: "Omar Ali", email: "omar@example.com", role: "Farmer", status: "pending", documents: 4 },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Mohamed Ibrahim", email: "mohamed@example.com", role: "Farmer", status: "active", joinDate: "2024-01-15" },
    { id: 2, name: "Fatma Ahmed", email: "fatma@example.com", role: "Buyer", status: "active", joinDate: "2024-02-10" },
    { id: 3, name: "Khaled Salem", email: "khaled@example.com", role: "Farmer", status: "banned", joinDate: "2024-01-20" },
  ]);

  const [pendingCrops, setPendingCrops] = useState([
    { id: 1, name: "Organic Tomatoes", farmer: "Ahmed Hassan", category: "Vegetables", price: 50, quantity: "100 kg", status: "pending" },
    { id: 2, name: "Fresh Apples", farmer: "Omar Ali", category: "Fruits", price: 80, quantity: "200 kg", status: "pending" },
    { id: 3, name: "Wheat Grains", farmer: "Mohamed Ibrahim", category: "Grains", price: 120, quantity: "500 kg", status: "pending" },
  ]);

  const [onHoldOrders, setOnHoldOrders] = useState([
    { 
      id: 1, 
      orderNumber: "ORD-2024-001", 
      farmer: "Ahmed Hassan", 
      buyer: "Fatma Ahmed", 
      crop: "Organic Tomatoes", 
      amount: 2500, 
      status: "on-hold",
      farmerImages: 3,
      buyerImages: 2
    },
    { 
      id: 2, 
      orderNumber: "ORD-2024-002", 
      farmer: "Omar Ali", 
      buyer: "Sara Mohamed", 
      crop: "Fresh Apples", 
      amount: 4000, 
      status: "on-hold",
      farmerImages: 4,
      buyerImages: 3
    },
  ]);

  // Analytics data
  const analytics = {
    completedOrders: 45,
    totalPayments: 125000,
    topCrop: "Tomatoes",
    activeFarmers: 28
  };

  // Handler functions
  const handleUserApprove = (userId: number) => {
    setPendingUsers(prev => prev.filter(user => user.id !== userId));
    console.log(`Approved user ${userId}`);
  };

  const handleUserReject = (userId: number) => {
    setPendingUsers(prev => prev.filter(user => user.id !== userId));
    console.log(`Rejected user ${userId}`);
  };

  const handleUserUpdate = (userId: number, updates: any) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    ));
    console.log(`Updated user ${userId}`, updates);
  };

  const handleUserBan = (userId: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'banned' } : user
    ));
    console.log(`Banned user ${userId}`);
  };

  const handleUserDelete = (userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    console.log(`Deleted user ${userId}`);
  };

  const handleCropAccept = (cropId: number) => {
    setPendingCrops(prev => prev.filter(crop => crop.id !== cropId));
    console.log(`Accepted crop ${cropId}`);
  };

  const handleCropReject = (cropId: number) => {
    setPendingCrops(prev => prev.filter(crop => crop.id !== cropId));
    console.log(`Rejected crop ${cropId}`);
  };

  const handlePaymentRelease = (orderId: number) => {
    setOnHoldOrders(prev => prev.filter(order => order.id !== orderId));
    console.log(`Released payment for order ${orderId}`);
  };

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders (30 days)</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.completedOrders}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments (30 days)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">EGP {analytics.totalPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Ordered Crop</CardTitle>
            <Wheat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.topCrop}</div>
            <p className="text-xs text-muted-foreground">35% of all orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Farmers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.activeFarmers}</div>
            <p className="text-xs text-muted-foreground">With completed orders</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending-users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending-users">Pending Users</TabsTrigger>
          <TabsTrigger value="manage-users">Manage Users</TabsTrigger>
          <TabsTrigger value="pending-crops">Pending Crops</TabsTrigger>
          <TabsTrigger value="pending-orders">Pending Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="pending-users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Verification</CardTitle>
              <CardDescription>Review and verify new user registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.documents} files</TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setUserReviewModal({ isOpen: true, user })}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button 
                          size="sm" 
                          variant="default" 
                          onClick={() => handleUserApprove(user.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleUserReject(user.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage-users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Update, delete, or ban existing users</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setUserUpdateModal({ isOpen: true, user })}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleUserBan(user.id)}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleUserDelete(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending-crops" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Crop Review</CardTitle>
              <CardDescription>Accept or reject crop listings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crop Name</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price (EGP)</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingCrops.map((crop) => (
                    <TableRow key={crop.id}>
                      <TableCell className="font-medium">{crop.name}</TableCell>
                      <TableCell>{crop.farmer}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{crop.category}</Badge>
                      </TableCell>
                      <TableCell>{crop.price}</TableCell>
                      <TableCell>{crop.quantity}</TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setCropReviewModal({ isOpen: true, crop })}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="default" 
                          onClick={() => handleCropAccept(crop.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleCropReject(crop.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending-orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders On Hold</CardTitle>
              <CardDescription>Review orders and release payments to farmers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>Amount (EGP)</TableHead>
                    <TableHead>Images</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {onHoldOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>{order.farmer}</TableCell>
                      <TableCell>{order.buyer}</TableCell>
                      <TableCell>{order.crop}</TableCell>
                      <TableCell>{order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Farmer: {order.farmerImages} images</div>
                          <div>Buyer: {order.buyerImages} images</div>
                        </div>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setOrderReviewModal({ isOpen: true, order })}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button 
                          size="sm" 
                          variant="default" 
                          onClick={() => handlePaymentRelease(order.id)}
                        >
                          <DollarSign className="h-4 w-4 mr-1" />
                          Release Payment
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <UserReviewModal
        user={userReviewModal.user}
        isOpen={userReviewModal.isOpen}
        onClose={() => setUserReviewModal({ isOpen: false, user: null })}
        onApprove={handleUserApprove}
        onReject={handleUserReject}
      />

      <UserUpdateModal
        user={userUpdateModal.user}
        isOpen={userUpdateModal.isOpen}
        onClose={() => setUserUpdateModal({ isOpen: false, user: null })}
        onUpdate={handleUserUpdate}
        onBan={handleUserBan}
        onDelete={handleUserDelete}
      />

      <CropReviewModal
        crop={cropReviewModal.crop}
        isOpen={cropReviewModal.isOpen}
        onClose={() => setCropReviewModal({ isOpen: false, crop: null })}
        onAccept={handleCropAccept}
        onReject={handleCropReject}
      />

      <OrderReviewModal
        order={orderReviewModal.order}
        isOpen={orderReviewModal.isOpen}
        onClose={() => setOrderReviewModal({ isOpen: false, order: null })}
        onReleasePayment={handlePaymentRelease}
      />
    </div>
  );
};

export default AdminDashboard;
