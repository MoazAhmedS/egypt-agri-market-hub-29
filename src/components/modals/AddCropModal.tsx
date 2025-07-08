
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Image, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AddCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCrop: (cropData: any) => void;
}

const AddCropModal = ({ isOpen, onClose, onAddCrop }: AddCropModalProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    quantity: "",
    description: ""
  });
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const cropTypes = [
    { value: "banana", label: t('banana') },
    { value: "apple", label: t('apple') },
    { value: "orange", label: t('orange') },
    { value: "mango", label: t('mango') },
    { value: "grapes", label: t('grapes') },
    { value: "strawberry", label: t('strawberry') },
    { value: "tomato", label: t('tomato') },
    { value: "cucumber", label: t('cucumber') },
    { value: "carrot", label: t('carrot') },
    { value: "potato", label: t('potato') },
    { value: "onion", label: t('onion') },
    { value: "garlic", label: t('garlic') },
    { value: "wheat", label: t('wheat') },
    { value: "rice", label: t('rice') },
    { value: "corn", label: t('corn') },
    { value: "beans", label: t('beans') },
    { value: "lentils", label: t('lentils') },
    { value: "chickpeas", label: t('chickpeas') },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedImages([...uploadedImages, ...files]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedImages.length === 0) {
      alert("Please upload at least one image of the crop");
      return;
    }

    const selectedCrop = cropTypes.find(crop => crop.value === formData.type);
    onAddCrop({
      name: selectedCrop?.label || formData.type,
      category: getCategoryFromType(formData.type),
      price: Number(formData.price),
      quantity: formData.quantity,
      description: formData.description,
      images: uploadedImages
    });
    
    setFormData({
      name: "",
      type: "",
      price: "",
      quantity: "",
      description: ""
    });
    setUploadedImages([]);
    onClose();
  };

  const getCategoryFromType = (type: string) => {
    const fruitTypes = ['banana', 'apple', 'orange', 'mango', 'grapes', 'strawberry'];
    const vegetableTypes = ['tomato', 'cucumber', 'carrot', 'potato', 'onion', 'garlic'];
    const grainTypes = ['wheat', 'rice', 'corn', 'beans', 'lentils', 'chickpeas'];
    
    if (fruitTypes.includes(type)) return 'Fruits';
    if (vegetableTypes.includes(type)) return 'Vegetables';
    if (grainTypes.includes(type)) return 'Grains';
    return 'Other';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('addCrop')}</DialogTitle>
          <DialogDescription>
            Add a new crop to your listings
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="type">{t('cropType')}</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder={t('selectCropType')} />
              </SelectTrigger>
              <SelectContent className="max-h-48">
                {cropTypes.map((crop) => (
                  <SelectItem key={crop.value} value={crop.value}>
                    {crop.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price">{t('price')} ({t('currency')})</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="quantity">{t('quantity')}</Label>
            <Input
              id="quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              placeholder="e.g., 500 kg"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">{t('description')}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
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
                  Click to upload crop images
                </p>
              </label>
            </div>
          </div>

          {uploadedImages.length > 0 && (
            <div>
              <Label>Uploaded Images ({uploadedImages.length})</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {uploadedImages.map((file, index) => (
                  <div key={index} className="relative border rounded-lg p-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <Image className="h-8 w-8 mx-auto mb-1 text-gray-400" />
                    <p className="text-xs text-gray-600 truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button type="submit">
              {t('save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCropModal;
