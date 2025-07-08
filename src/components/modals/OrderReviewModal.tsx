
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: number;
  orderNumber: string;
  farmer: string;
  buyer: string;
  crop: string;
  amount: number;
  status: string;
  farmerImages: number;
  buyerImages: number;
}

interface OrderReviewModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onReleasePayment: (orderId: number) => void;
}

const OrderReviewModal = ({ order, isOpen, onClose, onReleasePayment }: OrderReviewModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  if (!order) return null;

  const handleReleasePayment = async () => {
    setIsLoading(true);
    try {
      onReleasePayment(order.id);
      toast({
        title: "Payment Released",
        description: `Payment of EGP ${order.amount.toLocaleString()} has been released to ${order.farmer}.`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to release payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Order - {order.orderNumber}</DialogTitle>
          <DialogDescription>
            Review order details and images before releasing payment to the farmer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium">Order Number</label>
                  <p className="font-semibold">{order.orderNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Crop</label>
                  <p>{order.crop}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Farmer</label>
                  <p>{order.farmer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Buyer</label>
                  <p>{order.buyer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <p className="text-lg font-semibold text-green-600">EGP {order.amount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Badge variant="secondary">{order.status}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Image Summary</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>Farmer Images: {order.farmerImages}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />  
                  <span>Buyer Images: {order.buyerImages}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Farmer Images (Before Shipping)</h3>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: order.farmerImages }).map((_, index) => (
                <div key={index} className="border rounded-lg p-4 text-center bg-blue-50">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                  <p className="text-xs text-gray-600">Farmer Img {index + 1}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Buyer Images (After Delivery)</h3>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: order.buyerImages }).map((_, index) => (
                <div key={index} className="border rounded-lg p-4 text-center bg-green-50">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2 text-green-400" />
                  <p className="text-xs text-gray-600">Buyer Img {index + 1}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800">Payment Release Confirmation</h4>
            <p className="text-sm text-yellow-700 mt-1">
              By clicking "Release Payment", you confirm that:
            </p>
            <ul className="text-sm text-yellow-700 mt-2 list-disc list-inside space-y-1">
              <li>The order has been completed successfully</li>
              <li>Both farmer and buyer images have been reviewed</li>
              <li>The payment of EGP {order.amount.toLocaleString()} will be transferred to {order.farmer}</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleReleasePayment}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Release Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderReviewModal;
