
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SignupData } from "../SignupFlow";

interface LocationInfoProps {
  data: SignupData;
  onUpdate: (updates: Partial<SignupData>) => void;
}

const LocationInfo = ({ data, onUpdate }: LocationInfoProps) => {
  const governorates = [
    "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "القليوبية",
    "كفر الشيخ", "الغربية", "المنوفية", "البحيرة", "الإسماعيلية", "بور سعيد",
    "السويس", "شمال سيناء", "جنوب سيناء", "الفيوم", "بني سويف", "المنيا",
    "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد",
    "مطروح", "دمياط"
  ];

  const handleChange = (field: keyof SignupData, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="governorate">المحافظة</Label>
        <Select value={data.governorate} onValueChange={(value) => handleChange("governorate", value)}>
          <SelectTrigger>
            <SelectValue placeholder="اختر المحافظة" />
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

      <div className="space-y-2">
        <Label htmlFor="address">العنوان التفصيلي</Label>
        <Input
          id="address"
          value={data.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="أدخل عنوانك التفصيلي"
          required
        />
      </div>
    </div>
  );
};

export default LocationInfo;
