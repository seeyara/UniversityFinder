import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, X, DollarSign, Clock, Globe, Briefcase } from "lucide-react";

const ValueComparison = () => {
  const comparisonData = [
    {
      feature: "Total Cost",
      traditional: "₹40-50 Lakhs",
      hybrid: "₹15-20 Lakhs",
      savings: "₹25-30 Lakhs",
      icon: DollarSign
    },
    {
      feature: "Time to Start Career",
      traditional: "2-3 Years",
      hybrid: "1.5-2 Years",
      savings: "6-12 Months Earlier",
      icon: Clock
    },
    {
      feature: "Living Expenses",
      traditional: "₹20+ Lakhs",
      hybrid: "₹8-10 Lakhs",
      savings: "₹10-12 Lakhs",
      icon: Globe
    },
    {
      feature: "Work Experience",
      traditional: "Limited Internships",
      hybrid: "Industry Projects + Internships",
      savings: "Better Job Prospects",
      icon: Briefcase
    }
  ];

  const benefits = [
    "Study first year from home - save on accommodation & food",
    "Get international degree at 60% lower cost",
    "Same job opportunities as traditional students",
    "Build network both in India and abroad",
    "Gradual transition - less cultural shock",
    "Family support during initial phase"
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Smart Students Choose Hybrid Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the same international degree and job opportunities at 60% lower cost. <br></br>
            Perfect for families who want quality education without breaking the bank.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mb-12">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <CardTitle className="text-center text-2xl">Cost & Time Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left font-semibold text-gray-900 p-2">Aspect</th>
                      <th className="text-center p-2 font-semibold text-red-700">Traditional</th>
                      <th className="text-center p-2 font-semibold text-green-700">Hybrid</th>
                      <th className="text-center p-2 font-semibold text-blue-700">Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td>
                            <div className="flex items-center">
                              <Icon className="hidden sm:block h-5 w-5 text-gray-600 mr-2" />
                              <span className="font-medium text-gray-900">{item.feature}</span>
                            </div>
                          </td>
                          <td className="text-center p-2 text-red-700 font-semibold">{item.traditional}</td>
                          <td className="text-center p-2 text-green-700 font-semibold">{item.hybrid}</td>
                          <td className="text-center p-2">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                              {item.savings}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                ✅ Why Hybrid?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-green-800">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">Real Student Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Raj Kumar - Software Engineer</h4>
                  <p className="text-blue-800 text-sm mb-2">
                    "I was earning ₹12 LPA in Vishakhapatnam. Traditional MS would cost ₹60 lakhs."
                  </p>
                  <p className="text-green-700 font-semibold text-sm">
                    ✓ Chose hybrid program - Total cost: ₹18 lakhs<br/>
                    ✓ Now earning ₹85 LPA in USA<br/>
                    ✓ Saved ~₹27 lakhs compared to traditional route
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm font-medium">
                    💡 "The first year online helped me adapt gradually. By the time I reached campus, 
                    I was already ahead of my peers!" - Raj Kumar
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ValueComparison;