
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

const AdminDashboard = () => {
  // Mock data - in real app this would come from API
  const [pendingUsers] = useState([
    { id: 1, name: "Ahmed Hassan", email: "ahmed@example.com", role: "Farmer", status: "pending", documents: 3 },
    { id: 2, name: "Sara Mohamed", email: "sara@example.com", role: "Buyer", status: "pending", documents: 2 },
    { id: 3, name: "Omar Ali", email: "omar@example.com", role: "Farmer", status: "pending", documents: 4 },
  ]);

  const [users] = useState([
    { id: 1, name: "Mohamed Ibrahim", email: "mohamed@example.com", role: "Farmer", status: "active", joinDate: "2024-01-15" },
    { id: 2, name: "Fatma Ahmed", email: "fatma@example.com", role: "Buyer", status: "active", joinDate: "2024-02-10" },
    { id: 3, name: "Khaled Salem", email: "khaled@example.com", role: "Farmer", status: "banned", joinDate: "2024-01-20" },
  ]);

  const [pendingCrops] = useState([
    { id: 1, name: "Organic Tomatoes", farmer: "Ahmed Hassan", category: "Vegetables", price: 50, quantity: "100 kg", status: "pending" },
    { id: 2, name: "Fresh Apples", farmer: "Omar Ali", category: "Fruits", price: 80, quantity: "200 kg", status: "pending" },
    { id: 3, name: "Wheat Grains", farmer: "Mohamed Ibrahim", category: "Grains", price: 120, quantity: "500 kg", status: "pending" },
  ]);

  const [onHoldOrders] = useState([
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

  const handleUserAction = (userId: number, action: string) => {
    console.log(`${action} user ${userId}`);
    // Handle user actions here
  };

  const handleCropAction = (cropId: number, action: string) => {
    console.log(`${action} crop ${cropId}`);
    // Handle crop actions here
  };

  const handleOrderAction = (orderId: number, action: string) => {
    console.log(`${action} order ${orderId}`);
    // Handle order actions here
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
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" variant="default" onClick={() => handleUserAction(user.id, 'approve')}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleUserAction(user.id, 'reject')}>
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
                        <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, 'edit')}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, 'ban')}>
                          <Ban className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleUserAction(user.id, 'delete')}>
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
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="default" onClick={() => handleCropAction(crop.id, 'accept')}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleCropAction(crop.id, 'reject')}>
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
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" variant="default" onClick={() => handleOrderAction(order.id, 'release')}>
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
    </div>
  );
};

export default AdminDashboard;
