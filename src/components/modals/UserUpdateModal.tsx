
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ban, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  governorate?: string;
  address?: string;
  phone?: string;
}

interface UserUpdateModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (userId: number, updates: Partial<User>) => void;
  onBan: (userId: number) => void;
  onDelete: (userId: number) => void;
}

const UserUpdateModal = ({ user, isOpen, onClose, onUpdate, onBan, onDelete }: UserUpdateModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});

  const governorates = [
    "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "القليوبية",
    "كفر الشيخ", "الغربية", "المنوفية", "البحيرة", "الإسماعيلية", "بور سعيد",
    "السويس", "شمال سيناء", "جنوب سيناء", "الفيوم", "بني سويف", "المنيا",
    "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد",
    "مطروح", "دمياط"
  ];

  if (!user) return null;

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      onUpdate(user.id, formData);
      toast({
        title: "User Updated",
        description: `${user.name} has been updated successfully.`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBan = async () => {
    setIsLoading(true);
    try {
      onBan(user.id);
      toast({
        title: "User Banned",
        description: `${user.name} has been banned from the platform.`,
        variant: "destructive",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to ban user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      onDelete(user.id);
      toast({
        title: "User Deleted",
        description: `${user.name} has been permanently deleted.`,
        variant: "destructive",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Manage User</DialogTitle>
          <DialogDescription>
            Update user information or manage their account status.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input 
              defaultValue={user.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input 
              defaultValue={user.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <Input 
              defaultValue={user.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Governorate</label>
            <Select 
              defaultValue={user.governorate || ''}
              onValueChange={(value) => setFormData({ ...formData, governorate: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Governorate" />
              </SelectTrigger>
              <SelectContent>
                {governorates.map((gov) => (
                  <SelectItem key={gov} value={gov}>
                    {gov}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Address</label>
            <Input 
              defaultValue={user.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Role</label>
            <Select 
              defaultValue={user.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Farmer">Farmer</SelectItem>
                <SelectItem value="Buyer">Buyer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Current Status</label>
            <div className="mt-1">
              <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                {user.status}
              </Badge>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Join Date</label>
            <Input 
              value={user.joinDate}
              readOnly
              className="bg-gray-100"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleBan}
              disabled={isLoading}
              size="sm"
            >
              <Ban className="h-4 w-4 mr-2" />
              Ban
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isLoading}
              size="sm"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              Update
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserUpdateModal;
