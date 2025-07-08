
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  documents: number;
}

interface UserReviewModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (userId: number) => void;
  onReject: (userId: number) => void;
}

const UserReviewModal = ({ user, isOpen, onClose, onApprove, onReject }: UserReviewModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      onApprove(user.id);
      toast({
        title: "User Approved",
        description: `${user.name} has been approved and can now access the platform.`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      onReject(user.id);
      toast({
        title: "User Rejected",
        description: `${user.name}'s application has been rejected.`,
        variant: "destructive",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review User Application</DialogTitle>
          <DialogDescription>
            Review the user's information and documents before making a decision.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <p className="text-lg">{user.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <Badge variant="outline">{user.role}</Badge>
            </div>
            <div>
              <label className="text-sm font-medium">Documents Submitted</label>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{user.documents} files</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Documents Preview</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {Array.from({ length: user.documents }).map((_, index) => (
                <div key={index} className="border rounded-lg p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-xs text-gray-600">Document {index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleReject}
            disabled={isLoading}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </Button>
          <Button 
            onClick={handleApprove}
            disabled={isLoading}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserReviewModal;
