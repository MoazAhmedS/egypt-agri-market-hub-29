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
    logout: 'تسجيل الخروج',
    
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
    
    // Admin Dashboard
    userVerification: 'التحقق من المستخدمين',
    reviewVerifyRegistrations: 'مراجعة والتحقق من التسجيلات الجديدة',
    userManagement: 'إدارة المستخدمين',
    updateDeleteBanUsers: 'تحديث، حذف، أو حظر المستخدمين الحاليين',
    cropReview: 'مراجعة المحاصيل',
    acceptRejectCropListings: 'قبول أو رفض قوائم المحاصيل',
    ordersOnHold: 'الطلبات المعلقة',
    reviewOrdersReleasePayments: 'مراجعة الطلبات وإطلاق المدفوعات للمزارعين',
    withdrawalRequests: 'طلبات السحب',
    reviewWithdrawalRequests: 'مراجعة طلبات السحب من المحافظ',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    role: 'الدور',
    documents: 'الوثائق',
    actions: 'الإجراءات',
    review: 'مراجعة',
    approve: 'موافقة',
    reject: 'رفض',
    status: 'الحالة',
    joinDate: 'تاريخ الانضمام',
    completedOrders30Days: 'الطلبات المكتملة (30 يوم)',
    totalPayments30Days: 'إجمالي المدفوعات (30 يوم)',
    mostOrderedCrop: 'المحصول الأكثر طلباً',
    activeFarmers: 'المزارعون النشطون',
    files: 'ملفات',
    amount: 'المبلغ',
    images: 'الصور',
    releasePayment: 'إطلاق الدفع',
    user: 'المستخدم',
    userType: 'نوع المستخدم',
    requestDate: 'تاريخ الطلب',
    accountDetails: 'تفاصيل الحساب',
    
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
    cropType: 'نوع المحصول',
    selectCropType: 'اختر نوع المحصول',
    
    // Buyer Dashboard  
    orderHistory: 'سجل الطلبات',
    purchaseAnalytics: 'تحليل المشتريات',
    cancelOrder: 'إلغاء الطلب',
    buyer: 'المشتري',
    orderDate: 'تاريخ الطلب',
    markAsDelivered: 'تسمية كمستلم',
    deliveryImages: 'صور التسليم',
    deliveryNotes: 'ملاحظات التسليم',
    deliveryNotesPlaceholder: 'أضف أي ملاحظات حول التسليم...',
    confirmDelivery: 'تأكيد التسليم',
    optional: 'اختياري',
    
    // Wallet
    wallet: 'المحفظة',
    walletManagement: 'إدارة المحفظة',
    currentBalance: 'الرصيد الحالي',
    topUpNow: 'شحن الآن',
    withdraw: 'سحب',
    transactions: 'المعاملات',
    transactionHistory: 'سجل المعاملات',
    transactionType: 'نوع المعاملة',
    transactionDate: 'تاريخ المعاملة',
    topUp: 'شحن',
    withdrawal: 'سحب',
    payment: 'دفع',
    earning: 'أرباح',
    pending: 'معلق',
    completed: 'مكتمل',
    cancelled: 'ملغي',
    
    // Crop types
    banana: 'موز',
    apple: 'تفاح',
    orange: 'برتقال',
    mango: 'مانجو',
    grapes: 'عنب',
    strawberry: 'فراولة',
    tomato: 'طماطم',
    cucumber: 'خيار',
    carrot: 'جزر',
    potato: 'بطاطس',
    onion: 'بصل',
    garlic: 'ثوم',
    wheat: 'قمح',
    rice: 'أرز',
    corn: 'ذرة',
    beans: 'فول',
    lentils: 'عدس',
    chickpeas: 'حمص',
    
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
    shipped: 'مشحون',
    delivered: 'تم التوصيل',
    
    // Payment Process
    orderInformation: 'معلومات الطلب',
    deliveryAddress: 'عنوان التوصيل',
    paymentMethod: 'طريقة الدفع',
    orderConfirmation: 'تأكيد الطلب',
    fullName: 'الاسم الكامل',
    phoneNumber: 'رقم الهاتف',
    address: 'العنوان',
    city: 'المدينة',
    postalCode: 'الرمز البريدي',
    creditCard: 'بطاقة ائتمان',
    cashOnDelivery: 'الدفع عند الاستلام',
    cardNumber: 'رقم البطاقة',
    expiryDate: 'تاريخ الانتهاء',
    cvv: 'الرمز الأمني',
    cardholderName: 'اسم حامل البطاقة',
    subtotal: 'المجموع الفرعي',
    deliveryFee: 'رسوم التوصيل',
    confirmOrder: 'تأكيد الطلب',
    orderPlaced: 'تم تقديم الطلب',
    orderNumber: 'رقم الطلب',
    estimatedDelivery: 'التسليم المتوقع',
    orderConfirmed: 'تم تأكيد طلبك',
    orderConfirmedMessage: 'شكراً لك! تم تأكيد طلبك وسيتم تحضيره قريباً.',
    backToHome: 'العودة للرئيسية',
    continueShopping: 'متابعة التسوق',
    
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
    logout: 'Logout',
    
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
    
    // Admin Dashboard
    userVerification: 'User Verification',
    reviewVerifyRegistrations: 'Review and verify new user registrations',
    userManagement: 'User Management',
    updateDeleteBanUsers: 'Update, delete, or ban existing users',
    cropReview: 'Crop Review',
    acceptRejectCropListings: 'Accept or reject crop listings',
    ordersOnHold: 'Orders On Hold',
    reviewOrdersReleasePayments: 'Review orders and release payments to farmers',
    withdrawalRequests: 'Withdrawal Requests',
    reviewWithdrawalRequests: 'Review withdrawal requests from user wallets',
    name: 'Name',
    email: 'Email',
    role: 'Role',
    documents: 'Documents',
    actions: 'Actions',
    review: 'Review',
    approve: 'Approve',
    reject: 'Reject',
    status: 'Status',
    joinDate: 'Join Date',
    completedOrders30Days: 'Completed Orders (30 days)',
    totalPayments30Days: 'Total Payments (30 days)',
    mostOrderedCrop: 'Most Ordered Crop',
    activeFarmers: 'Active Farmers',
    files: 'files',
    amount: 'Amount',
    images: 'Images',
    releasePayment: 'Release Payment',
    user: 'User',
    userType: 'User Type',
    requestDate: 'Request Date',
    accountDetails: 'Account Details',
    
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
    cropType: 'Crop Type',
    selectCropType: 'Select crop type',
    
    // Buyer Dashboard
    orderHistory: 'Order History',
    purchaseAnalytics: 'Purchase Analytics',
    cancelOrder: 'Cancel Order',
    buyer: 'Buyer',
    orderDate: 'Order Date',
    markAsDelivered: 'Mark as Delivered',
    deliveryImages: 'Delivery Images',
    deliveryNotes: 'Delivery Notes',
    deliveryNotesPlaceholder: 'Add any notes about the delivery...',
    confirmDelivery: 'Confirm Delivery',
    optional: 'Optional',
    
    // Wallet
    wallet: 'Wallet',
    walletManagement: 'Wallet Management',
    currentBalance: 'Current Balance',
    topUpNow: 'Top Up Now',
    withdraw: 'Withdraw',
    transactions: 'Transactions',
    transactionHistory: 'Transaction History',
    transactionType: 'Transaction Type',
    transactionDate: 'Transaction Date',
    topUp: 'Top Up',
    withdrawal: 'Withdrawal',
    payment: 'Payment',
    earning: 'Earning',
    pending: 'Pending',
    completed: 'Completed',
    cancelled: 'Cancelled',
    
    // Crop types
    banana: 'Banana',
    apple: 'Apple',
    orange: 'Orange',
    mango: 'Mango',
    grapes: 'Grapes',
    strawberry: 'Strawberry',
    tomato: 'Tomato',
    cucumber: 'Cucumber',
    carrot: 'Carrot',
    potato: 'Potato',
    onion: 'Onion',
    garlic: 'Garlic',
    wheat: 'Wheat',
    rice: 'Rice',
    corn: 'Corn',
    beans: 'Beans',
    lentils: 'Lentils',
    chickpeas: 'Chickpeas',
    
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
    shipped: 'Shipped',
    delivered: 'Delivered',
    
    // Payment Process
    orderInformation: 'Order Information',
    deliveryAddress: 'Delivery Address',
    paymentMethod: 'Payment Method',
    orderConfirmation: 'Order Confirmation',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    address: 'Address',
    city: 'City',
    postalCode: 'Postal Code',
    creditCard: 'Credit Card',
    cashOnDelivery: 'Cash on Delivery',
    cardNumber: 'Card Number',
    expiryDate: 'Expiry Date',
    cvv: 'CVV',
    cardholderName: 'Cardholder Name',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery Fee',
    confirmOrder: 'Confirm Order',
    orderPlaced: 'Order Placed',
    orderNumber: 'Order Number',
    estimatedDelivery: 'Estimated Delivery',
    orderConfirmed: 'Your order has been confirmed',
    orderConfirmedMessage: 'Thank you! Your order has been confirmed and will be prepared shortly.',
    backToHome: 'Back to Home',
    continueShopping: 'Continue Shopping',
    
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
