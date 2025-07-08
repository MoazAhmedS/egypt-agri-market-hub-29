
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Wheat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Crop {
  id: number;
  name: string;
  farmer: string;
  category: string;
  price: number;
  quantity: string;
  status: string;
}

interface CropReviewModalProps {
  crop: Crop | null;
  isOpen: boolean;
  onClose: () => void;
  onAccept: (cropId: number) => void;
  onReject: (cropId: number) => void;
}

const CropReviewModal = ({ crop, isOpen, onClose, onAccept, onReject }: CropReviewModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  if (!crop) return null;

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      onAccept(crop.id);
      toast({
        title: "Crop Accepted",
        description: `${crop.name} has been approved and is now available for purchase.`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept crop. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      onReject(crop.id);
      toast({
        title: "Crop Rejected",
        description: `${crop.name} has been rejected and will not be listed.`,
        variant: "destructive",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject crop. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review Crop Listing</DialogTitle>
          <DialogDescription>
            Review the crop details before approving or rejecting the listing.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Crop Name</label>
              <p className="text-lg font-semibold">{crop.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Farmer</label>
              <p className="text-lg">{crop.farmer}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Badge variant="outline">{crop.category}</Badge>
            </div>
            <div>
              <label className="text-sm font-medium">Quantity</label>
              <p className="text-lg">{crop.quantity}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Price per unit</label>
              <p className="text-lg font-semibold">EGP {crop.price}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Badge variant="secondary">{crop.status}</Badge>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Crop Images</label>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="border rounded-lg p-4 text-center bg-gray-50">
                  <Wheat className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-xs text-gray-600">Image {index + 1}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <p className="text-sm text-gray-600 mt-1">
              Fresh {crop.name.toLowerCase()} from {crop.farmer}'s farm. High quality produce, 
              carefully harvested and ready for delivery. Perfect for {crop.category.toLowerCase()} lovers.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleReject}
            disabled={isLoading}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </Button>
          <Button 
            onClick={handleAccept}
            disabled={isLoading}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CropReviewModal;
