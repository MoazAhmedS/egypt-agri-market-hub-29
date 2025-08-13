import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Search, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";

// Mock data for products - expanded with premium status
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
    isPremium: true,
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
    isPremium: false,
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
    isPremium: true,
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
    isPremium: false,
  },
  {
    id: 5,
    name: "جزر طازج",
    nameEn: "Fresh Carrots",
    type: "vegetables",
    price: 10,
    governorate: "cairo",
    farmer: "مريم أحمد",
    farmerEn: "Maryam Ahmed",
    quantity: 400,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop",
    isPremium: true,
  },
  {
    id: 6,
    name: "تفاح أحمر",
    nameEn: "Red Apples",
    type: "fruits",
    price: 25,
    governorate: "giza",
    farmer: "خالد حسن",
    farmerEn: "Khaled Hassan",
    quantity: 150,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop",
    isPremium: false,
  },
  {
    id: 7,
    name: "أرز بسمتي",
    nameEn: "Basmati Rice",
    type: "grains",
    price: 18,
    governorate: "dakahlia",
    farmer: "نور الدين",
    farmerEn: "Nour Al-Din",
    quantity: 800,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop",
    isPremium: true,
  },
  {
    id: 8,
    name: "فلفل أخضر",
    nameEn: "Green Peppers",
    type: "vegetables",
    price: 14,
    governorate: "alexandria",
    farmer: "سارة محمد",
    farmerEn: "Sara Mohamed",
    quantity: 250,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop",
    isPremium: false,
  },
  {
    id: 9,
    name: "موز طازج",
    nameEn: "Fresh Bananas",
    type: "fruits",
    price: 22,
    governorate: "sharqia",
    farmer: "عمر علي",
    farmerEn: "Omar Ali",
    quantity: 180,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop",
    isPremium: false,
  },
  {
    id: 10,
    name: "بقدونس",
    nameEn: "Parsley",
    type: "herbs",
    price: 8,
    governorate: "cairo",
    farmer: "هبة أحمد",
    farmerEn: "Heba Ahmed",
    quantity: 100,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop",
    isPremium: false,
  },
  {
    id: 11,
    name: "خس طازج",
    nameEn: "Fresh Lettuce",
    type: "vegetables",
    price: 12,
    governorate: "giza",
    farmer: "طارق محمود",
    farmerEn: "Tarek Mahmoud",
    quantity: 300,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop",
    isPremium: false,
  },
  {
    id: 12,
    name: "عنب أحمر",
    nameEn: "Red Grapes",
    type: "fruits",
    price: 30,
    governorate: "alexandria",
    farmer: "رانيا حسن",
    farmerEn: "Rania Hassan",
    quantity: 120,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop",
    isPremium: true,
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      const productName = language === 'ar' ? product.name : product.nameEn;
      const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGovernorate = selectedGovernorate === "all" || product.governorate === selectedGovernorate;
      const matchesType = selectedType === "all" || product.type === selectedType;
      const matchesPrice = !maxPrice || product.price <= parseInt(maxPrice);
      
      return matchesSearch && matchesGovernorate && matchesType && matchesPrice;
    });

    // Sort products: Premium farmers first, then regular farmers
    return filtered.sort((a, b) => {
      if (a.isPremium && !b.isPremium) return -1;
      if (!a.isPremium && b.isPremium) return 1;
      return 0;
    });
  }, [searchTerm, selectedGovernorate, selectedType, maxPrice, language]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGovernorate("all");
    setSelectedType("all");
    setMaxPrice("");
    setCurrentPage(1);
  };

  // Reset pagination when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    switch (filterType) {
      case 'search':
        setSearchTerm(value);
        break;
      case 'governorate':
        setSelectedGovernorate(value);
        break;
      case 'type':
        setSelectedType(value);
        break;
      case 'maxPrice':
        setMaxPrice(value);
        break;
    }
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
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedGovernorate} onValueChange={(value) => handleFilterChange('governorate', value)}>
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

            <Select value={selectedType} onValueChange={(value) => handleFilterChange('type', value)}>
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
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
              <Button onClick={clearFilters} variant="outline">
                {t('clear')}
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className={`hover:shadow-lg transition-all cursor-pointer relative ${
                product.isPremium 
                  ? 'ring-2 ring-yellow-300 shadow-lg bg-gradient-to-br from-white to-yellow-50' 
                  : ''
              }`}>
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={language === 'ar' ? product.name : product.nameEn}
                    className="w-full h-full object-cover"
                  />
                  {product.isPremium && (
                    <div className="absolute top-2 left-2">
                      <div className="bg-yellow-400/90 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        Verified
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {language === 'ar' ? product.name : product.nameEn}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-gray-600">
                      {language === 'ar' ? product.farmer : product.farmerEn}
                    </p>
                    {product.isPremium && (
                      <Crown className="w-4 h-4 text-yellow-600" />
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">
                    {t(product.governorate)}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`text-2xl font-bold ${
                      product.isPremium ? 'text-yellow-600' : 'text-green-600'
                    }`}>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseProducts;
