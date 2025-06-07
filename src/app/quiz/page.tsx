"use client";
import { useState, useEffect } from 'react';

import * as Papa from 'papaparse';
import _ from 'lodash';
import * as XLSX from 'xlsx';

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
    expectedScore: ''
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
      question: 'What is your approximate budget for tuition fees?',
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
      question: 'What is your score/expected score? (Enter percentage)',
      type: 'text',
      placeholder: 'Enter your score (e.g., 85)'
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
      let results = calculateResults();
      console.log(results);
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
      maxPossibleScore: 22.5, // Updated max score with new weights
      thresholdScore,
      programsAboveThreshold: sortedPrograms.filter(p => p.score >= thresholdScore).length,
      totalPrograms: sortedPrograms.length
    });
    
    setResults(topPrograms);
    setShowResults(true);
    setLoading(false);
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
      expectedScore: ''
    });
    setStep(0);
    setShowResults(false);
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
                    <p className="text-sm text-gray-500 mt-1">Enter a number between 0 and 100</p>
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
            className={`px-4 py-2 rounded ${
              step === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {step === questionPages.length - 1 ? 'See Results' : 'Next'}
          </button>
        </div>
      </div>
    );
  };

  // Render results
  const renderResults = () => {
    console.log('Rendering results:', results);
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Personalized Program Matches</h2>
        
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
              <div key={index} className="border-b pb-4 last:border-0">
                <h3 className="text-xl font-semibold">
                  {index + 1}. {program['Abroad University'] || 'Unnamed Program'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  <div>
                    <p><span className="font-medium">Course Name:</span> {program['Abroad Course Name'] || 'Not specified'}</p>
                    <p><span className="font-medium">Country:</span> {program.country || 'Not specified'}</p>
                    <p><span className="font-medium">Degree:</span> {program['Abroad Course Type'] || 'Not specified'}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Duration:</span> {program['Abroad Course Duration'] || 'Not specified'}</p>
                    <p>
                      <span className="font-medium">Fee:</span> {formatCurrency(program['Abroad Course Fee'])}
                      <span className="text-sm text-gray-500 ml-2">
                        (Original: {program['Abroad Course Fee']})
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Match Score:</span> {program.score?.toFixed(1) || 'Not scored'}
                      <span className="text-sm text-gray-500 ml-2">
                        ({(program.score ? (program.score / 22.5 * 100).toFixed(0) : 0)}% match)
                      </span>
                    </p>
                  </div>
                </div>
                
                {program['Online Course Name'] && (
                  <div className="mt-2 p-2 bg-blue-50 rounded">
                    <p className="text-sm">
                      <span className="font-medium">Online Component:</span> {program['Online Course Name']} 
                      ({program['Online Course Duration'] || 'Duration not specified'}, 
                      {formatCurrency(program['Online Course Fee'])})
                    </p>
                  </div>
                )}
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
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">International Master's Degree Finder</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4">Loading programs...</p>
          </div>
        </div>
      ) : showResults ? (
        renderResults()
      ) : (
        <div>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              {questionPages.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 mx-1 rounded-full ${
                    i <= step ? 'bg-blue-500' : 'bg-gray-300'
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
    </div>
  );
}