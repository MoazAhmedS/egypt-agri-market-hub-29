
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: "طماطم طازجة",
    nameEn: "Fresh Tomatoes",
    type: "vegetables",
    price: 15,
    governorate: "cairo",
    farmer: "أحمد محمد",
    farmerEn: "Ahmed Mohamed",
    quantity: 500,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    name: "بصل أحمر",
    nameEn: "Red Onions",
    type: "vegetables",
    price: 12,
    governorate: "giza",
    farmer: "محمود علي",
    farmerEn: "Mahmoud Ali",
    quantity: 300,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    name: "برتقال بلدي",
    nameEn: "Local Oranges",
    type: "fruits",
    price: 20,
    governorate: "alexandria",
    farmer: "فاطمة حسن",
    farmerEn: "Fatma Hassan",
    quantity: 200,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    name: "قمح",
    nameEn: "Wheat",
    type: "grains",
    price: 8,
    governorate: "dakahlia",
    farmer: "سعد إبراهيم",
    farmerEn: "Saad Ibrahim",
    quantity: 1000,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop",
  },
];

const governorates = [
  { value: "cairo", labelAr: "القاهرة", labelEn: "Cairo" },
  { value: "giza", labelAr: "الجيزة", labelEn: "Giza" },
  { value: "alexandria", labelAr: "الإسكندرية", labelEn: "Alexandria" },
  { value: "dakahlia", labelAr: "الدقهلية", labelEn: "Dakahlia" },
  { value: "sharqia", labelAr: "الشرقية", labelEn: "Sharqia" },
];

const productTypes = [
  { value: "vegetables", labelAr: "خضروات", labelEn: "Vegetables" },
  { value: "fruits", labelAr: "فواكه", labelEn: "Fruits" },
  { value: "grains", labelAr: "حبوب", labelEn: "Grains" },
  { value: "herbs", labelAr: "أعشاب", labelEn: "Herbs" },
];

const BrowseProducts = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGovernorate, setSelectedGovernorate] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const productName = language === 'ar' ? product.name : product.nameEn;
      const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGovernorate = selectedGovernorate === "all" || product.governorate === selectedGovernorate;
      const matchesType = selectedType === "all" || product.type === selectedType;
      const matchesPrice = !maxPrice || product.price <= parseInt(maxPrice);
      
      return matchesSearch && matchesGovernorate && matchesType && matchesPrice;
    });
  }, [searchTerm, selectedGovernorate, selectedType, maxPrice, language]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGovernorate("all");
    setSelectedType("all");
    setMaxPrice("");
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('browse')}</h1>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedGovernorate} onValueChange={setSelectedGovernorate}>
              <SelectTrigger>
                <SelectValue placeholder={t('governorate')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allGovernorates')}</SelectItem>
                {governorates.map((gov) => (
                  <SelectItem key={gov.value} value={gov.value}>
                    {language === 'ar' ? gov.labelAr : gov.labelEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder={t('productType')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allTypes')}</SelectItem>
                {productTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {language === 'ar' ? type.labelAr : type.labelEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Input
                type="number"
                placeholder={t('maxPrice')}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <Button onClick={clearFilters} variant="outline">
                {t('clear')}
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={language === 'ar' ? product.name : product.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {language === 'ar' ? product.name : product.nameEn}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {language === 'ar' ? product.farmer : product.farmerEn}
                  </p>
                  <p className="text-gray-600 mb-2">
                    {t(product.governorate)}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">
                      {product.price} {t('currency')}
                    </span>
                    <span className="text-sm text-gray-500">
                      {t('perKg')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.quantity} {t('quantity')}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('noResults')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseProducts;
