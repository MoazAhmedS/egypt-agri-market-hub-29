
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

interface OrderData {
  product: {
    name: string;
    nameEn: string;
    price: number;
    quantity: number;
    inspectionFee: number;
  };
}

const CheckoutProcess = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState<OrderData>({
    product: location.state?.product || {
      name: "طماطم طازجة",
      nameEn: "Fresh Tomatoes",
      price: 15,
      quantity: 5,
      inspectionFee: 200
    }
  });

  const totalAmount = (orderData.product.price * orderData.product.quantity) + orderData.product.inspectionFee + 50; // 50 delivery fee

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleConfirmOrder = () => {
    // Simulate order processing
    toast({
      title: t('orderConfirmed'),
      description: t('orderConfirmedMessage'),
    });
    
    // Navigate to success page after a delay
    setTimeout(() => {
      navigate('/order-success', { 
        state: { 
          orderNumber: `ORD-${Date.now()}`,
          orderData 
        } 
      });
    }, 1000);
  };

  const steps = [
    { number: 1, title: t('orderInformation') },
    { number: 2, title: t('orderConfirmation') }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back')}
        </Button>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-green-600 border-green-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`mx-4 h-1 w-16 ${
                    currentStep > step.number ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{steps.find(s => s.number === currentStep)?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Step 1: Order Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=100&h=100&fit=crop"
                        alt={language === 'ar' ? orderData.product.name : orderData.product.nameEn}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {language === 'ar' ? orderData.product.name : orderData.product.nameEn}
                        </h3>
                        <p className="text-gray-600">
                          {orderData.product.quantity} kg × {orderData.product.price} {t('currency')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {orderData.product.price * orderData.product.quantity} {t('currency')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Order Confirmation */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">{t('orderSummary')}</h3>
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span>{language === 'ar' ? orderData.product.name : orderData.product.nameEn}</span>
                          <span>{orderData.product.price * orderData.product.quantity} {t('currency')}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span>{t('inspectionFee')}</span>
                          <span>{orderData.product.inspectionFee} {t('currency')}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span>{t('deliveryFee')}</span>
                          <span>50 {t('currency')}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between items-center font-semibold">
                          <span>{t('totalPrice')}</span>
                          <span>{totalAmount} {t('currency')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {t('previous')}
                  </Button>
                  
                  {currentStep === 1 ? (
                    <Button
                      onClick={handleNextStep}
                      className="flex items-center gap-2"
                    >
                      {t('next')}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleConfirmOrder}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {t('confirmOrder')}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>{t('orderSummary')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>{t('subtotal')}</span>
                    <span>{orderData.product.price * orderData.product.quantity} {t('currency')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('inspectionFee')}</span>
                    <span>{orderData.product.inspectionFee} {t('currency')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('deliveryFee')}</span>
                    <span>50 {t('currency')}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                    <span>{t('totalPrice')}</span>
                    <span>{totalAmount} {t('currency')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProcess;
