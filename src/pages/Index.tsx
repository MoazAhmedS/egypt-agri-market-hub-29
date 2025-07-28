import { useState } from "react";
import { ShoppingCart, User, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";

const Index = () => {
  const { language, t } = useLanguage();
  const [userRole, setUserRole] = useState("");

  const isArabic = language === "ar";

  const translations = {
    en: {
      heroTitle: "Buy Fresh Egyptian Crops Directly From Farmers",
      heroSubtitle: "Connect with trusted farmers across Egypt and get the freshest produce at wholesale prices",
      startBuying: "Start Buying",
      latestProducts: "Latest Products",
      topProducts: "Top Products",
      buyNow: "Buy Now",
      signupTitle: "Join Our Platform Today",
      signupSubtitle: "Connect with trusted sellers, verified farmers, and enjoy secure payments",
      trustedSellers: "Trusted Sellers",
      verifiedFarmers: "Verified Farmers", 
      securePayments: "Secure Payments",
      name: "Full Name",
      phone: "Phone Number",
      role: "I am a...",
      farmer: "Farmer",
      buyer: "Buyer/Wholesaler",
      register: "Register Now",
      currency: "EGP",
      perKg: "/kg",
      quantity: "kg available",
      footer: {
        about: "About",
        contact: "Contact", 
        terms: "Terms",
        privacy: "Privacy"
      }
    },
    ar: {
      heroTitle: "اشتري المحاصيل المصرية الطازجة مباشرة من المزارعين",
      heroSubtitle: "تواصل مع المزارعين الموثوقين في جميع أنحاء مصر واحصل على أطازج المنتجات بأسعار الجملة",
      startBuying: "ابدأ الشراء",
      latestProducts: "أحدث المنتجات",
      topProducts: "المنتجات الأكثر مبيعاً",
      buyNow: "اشتري الآن",
      signupTitle: "انضم إلى منصتنا اليوم",
      signupSubtitle: "تواصل مع البائعين الموثوقين والمزارعين المعتمدين واستمتع بالدفع الآمن",
      trustedSellers: "بائعون موثوقون",
      verifiedFarmers: "مزارعون معتمدون",
      securePayments: "مدفوعات آمنة",
      name: "الاسم الكامل",
      phone: "رقم الهاتف",
      role: "أنا...",
      farmer: "مزارع",
      buyer: "مشتري/تاجر جملة",
      register: "سجل الآن",
      currency: "جنيه",
      perKg: "/كيلو",
      quantity: "كيلو متوفر",
      footer: {
        about: "عن الشركة",
        contact: "اتصل بنا",
        terms: "الشروط",
        privacy: "الخصوصية"
      }
    }
  };

  const localT = translations[language];

  const sampleProducts = [
    {
      id: 1,
      name: isArabic ? "طماطم طازجة" : "Fresh Tomatoes",
      nameEn: "Fresh Tomatoes",
      price: 25,
      governorate: isArabic ? "الإسكندرية" : "Alexandria",
      farmer: isArabic ? "أحمد محمد" : "Ahmed Mohamed",
      farmerEn: "Ahmed Mohamed",
      quantity: 500,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: isArabic ? "بطاطس مصرية" : "Egyptian Potatoes",
      nameEn: "Egyptian Potatoes",
      price: 18,
      governorate: isArabic ? "المنوفية" : "Menoufia",
      farmer: isArabic ? "محمود علي" : "Mahmoud Ali",
      farmerEn: "Mahmoud Ali",
      quantity: 300,
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: isArabic ? "جزر عضوي" : "Organic Carrots",
      nameEn: "Organic Carrots",
      price: 30,
      governorate: isArabic ? "الفيوم" : "Fayoum",
      farmer: isArabic ? "فاطمة حسن" : "Fatma Hassan",
      farmerEn: "Fatma Hassan",
      quantity: 200,
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: isArabic ? "بصل أحمر" : "Red Onions",
      nameEn: "Red Onions",
      price: 22,
      governorate: isArabic ? "البحيرة" : "Beheira",
      farmer: isArabic ? "سعد إبراهيم" : "Saad Ibrahim",
      farmerEn: "Saad Ibrahim",
      quantity: 400,
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop"
    }
  ];

  const topProducts = sampleProducts.map(product => ({ ...product, isTop: true }));

  return (
    <div className={`min-h-screen ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&h=600&fit=crop')"
          }}
        />
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {localT.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              {localT.heroSubtitle}
            </p>
            <Link 
              to="/signup"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all"
            >
              {localT.startBuying}
            </Link>
          </div>
        </div>
      </div>

      {/* Latest Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {localT.latestProducts}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sampleProducts.map((product) => (
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
                      {product.governorate}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        {product.price} {localT.currency}
                      </span>
                      <span className="text-sm text-gray-500">
                        {localT.perKg}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {product.quantity} {localT.quantity}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {localT.topProducts}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topProducts.map((product) => (
              <Link key={`top-${product.id}`} to={`/product/${product.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer relative">
                  <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                    {isArabic ? "الأفضل" : "TOP"}
                  </div>
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
                      {product.governorate}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        {product.price} {localT.currency}
                      </span>
                      <span className="text-sm text-gray-500">
                        {localT.perKg}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {product.quantity} {localT.quantity}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {localT.signupTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {localT.signupSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{localT.trustedSellers}</h3>
                  <p className="text-gray-600">{isArabic ? "بائعون موثوقون ومعتمدون من جميع أنحاء مصر" : "Verified and trusted sellers from across Egypt"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <ShoppingCart className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{localT.verifiedFarmers}</h3>
                  <p className="text-gray-600">{isArabic ? "مزارعون معتمدون يقدمون أجود المحاصيل" : "Certified farmers providing the finest crops"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{localT.securePayments}</h3>
                  <p className="text-gray-600">{isArabic ? "مدفوعات آمنة ومضمونة لجميع المعاملات" : "Safe and guaranteed payments for all transactions"}</p>
                </div>
              </div>
            </div>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <Input 
                    placeholder={localT.name}
                    className="h-12"
                  />
                  <Input 
                    placeholder={localT.phone}
                    className="h-12"
                  />
                  <Select value={userRole} onValueChange={setUserRole}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={localT.role} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farmer">{localT.farmer}</SelectItem>
                      <SelectItem value="buyer">{localT.buyer}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Link to="/signup">
                    <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold">
                      {localT.register}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold text-green-400 mb-4">
                {isArabic ? "حقولنا" : "AgriConnect"}
              </div>
              <p className="text-gray-400 max-w-md">
                {isArabic 
                  ? "منصة تربط المزارعين المصريين بتجار الجملة لضمان وصول أجود المحاصيل بأفضل الأسعار"
                  : "Connecting Egyptian farmers with wholesalers to ensure the finest crops reach you at the best prices"
                }
              </p>
              <div className="flex space-x-4 mt-6">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
                <Mail className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{isArabic ? "روابط سريعة" : "Quick Links"}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">{localT.footer.about}</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">{localT.footer.contact}</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">{localT.footer.terms}</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">{localT.footer.privacy}</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{isArabic ? "تواصل معنا" : "Contact Info"}</h3>
              <div className="space-y-2 text-gray-400">
                <p>{isArabic ? "القاهرة، مصر" : "Cairo, Egypt"}</p>
                <p>+20 123 456 789</p>
                <p>info@agriconnect.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {isArabic ? "حقولنا" : "AgriConnect"}. {isArabic ? "جميع الحقوق محفوظة" : "All rights reserved"}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
