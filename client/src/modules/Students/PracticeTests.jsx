// src/components/PracticeTestsContent.jsx
import { useState } from 'react';
import { FaPlay, FaClock, FaQuestionCircle, FaFire, FaStar, FaChartLine, FaFlask, FaAtom, FaDna, FaBook, FaCalculator } from 'react-icons/fa';

const PracticeTestsContent = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Tests' },
    { id: 'physics', label: 'Physics' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'biology', label: 'Biology' },
    { id: 'mathematics', label: 'Mathematics' },
    { id: 'mixed', label: 'Mixed' },
  ];

  const tests = [
    {
      id: 1,
      title: 'Physics - Thermodynamics',
      category: 'physics',
      description: 'Advanced thermodynamics concepts including laws, heat transfer, and entropy',
      questions: 25,
      duration: '45 min',
      difficulty: 'hard',
      icon: <FaFire />,
      taken: 1245,
      rating: 4.8,
      isNew: false,
    },
    {
      id: 2,
      title: 'Chemistry - Organic Compounds',
      category: 'chemistry',
      description: 'Nomenclature, reactions and properties of organic compounds',
      questions: 20,
      duration: '35 min',
      difficulty: 'medium',
      icon: <FaFlask />,
      taken: 1890,
      rating: 4.6,
      isNew: true,
    },
    {
      id: 3,
      title: 'Biology - Genetics',
      category: 'biology',
      description: 'Mendelian genetics, DNA replication, and genetic disorders',
      questions: 30,
      duration: '50 min',
      difficulty: 'medium',
      icon: <FaDna />,
      taken: 1567,
      rating: 4.7,
      isNew: false,
    },
    {
      id: 4,
      title: 'Physics - Mechanics',
      category: 'physics',
      description: 'Motion, forces, energy, and momentum',
      questions: 25,
      duration: '40 min',
      difficulty: 'easy',
      icon: <FaAtom />,
      taken: 2100,
      rating: 4.5,
      isNew: false,
    },
    {
      id: 5,
      title: 'Chemistry - Stoichiometry',
      category: 'chemistry',
      description: 'Chemical equations, mole concept, and limiting reagents',
      questions: 22,
      duration: '38 min',
      difficulty: 'medium',
      icon: <FaCalculator />,
      taken: 1432,
      rating: 4.4,
      isNew: true,
    },
    {
      id: 6,
      title: 'NSO Mock Test - Full',
      category: 'mixed',
      description: 'Complete NSO pattern mock test with all subjects',
      questions: 60,
      duration: '120 min',
      difficulty: 'hard',
      icon: <FaBook />,
      taken: 890,
      rating: 4.9,
      isNew: false,
    },
    {
      id: 7,
      title: 'Biology - Cell Biology',
      category: 'biology',
      description: 'Cell structure, organelles, and cellular processes',
      questions: 28,
      duration: '45 min',
      difficulty: 'easy',
      icon: <FaDna />,
      taken: 1765,
      rating: 4.3,
      isNew: false,
    },
    {
      id: 8,
      title: 'Mathematics - Calculus',
      category: 'mathematics',
      description: 'Differential and integral calculus problems',
      questions: 24,
      duration: '55 min',
      difficulty: 'hard',
      icon: <FaChartLine />,
      taken: 1120,
      rating: 4.7,
      isNew: true,
    },
  ];

  const filteredTests = tests.filter(test => {
    const matchesCategory = activeCategory === 'all' || test.category === activeCategory;
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startRandomTest = () => {
    const randomTest = tests[Math.floor(Math.random() * tests.length)];
    alert(`Starting random test: ${randomTest.title}`);
    // In real app, navigate to test interface
  };

  const startTest = (testId) => {
    const test = tests.find(t => t.id === testId);
    alert(`Starting test: ${test.title}\n\nDuration: ${test.duration}\nQuestions: ${test.questions}`);
    // In real app, navigate to test interface
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Practice Tests</h1>
          <p className="text-gray-600 mt-1">Take practice tests to improve your skills and track progress</p>
        </div>
        <button 
          onClick={startRandomTest}
          className="btn-primary flex items-center px-5 py-3"
        >
          <FaPlay className="mr-2" />
          Start Random Test
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaStar className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tests by title, topic, or keyword..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-5 py-2.5 rounded-full border-2 transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-primary border-primary text-white shadow-md'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Test Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
              <FaQuestionCircle className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Tests</p>
              <h3 className="text-2xl font-bold text-gray-800">{tests.length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mr-3">
              <FaClock className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Duration</p>
              <h3 className="text-2xl font-bold text-gray-800">48 min</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
              <FaFire className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <h3 className="text-2xl font-bold text-gray-800">8</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mr-3">
              <FaChartLine className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Score</p>
              <h3 className="text-2xl font-bold text-gray-800">88%</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <div key={test.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Test Header */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3">
                    {test.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{test.title}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor(test.difficulty)}`}>
                      {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
                    </span>
                  </div>
                </div>
                {test.isNew && (
                  <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm">{test.description}</p>
            </div>

            {/* Test Details */}
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{test.questions}</div>
                  <div className="text-xs text-gray-600">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{test.duration}</div>
                  <div className="text-xs text-gray-600">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{test.taken.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Taken</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{test.rating}</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => startTest(test.id)}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  <FaPlay className="mr-2" />
                  Start Test
                </button>
                <button className="px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300">
                  Preview
                </button>
              </div>

              {/* Progress if taken before */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Your Best Score</span>
                  <span className="font-semibold text-gray-800">
                    {test.id % 3 === 0 ? '92%' : test.id % 3 === 1 ? '85%' : '78%'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      test.id % 3 === 0 ? 'bg-green-500' : 
                      test.id % 3 === 1 ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                    style={{ width: test.id % 3 === 0 ? '92%' : test.id % 3 === 1 ? '85%' : '78%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredTests.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaBook className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No tests found</h3>
          <p className="text-gray-600 mb-6">Try a different category or search term</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="btn-primary"
          >
            View All Tests
          </button>
        </div>
      )}

      {/* Quick Tips Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📚 Test Preparation Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Time Management</h4>
            <p className="text-sm text-gray-600">Allocate time per question and leave 5 minutes for review</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Focus on Weak Areas</h4>
            <p className="text-sm text-gray-600">Use analytics to identify and improve weak topics</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Regular Practice</h4>
            <p className="text-sm text-gray-600">Take at least 2-3 tests per week for consistent improvement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeTestsContent;