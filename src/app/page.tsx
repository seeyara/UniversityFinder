import React from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import TrustIndicators from './components/TrustIndicators';
import ValueComparison from './components/ValueComparison';
import SuccessStories from './components/SuccessStories';
import UniversityCard from './components/UniversityCard';
import { Search, GraduationCap, Globe, TrendingUp, Users, Shield, Calculator, Star, MapPin, Clock, DollarSign } from "lucide-react";

// Sample university data
const sampleUniversity = {
  id: 1,
  name: "Clark University",
  course: "MS in Computer Science",
  country: "USA",
  duration: "2 Years",
  hybridModel: "1st year online + 1 year on campus",
  matchScore: 95,
  originalFee: "₹45 Lakhs",
  hybridFee: "₹18 Lakhs",
  savings: "₹27 Lakhs",
  successRate: "96%",
  avgSalary: "₹85 LPA",
  location: "Massachusetts, USA",
  highlights: [
    "Work while studying",
    "3 years OPT",
    "Industry partnerships",
    "Placement support"
  ]
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">

      {/* Hero Section with Search Results Header */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              International Master's Degree Finder
            </h1>
            <p className="text-xl mb-6 text-blue-100">
              Transform Your Career with Affordable Global Education
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 max-w-4xl mx-auto shadow-xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Your Personalized Program Matches
              </h2>
              <div className="backdrop-blur-md rounded-lg p-4 flex flex-col sm:flex-row items-center justify-center sm:justify-center gap-4 sm:gap-12">
                <div className="flex items-center justify-center">
                  <div className="bg-blue-500/20 rounded-full p-2 mr-3 sm:hidden">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-white font-medium whitespace-nowrap">Vishakhapatnam, India</span>
                  </div>
                </div>

                <div className="h-px w-full sm:h-8 sm:w-px bg-white/10 sm:mx-2"></div>

                <div className="flex items-center justify-center">
                  <div className="bg-green-500/20 rounded-full p-2 mr-3 sm:hidden">
                    <Search className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Affordable Computer Science & AI programs</span>
                  </div>
                </div>

                <div className="h-px w-full sm:h-8 sm:w-px bg-white/10 sm:mx-2"></div>

                <div className="flex items-center justify-center">
                  <div className="bg-purple-500/20 rounded-full p-2 mr-3 sm:hidden">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-white font-medium whitespace-nowrap">High Match Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <TrustIndicators />

      {/* Value Comparison Section */}
      <ValueComparison />

      {/* Featured University Section */}
      <section className="py-5 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured University Program
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular hybrid program that combines quality education with affordability
            </p>
          </div>
          <UniversityCard university={sampleUniversity} rank={1} />
        </div>
      </section>

      {/* Success Stories Section */}
      <SuccessStories />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <GraduationCap className="h-6 w-6 text-blue-400" />
                <span className="ml-2 font-bold text-lg">EduSailor Global</span>
              </div>
              <p className="text-gray-400">
                Connecting Vishakhapatnam's talent with global opportunities through affordable education.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Find Universities</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
                <li><a href="#" className="hover:text-white">Cost Calculator</a></li>
                <li><a href="#" className="hover:text-white">Career Guidance</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Free Counseling</a></li>
                <li><a href="#" className="hover:text-white">Application Help</a></li>
                <li><a href="#" className="hover:text-white">Visa Assistance</a></li>
                <li><a href="#" className="hover:text-white">Job Placement</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>4th Floor, Potluri Castle</li>
                <li>Dwaraka Nagar, Visakhapatnam, AP 530016</li>
                <li>contact@EduSailorglobal.com</li>
                <li>+91 (891) 234-5678</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const services = [
  {
    title: "University Selection",
    description: "Personalized guidance in choosing the right university and program based on your goals.",
    icon: (
      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Visa Assistance",
    description: "Comprehensive support for visa applications and interview preparation.",
    icon: (
      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Test Preparation",
    description: "Expert guidance and resources for IELTS, TOEFL, GRE, and other standardized tests.",
    icon: (
      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

const features = [
  {
    title: "Expert Guidance",
    description: "Experienced counselors with years of expertise in international education.",
    icon: (
      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Personalized Approach",
    description: "Tailored solutions based on your unique goals and requirements.",
    icon: (
      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Success Rate",
    description: "High success rate in university admissions and visa approvals.",
    icon: (
      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "End-to-End Support",
    description: "Comprehensive assistance from application to arrival at your dream university.",
    icon: (
      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Senior Software Engineer at Google",
    university: "MS in Computer Science, Stanford University",
    quote: "After 5 years in the Indian tech industry, I felt stuck. The MS program at Stanford not only gave me cutting-edge technical skills but also exposed me to Silicon Valley's innovation culture. Now I'm leading AI projects at Google that impact millions of users."
  },
  {
    name: "Priya Patel",
    role: "Healthcare Consultant at McKinsey",
    university: "MBA, Harvard Business School",
    quote: "My medical degree from India was just the beginning. The MBA at Harvard transformed my perspective on healthcare management. I went from being a doctor to leading healthcare transformation projects across Asia-Pacific."
  },
  {
    name: "Ananya Gupta",
    role: "Research Scientist at MIT",
    university: "PhD in Biotechnology, MIT",
    quote: "I was working as a lab technician in India, but my passion for research needed more. The PhD program at MIT opened doors to groundbreaking research opportunities. Now I'm leading a team developing next-generation cancer treatments."
  }
];
