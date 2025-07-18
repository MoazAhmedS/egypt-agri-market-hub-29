
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: (amount: number, bankDetails: string, notes: string) => void;
  currentBalance: number;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ 
  isOpen, 
  onClose, 
  onWithdraw, 
  currentBalance 
}) => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > 0 && withdrawAmount <= currentBalance && bankDetails.trim()) {
      onWithdraw(withdrawAmount, bankDetails, notes);
      setAmount("");
      setBankDetails("");
      setNotes("");
      onClose();
    }
  };

  const withdrawAmount = parseFloat(amount);
  const isValidAmount = withdrawAmount > 0 && withdrawAmount <= currentBalance;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowDown className="h-5 w-5" />
            {t('withdrawFunds')}
          </DialogTitle>
          <DialogDescription>
            Request withdrawal from your wallet to your bank account
          </DialogDescription>
        </DialogHeader>

        <div className="bg-blue-50 p-3 rounded-lg mb-4">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <AlertCircle className="h-4 w-4" />
            Current Balance: {t('currency')} {currentBalance.toFixed(2)}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">{t('amount')}</Label>
            <Input
              id="withdraw-amount"
              type="number"
              placeholder="Enter withdrawal amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              max={currentBalance}
              step="0.01"
              required
            />
            {amount && !isValidAmount && (
              <p className="text-sm text-red-600">
                Amount must be between 1 and {currentBalance.toFixed(2)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bank-details">Bank Account Details</Label>
            <Textarea
              id="bank-details"
              placeholder="Enter your bank account details (Account number, Bank name, etc.)"
              value={bankDetails}
              onChange={(e) => setBankDetails(e.target.value)}
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="withdrawal-notes">Additional Notes (Optional)</Label>
            <Textarea
              id="withdrawal-notes"
              placeholder="Any additional information or special instructions"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm text-yellow-700">
              Withdrawal requests are processed within 2-3 business days. You will receive a confirmation email once processed.
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button 
              type="submit" 
              disabled={!isValidAmount || !bankDetails.trim()}
            >
              Request Withdrawal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawModal;
