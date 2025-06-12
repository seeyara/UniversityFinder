"use client";
import { useState, useEffect } from 'react';

import * as Papa from 'papaparse';
import _ from 'lodash';
import * as XLSX from 'xlsx';
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MapPin, 
  GraduationCap, 
  Clock, 
  DollarSign, 
  TrendingUp,
  CheckCircle 
} from "lucide-react";

// Add type declaration for window.fs
declare global {
  interface Window {
    fs: {
      readFile: (path: string, options: { encoding: string }) => Promise<string>;
    };
  }
}

interface Course {
  'Abroad Course Name'?: string;
  'Abroad University'?: string;
  'Abroad Course Type'?: string;
  'Abroad Course Duration'?: string;
  'Abroad Course Fee'?: string | number;
  'Online Course Name'?: string;
  'Online Course Duration'?: string;
  'Online Course Fee'?: string | number;
  'Course Level'?: string;
  'Country'?: string;
  country: string;
  score?: number;
  [key: string]: any; // Allow for additional properties from XLSX
}

interface UserResponses {
  studyField: string;
  degreeLevel: string;
  regions: string[];
  duration: string;
  budget: string;
  onlinePreference: boolean;
  highestEducation: string;
  expectedScore: string;
  phoneNumber: string;
  [key: string]: string | string[] | boolean;
}

interface QuestionOption {
  value: string;
  label: string;
  dependsOn?: {
    field: string;
    value: string;
  };
}

interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
  type: 'radio' | 'checkbox' | 'text';
  dependsOn?: {
    field: string;
    value: string;
  };
  placeholder?: string;
}

