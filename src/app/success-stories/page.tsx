"use client";

import React from "react";
import { successStories } from "../components/successStoriesData";
import { Star, TrendingUp } from "lucide-react";

const bgPatterns = [
  "bg-white",
  "bg-gradient-to-r from-blue-50 to-green-50",
];

export default function SuccessStoriesPage() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Read in-depth journeys of our students and professionals who transformed their careers with EduSailor.
          </p>
        </div>
        <div className="flex flex-col gap-12">
          {successStories.map((story, idx) => (
            <div
              key={idx}
              className={`w-full rounded-2xl shadow-lg mx-auto p-8 flex flex-col items-center ${bgPatterns[idx % bgPatterns.length]}`}
            >
              {/* Name Circle */}
              <div className="flex justify-center -mt-16 mb-4 w-full z-10">
                <div className="rounded-full bg-white text-black w-28 h-28 flex items-center text-center justify-center text-xl font-bold shadow-lg border-4 border-black">
                  {story.name}
                </div>
              </div>
              {/* Before/After Tall Rectangles */}
              <div className="flex w-full justify-between items-stretch mb-4 relative" style={{minHeight: '170px'}}>
                <div className="flex-1 flex flex-col justify-start">
                  <div className="h-full bg-red-50 border border-red-200 rounded-lg flex flex-col items-center justify-center p-4 min-h-[140px]">
                    <div className="text-lg font-semibold text-red-700 mb-1">Before</div>
                    <div className="text-sm text-red-800">{story.previousJob}</div>
                    <div className="text-lg font-bold text-red-700">{story.previousSalary}</div>
                  </div>
                </div>
                <div className="mx-4 flex-shrink-0 flex flex-col items-center justify-center min-h-[140px]">
                  <TrendingUp className="h-10 w-10 text-green-600 mb-1" />
                </div>
                <div className="flex-1 flex flex-col justify-start">
                  <div className="h-full bg-green-50 border border-green-200 rounded-lg flex flex-col items-center justify-center p-4 min-h-[140px]">
                    <div className="text-lg font-semibold text-green-700 mb-1">After</div>
                    <div className="text-sm text-green-800">{story.currentJob}</div>
                    <div className="text-lg font-bold text-green-700">{story.currentSalary}</div>
                  </div>
                </div>
              </div>
              {/* Description */}
              <div className="w-full mb-4 text-gray-700 text-base">
                <span className="font-semibold">{story.name}</span>, age {story.age}, studied {story.course} at {story.university} ({story.location}).
                Being a {story.previousJob} after getting the job in <span className="font-semibold">{story.timeToJob}</span>. This is what they had to say after choosing our services:
              </div>
              {/* Testimonial and Stars */}
              <div className="flex justify-between items-center mt-4 mr-5">
                <div className="flex-1 text-left">
                  <blockquote className="italic text-gray-800 bg-gray-50 border-l-4 border-blue-500 p-3 rounded">
                    "{story.testimonial}"
                  </blockquote>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center ml-4">
                  <div className="flex items-center text-yellow-400 mb-1">
                    <Star className="h-6 w-6 fill-current" />
                    <Star className="h-6 w-6 fill-current" />
                    <Star className="h-6 w-6 fill-current" />
                    <Star className="h-6 w-6 fill-current" />
                    <Star className="h-6 w-6 fill-current" />
                  </div>
                  <span className="text-xs text-gray-500">5.0</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 