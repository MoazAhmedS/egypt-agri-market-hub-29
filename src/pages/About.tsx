
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";

const About = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('aboutTitle')}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {t('aboutSubtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('aboutDescription')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="p-8">
                <CardContent className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('ourMission')}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('missionText')}
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8">
                <CardContent className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('ourVision')}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('visionText')}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Image Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop" 
                  alt="About us image 1"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop" 
                  alt="About us image 2"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop" 
                  alt="About us image 3"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
