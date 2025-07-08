
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";

// Mock product data (in real app, this would come from API)
const mockProduct = {
  id: 1,
  name: "طماطم طازجة",
  nameEn: "Fresh Tomatoes",
  type: "vegetables",
  price: 15,
  governorate: "cairo",
  farmer: "أحمد محمد",
  farmerEn: "Ahmed Mohamed",
  quantity: 500,
  description: "طماطم طازجة عالية الجودة من مزارع القاهرة",
  descriptionEn: "Fresh high-quality tomatoes from Cairo farms",
  images: [
    "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
  ]
};

const ProductDetails = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [engineerInspection, setEngineerInspection] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = mockProduct; // In real app, fetch by id
  const inspectionFee = 200;
  const totalPrice = (product.price * selectedQuantity) + (engineerInspection ? inspectionFee : 0);

  const handlePurchase = () => {
    const productData = {
      name: product.name,
      nameEn: product.nameEn,
      price: product.price,
      quantity: selectedQuantity,
      inspectionFee: engineerInspection ? inspectionFee : 0
    };
    
    navigate('/checkout', { 
      state: { product: productData } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/browse" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('back')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
              <img 
                src={product.images[currentImageIndex]} 
                alt={language === 'ar' ? product.name : product.nameEn}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'ar' ? product.name : product.nameEn}
              </h1>
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? product.description : product.descriptionEn}
              </p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span>{language === 'ar' ? product.farmer : product.farmerEn}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{t(product.governorate)}</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-green-600 mb-2">
                {product.price} {t('currency')} {t('perKg')}
              </div>
              <p className="text-gray-600">
                {t('availableQuantity')}: {product.quantity} {t('quantity')}
              </p>
            </div>

            {/* Purchase Form */}
            <Card>
              <CardHeader>
                <CardTitle>{t('orderSummary')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="quantity">{t('quantity')} (kg)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.quantity}
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(parseInt(e.target.value) || 1)}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="inspection"
                    checked={engineerInspection}
                    onChange={(e) => setEngineerInspection(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="inspection" className="text-sm">
                    {t('engineerInspection')} (+{inspectionFee} {t('currency')})
                  </Label>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>{t('pricePerKg')}:</span>
                    <span>{product.price} {t('currency')}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>{t('quantity')}:</span>
                    <span>{selectedQuantity} kg</span>
                  </div>
                  {engineerInspection && (
                    <div className="flex justify-between items-center mb-2">
                      <span>{t('inspectionFee')}:</span>
                      <span>{inspectionFee} {t('currency')}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                    <span>{t('totalPrice')}:</span>
                    <span>{totalPrice} {t('currency')}</span>
                  </div>
                </div>

                <Button 
                  onClick={handlePurchase}
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                >
                  {t('buyNow')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
