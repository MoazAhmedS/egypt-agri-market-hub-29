
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
      className="ml-2"
    >
      {language === 'ar' ? 'EN' : 'ع'}
    </Button>
  );
};

export default LanguageToggle;
