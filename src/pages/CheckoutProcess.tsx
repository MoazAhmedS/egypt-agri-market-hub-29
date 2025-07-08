
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  customer: {
    fullName: string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode: string;
  };
  payment: {
    method: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    cardholderName?: string;
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
    },
    customer: {
      fullName: "",
      phoneNumber: "",
      address: "",
      city: "",
      postalCode: ""
    },
    payment: {
      method: "cashOnDelivery"
    }
  });

  const totalAmount = (orderData.product.price * orderData.product.quantity) + orderData.product.inspectionFee + 50; // 50 delivery fee

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCustomerInfoChange = (field: string, value: string) => {
    setOrderData(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value
      }
    }));
  };

  const handlePaymentChange = (field: string, value: string) => {
    setOrderData(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        [field]: value
      }
    }));
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

  const isStepValid = () => {
    switch (currentStep) {
      case 2:
        return orderData.customer.fullName && orderData.customer.phoneNumber && 
               orderData.customer.address && orderData.customer.city;
      case 3:
        if (orderData.payment.method === "creditCard") {
          return orderData.payment.cardNumber && orderData.payment.expiryDate && 
                 orderData.payment.cvv && orderData.payment.cardholderName;
        }
        return true;
      default:
        return true;
    }
  };

  const steps = [
    { number: 1, title: t('orderInformation') },
    { number: 2, title: t('deliveryAddress') },
    { number: 3, title: t('paymentMethod') },
    { number: 4, title: t('orderConfirmation') }
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
                <CardTitle>{steps[currentStep - 1].title}</CardTitle>
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

                {/* Step 2: Delivery Address */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">{t('fullName')}</Label>
                        <Input
                          id="fullName"
                          value={orderData.customer.fullName}
                          onChange={(e) => handleCustomerInfoChange('fullName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phoneNumber">{t('phoneNumber')}</Label>
                        <Input
                          id="phoneNumber"
                          value={orderData.customer.phoneNumber}
                          onChange={(e) => handleCustomerInfoChange('phoneNumber', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">{t('address')}</Label>
                      <Input
                        id="address"
                        value={orderData.customer.address}
                        onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">{t('city')}</Label>
                        <Input
                          id="city"
                          value={orderData.customer.city}
                          onChange={(e) => handleCustomerInfoChange('city', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">{t('postalCode')}</Label>
                        <Input
                          id="postalCode"
                          value={orderData.customer.postalCode}
                          onChange={(e) => handleCustomerInfoChange('postalCode', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Method */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <RadioGroup
                      value={orderData.payment.method}
                      onValueChange={(value) => handlePaymentChange('method', value)}
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="cashOnDelivery" id="cashOnDelivery" />
                        <Label htmlFor="cashOnDelivery" className="font-medium">
                          {t('cashOnDelivery')}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="creditCard" id="creditCard" />
                        <Label htmlFor="creditCard" className="font-medium">
                          {t('creditCard')}
                        </Label>
                      </div>
                    </RadioGroup>

                    {orderData.payment.method === 'creditCard' && (
                      <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                        <div>
                          <Label htmlFor="cardNumber">{t('cardNumber')}</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={orderData.payment.cardNumber}
                            onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">{t('expiryDate')}</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={orderData.payment.expiryDate}
                              onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">{t('cvv')}</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={orderData.payment.cvv}
                              onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardholderName">{t('cardholderName')}</Label>
                          <Input
                            id="cardholderName"
                            value={orderData.payment.cardholderName}
                            onChange={(e) => handlePaymentChange('cardholderName', e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Order Confirmation */}
                {currentStep === 4 && (
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

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">{t('deliveryAddress')}</h3>
                      <div className="p-4 border rounded-lg bg-gray-50">
                        <p><strong>{t('fullName')}:</strong> {orderData.customer.fullName}</p>
                        <p><strong>{t('phoneNumber')}:</strong> {orderData.customer.phoneNumber}</p>
                        <p><strong>{t('address')}:</strong> {orderData.customer.address}</p>
                        <p><strong>{t('city')}:</strong> {orderData.customer.city}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">{t('paymentMethod')}</h3>
                      <div className="p-4 border rounded-lg bg-gray-50">
                        <p>
                          {orderData.payment.method === 'cashOnDelivery' 
                            ? t('cashOnDelivery') 
                            : t('creditCard')
                          }
                        </p>
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
                  
                  {currentStep < 4 ? (
                    <Button
                      onClick={handleNextStep}
                      disabled={!isStepValid()}
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
