import React, { createContext, useContext, useState, useCallback } from 'react';

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, args?: any) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

interface LanguageProviderProps {
  children: React.ReactNode;
}

const translations = {
  en: {
    dashboard: "Dashboard",
    cropManagement: "Crop Management",
    orderTracking: "Order Tracking",
    pendingOrders: "Pending Orders",
    purchaseAnalytics: "Purchase Analytics",
    orderHistory: "Order History",
    wallet: "Wallet",
    walletManagement: "Wallet Management",
    currentBalance: "Current Balance",
    transactionHistory: "Transaction History",
    transactionType: "Transaction Type",
    amount: "Amount",
    status: "Status",
    transactionDate: "Transaction Date",
    profileManagement: "Profile Management",
    update: "Update",
    name: "Name",
    email: "Email",
    location: "Location",
    farmer: "Farmer",
    buyer: "Buyer",
    quantity: "Quantity",
    orderDate: "Order Date",
    actions: "Actions",
    cancelOrder: "Cancel Order",
    markAsDelivered: "Mark as Delivered",
    delivered: "Delivered",
    shipped: "Shipped",
    cancelled: "Cancelled",
    pending: "Pending",
    topUpNow: "Top Up Now",
    withdraw: "Withdraw",
    subscription: "Subscription",
    subscribed: "Subscribed",
    notSubscribed: "Not Subscribed",
    premiumPlan: "Premium Plan",
    unlimited: "Unlimited",
    support: "Support",
    monthlyPlan: "Monthly",
    subscribe: "Subscribe",
    manageSubscription: "Manage Subscription",
    salesAnalytics: "Sales Analytics",
    cropName: "Crop Name",
    category: "Category",
    price: "Price",
    addCrop: "Add Crop",
    closeCrop: "Close Crop",
    active: "Active",
    closed: "Closed",
    markAsShipped: "Mark as Shipped",
    currency: "EGP",
    topUpWallet: "Top Up Wallet",
    withdrawFunds: "Withdraw Funds",
    cancel: "Cancel",
  },
  ar: {
    dashboard: "لوحة التحكم",
    cropManagement: "إدارة المحاصيل",
    orderTracking: "تتبع الطلبات",
    pendingOrders: "الطلبات المعلقة",
    purchaseAnalytics: "تحليلات الشراء",
    orderHistory: "سجل الطلبات",
    wallet: "المحفظة",
    walletManagement: "إدارة المحفظة",
    currentBalance: "الرصيد الحالي",
    transactionHistory: "سجل المعاملات",
    transactionType: "نوع المعاملة",
    amount: "المبلغ",
    status: "الحالة",
    transactionDate: "تاريخ المعاملة",
    profileManagement: "إدارة الملف الشخصي",
    update: "تحديث",
    name: "الاسم",
    email: "البريد الإلكتروني",
    location: "الموقع",
    farmer: "المزارع",
    buyer: "المشتري",
    quantity: "الكمية",
    orderDate: "تاريخ الطلب",
    actions: "الإجراءات",
    cancelOrder: "إلغاء الطلب",
    markAsDelivered: "تأكيد التسليم",
    delivered: "تم التسليم",
    shipped: "تم الشحن",
    cancelled: "تم الإلغاء",
    pending: "قيد الانتظار",
    topUpNow: "إضافة رصيد",
    withdraw: "سحب",
     subscription: "اشتراك",
    subscribed: "مشترك",
    notSubscribed: "غير مشترك",
    premiumPlan: "الخطة المميزة",
    unlimited: "غير محدود",
    support: "دعم",
    monthlyPlan: "شهريا",
    subscribe: "اشترك",
    manageSubscription: "إدارة الاشتراك",
    salesAnalytics: "تحليلات المبيعات",
    cropName: "اسم المحصول",
    category: "الفئة",
    price: "السعر",
    addCrop: "إضافة محصول",
    closeCrop: "إغلاق المحصول",
    active: "نشط",
    closed: "مغلق",
    markAsShipped: "تم الشحن",
    currency: "ج.م",
    topUpWallet: "إضافة أموال للمحفظة",
    withdrawFunds: "سحب الأموال",
    cancel: "إلغاء",
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'en');

  const setLanguageAndUpdateStorage = useCallback((lang: string) => {
    localStorage.setItem('language', lang);
    setLanguage(lang);
  }, []);

  const t = (key: string, args?: any): string => {
    let translation = translations[language as keyof typeof translations]?.[key] || key;
    if (args) {
      Object.keys(args).forEach(argKey => {
        translation = translation.replace(`{{${argKey}}}`, args[argKey]);
      });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageAndUpdateStorage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => useContext(LanguageContext);
