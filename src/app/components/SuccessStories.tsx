import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";
import { successStories } from "./successStoriesData";

function slugify(name: string) {
  return name.toLowerCase().replace(/ /g, "-");
}

const SuccessStories = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Success Stories from Vishakhapatnam
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real students, real results. See how professionals from similar backgrounds 
            transformed their careers and achieved financial freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <Link key={index} href={`/success-stories/${slugify(story.name)}`} className="block h-full">
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-2 hover:border-blue-300 cursor-pointer">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{story.name}</CardTitle>
                      <p className="text-blue-100 text-sm">{story.age} years old</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-yellow-300">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Career Transformation */}
                  <div className="space-y-6 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-xs text-red-600 font-medium mb-1">BEFORE</p>
                        <p className="text-sm text-red-800">{story.previousJob}</p>
                        <p className="text-lg font-bold text-red-700">{story.previousSalary}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-xs text-green-600 font-medium mb-1">AFTER</p>
                        <p className="text-sm text-green-800">{story.currentJob}</p>
                        <p className="text-lg font-bold text-green-700">{story.currentSalary}</p>
                      </div>
                    </div>
                  </div>
                  {/* Program Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Briefcase className="h-4 w-4 mr-2" />
                      <span>{story.course}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{story.university}, {story.location}</span>
                    </div>
                  </div>
                  {/* Time to Job Badge */}
                  <Badge className="bg-blue-100 text-blue-800 mb-4">
                    Job secured in {story.timeToJob}
                  </Badge>
                  {/* Testimonial */}
                  <blockquote className="bg-gray-50 border-l-4 border-blue-500 p-3 rounded">
                    <p className="text-gray-700 text-sm italic">
                      "{story.testimonial}"
                    </p>
                  </blockquote>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Trust Building Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 border-2 border-blue-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join the Success Community
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">1000+</p>
                <p className="text-gray-600 text-sm">Students Placed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">96%</p>
                <p className="text-gray-600 text-sm">Job Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">₹60L</p>
                <p className="text-gray-600 text-sm">Average Salary</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">3x</p>
                <p className="text-gray-600 text-sm">Career Growth</p>
              </div>
            </div>
            <p className="text-gray-600">
              <strong>Money-back guarantee:</strong> If you don't get a job within 6 months of graduation, 
              we'll refund 100% of your counseling fees. That's our confidence in this program.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;