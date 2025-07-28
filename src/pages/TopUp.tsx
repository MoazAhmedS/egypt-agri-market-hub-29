
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Wallet, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const TopUp = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Simplified billing info state
  const [billingInfo, setBillingInfo] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const predefinedAmounts = [100, 500, 1000, 2000, 5000];

  const handleStepOne = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount) {
      setCurrentStep(2);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: t('topUpSuccessful') || "Top Up Successful",
        description: `${amount} ${t('currency')} ${t('addedToWallet') || 'has been added to your wallet'}.`,
      });
      navigate("/dashboard");
      setIsProcessing(false);
    }, 2000);
  };

  const updateBillingInfo = (field: string, value: string) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => currentStep === 1 ? navigate("/dashboard") : setCurrentStep(1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentStep === 1 ? t('backToDashboard') || "Back to Dashboard" : t('backToAmount') || "Back to Amount"}
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Wallet className="h-8 w-8" />
            {t('topUpWallet')}
          </h1>
          <p className="text-gray-600 mt-2">{t('addFundsSecurely') || 'Add funds to your wallet securely'}</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              {currentStep > 1 ? <Check className="h-4 w-4" /> : '1'}
            </div>
            <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              2
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>{t('selectAmount') || 'Step 1: Select Amount'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStepOne} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">{t('amount')}</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder={t('enterAmount') || "Enter amount"}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    required
                    className="text-lg h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label>{t('quickSelectAmount') || 'Quick Select Amount'}</Label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {predefinedAmounts.map((value) => (
                      <Button
                        key={value}
                        type="button"
                        variant="outline"
                        className="h-12"
                        onClick={() => setAmount(value.toString())}
                      >
                        {value} {t('currency')}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full h-12 text-lg">
                    {t('continueToBilling') || 'Continue to Billing Info'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {t('billingInformation') || 'Step 2: Billing Information'}
              </CardTitle>
              <div className="text-sm text-gray-600">
                {t('amount')}: {amount} {t('currency')} | {t('method')}: {t('creditCard')}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFinalSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cardholderName">{t('cardholderName') || 'Cardholder Name'}</Label>
                  <Input
                    id="cardholderName"
                    placeholder="John Doe"
                    value={billingInfo.cardholderName}
                    onChange={(e) => updateBillingInfo('cardholderName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">{t('cardNumber')}</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={billingInfo.cardNumber}
                    onChange={(e) => updateBillingInfo('cardNumber', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">{t('expiryDate')}</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={billingInfo.expiryDate}
                      onChange={(e) => updateBillingInfo('expiryDate', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">{t('cvv')}</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={billingInfo.cvv}
                      onChange={(e) => updateBillingInfo('cvv', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">{t('totalAmount') || 'Total Amount'}:</span>
                    <span className="text-2xl font-bold">{amount} {t('currency')}</span>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isProcessing}
                    className="w-full h-12 text-lg"
                  >
                    {isProcessing ? (t('processingPayment') || "Processing Payment...") : `${t('charge') || 'Charge'} ${amount} ${t('currency')}`}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TopUp;
