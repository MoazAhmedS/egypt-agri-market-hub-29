
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    browse: 'تصفح المنتجات',
    about: 'من نحن',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    
    // Browse page
    searchPlaceholder: 'ابحث عن المنتجات...',
    filterBy: 'تصفية حسب',
    governorate: 'المحافظة',
    productType: 'نوع المنتج',
    maxPrice: 'أقصى سعر',
    allGovernorates: 'جميع المحافظات',
    allTypes: 'جميع الأنواع',
    currency: 'ج.م',
    perKg: 'للكيلو',
    
    // Product types
    vegetables: 'خضروات',
    fruits: 'فواكه',
    grains: 'حبوب',
    herbs: 'أعشاب',
    
    // Governorates
    cairo: 'القاهرة',
    giza: 'الجيزة',
    alexandria: 'الإسكندرية',
    dakahlia: 'الدقهلية',
    sharqia: 'الشرقية',
    qalyubia: 'القليوبية',
    kafr_el_sheikh: 'كفر الشيخ',
    gharbia: 'الغربية',
    menoufia: 'المنوفية',
    beheira: 'البحيرة',
    
    // About page
    aboutTitle: 'من نحن',
    aboutSubtitle: 'نربط المزارعين بالتجار',
    aboutDescription: 'منصة زراعية متكاملة تهدف إلى ربط المزارعين المصريين مع التجار والمشترين بالجملة، مما يضمن وصول المنتجات الطازجة من المزرعة مباشرة إلى السوق.',
    ourMission: 'مهمتنا',
    missionText: 'تسهيل عملية تسويق المنتجات الزراعية وضمان حصول المزارعين على أفضل الأسعار لمحاصيلهم.',
    ourVision: 'رؤيتنا',
    visionText: 'أن نكون المنصة الرائدة في مصر لتجارة المنتجات الزراعية الإلكترونية.',
    
    // Product details
    productDetails: 'تفاصيل المنتج',
    quantity: 'الكمية',
    availableQuantity: 'الكمية المتاحة',
    pricePerKg: 'السعر للكيلو',
    location: 'الموقع',
    farmer: 'المزارع',
    buyNow: 'اشتري الآن',
    engineerInspection: 'فحص مهندس قبل الشحن',
    inspectionFee: 'رسوم الفحص',
    totalPrice: 'إجمالي السعر',
    orderSummary: 'ملخص الطلب',
    
    // Dashboard
    dashboard: 'لوحة التحكم',
    adminDashboard: 'لوحة تحكم المدير',
    farmerDashboard: 'لوحة تحكم المزارع',
    buyerDashboard: 'لوحة تحكم المشتري',
    
    // Farmer Dashboard
    cropManagement: 'إدارة المحاصيل',
    addCrop: 'إضافة محصول',
    closeCrop: 'إغلاق المحصول',
    orderTracking: 'تتبع الطلبات',
    pendingOrders: 'الطلبات المعلقة',
    uploadImages: 'رفع الصور',
    markAsShipped: 'تسمية كمشحون',
    profileManagement: 'إدارة الملف الشخصي',
    salesAnalytics: 'تحليل المبيعات',
    subscription: 'الاشتراك',
    subscriptionPlan: 'خطة الاشتراك',
    subscribed: 'مشترك',
    notSubscribed: 'غير مشترك',
    subscribe: 'اشترك الآن',
    manageSubscription: 'إدارة الاشتراك',
    premiumPlan: 'الخطة المميزة',
    monthlyPlan: 'شهرياً',
    unlimited: 'غير محدود',
    support: 'الدعم',
    
    // Form fields
    cropName: 'اسم المحصول',
    category: 'الفئة',
    price: 'السعر',
    description: 'الوصف',
    save: 'حفظ',
    cancel: 'إلغاء',
    close: 'إغلاق',
    update: 'تحديث',
    delete: 'حذف',
    
    // Status
    active: 'نشط',
    closed: 'مغلق',
    pending: 'معلق',
    shipped: 'مشحون',
    delivered: 'تم التوصيل',
    
    // Common
    search: 'بحث',
    filter: 'تصفية',
    clear: 'مسح',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
    loading: 'جاري التحميل...',
    noResults: 'لا توجد نتائج',
  },
  en: {
    // Navigation
    home: 'Home',
    browse: 'Browse Products',
    about: 'About Us',
    login: 'Login',
    signup: 'Sign Up',
    
    // Browse page
    searchPlaceholder: 'Search for products...',
    filterBy: 'Filter by',
    governorate: 'Governorate',
    productType: 'Product Type',
    maxPrice: 'Max Price',
    allGovernorates: 'All Governorates',
    allTypes: 'All Types',
    currency: 'EGP',
    perKg: 'per kg',
    
    // Product types
    vegetables: 'Vegetables',
    fruits: 'Fruits',
    grains: 'Grains',
    herbs: 'Herbs',
    
    // Governorates
    cairo: 'Cairo',
    giza: 'Giza',
    alexandria: 'Alexandria',
    dakahlia: 'Dakahlia',
    sharqia: 'Sharqia',
    qalyubia: 'Qalyubia',
    kafr_el_sheikh: 'Kafr El Sheikh',
    gharbia: 'Gharbia',
    menoufia: 'Menoufia',
    beheira: 'Beheira',
    
    // About page
    aboutTitle: 'About Us',
    aboutSubtitle: 'Connecting Farmers with Traders',
    aboutDescription: 'An integrated agricultural platform that aims to connect Egyptian farmers with traders and wholesale buyers, ensuring fresh products reach from farm directly to market.',
    ourMission: 'Our Mission',
    missionText: 'To facilitate the marketing of agricultural products and ensure farmers get the best prices for their crops.',
    ourVision: 'Our Vision',
    visionText: 'To be the leading platform in Egypt for electronic agricultural trade.',
    
    // Product details
    productDetails: 'Product Details',
    quantity: 'Quantity',
    availableQuantity: 'Available Quantity',
    pricePerKg: 'Price per kg',
    location: 'Location',
    farmer: 'Farmer',
    buyNow: 'Buy Now',
    engineerInspection: 'Engineer inspection before shipping',
    inspectionFee: 'Inspection Fee',
    totalPrice: 'Total Price',
    orderSummary: 'Order Summary',
    
    // Dashboard
    dashboard: 'Dashboard',
    adminDashboard: 'Admin Dashboard',
    farmerDashboard: 'Farmer Dashboard',
    buyerDashboard: 'Buyer Dashboard',
    
    // Farmer Dashboard
    cropManagement: 'Crop Management',
    addCrop: 'Add Crop',
    closeCrop: 'Close Crop',
    orderTracking: 'Order Tracking',
    pendingOrders: 'Pending Orders',
    uploadImages: 'Upload Images',
    markAsShipped: 'Mark as Shipped',
    profileManagement: 'Profile Management',
    salesAnalytics: 'Sales Analytics',
    subscription: 'Subscription',
    subscriptionPlan: 'Subscription Plan',
    subscribed: 'Subscribed',
    notSubscribed: 'Not Subscribed',
    subscribe: 'Subscribe Now',
    manageSubscription: 'Manage Subscription',
    premiumPlan: 'Premium Plan',
    monthlyPlan: 'Monthly',
    unlimited: 'Unlimited',
    support: 'Support',
    
    // Form fields
    cropName: 'Crop Name',
    category: 'Category',
    price: 'Price',
    description: 'Description',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    update: 'Update',
    delete: 'Delete',
    
    // Status
    active: 'Active',
    closed: 'Closed',
    pending: 'Pending',
    shipped: 'Shipped',
    delivered: 'Delivered',
    
    // Common
    search: 'Search',
    filter: 'Filter',
    clear: 'Clear',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    loading: 'Loading...',
    noResults: 'No results found',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
