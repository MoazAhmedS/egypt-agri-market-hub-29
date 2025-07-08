
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Image } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Order {
  id: number;
  cropName: string;
  buyer: string;
  quantity: string;
  amount: number;
  status: string;
  orderDate: string;
}

interface ShipOrderModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onShipOrder: (orderId: number) => void;
}

const ShipOrderModal = ({ order, isOpen, onClose, onShipOrder }: ShipOrderModalProps) => {
  const { t } = useLanguage();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  if (!order) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedImages([...uploadedImages, ...files]);
  };

  const handleSubmit = () => {
    if (uploadedImages.length === 0) {
      alert("Please upload at least one image before shipping");
      return;
    }
    onShipOrder(order.id);
    setUploadedImages([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('markAsShipped')}</DialogTitle>
          <DialogDescription>
            Upload images and mark order as shipped
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2">Order Details</h3>
            <div className="space-y-1 text-sm">
              <p><strong>Order ID:</strong> #{order.id}</p>
              <p><strong>Crop:</strong> {order.cropName}</p>
              <p><strong>Buyer:</strong> {order.buyer}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Amount:</strong> {t('currency')} {order.amount}</p>
            </div>
          </div>

          <div>
            <Label htmlFor="images">{t('uploadImages')}</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="images" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Click to upload crop images before shipping
                </p>
              </label>
            </div>
          </div>

          {uploadedImages.length > 0 && (
            <div>
              <Label>Uploaded Images ({uploadedImages.length})</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {uploadedImages.map((file, index) => (
                  <div key={index} className="border rounded-lg p-2 text-center">
                    <Image className="h-8 w-8 mx-auto mb-1 text-gray-400" />
                    <p className="text-xs text-gray-600 truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button onClick={handleSubmit}>
            {t('markAsShipped')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShipOrderModal;
