
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, Wallet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: (amount: number, method: string, accountDetails: string) => void;
  currentBalance: number;
}

const WithdrawModal = ({ isOpen, onClose, onWithdraw, currentBalance }: WithdrawModalProps) => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState("");
  const [withdrawalMethod, setWithdrawalMethod] = useState("");
  const [accountDetails, setAccountDetails] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && withdrawalMethod && accountDetails) {
      onWithdraw(Number(amount), withdrawalMethod, accountDetails);
      setAmount("");
      setWithdrawalMethod("");
      setAccountDetails("");
      onClose();
    }
  };

  const maxWithdraw = Math.floor(currentBalance * 0.9); // Allow 90% of balance

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowDown className="h-5 w-5" />
            {t('withdrawFunds')}
          </DialogTitle>
        </DialogHeader>

        <div className="bg-muted p-3 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t('currentBalance')}</span>
            <span className="font-bold">{t('currency')} {currentBalance.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Maximum withdrawal</span>
            <span>{t('currency')} {maxWithdraw.toFixed(2)}</span>
          </div>
        </div>

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
              max={maxWithdraw}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="withdrawal-method">Withdrawal Method</Label>
            <Select value={withdrawalMethod} onValueChange={setWithdrawalMethod} required>
              <SelectTrigger>
                <SelectValue placeholder="Select withdrawal method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank-account">Bank Account</SelectItem>
                <SelectItem value="mobile-wallet">Mobile Wallet</SelectItem>
                <SelectItem value="cash-pickup">Cash Pickup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-details">{t('accountDetails')}</Label>
            <Textarea
              id="account-details"
              placeholder="Enter bank account number, mobile wallet number, or pickup location details..."
              value={accountDetails}
              onChange={(e) => setAccountDetails(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              {t('cancel')}
            </Button>
            <Button type="submit" className="flex-1">
              {t('withdraw')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawModal;
