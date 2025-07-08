
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

const Header = () => {
  const { language, t } = useLanguage();

  return (
    <nav className="bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-green-700">
              {language === 'ar' ? "حقولنا" : "AgriConnect"}
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t('home')}
              </Link>
              <Link to="/browse" className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t('browse')}
              </Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Dashboard
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t('about')}
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t('login')}
              </Link>
              <Link to="/signup" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                {t('signup')}
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
