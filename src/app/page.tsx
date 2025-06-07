import React from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-white">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              <div className="inline-block px-4 py-2 rounded-full bg-primary-50 text-primary-700 mb-6">
                <span className="text-sm font-medium">Your Journey Starts Here</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-6 leading-tight">
                Dreaming of Studying Abroad?
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-xl">
                Let us guide you to your perfect university match. Join 10,000+ successful students who made their global education dreams come true.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quiz">
                  <Button size="lg" variant="primary" className="bg-primary-600 text-white hover:bg-primary-700 w-full sm:w-auto">
                    Start Your Journey
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 w-full sm:w-auto">
                    Talk to an Expert
                  </Button>
                </Link>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">5min</div>
                  <div className="text-sm text-gray-600">Quick Assessment</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">10k+</div>
                  <div className="text-sm text-gray-600">Success Stories</div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Visual Element */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/College%20Kids%20Running%20Around.png"
                  alt="College students enjoying campus life"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-primary-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Your Path to Global Success
          </h2>
          <p className="text-xl text-primary-100 text-center mb-12 max-w-3xl mx-auto">
            We don't just help you get admitted - we ensure you thrive in your international education journey
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="p-6 rounded-lg border border-primary-700 bg-primary-900 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                <p className="text-primary-100">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Join thousands of students who transformed their careers through international education
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 relative">
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gray-200">
                      {/* Image placeholder - will be replaced with actual images */}
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-16 text-center">
                  <h4 className="font-semibold text-lg mb-1">{testimonial.name}</h4>
                  <p className="text-primary-600 font-medium mb-3">{testimonial.university}</p>
                  <p className="text-gray-600 italic text-sm">"{testimonial.quote.split('.')[0]}..."</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Students Choose Us
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Join thousands of successful students who transformed their careers through our guidance
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       

      {/* Quiz CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Discover Your Perfect University Match
              </h2>
              <p className="text-lg text-gray-600">
                Our AI-powered assessment analyzes your profile and matches you with universities where you have the highest chances of admission and success.
              </p>
              <ul className="space-y-4">
                {[
                  "Personalized university recommendations based on your profile",
                  "Detailed analysis of admission requirements and chances",
                  "Scholarship opportunities and financial aid guidance",
                  "Post-study work opportunities and career prospects"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link href="/quiz">
                  <Button size="lg" variant="primary">
                    Start Your Assessment
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-900">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Quick & Accurate Assessment</h3>
                  <p className="text-white/80">
                    Get personalized university recommendations in just 5 minutes. Our AI analyzes thousands of successful applications to find your best matches.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-primary-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl mb-8">
            Book a free consultation with our experts and take the first step towards your global education journey.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-primary-900 hover:bg-gray-100">
              Book Free Consultation
            </Button>
          </Link>
        </div>
      </section>
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
