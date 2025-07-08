
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const { language, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Mock user data - in real app, this would come from auth context
  const isLoggedIn = true; // This should come from your auth context
  const user = {
    firstName: "أحمد",
    lastName: "محمد",
    email: "ahmed@example.com",
    profilePic: null
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-green-100" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-green-700">
              {language === 'ar' ? "حقولنا" : "AgriConnect"}
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className={`ml-10 flex items-baseline ${language === 'ar' ? 'space-x-reverse' : ''} space-x-4`}>
              <Link to="/" className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t('home')}
              </Link>
              <Link to="/browse" className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t('browse')}
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t('about')}
              </Link>
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    {t('login')}
                  </Link>
                  <Link to="/signup" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    {t('signup')}
                  </Link>
                </>
              ) : null}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <LanguageToggle />
            
            {/* User Profile Dropdown for Desktop */}
            {isLoggedIn && (
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profilePic || undefined} />
                        <AvatarFallback className="bg-green-100 text-green-700">
                          {getInitials(user.firstName, user.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        {t('dashboard')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      {t('logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-green-700"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link 
                to="/browse" 
                className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('browse')}
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('about')}
              </Link>
              
              {isLoggedIn ? (
                <>
                  <div className="flex items-center px-3 py-2 border-t border-gray-200 mt-2 pt-4">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={user.profilePic || undefined} />
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {getInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                  </div>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    {t('dashboard')}
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center w-full text-left"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors mx-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('signup')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