// Quiz component for international master's degree recommendations
export default function StudyAbroadQuiz() {
  // State management
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [userResponses, setUserResponses] = useState<UserResponses>({
    studyField: '',
    degreeLevel: '',
    regions: [],
    duration: '',
    budget: '',
    onlinePreference: false,
    highestEducation: '',
    expectedScore: '',
    phoneNumber: ''
  });

  // Fetching and processing the XLSX data
  useEffect(() => {
    const loadFile = async () => {
      setLoading(true);
      try {
        console.log('Attempting to load XLSX file...');
        const response = await fetch('/data/UpGrad Study Abroad Courses Data.xlsx');
        if (!response.ok) {
          throw new Error(`Failed to load XLSX file: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        let allCourses: Course[] = [];

        // Process each sheet (country)
        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json<Course>(worksheet);

          // Add country information to each record
          const coursesWithCountry = data.map(course => ({
            ...course,
            country: sheetName
          }));

          allCourses = [...allCourses, ...coursesWithCountry];
        });

        console.log('Total courses loaded:', allCourses.length);
        console.log('Available countries:', workbook.SheetNames);
        setCourseData(allCourses);
      } catch (error) {
        console.error("Error loading course data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFile();
  }, []);

  // Analyze available degrees by country
  useEffect(() => {
    if (courseData.length > 0) {
      const countryDegrees = courseData.reduce((acc, course) => {
        const country = course.country;
        const courseLevel = course['Course Level']?.toLowerCase() || '';

        if (!acc[country]) {
          acc[country] = new Set();
        }

        if (courseLevel.includes('bachelor') || courseLevel.includes('b.sc') || courseLevel.includes('b.eng')) {
          acc[country].add('Bachelors');
        }
        if (courseLevel.includes('master') || courseLevel.includes('m.sc') || courseLevel.includes('m.eng') ||
          courseLevel.includes('msc') || courseLevel.includes('mba')) {
          acc[country].add('Masters');
        }

        return acc;
      }, {} as Record<string, Set<string>>);

      const countries = Object.keys(countryDegrees).sort();
      setAvailableCountries(countries);
    }
  }, [courseData]);

  // Get available countries based on selected degree level
  const getAvailableCountries = () => {
    if (!userResponses.degreeLevel) return [];

    return availableCountries
      .filter(country => {
        const countryCourses = courseData.filter(course => course.country === country);
        const hasMatchingDegree = countryCourses.some(course => {
          const courseLevel = course['Course Level']?.toLowerCase() || '';
          if (userResponses.degreeLevel === 'Bachelors') {
            return courseLevel.includes('bachelor') || courseLevel.includes('b.sc') || courseLevel.includes('b.eng');
          } else {
            return courseLevel.includes('master') || courseLevel.includes('m.sc') ||
              courseLevel.includes('m.eng') || courseLevel.includes('msc') || courseLevel.includes('mba');
          }
        });
        return hasMatchingDegree;
      })
      .sort((a, b) => {
        // Count courses for each country
        const countA = courseData.filter(course =>
          course.country === a &&
          course['Course Level']?.toLowerCase().includes(userResponses.degreeLevel.toLowerCase())
        ).length;

        const countB = courseData.filter(course =>
          course.country === b &&
          course['Course Level']?.toLowerCase().includes(userResponses.degreeLevel.toLowerCase())
        ).length;

        // Sort in descending order
        return countB - countA;
      });
  };

  // Questions for the quiz
  const questions = [
    {
      id: 'studyField',
      question: 'What field of study are you most interested in?',
      options: [
        { value: 'ComputerScience', label: 'Computer Science/IT' },
        { value: 'Business', label: 'Business Administration/Management' },
        { value: 'DataScience', label: 'Data Science/Analytics' },
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Other', label: 'Other Fields' }
      ],
      type: 'radio'
    },
    {
      id: 'degreeLevel',
      question: 'What level of degree are you looking for?',
      options: [
        { value: 'Bachelors', label: 'Bachelor\'s Degree' },
        { value: 'Masters', label: 'Master\'s Degree/MBA' }
      ],
      type: 'radio'
    },
    {
      id: 'regions',
      question: 'Which regions are you interested in studying?',
      options: getAvailableCountries().map(country => ({
        value: country,
        label: `${country} (${courseData.filter(course =>
          course.country === country &&
          course['Course Level']?.toLowerCase().includes(userResponses.degreeLevel?.toLowerCase() || '')
        ).length} programs)`
      })),
      type: 'checkbox'
    },
    {
      id: 'duration',
      question: 'What is your preferred program duration?',
      options: [
        { value: 'short', label: 'Short (9 months - 1 year)' },
        { value: 'medium', label: 'Medium (1-2 years)' },
        { value: 'long', label: 'Long (More than 2 years)' }
      ],
      type: 'radio'
    },
    {
      id: 'budget',
      question: 'What is your approximate budget for the degree?',
      options: [
        { value: 'low', label: 'Less than ₹15,00,000' },
        { value: 'medium', label: '₹15,00,000 - ₹25,00,000' },
        { value: 'high', label: 'More than ₹25,00,000' }
      ],
      type: 'radio'
    },
    {
      id: 'highestEducation',
      question: 'What was your highest level of education?',
      options: [
        { value: 'highSchool', label: 'High School' },
        { value: 'bachelors', label: 'Bachelor\'s Degree' },
        { value: 'masters', label: 'Master\'s Degree' },
        { value: 'phd', label: 'PhD' }
      ],
      type: 'radio'
    },
    {
      id: 'expectedScore',
      question: 'What is your score/expected score?',
      type: 'text',
      placeholder: 'Enter percentage'
    },
    {
      id: 'primaryCareerGoal',
      question: 'What is your primary career goal?',
      options: [
        { value: 'salaryIncrease', label: 'Significant Salary Increase' },
        { value: 'careerOps', label: 'Better career opportunities' },
        { value: 'intlWorkExp', label: 'International work experience' },
        { value: 'settleAbroad', label: 'Permanently settle abroad' }
      ],
    },
    {
      id: 'familySituation',
      question: 'What is your family situation?',
      options: [
        { value: 'single', label: 'Single - Can relocate easily' },
        { value: 'married', label: 'Married - no children' },
        { value: 'marriedWithChildren', label: 'Married - with children' },
        { value: 'supportParents', label: 'Need to support parents/family' }
      ],
    }
  ];

  // Group questions into pages
  const questionPages = [
    [questions[0], questions[1]], // Study field and degree level
    [questions[2]], // Regions
    [questions[3], questions[4]], // Duration and budget
    [questions[5], questions[6]] // Education and score
  ];

  // Handle selection changes
  const handleChange = (questionId: string, value: string | boolean, isCheckbox = false) => {
    if (isCheckbox) {
      const currentSelections = (userResponses[questionId] as string[]) || [];
      const newSelections = currentSelections.includes(value as string)
        ? currentSelections.filter(item => item !== value)
        : [...currentSelections, value as string];

      setUserResponses(prev => ({
        ...prev,
        [questionId]: newSelections
      }));
    } else {
      setUserResponses(prev => ({
        ...prev,
        [questionId]: value
      }));
    }
  };

  // Format currency display
  const formatCurrency = (fee: string | number | undefined): string => {
    if (!fee) return 'Not specified';

    const feeStr = fee.toString();
    let amount = 0;

    // Helper function to extract number from string
    const extractNumber = (str: string): number => {
      const match = str.match(/[\d,.]+/);
      if (!match) return 0;
      return parseFloat(match[0].replace(/,/g, ''));
    };

    // Convert to USD first
    if (feeStr.includes('EUR')) {
      amount = extractNumber(feeStr) * 1.1; // EUR to USD
    } else if (feeStr.includes('GBP')) {
      amount = extractNumber(feeStr) * 1.3; // GBP to USD
    } else if (feeStr.includes('AUD')) {
      amount = extractNumber(feeStr) * 0.67; // AUD to USD
    } else if (feeStr.includes('CAD')) {
      amount = extractNumber(feeStr) * 0.74; // CAD to USD
    } else if (feeStr.includes('AED')) {
      amount = extractNumber(feeStr) * 0.27; // AED to USD
    } else if (feeStr.includes('USD')) {
      amount = extractNumber(feeStr);
    } else {
      // If no currency specified, assume USD
      amount = extractNumber(feeStr);
    }

    // Convert USD to INR (1 USD = 85.43 INR)
    const inrAmount = amount * 85.43;
    return `₹${inrAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  // Navigate between quiz steps
  const handleNext = () => {
    if (step < questionPages.length - 1) {
      setStep(step + 1);
    } else {
      setShowPhoneForm(true);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Calculate matching scores for programs
  const calculateResults = () => {
    setLoading(true);
    console.log('Starting calculation with userResponses:', userResponses);

    const scoredPrograms = courseData.map(program => {
      let score = 0;
      // Adjusted weights to prioritize course, country, and budget
      const weights = {
        fieldMatch: 5,        // Increased from 3 to 5
        levelMatch: 3,        // Decreased from 4 to 3
        regionMatch: 4,       // Increased from 1.5 to 4
        durationMatch: 1.5,   // Decreased from 2 to 1.5
        budgetMatch: 4,       // Increased from 2.5 to 4
        onlineMatch: 1        // Kept same
      };

      // Score field match - Most important factor
      if (program['Abroad Course Name']) {
        const courseName = program['Abroad Course Name'].toLowerCase();
        const degreeType = (program['Abroad Course Type'] || '').toLowerCase();

        if (userResponses.studyField === 'Business') {
          // For Business, check if it's MBA or other business program
          if (courseName.includes('business administration') ||
            courseName.includes('business management') ||
            degreeType.includes('mba')) {
            score += weights.fieldMatch * 1.5; // Higher weight for MBA
          } else if (courseName.includes('business') ||
            courseName.includes('management') ||
            courseName.includes('finance')) {
            score += weights.fieldMatch;
          }
        } else if (userResponses.studyField === 'DataScience') {
          if (courseName.includes('data science') ||
            courseName.includes('data analytics') ||
            courseName.includes('business analytics') ||
            courseName.includes('data engineering')) {
            score += weights.fieldMatch * 1.5; // Higher weight for exact matches
          } else if (courseName.includes('data') ||
            courseName.includes('analytics') ||
            courseName.includes('statistics')) {
            score += weights.fieldMatch;
          }
        } else if (userResponses.studyField === 'ComputerScience') {
          if (courseName.includes('computer science') ||
            courseName.includes('software engineering') ||
            courseName.includes('artificial intelligence') ||
            courseName.includes('machine learning')) {
            score += weights.fieldMatch * 1.5; // Higher weight for exact matches
          } else if (courseName.includes('computer') ||
            courseName.includes('software') ||
            courseName.includes('it') ||
            courseName.includes('information technology')) {
            score += weights.fieldMatch;
          }
        } else if (userResponses.studyField === 'Engineering') {
          if (courseName.includes('engineering')) {
            score += weights.fieldMatch;
          }
        }
      }

      // Score degree level match
      const degreeType = (program['Abroad Course Type'] || '').toLowerCase();
      if (userResponses.degreeLevel === 'Bachelors' &&
        (degreeType.includes('bachelor') || degreeType.includes('b.sc') || degreeType.includes('b.eng'))) {
        score += weights.levelMatch;
      } else if (userResponses.degreeLevel === 'Masters') {
        if (degreeType.includes('master') ||
          degreeType.includes('m.sc') ||
          degreeType.includes('m.eng') ||
          degreeType.includes('msc')) {
          score += weights.levelMatch;
        }
      }

      // Score region match - Second most important factor
      if (userResponses.regions.includes(program.country)) {
        score += weights.regionMatch;
        // Additional bonus for exact country match
        if (userResponses.regions.length === 1 && userResponses.regions[0] === program.country) {
          score += weights.regionMatch * 0.5; // 50% bonus for single country preference
        }
      } else {
        // Penalty for non-preferred countries
        score -= weights.regionMatch * 0.5;
      }

      // Score duration match
      const duration = program['Abroad Course Duration'] || '';
      if (userResponses.duration === 'short' &&
        (duration.includes('9 Months') || duration.includes('1 Year'))) {
        score += weights.durationMatch;
      } else if (userResponses.duration === 'medium' &&
        (duration.includes('1 Year') || duration.includes('2 Year'))) {
        score += weights.durationMatch;
      } else if (userResponses.duration === 'long' &&
        (duration.includes('3 Year') || duration.includes('4 Year'))) {
        score += weights.durationMatch;
      }

      // Score budget match - Third most important factor
      let fee = 0;
      if (program['Abroad Course Fee']) {
        const feeString = program['Abroad Course Fee'].toString();

        // Helper function to extract number from string
        const extractNumber = (str: string): number => {
          const match = str.match(/[\d,.]+/);
          if (!match) return 0;
          return parseFloat(match[0].replace(/,/g, ''));
        };

        // Convert to USD
        if (feeString.includes('EUR')) {
          fee = extractNumber(feeString) * 1.1; // EUR to USD
        } else if (feeString.includes('GBP')) {
          fee = extractNumber(feeString) * 1.3; // GBP to USD
        } else if (feeString.includes('AUD')) {
          fee = extractNumber(feeString) * 0.67; // AUD to USD
        } else if (feeString.includes('CAD')) {
          fee = extractNumber(feeString) * 0.74; // CAD to USD
        } else if (feeString.includes('AED')) {
          fee = extractNumber(feeString) * 0.27; // AED to USD
        } else if (feeString.includes('USD')) {
          fee = extractNumber(feeString);
        } else {
          // If no currency specified, assume USD
          fee = extractNumber(feeString);
        }
      }

      // Convert USD to INR for budget comparison
      const inrFee = fee * 85.43;

      // More granular budget scoring
      if (userResponses.budget === 'low') {
        if (inrFee < 1500000) {
          score += weights.budgetMatch;
        } else if (inrFee < 2000000) {
          score += weights.budgetMatch * 0.5; // Partial score for slightly over budget
        } else {
          score -= weights.budgetMatch * 0.5; // Penalty for significantly over budget
        }
      } else if (userResponses.budget === 'medium') {
        if (inrFee >= 1500000 && inrFee <= 2500000) {
          score += weights.budgetMatch;
        } else if (inrFee < 2000000 || inrFee <= 3000000) {
          score += weights.budgetMatch * 0.5; // Partial score for slightly out of range
        } else {
          score -= weights.budgetMatch * 0.5; // Penalty for significantly out of range
        }
      } else if (userResponses.budget === 'high') {
        if (inrFee > 2500000) {
          score += weights.budgetMatch;
        } else if (inrFee > 2000000) {
          score += weights.budgetMatch * 0.5; // Partial score for slightly under budget
        }
      }

      // Score online preference match
      if ((userResponses.onlinePreference && program['Online Course Name']) ||
        (!userResponses.onlinePreference && !program['Online Course Name'])) {
        score += weights.onlineMatch;
      }

      return {
        ...program,
        score,
        parsedFee: inrFee // Add parsed fee for debugging
      };
    });

    // Sort all programs by score
    const sortedPrograms = _.orderBy(scoredPrograms, ['score'], ['desc']);

    // Calculate the 20th percentile threshold
    const thresholdIndex = Math.floor(sortedPrograms.length * 0.2);
    const thresholdScore = sortedPrograms[thresholdIndex]?.score || 0;

    // Filter programs above threshold and take top 5
    const topPrograms = sortedPrograms
      .filter(program => program.score >= thresholdScore)
      .slice(0, 5);

    console.log('Score statistics:', {
      maxPossibleScore: 22.5,
      thresholdScore,
      programsAboveThreshold: sortedPrograms.filter(p => p.score >= thresholdScore).length,
      totalPrograms: sortedPrograms.length
    });

    setLoading(false);
    return topPrograms;
  };

  // Reset quiz
  const resetQuiz = () => {
    setUserResponses({
      studyField: '',
      degreeLevel: '',
      regions: [],
      duration: '',
      budget: '',
      onlinePreference: false,
      highestEducation: '',
      expectedScore: '',
      phoneNumber: ''
    });
    setStep(0);
    setShowResults(false);
  };

  // Modify handlePhoneSubmit function
  const handlePhoneSubmit = async () => {
    if (!userResponses.phoneNumber || userResponses.phoneNumber.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      // Calculate results first
      const matchedPrograms = calculateResults();
      
      // Prepare data for API
      const leadData = {
        ...userResponses,
        matchedPrograms: matchedPrograms.slice(0, 3), // Send top 3 matches
        matchScore: matchedPrograms[0]?.score?.toFixed(1) || '0'
      };

      // Send to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error('Failed to save lead');
      }

      // Set results and show them
      setResults(matchedPrograms);
      setShowResults(true);
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('There was an error saving your information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render current page
  const renderCurrentPage = () => {
    const currentPageQuestions = questionPages[step];

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        {currentPageQuestions.map((question) => {
          // Update regions options if this is the regions question
          const questionOptions = question.id === 'regions'
            ? getAvailableCountries().map(country => ({
              value: country,
              label: country
            }))
            : question.options || [];

          return (
            <div key={question.id} className="mb-8 last:mb-0">
              <h2 className="text-xl font-bold mb-4">{question.question}</h2>

              <div className="space-y-3">
                {question.type === 'text' ? (
                  <div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={userResponses[question.id] as string}
                      onChange={(e) => handleChange(question.id, e.target.value)}
                      placeholder={question.placeholder}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                ) : (
                  questionOptions.map((option) => {
                    if (question.type === 'checkbox') {
                      const isSelected = (userResponses[question.id] as string[])?.includes(option.value);
                      return (
                        <div key={`${question.id}-${option.value}`} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`${question.id}-${option.value}`}
                            checked={isSelected}
                            onChange={() => handleChange(question.id, option.value, true)}
                            className="h-4 w-4 text-blue-600"
                          />
                          <label htmlFor={`${question.id}-${option.value}`} className="ml-2">
                            {option.label}
                          </label>
                        </div>
                      );
                    } else {
                      const isSelected = userResponses[question.id] === option.value;
                      return (
                        <div key={`${question.id}-${option.value}`} className="flex items-center">
                          <input
                            type="radio"
                            id={`${question.id}-${option.value}`}
                            name={question.id}
                            value={option.value}
                            checked={isSelected}
                            onChange={() => handleChange(question.id, option.value)}
                            className="h-4 w-4 text-blue-600"
                          />
                          <label htmlFor={`${question.id}-${option.value}`} className="ml-2">
                            {option.label}
                          </label>
                        </div>
                      );
                    }
                  })
                )}
              </div>
            </div>
          );
        })}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={step === 0}
            className={`px-4 py-2 rounded ${step === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-green-700 text-white rounded"
          >
            {step === questionPages.length - 1 ? 'Get My Results' : 'Next'}
          </button>
        </div>
      </div>
    );
  };

  // Add phone collection component
  const renderPhoneForm = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">One Last Step!</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Enter your phone number to view your personalized program matches
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                +91
              </span>
              <input
                type="tel"
                id="phone"
                value={userResponses.phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setUserResponses(prev => ({ ...prev, phoneNumber: value }));
                }}
                placeholder="Enter your 10-digit number"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                maxLength={10}
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              We'll send program details and counseling session information to this number
            </p>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setShowPhoneForm(false)}
              className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={handlePhoneSubmit}
              className="px-4 py-2 bg-green-700 text-white rounded text-sm font-medium hover:bg-green-800"
            >
              View My Matches
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render results
  const renderResults = () => {
    console.log('Rendering results:', results);
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Your Personalized Program Matches</h2>
          <p className="text-sm text-gray-600">
            Results sent to: +91 {userResponses.phoneNumber}
          </p>
        </div>

        {results.length === 0 ? (
          <div>
            <p>No matching programs found based on your preferences.</p>
            <p className="mt-4 text-sm text-gray-600">Debug info:</p>
            <pre className="mt-2 p-4 bg-gray-100 rounded">
              {JSON.stringify({
                userResponses,
                resultsCount: results.length,
                courseDataCount: courseData.length,
                maxPossibleScore: 22.5
              }, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                Showing programs in the top 20% of matches. Maximum possible match score is 22.5.
              </p>
            </div>

            {results.map((program, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="secondary" className="text-base sm:text-lg font-bold">
                      #{index + 1}
                    </Badge>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
                      {program['Abroad University'] || 'Unnamed Program'}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center text-gray-700 mb-2 text-sm sm:text-base">
                        <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="font-medium">Course:</span>
                        <span className="ml-2 truncate">{program['Abroad Course Name'] || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center text-gray-700 mb-2 text-sm sm:text-base">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="font-medium">Location:</span>
                        <span className="ml-2">{program.country || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center text-gray-700 text-sm sm:text-base">
                        <GraduationCap className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="font-medium">Degree:</span>
                        <span className="ml-2">{program['Abroad Course Type'] || 'Not specified'}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-gray-700 mb-2 text-sm sm:text-base">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="font-medium">Duration:</span>
                        <span className="ml-2">{program['Abroad Course Duration'] || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center text-gray-700 mb-2 text-sm sm:text-base">
                        <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="font-medium">Fee:</span>
                        <span className="ml-2">{formatCurrency(program['Total Course Fee (INR)'])}</span>
                        <span className="text-xs sm:text-sm text-gray-500 ml-2">
                          (Original: {program['Abroad Course Fee']})
                        </span>
                      </div>
                      <div className="flex items-center text-sm sm:text-base">
                        <TrendingUp className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                        <span className="font-medium">Match Score:</span>
                        <span className="ml-2 font-semibold text-blue-600">
                          {program.score?.toFixed(1) || 'Not scored'}
                        </span>
                        <Badge variant="secondary" className="ml-2 text-xs sm:text-sm">
                          {(program.score ? (program.score / 22.5 * 100).toFixed(0) : 0)}% match
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={resetQuiz}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="ml-2 text-xl font-bold">
      <h1 className="text-3xl font-bold text-center text-white mb-6 bg-gradient-to-r from-blue-600 to-green-600 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-4">
        International Master's Degree Finder
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4">Loading programs...</p>
          </div>
        </div>
      ) : showResults ? (
        renderResults()
      ) : showPhoneForm ? (
        renderPhoneForm()
      ) : (
        <div>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              {questionPages.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 mx-1 rounded-full ${i <= step ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                ></div>
              ))}
            </div>
            <p className="text-center text-sm">
              Question {step + 1} of {questionPages.length}
            </p>
          </div>

          {renderCurrentPage()}
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          🔒 Your information is completely secure and confidential
        </p>
      </div>

    </div>
  );
}