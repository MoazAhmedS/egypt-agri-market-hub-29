
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Camera } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MarkDeliveredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (images: File[], notes?: string) => void;
  orderId: number;
}

const MarkDeliveredModal = ({ isOpen, onClose, onConfirm, orderId }: MarkDeliveredModalProps) => {
  const { t } = useLanguage();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [notes, setNotes] = useState("");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setSelectedImages(prev => [...prev, ...newImages]);
      
      // Create preview URLs
      const newUrls = newImages.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newUrls]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleConfirm = () => {
    onConfirm(selectedImages, notes);
    handleClose();
  };

  const handleClose = () => {
    // Clean up preview URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedImages([]);
    setPreviewUrls([]);
    setNotes("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            {t('markAsDelivered')} - Order #{orderId}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="delivery-images">{t('uploadImages')}</Label>
            <div className="mt-2">
              <Input
                id="delivery-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="mb-4"
              />
              
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded border"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="delivery-notes">{t('deliveryNotes')} ({t('optional')})</Label>
            <Textarea
              id="delivery-notes"
              placeholder={t('deliveryNotesPlaceholder')}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleClose}>
              {t('cancel')}
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={selectedImages.length === 0}
            >
              <Upload className="h-4 w-4 mr-2" />
              {t('markAsDelivered')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarkDeliveredModal;
