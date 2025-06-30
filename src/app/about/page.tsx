"use client";

import React from "react";
import { GraduationCap, TrendingUp, Globe2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-600">
      {/* Hero + Mission Section - Gradient */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">About EduSailor</h1>
            <p className="text-xl text-blue-100 mb-6">
              Empowering Indian students and professionals to access affordable, high-quality international education and global career opportunities.
            </p>
          </div>
          <div className="bg-white/80 rounded-2xl shadow-lg p-8 mx-auto max-w-2xl">
            <h2 className="text-2xl text-center font-semibold text-blue-700 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg mb-4">
              EduSailor is dedicated to bridging the gap between Indian talent and world-class education. We help you find the best international master's programs that fit your budget, career goals, and lifestyle—without the traditional barriers of high cost and limited access.
            </p>
            <ul className="list-disc pl-6 text-gray-700 text-left">
              <li>Personalized university and program recommendations</li>
              <li>Guidance on hybrid and affordable study options</li>
              <li>Support for applications, visas, and career planning</li>
              <li>Access to authentic, accredited universities worldwide</li>
            </ul>
          </div>
        </div>
      </section>
      {/* What We Offer - White Card on Gradient */}
      <section className="bg-white/90 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <GraduationCap className="h-10 w-10 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">University Selection</h3>
              <p className="text-gray-600 text-center">Personalized guidance to choose the right university and program for your goals.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <TrendingUp className="h-10 w-10 text-green-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">Career & Visa Support</h3>
              <p className="text-gray-600 text-center">Comprehensive support for applications, visa processes, and career planning abroad.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <Globe2 className="h-10 w-10 text-indigo-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">Global Opportunities</h3>
              <p className="text-gray-600 text-center">Connect with accredited universities and employers worldwide for a successful global career.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose EduSailor - Gradient */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Why Choose EduSailor?</h2>
          <p className="text-blue-100 text-lg mb-6">
            We believe in making international education accessible, affordable, and tailored to your unique aspirations. Join 1,000+ students and professionals who have transformed their careers with EduSailor.
          </p>
        </div>
      </section>
    </div>
  );
} 