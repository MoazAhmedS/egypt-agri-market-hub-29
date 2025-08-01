
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import PasswordResetSuccess from "./pages/auth/PasswordResetSuccess";
import EmailVerificationSent from "./pages/auth/EmailVerificationSent";
import EmailVerified from "./pages/auth/EmailVerified";
import SignupRole from "./pages/auth/SignupRole";
import SignupBasicInfo from "./pages/auth/SignupBasicInfo";
import SignupLocation from "./pages/auth/SignupLocation";
import DocumentUpload from "./pages/DocumentUpload";
import BrowseProducts from "./pages/BrowseProducts";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import CheckoutProcess from "./pages/CheckoutProcess";
import OrderSuccess from "./pages/OrderSuccess";
import TopUp from "./pages/TopUp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
            <Route path="/email-verification-sent" element={<EmailVerificationSent />} />
            <Route path="/email-verified" element={<EmailVerified />} />
            <Route path="/signup" element={<SignupRole />} />
            <Route path="/signup/basic-info" element={<SignupBasicInfo />} />
            <Route path="/signup/location" element={<SignupLocation />} />
            <Route path="/document-upload" element={<DocumentUpload />} />
            <Route path="/browse" element={<BrowseProducts />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/checkout" element={<CheckoutProcess />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/top-up" element={<TopUp />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
