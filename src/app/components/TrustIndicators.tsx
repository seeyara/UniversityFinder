import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Star, CheckCircle, TrendingUp, Award } from "lucide-react";

const TrustIndicators = () => {
  const indicators = [
    {
      icon: Users,
      title: "1000+ Students",
      subtitle: "Successfully placed abroad",
      color: "blue"
    },
    {
      icon: Shield,
      title: "96% Success Rate",
      subtitle: "Job placement guarantee",
      color: "green"
    },
    {
      icon: TrendingUp,
      title: "₹25L+ Avg Savings",
      subtitle: "Compared to traditional programs",
      color: "emerald"
    },
    {
      icon: CheckCircle,
      title: "100% Authentic",
      subtitle: "Only accredited universities",
      color: "indigo"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-600 bg-blue-50",
      green: "text-green-600 bg-green-50",
      yellow: "text-yellow-600 bg-yellow-50",
      purple: "text-purple-600 bg-purple-50",
      emerald: "text-emerald-600 bg-emerald-50",
      indigo: "text-indigo-600 bg-indigo-50"
    };
    return colors[color as keyof typeof colors] || "text-blue-600 bg-blue-50";
  };

  return (
    <section className="py-9 bg-gray-50">
      <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Why EduSailor wins over traditional education
          </h2>
          <p className="text-gray-600">
            India's trusted platform for affordable international education
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4 pt-5">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${getColorClasses(indicator.color)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">
                    {indicator.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {indicator.subtitle}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;