// QuestionBank.jsx
import React, { useState } from 'react';
import Layout from '../adminComponent/layout/layout'; // Import your Layout component
import {
  UsersIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  ClockIcon,
  DocumentPlusIcon,
  CloudArrowUpIcon,
  DocumentArrowDownIcon,
  CheckCircleIcon,
  TrophyIcon,
  Cog6ToothIcon,
  HomeIcon,
  TrashIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  BuildingLibraryIcon,
  PencilIcon,
  PlusIcon,
  FunnelIcon,
  TagIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

function QuestionBank() {
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties');

  const subjects = ['All Subjects', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'];
  const difficulties = ['All Difficulties', 'Easy', 'Medium', 'Hard'];
  const olympiads = ['All Olympiads', 'NSO 2026', 'Chemistry Challenge 2025', 'Physics Olympiad 2026'];

  const questions = [
    {
      id: 1,
      questionNumber: '001',
      subject: 'Physics',
      olympiad: 'NSO 2026',
      addedDate: 'Feb 1, 2026',
      question: 'What is the SI unit of force? Explain the relationship between force, mass, and acceleration according to Newton\'s second law of motion.',
      options: [
        'Newton (N). Force equals mass times acceleration (F = ma).',
        'Joule (J). Force equals mass divided by acceleration.',
        'Watt (W). Force equals mass plus acceleration.',
        'Pascal (Pa). Force equals mass minus acceleration.'
      ],
      correctAnswer: 0,
      difficulty: 'Easy'
    },
    {
      id: 2,
      questionNumber: '002',
      subject: 'Chemistry',
      olympiad: 'Chemistry Challenge 2025',
      addedDate: 'Jan 15, 2026',
      question: 'Calculate the pH of a 0.01 M HCl solution. Show your calculations and explain the concept of pH in relation to hydrogen ion concentration.',
      options: [
        'pH = 1. pH = -log[H+], so -log(0.01) = 2',
        'pH = 2. pH = -log[H+], so -log(0.01) ≈ 2',
        'pH = 12. For strong acids, pH = 14 - pOH',
        'pH = 7. HCl is a strong acid but at low concentration'
      ],
      correctAnswer: 1,
      difficulty: 'Medium'
    },
    {
      id: 3,
      questionNumber: '003',
      subject: 'Physics',
      olympiad: 'NSO 2026',
      addedDate: 'Feb 3, 2026',
      question: 'Define kinetic energy and derive the formula KE = ½ mv². Provide an example of kinetic energy conversion.',
      options: [
        'KE = mv². Energy due to motion.',
        'KE = ½ mv². Work-energy theorem derivation.',
        'KE = mgh. Potential energy conversion.',
        'KE = Fd. Work done by force.'
      ],
      correctAnswer: 1,
      difficulty: 'Hard'
    },
    {
      id: 4,
      questionNumber: '004',
      subject: 'Mathematics',
      olympiad: 'NSO 2026',
      addedDate: 'Feb 5, 2026',
      question: 'Solve the quadratic equation: x² - 5x + 6 = 0. Show all steps and verify your solution.',
      options: [
        'x = 2, x = 3',
        'x = -2, x = -3',
        'x = 1, x = 6',
        'x = 0, x = 5'
      ],
      correctAnswer: 0,
      difficulty: 'Easy'
    },
    {
      id: 5,
      questionNumber: '005',
      subject: 'Biology',
      olympiad: 'Biology Olympiad 2026',
      addedDate: 'Feb 4, 2026',
      question: 'Explain the process of photosynthesis including light-dependent and light-independent reactions.',
      options: [
        'Conversion of light energy to chemical energy in chloroplasts.',
        'Respiration process in mitochondria.',
        'Protein synthesis in ribosomes.',
        'DNA replication in nucleus.'
      ],
      correctAnswer: 0,
      difficulty: 'Medium'
    },
    {
      id: 6,
      questionNumber: '006',
      subject: 'Computer Science',
      olympiad: 'Computer Science Olympiad 2026',
      addedDate: 'Feb 2, 2026',
      question: 'What is the time complexity of binary search algorithm? Explain with an example.',
      options: [
        'O(log n). Divide and conquer approach.',
        'O(n). Linear search complexity.',
        'O(n²). Nested loop complexity.',
        'O(1). Constant time complexity.'
      ],
      correctAnswer: 0,
      difficulty: 'Hard'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubjectColor = (subject) => {
    switch(subject) {
      case 'Physics': return 'bg-blue-100 text-blue-600';
      case 'Chemistry': return 'bg-purple-100 text-purple-600';
      case 'Mathematics': return 'bg-indigo-100 text-indigo-600';
      case 'Biology': return 'bg-green-100 text-green-600';
      case 'Computer Science': return 'bg-amber-100 text-amber-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Layout>
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Question Bank</h1>
          <p className="text-gray-600 mt-2">Manage and organize Olympiad questions</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm hover:shadow">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Question
          </button>
          
          <button className="flex items-center px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <CloudArrowUpIcon className="h-5 w-5 mr-2" />
            Import Questions
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
            Clear Filters
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Subject Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <div className="relative">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none appearance-none"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <div className="relative">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none appearance-none"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Olympiad Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Olympiad</label>
            <div className="relative">
              <select className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none appearance-none">
                {olympiads.map((olympiad) => (
                  <option key={olympiad} value={olympiad}>{olympiad}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Apply Button */}
          <div className="flex items-end">
            <button className="w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all">
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Question Cards */}
      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            {/* Question Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-800">Question #{q.questionNumber}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(q.difficulty)}`}>
                    {q.difficulty}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSubjectColor(q.subject)}`}>
                    {q.subject}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                    {q.olympiad}
                  </span>
                  <span className="text-sm text-gray-500">
                    Added: {q.addedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{q.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {q.options.map((option, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${index === q.correctAnswer ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                >
                  <div className="flex items-start">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                      index === q.correctAnswer ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <p className={`text-gray-700 ${index === q.correctAnswer ? 'font-medium' : ''}`}>
                      {option}
                    </p>
                    {index === q.correctAnswer && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">
                        Correct
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </button>
                
                <button className="flex items-center px-4 py-2 border border-gray-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
              
              <div className="text-sm text-gray-500">
                ID: Q{q.questionNumber}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Questions</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">250</p>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <QuestionMarkCircleIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Questions</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">198</p>
            </div>
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <CheckCircleIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Subjects Covered</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">6</p>
            </div>
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <TagIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">+24</p>
            </div>
            <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
              <PlusIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          Showing 1-6 of 250 questions
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg">
            1
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            3
          </button>
          <span className="px-2 text-gray-500">...</span>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            10
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default QuestionBank;