
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TrendingUp, Lightbulb, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PremiumAnalysisAlertProps {
  isSubscribed: boolean;
  subscriptionTier?: string;
}

const PremiumAnalysisAlert = ({ isSubscribed, subscriptionTier }: PremiumAnalysisAlertProps) => {
  if (!isSubscribed) return null;

  return (
    <Alert className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <TrendingUp className="h-5 w-5 text-green-600 mt-1" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <AlertTitle className="text-green-800 mb-0">AI Market Analysis & Recommendations</AlertTitle>
            <Badge variant="default" className="bg-green-600 text-white">
              {subscriptionTier} Plan
            </Badge>
          </div>
          <AlertDescription className="text-green-700 space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <BarChart3 className="h-4 w-4" />
                  Market Insights
                </div>
                <ul className="text-sm space-y-1 ml-6">
                  <li>• Tomato prices are trending 15% higher than last month</li>
                  <li>• High demand for organic produce in your region</li>
                  <li>• Best selling window: Tuesday-Thursday mornings</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <Lightbulb className="h-4 w-4" />
                  Smart Recommendations
                </div>
                <ul className="text-sm space-y-1 ml-6">
                  <li>• Consider increasing tomato inventory by 20%</li>
                  <li>• Optimal pricing: EGP 18-22 per kg for premium quality</li>
                  <li>• Partner with 3 new buyers this week for growth</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white/60 rounded-lg p-3 mt-3">
              <p className="text-sm">
                <strong>Weekly Strategy:</strong> Focus on your high-performing crops (Tomatoes, Oranges) and consider 
                diversifying with seasonal vegetables. Your sales pattern shows 23% better performance on weekdays.
              </p>
            </div>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default PremiumAnalysisAlert;
