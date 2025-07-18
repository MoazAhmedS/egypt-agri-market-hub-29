
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Wallet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTopUp: (amount: number, method: string) => void;
}

const TopUpModal = ({ isOpen, onClose, onTopUp }: TopUpModalProps) => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && paymentMethod) {
      onTopUp(Number(amount), paymentMethod);
      setAmount("");
      setPaymentMethod("");
      onClose();
    }
  };

  const predefinedAmounts = [100, 500, 1000, 2000, 5000];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            {t('topUpWallet')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {predefinedAmounts.map((value) => (
              <Button
                key={value}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAmount(value.toString())}
              >
                {t('currency')} {value}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-method">{t('paymentMethod')}</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
              <SelectTrigger>
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

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              {t('cancel')}
            </Button>
            <Button type="submit" className="flex-1">
              {t('topUpNow')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TopUpModal;
