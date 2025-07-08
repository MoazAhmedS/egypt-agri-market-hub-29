
import { useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";

const OrderSuccess = () => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const { orderNumber, orderData } = location.state || {};

  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);

  return (
    <div className="min-h-screen bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-green-600">
              {t('orderPlaced')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {t('orderConfirmed')}
              </h2>
              <p className="text-gray-600">
                {t('orderConfirmedMessage')}
              </p>
            </div>

            {orderNumber && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-gray-600">{t('orderNumber')}</p>
                    <p className="font-semibold">{orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('estimatedDelivery')}</p>
                    <p className="font-semibold">
                      {estimatedDeliveryDate.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {orderData && (
              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">{t('orderSummary')}</h3>
                <div className="text-left space-y-3">
                  <div className="flex justify-between">
                    <span>
                      {language === 'ar' ? orderData.product.name : orderData.product.nameEn}
                    </span>
                    <span>
                      {orderData.product.price * orderData.product.quantity} {t('currency')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('inspectionFee')}</span>
                    <span>{orderData.product.inspectionFee} {t('currency')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('deliveryFee')}</span>
                    <span>50 {t('currency')}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>{t('totalPrice')}</span>
                    <span>
                      {(orderData.product.price * orderData.product.quantity) + 
                       orderData.product.inspectionFee + 50} {t('currency')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button asChild className="flex-1">
                <Link to="/" className="flex items-center justify-center gap-2">
                  <Home className="h-4 w-4" />
                  {t('backToHome')}
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/browse" className="flex items-center justify-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  {t('continueShopping')}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;
