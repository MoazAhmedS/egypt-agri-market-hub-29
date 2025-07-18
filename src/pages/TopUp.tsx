
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Wallet, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const TopUp = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && paymentMethod) {
      // Here you would typically handle the actual top-up logic
      toast({
        title: "Top Up Successful",
        description: `${t('currency')} ${amount} has been added to your wallet.`,
      });
      navigate("/dashboard");
    }
  };

  const predefinedAmounts = [100, 500, 1000, 2000, 5000];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Wallet className="h-8 w-8" />
            {t('topUpWallet')}
          </h1>
          <p className="text-gray-600 mt-2">Add funds to your wallet securely</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Up Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">{t('amount')}</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  required
                  className="text-lg h-12"
                />
              </div>

              <div className="space-y-3">
                <Label>Quick Select Amount</Label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {predefinedAmounts.map((value) => (
                    <Button
                      key={value}
                      type="button"
                      variant="outline"
                      className="h-12"
                      onClick={() => setAmount(value.toString())}
                    >
                      {t('currency')} {value}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-method">{t('paymentMethod')}</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit-card">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        {t('creditCard')}
                      </div>
                    </SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="mobile-wallet">Mobile Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full h-12 text-lg">
                  {t('topUpNow')} - {amount && `${t('currency')} ${amount}`}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TopUp;
