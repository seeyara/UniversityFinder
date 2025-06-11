
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, DollarSign, TrendingUp, Shield, Users, CheckCircle } from "lucide-react";

interface University {
  id: number;
  name: string;
  course: string;
  country: string;
  duration: string;
  hybridModel: string;
  matchScore: number;
  originalFee: string;
  hybridFee: string;
  savings: string;
  successRate: string;
  avgSalary: string;
  location: string;
  highlights: string[];
}

interface UniversityCardProps {
  university: University;
  rank: number;
}

const UniversityCard = ({ university, rank }: UniversityCardProps) => {
  const getMatchColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    return "bg-orange-500";
  };

  return (
    <Card className="overflow-hidden border-2 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <Badge variant="secondary" className="mr-3 text-lg font-bold">
                #{rank}
              </Badge>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {university.name}
              </CardTitle>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="font-semibold text-gray-700">Course: {university.course}</p>
                <div className="flex items-center mt-2 text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{university.location}</span>
                </div>
                <div className="flex items-center mt-1 text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{university.duration} Program</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-medium text-green-800">Job Success Rate</span>
            </div>
            <span className="font-bold text-green-700">{university.successRate}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-100 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-800">Average Starting Salary</span>
            </div>
            <span className="font-bold text-blue-700">{university.avgSalary}</span>
          </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-4">
        {/* Hybrid Model Highlight */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="py-2font-semibold text-blue-800 mb-2 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Smart Hybrid Learning Model
          </h4>
          <p className="text-blue-700">{university.hybridModel}</p>
          <p className="text-sm text-blue-600 mt-1">
            Complete your first year from Vishakhapatnam, then experience campus life abroad!
          </p>
        </div>

        {/* Cost Comparison - The Key Value Prop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <DollarSign className="h-6 w-6 mx-auto text-red-600 mb-2" />
            <p className="text-sm text-red-600 font-medium">Traditional Cost</p>
            <p className="text-xl font-bold text-red-700 line-through">{university.originalFee}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <DollarSign className="h-6 w-6 mx-auto text-green-600 mb-2" />
            <p className="text-sm text-green-600 font-medium">Hybrid Model Cost</p>
            <p className="text-xl font-bold text-green-700">{university.hybridFee}</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto text-yellow-600 mb-2" />
            <p className="text-sm text-yellow-600 font-medium">You Save</p>
            <p className="text-xl font-bold text-yellow-700">{university.savings}</p>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
         
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Key Benefits</h4>
          <div className="flex flex-wrap gap-2">
            {university.highlights.map((highlight, index) => (
              <Badge key={index} variant="outline" className="border-blue-300 text-blue-700">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            <Users className="h-4 w-4 mr-2" />
            Get Free Counseling
          </Button>
          <Button variant="outline" className="flex-1 border-green-500 text-green-700 hover:bg-green-50">
            View Detailed Breakdown
          </Button>
        </div>

        {/* Trust Badge */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-600">
            <Shield className="h-4 w-4 inline mr-1" />
            <strong>Money-Back Guarantee:</strong> If you don't get admission, full refund of counseling fees
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversityCard;