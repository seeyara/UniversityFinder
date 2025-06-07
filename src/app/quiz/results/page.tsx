'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface QuizFormData {
  major: string;
  countries: string[];
  budget: string;
  courseDuration: string;
  workExperience: string;
  englishScore: string;
  careerGoals: string;
  name: string;
  email: string;
  phone: string;
  city: string;
}

interface University {
  name: string;
  location: string;
  program: string;
  duration: string;
  totalCost: string;
  roi: string;
  pros: string[];
  cons: string[];
  image: string;
}

const universities: University[] = [
  {
    name: "University of Toronto",
    location: "Toronto, Canada",
    program: "MSc in Computer Science",
    duration: "2 years",
    totalCost: "₹35 Lakhs",
    roi: "2.5 years",
    pros: [
      "Strong tech industry connections",
      "Post-study work permit for 3 years",
      "High quality of life",
      "Multicultural environment"
    ],
    cons: [
      "Cold weather",
      "High cost of living",
      "Competitive admission"
    ],
    image: "/images/toronto.jpg"
  },
  {
    name: "Technical University of Munich",
    location: "Munich, Germany",
    program: "MSc in Computer Science",
    duration: "2 years",
    totalCost: "₹20 Lakhs",
    roi: "1.8 years",
    pros: [
      "Almost free education",
      "Strong industry ties",
      "Excellent research facilities",
      "Central European location"
    ],
    cons: [
      "Language barrier",
      "Limited English programs",
      "Strict academic requirements"
    ],
    image: "/images/tum.jpg"
  },
  {
    name: "University of Melbourne",
    location: "Melbourne, Australia",
    program: "Master of Information Technology",
    duration: "2 years",
    totalCost: "₹40 Lakhs",
    roi: "2.2 years",
    pros: [
      "High quality education",
      "Post-study work rights",
      "Great weather",
      "Strong job market"
    ],
    cons: [
      "High tuition fees",
      "Distance from India",
      "Expensive living costs"
    ],
    image: "/images/melbourne.jpg"
  },
  {
    name: "National University of Singapore",
    location: "Singapore",
    program: "MSc in Computer Science",
    duration: "1.5 years",
    totalCost: "₹30 Lakhs",
    roi: "1.5 years",
    pros: [
      "Close to India",
      "Strong tech hub",
      "Safe environment",
      "English speaking"
    ],
    cons: [
      "Small country",
      "High living costs",
      "Limited work opportunities"
    ],
    image: "/images/nus.jpg"
  },
  {
    name: "University of British Columbia",
    location: "Vancouver, Canada",
    program: "MSc in Computer Science",
    duration: "2 years",
    totalCost: "₹32 Lakhs",
    roi: "2 years",
    pros: [
      "Beautiful location",
      "Strong tech industry",
      "Post-study work permit",
      "High quality of life"
    ],
    cons: [
      "High cost of living",
      "Competitive admission",
      "Limited job market"
    ],
    image: "/images/ubc.jpg"
  }
];

export default function Results() {
  const router = useRouter();
  const [quizData, setQuizData] = useState<QuizFormData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('quizResults');
    if (!storedData) {
      router.push('/quiz');
      return;
    }
    setQuizData(JSON.parse(storedData));
  }, [router]);

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading your results...</h2>
          <p className="text-gray-600">Please wait while we analyze your preferences.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your University Matches</h1>
          <p className="text-xl text-gray-600">
            Based on your preferences in {quizData.major} and interest in {quizData.countries.join(', ')}
          </p>
        </div>

        <div className="space-y-8">
          {universities.map((uni, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{uni.name}</h3>
                    <p className="text-gray-600">{uni.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary-600">{uni.totalCost}</p>
                    <p className="text-sm text-gray-500">ROI: {uni.roi}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Program Details</h4>
                    <p className="text-gray-600">{uni.program}</p>
                    <p className="text-gray-600">Duration: {uni.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Pros</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {uni.pros.map((pro, i) => (
                        <li key={i}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Cons</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {uni.cons.map((con, i) => (
                      <li key={i}>{con}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      // TODO: Implement finance options modal/page
                      console.log('Finance options for:', uni.name);
                    }}
                  >
                    View Finance Options
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/contact">
            <Button size="lg" variant="primary">
              Schedule Consultation
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => {
              const report = {
                quizData,
                universities
              };
              const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'university-recommendations.json';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
          >
            Download Full Report
          </Button>
        </div>
      </div>
    </div>
  );
} 