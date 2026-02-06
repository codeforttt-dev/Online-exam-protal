// src/components/StudyMaterialsContent.jsx
import { useState, useEffect } from 'react';
import {
  FaBook,
  FaVideo,
  FaFilePdf,
  FaFileAlt,
  FaDownload,
  FaSearch,
  FaFilter,
  FaBookOpen,
  FaChartBar,
  FaLaptopCode,
  FaMicroscope,
  FaAtom,
  FaFlask,
  FaDna,
  FaCalculator,
  FaStar,
  FaClock,
  FaEye,
  FaBookmark,
  FaShareAlt,
} from 'react-icons/fa';

// simple count-up hook
const useCountUp = (target, duration = 1000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const num = typeof target === 'number' ? target : parseFloat(String(target)) || 0;
    if (num === 0) {
      setValue(0);
      return;
    }
    const stepTime = 16;
    const totalSteps = Math.round(duration / stepTime);
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const progress = currentStep / totalSteps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = num * eased;
      setValue(currentValue);
      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setValue(num);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return value;
};

const StudyMaterialsContent = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedItems, setBookmarkedItems] = useState([1, 3, 7]);

  // featured view: card/table
  const [featuredView, setFeaturedView] = useState('card'); // 'card' | 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6; // featured materials per page (card/table dono ke liye)

  // Categories
  const categories = [
    { id: 'all', label: 'All Materials', icon: <FaBook />, count: 48 },
    { id: 'textbook', label: 'Textbooks', icon: <FaBookOpen />, count: 12 },
    { id: 'videos', label: 'Video Lectures', icon: <FaVideo />, count: 25 },
    { id: 'papers', label: 'Practice Papers', icon: <FaFileAlt />, count: 8 },
    { id: 'notes', label: 'Study Notes', icon: <FaFilePdf />, count: 15 },
    { id: 'quizzes', label: 'Interactive Quizzes', icon: <FaLaptopCode />, count: 10 },
  ];

  // Subjects
  const subjects = [
    { id: 'physics', label: 'Physics', icon: <FaAtom />, color: 'bg-red-100 text-red-800' },
    { id: 'chemistry', label: 'Chemistry', icon: <FaFlask />, color: 'bg-blue-100 text-blue-800' },
    { id: 'biology', label: 'Biology', icon: <FaDna />, color: 'bg-green-100 text-green-800' },
    { id: 'mathematics', label: 'Mathematics', icon: <FaCalculator />, color: 'bg-purple-100 text-purple-800' },
    { id: 'mixed', label: 'Mixed', icon: <FaMicroscope />, color: 'bg-orange-100 text-orange-800' },
  ];

  // Study Materials Data
  const studyMaterials = [
    {
      id: 1,
      title: 'Advanced Physics Concepts',
      description:
        'Complete guide to modern physics including quantum mechanics and relativity',
      type: 'textbook',
      subject: 'physics',
      format: 'PDF',
      pages: 350,
      duration: null,
      rating: 4.8,
      downloads: 1245,
      author: 'Dr. Robert Chen',
      level: 'Advanced',
      addedDate: 'Feb 10, 2026',
      isNew: true,
      isFeatured: true,
    },
    {
      id: 2,
      title: 'Organic Chemistry Video Series',
      description: '50+ videos covering organic reactions, mechanisms, and synthesis',
      type: 'videos',
      subject: 'chemistry',
      format: 'Video Series',
      pages: null,
      duration: '15 hours',
      rating: 4.9,
      downloads: 1890,
      author: 'Prof. Sarah Wilson',
      level: 'Intermediate',
      addedDate: 'Feb 5, 2026',
      isNew: true,
      isFeatured: false,
    },
    {
      id: 3,
      title: 'NSO Previous Year Papers',
      description: 'Last 5 years question papers with detailed solutions',
      type: 'papers',
      subject: 'mixed',
      format: 'PDF',
      pages: 180,
      duration: null,
      rating: 4.7,
      downloads: 2100,
      author: 'NSO Committee',
      level: 'All Levels',
      addedDate: 'Jan 28, 2026',
      isNew: false,
      isFeatured: true,
    },
    {
      id: 4,
      title: 'Genetics Study Notes',
      description: 'Comprehensive notes on Mendelian and molecular genetics',
      type: 'notes',
      subject: 'biology',
      format: 'PDF',
      pages: 85,
      duration: null,
      rating: 4.5,
      downloads: 1567,
      author: 'Dr. Michael Park',
      level: 'Intermediate',
      addedDate: 'Jan 25, 2026',
      isNew: false,
      isFeatured: false,
    },
    {
      id: 5,
      title: 'Calculus Interactive Quizzes',
      description:
        'Interactive quizzes with instant feedback on differential and integral calculus',
      type: 'quizzes',
      subject: 'mathematics',
      format: 'Interactive',
      pages: null,
      duration: '8 hours',
      rating: 4.6,
      downloads: 1120,
      author: 'Math Academy',
      level: 'Advanced',
      addedDate: 'Jan 20, 2026',
      isNew: false,
      isFeatured: false,
    },
    {
      id: 6,
      title: 'Thermodynamics Complete Course',
      description: 'From basics to advanced concepts with solved examples',
      type: 'textbook',
      subject: 'physics',
      format: 'PDF + Videos',
      pages: 220,
      duration: '10 hours',
      rating: 4.7,
      downloads: 1432,
      author: 'Dr. James Miller',
      level: 'Intermediate',
      addedDate: 'Jan 15, 2026',
      isNew: false,
      isFeatured: true,
    },
    {
      id: 7,
      title: 'Chemical Bonding Masterclass',
      description: 'Deep dive into ionic, covalent, and metallic bonding',
      type: 'videos',
      subject: 'chemistry',
      format: 'Video Series',
      pages: null,
      duration: '12 hours',
      rating: 4.8,
      downloads: 1345,
      author: 'Prof. Lisa Chen',
      level: 'Advanced',
      addedDate: 'Jan 10, 2026',
      isNew: false,
      isFeatured: false,
    },
    {
      id: 8,
      title: 'Cell Biology Quick Notes',
      description: 'Concise notes on cell structure and functions',
      type: 'notes',
      subject: 'biology',
      format: 'PDF',
      pages: 45,
      duration: null,
      rating: 4.4,
      downloads: 987,
      author: 'Bio Learning',
      level: 'Beginner',
      addedDate: 'Jan 5, 2026',
      isNew: false,
      isFeatured: false,
    },
    {
      id: 9,
      title: 'Probability & Statistics Guide',
      description: 'Complete guide to probability theory and statistical methods',
      type: 'textbook',
      subject: 'mathematics',
      format: 'PDF',
      pages: 180,
      duration: null,
      rating: 4.5,
      downloads: 876,
      author: 'Dr. Alex Johnson',
      level: 'Intermediate',
      addedDate: 'Dec 28, 2025',
      isNew: false,
      isFeatured: false,
    },
    {
      id: 10,
      title: 'NSO 2025 Analysis Report',
      description: 'Detailed analysis of NSO 2025 questions and trends',
      type: 'papers',
      subject: 'mixed',
      format: 'PDF',
      pages: 95,
      duration: null,
      rating: 4.6,
      downloads: 1543,
      author: 'NSO Research Team',
      level: 'All Levels',
      addedDate: 'Dec 20, 2025',
      isNew: false,
      isFeatured: true,
    },
  ];

  // Stats
  const stats = {
    totalMaterials: 48,
    totalDownloads: 15430,
    averageRating: 4.7,
    newThisMonth: 8,
  };

  const totalMaterialsCount = useCountUp(stats.totalMaterials);
  const totalDownloadsCount = useCountUp(stats.totalDownloads);
  const averageRatingCount = useCountUp(stats.averageRating);
  const newThisMonthCount = useCountUp(stats.newThisMonth);

  // Filter materials
  const filteredMaterials = studyMaterials.filter((material) => {
    const matchesCategory =
      activeCategory === 'all' || material.type === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      material.title.toLowerCase().includes(q) ||
      material.description.toLowerCase().includes(q) ||
      material.author.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Pagination reset on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // Featured subset with pagination
  const featuredMaterials = filteredMaterials.filter((m) => m.isFeatured);
  const totalPages =
    Math.ceil(featuredMaterials.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPageItems = featuredMaterials.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  // Get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case 'textbook':
        return <FaBookOpen className="text-base" />;
      case 'videos':
        return <FaVideo className="text-base" />;
      case 'papers':
        return <FaFileAlt className="text-base" />;
      case 'notes':
        return <FaFilePdf className="text-base" />;
      case 'quizzes':
        return <FaLaptopCode className="text-base" />;
      default:
        return <FaBook className="text-base" />;
    }
  };

  // Get type color
  const getTypeColor = (type) => {
    switch (type) {
      case 'textbook':
        return 'bg-blue-100 text-blue-600';
      case 'videos':
        return 'bg-red-100 text-red-600';
      case 'papers':
        return 'bg-green-100 text-green-600';
      case 'notes':
        return 'bg-purple-100 text-purple-600';
      case 'quizzes':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Toggle bookmark
  const toggleBookmark = (id) => {
    setBookmarkedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  // Handle download
  const handleDownload = (material) => {
    alert(`Downloading: ${material.title}\nFormat: ${material.format}`);
  };

  // Handle preview
  const handlePreview = (material) => {
    alert(
      `Previewing: ${material.title}\n\nDescription: ${material.description}\nAuthor: ${material.author}`,
    );
  };

  // Handle share
  const handleShare = (material) => {
    alert(`Share: ${material.title}\n\nShare link would be generated here.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Study Materials
          </h1>
          <p className="text-gray-600 mt-1">
            Access comprehensive study resources, textbooks, videos, and practice materials
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-sm">
            <FaDownload className="mr-2" />
            Download All
          </button>
        </div>
      </div>

      {/* Stats Cards (compact + animated) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-orange-500" />
          <div className="w-11 h-11 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center mr-3">
            <FaBook />
          </div>
          <div>
            <p className="text-xs text-gray-600">Total Materials</p>
            <h3 className="text-xl font-bold text-gray-800">
              {totalMaterialsCount.toFixed(0)}
            </h3>
          </div>
        </div>
        <div className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-green-500" />
          <div className="w-11 h-11 rounded-lg bg-green-50 text-green-600 flex items-center justify-center mr-3">
            <FaDownload />
          </div>
          <div>
            <p className="text-xs text-gray-600">Total Downloads</p>
            <h3 className="text-xl font-bold text-gray-800">
              {totalDownloadsCount.toFixed(0).toLocaleString()}
            </h3>
          </div>
        </div>
        <div className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-yellow-500" />
          <div className="w-11 h-11 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center mr-3">
            <FaStar />
          </div>
          <div>
            <p className="text-xs text-gray-600">Avg. Rating</p>
            <h3 className="text-xl font-bold text-gray-800">
              {averageRatingCount.toFixed(1)}/5.0
            </h3>
          </div>
        </div>
        <div className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-red-500" />
          <div className="w-11 h-11 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mr-3">
            <FaClock />
          </div>
          <div>
            <p className="text-xs text-gray-600">New This Month</p>
            <h3 className="text-xl font-bold text-gray-800">
              {newThisMonthCount.toFixed(0)}
            </h3>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search materials by title, author, or topic..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
            <FaFilter className="mr-2" />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <FaFilter className="text-gray-500 mr-2" />
          <h3 className="font-semibold text-gray-700 text-sm">
            Browse by Category
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 ${
                activeCategory === category.id
                  ? 'border-orange-500 bg-orange-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-1.5 ${
                  activeCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {category.icon}
              </div>
              <span className="font-medium text-xs text-gray-800 text-center">
                {category.label}
              </span>
              <span className="text-[11px] text-gray-500 mt-0.5">
                {category.count} items
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Subjects */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-4 text-sm">
          Browse by Subject
        </h3>
        <div className="flex flex-wrap gap-3">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              className={`flex items-center px-4 py-1.5 rounded-full ${subject.color} hover:opacity-90 transition-opacity text-xs md:text-sm`}
              onClick={() => {
                alert(`Filtering by ${subject.label} would be implemented here`);
              }}
            >
              <span className="mr-2 text-sm">{subject.icon}</span>
              <span className="font-medium">{subject.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Materials with Card/Table toggle + pagination */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Featured Materials
            </h3>
            <p className="text-xs text-gray-500">
              Highlighted resources based on importance and recency
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden text-xs">
              <button
                className={`px-3 py-1.5 font-medium ${
                  featuredView === 'card'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700'
                }`}
                onClick={() => setFeaturedView('card')}
              >
                Cards
              </button>
              <button
                className={`px-3 py-1.5 font-medium ${
                  featuredView === 'table'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700'
                }`}
                onClick={() => setFeaturedView('table')}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Showing {currentPageItems.length} of {featuredMaterials.length} featured
          materials
        </p>

        {featuredMaterials.length > 0 ? (
          featuredView === 'card' ? (
            // Compact Card Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {currentPageItems.map((material) => (
                <div
                  key={material.id}
                  className={`relative bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-xs md:text-sm`}
                >
                  {/* accent strip */}
                  <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-orange-500" />

                  <div className="p-4">
                    {/* Header row */}
                    <div className="flex justify-between items-start mb-2.5">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center mr-2 ${getTypeColor(
                            material.type,
                          )}`}
                        >
                          {getTypeIcon(material.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-1">
                              {material.title}
                            </h3>
                            {material.isNew && (
                              <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                NEW
                              </span>
                            )}
                            {material.isFeatured && (
                              <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                FEATURED
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mt-0.5">
                            <span
                              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                                material.subject === 'physics'
                                  ? 'bg-red-100 text-red-800'
                                  : material.subject === 'chemistry'
                                  ? 'bg-blue-100 text-blue-800'
                                  : material.subject === 'biology'
                                  ? 'bg-green-100 text-green-800'
                                  : material.subject === 'mathematics'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-orange-100 text-orange-800'
                              }`}
                            >
                              {material.subject.charAt(0).toUpperCase() +
                                material.subject.slice(1)}
                            </span>
                            <span className="text-[10px] text-gray-500 ml-1.5">
                              • {material.level}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleBookmark(material.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          bookmarkedItems.includes(material.id)
                            ? 'text-yellow-500 bg-yellow-50'
                            : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                        }`}
                      >
                        <FaBookmark size={12} />
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs leading-snug mb-3 line-clamp-2">
                      {material.description}
                    </p>

                    {/* Meta grid */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <div className="text-[11px] text-gray-500">Format</div>
                        <div className="text-xs font-medium text-gray-800">
                          {material.format}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] text-gray-500">
                          {material.type === 'videos' ||
                          material.type === 'quizzes'
                            ? 'Duration'
                            : 'Pages'}
                        </div>
                        <div className="text-xs font-medium text-gray-800">
                          {material.type === 'videos' ||
                          material.type === 'quizzes'
                            ? material.duration
                            : `${material.pages} pages`}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] text-gray-500">Author</div>
                        <div className="text-xs font-medium text-gray-800 line-clamp-1">
                          {material.author}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] text-gray-500">Added</div>
                        <div className="text-xs font-medium text-gray-800">
                          {material.addedDate}
                        </div>
                      </div>
                    </div>

                    {/* Rating & downloads */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className="flex text-yellow-500 mr-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(material.rating)
                                  ? 'fill-current'
                                  : 'fill-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium text-gray-800">
                          {material.rating}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-600">
                        <FaDownload className="inline mr-1" />
                        {material.downloads.toLocaleString()} downloads
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownload(material)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1.5 rounded-md transition-colors duration-200 flex items-center justify-center text-xs"
                      >
                        <FaDownload className="mr-1.5" />
                        Download
                      </button>
                      <button
                        onClick={() => handlePreview(material)}
                        className="px-2.5 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-xs"
                        title="Preview"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleShare(material)}
                        className="px-2.5 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-xs"
                        title="Share"
                      >
                        <FaShareAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Table View
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs md:text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                        Material
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                        Format
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                        Size/Duration
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                        Rating
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                        Downloads
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700 whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentPageItems.map((material, idx) => (
                      <tr
                        key={material.id}
                        className={`transition-colors ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
                        } hover:bg-orange-50`}
                      >
                        {/* Material name + author */}
                        <td className="px-4 py-3 align-middle">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(
                                material.type,
                              )}`}
                            >
                              {getTypeIcon(material.type)}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800 text-sm leading-snug line-clamp-1">
                                {material.title}
                              </div>
                              <div className="text-[11px] text-gray-500 line-clamp-1">
                                {material.author}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="px-4 py-3 align-middle">
                          <span className="text-xs text-gray-700 capitalize">
                            {material.type}
                          </span>
                        </td>

                        {/* Subject */}
                        <td className="px-4 py-3 align-middle">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                              material.subject === 'physics'
                                ? 'bg-red-100 text-red-800'
                                : material.subject === 'chemistry'
                                ? 'bg-blue-100 text-blue-800'
                                : material.subject === 'biology'
                                ? 'bg-green-100 text-green-800'
                                : material.subject === 'mathematics'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {material.subject.charAt(0).toUpperCase() +
                              material.subject.slice(1)}
                          </span>
                        </td>

                        {/* Format */}
                        <td className="px-4 py-3 align-middle">
                          <span className="text-xs text-gray-700">
                            {material.format}
                          </span>
                        </td>

                        {/* Size/Duration */}
                        <td className="px-4 py-3 align-middle">
                          <span className="text-xs text-gray-700">
                            {material.type === 'videos' ||
                            material.type === 'quizzes'
                              ? material.duration
                              : `${material.pages} pages`}
                          </span>
                        </td>

                        {/* Rating */}
                        <td className="px-4 py-3 align-middle">
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-500" size={12} />
                            <span className="text-xs font-medium text-gray-800">
                              {material.rating}
                            </span>
                          </div>
                        </td>

                        {/* Downloads */}
                        <td className="px-4 py-3 align-middle">
                          <span className="text-xs text-gray-700">
                            {material.downloads.toLocaleString()}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3 align-middle text-right">
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => handlePreview(material)}
                              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Preview"
                            >
                              <FaEye size={12} />
                            </button>
                            <button
                              onClick={() => handleDownload(material)}
                              className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                              title="Download"
                            >
                              <FaDownload size={12} />
                            </button>
                            <button
                              onClick={() => handleShare(material)}
                              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Share"
                            >
                              <FaShareAlt size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-xs md:text-sm">
                <div className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((p) => Math.max(1, p - 1))
                    }
                    className={`px-3 py-1.5 rounded-lg border ${
                      currentPage === 1
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    className={`px-3 py-1.5 rounded-lg border ${
                      currentPage === totalPages
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-sm text-gray-600">
            No featured materials found.
          </div>
        )}

        {/* Pagination controls for card view */}
        {featuredView === 'card' && featuredMaterials.length > 0 && (
          <div className="flex items-center justify-between mt-2 text-xs md:text-sm">
            <div className="text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={`px-3 py-1.5 rounded-lg border ${
                  currentPage === 1
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className={`px-3 py-1.5 rounded-lg border ${
                  currentPage === totalPages
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recommended Study Path */}
      {/* (rest of your existing sections can stay same, unchanged) */}
      {/* ... Download Progress block bhi same hi reh sakta hai ... */}
    </div>
  );
};

export default StudyMaterialsContent;
