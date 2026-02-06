// src/components/StudyMaterialsContent.jsx
import { useState } from 'react';
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
  FaShareAlt
} from 'react-icons/fa';

const StudyMaterialsContent = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedItems, setBookmarkedItems] = useState([1, 3, 7]);

  // Categories
  const categories = [
    { id: 'all', label: 'All Materials', icon: <FaBook />, count: 48 },
    { id: 'textbooks', label: 'Textbooks', icon: <FaBookOpen />, count: 12 },
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
      description: 'Complete guide to modern physics including quantum mechanics and relativity',
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
      description: 'Interactive quizzes with instant feedback on differential and integral calculus',
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

  // Filter materials
  const filteredMaterials = studyMaterials.filter(material => {
    const matchesCategory = activeCategory === 'all' || material.type === activeCategory;
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Stats
  const stats = {
    totalMaterials: 48,
    totalDownloads: 15430,
    averageRating: 4.7,
    newThisMonth: 8,
  };

  // Get type icon
  const getTypeIcon = (type) => {
    switch(type) {
      case 'textbook': return <FaBookOpen className="text-xl" />;
      case 'videos': return <FaVideo className="text-xl" />;
      case 'papers': return <FaFileAlt className="text-xl" />;
      case 'notes': return <FaFilePdf className="text-xl" />;
      case 'quizzes': return <FaLaptopCode className="text-xl" />;
      default: return <FaBook className="text-xl" />;
    }
  };

  // Get type color
  const getTypeColor = (type) => {
    switch(type) {
      case 'textbook': return 'bg-blue-100 text-blue-600';
      case 'videos': return 'bg-red-100 text-red-600';
      case 'papers': return 'bg-green-100 text-green-600';
      case 'notes': return 'bg-purple-100 text-purple-600';
      case 'quizzes': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Toggle bookmark
  const toggleBookmark = (id) => {
    setBookmarkedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Handle download
  const handleDownload = (material) => {
    alert(`Downloading: ${material.title}\nFormat: ${material.format}`);
    // In real app, implement download functionality
  };

  // Handle preview
  const handlePreview = (material) => {
    alert(`Previewing: ${material.title}\n\nDescription: ${material.description}\nAuthor: ${material.author}`);
    // In real app, open preview modal
  };

  // Handle share
  const handleShare = (material) => {
    alert(`Share: ${material.title}\n\nShare link would be generated here.`);
    // In real app, implement sharing functionality
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Study Materials</h1>
          <p className="text-gray-600 mt-1">Access comprehensive study resources, textbooks, videos, and practice materials</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-primary flex items-center">
            <FaDownload className="mr-2" />
            Download All
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3">
              <FaBook />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Materials</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalMaterials}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mr-3">
              <FaDownload />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Downloads</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalDownloads.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
              <FaStar />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Rating</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.averageRating}/5.0</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mr-3">
              <FaClock />
            </div>
            <div>
              <p className="text-sm text-gray-600">New This Month</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.newThisMonth}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search materials by title, author, or topic..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <FaFilter className="mr-2" />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center mb-4">
          <FaFilter className="text-gray-500 mr-2" />
          <h3 className="font-semibold text-gray-700">Browse by Category</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 ${
                activeCategory === category.id
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${
                activeCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {category.icon}
              </div>
              <span className="font-medium text-sm text-gray-800">{category.label}</span>
              <span className="text-xs text-gray-500 mt-1">{category.count} items</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subjects */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-gray-700 mb-4">Browse by Subject</h3>
        <div className="flex flex-wrap gap-3">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              className={`flex items-center px-4 py-2 rounded-full ${subject.color} hover:opacity-90 transition-opacity`}
              onClick={() => {
                // Filter by subject
                alert(`Filtering by ${subject.label} would be implemented here`);
              }}
            >
              <span className="mr-2">{subject.icon}</span>
              <span className="font-medium">{subject.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Materials */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Featured Materials</h3>
          <span className="text-sm text-gray-600">{filteredMaterials.length} items found</span>
        </div>

        {/* Materials Grid */}
        {filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <div 
                key={material.id} 
                className={`bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 ${
                  material.isFeatured ? 'ring-2 ring-primary/20' : ''
                }`}
              >
                {/* Material Header */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${getTypeColor(material.type)}`}>
                        {getTypeIcon(material.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-800">{material.title}</h3>
                          {material.isNew && (
                            <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                              NEW
                            </span>
                          )}
                          {material.isFeatured && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                              FEATURED
                            </span>
                          )}
                        </div>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            material.subject === 'physics' ? 'bg-red-100 text-red-800' :
                            material.subject === 'chemistry' ? 'bg-blue-100 text-blue-800' :
                            material.subject === 'biology' ? 'bg-green-100 text-green-800' :
                            material.subject === 'mathematics' ? 'bg-purple-100 text-purple-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {material.subject.charAt(0).toUpperCase() + material.subject.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">• {material.level}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleBookmark(material.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        bookmarkedItems.includes(material.id)
                          ? 'text-yellow-500 bg-yellow-50'
                          : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                      }`}
                    >
                      <FaBookmark />
                    </button>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{material.description}</p>

                  {/* Material Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-sm">
                      <div className="text-gray-500">Format</div>
                      <div className="font-medium text-gray-800">{material.format}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-500">
                        {material.type === 'videos' || material.type === 'quizzes' ? 'Duration' : 'Pages'}
                      </div>
                      <div className="font-medium text-gray-800">
                        {material.type === 'videos' || material.type === 'quizzes' ? material.duration : `${material.pages} pages`}
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-500">Author</div>
                      <div className="font-medium text-gray-800">{material.author}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-500">Added</div>
                      <div className="font-medium text-gray-800">{material.addedDate}</div>
                    </div>
                  </div>

                  {/* Rating and Downloads */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="flex text-yellow-500 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(material.rating) ? 'fill-current' : 'fill-gray-300'} />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{material.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <FaDownload className="inline mr-1" />
                      {material.downloads.toLocaleString()} downloads
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(material)}
                      className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg transition-colors duration-300 flex items-center justify-center"
                    >
                      <FaDownload className="mr-2" />
                      Download
                    </button>
                    <button
                      onClick={() => handlePreview(material)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                      title="Preview"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleShare(material)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300"
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
          /* No Results Message */
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaBook className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No materials found</h3>
            <p className="text-gray-600 mb-6">Try a different category or search term</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="btn-primary"
            >
              View All Materials
            </button>
          </div>
        )}
      </div>

      {/* Recommended Study Path */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📚 Recommended Study Path</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Week 1-2: Physics Focus</h4>
            <ul className="text-sm text-gray-600 space-y-1 mb-3">
              <li>• Complete Thermodynamics Course</li>
              <li>• Watch 5 video lectures</li>
              <li>• Solve 2 practice papers</li>
            </ul>
            <button className="text-primary text-sm font-semibold">Start Path →</button>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Week 3-4: Chemistry Mastery</h4>
            <ul className="text-sm text-gray-600 space-y-1 mb-3">
              <li>• Study Organic Chemistry Series</li>
              <li>• Complete interactive quizzes</li>
              <li>• Review chemical bonding</li>
            </ul>
            <button className="text-primary text-sm font-semibold">Start Path →</button>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Week 5-6: Full Revision</h4>
            <ul className="text-sm text-gray-600 space-y-1 mb-3">
              <li>• Solve previous year papers</li>
              <li>• Review all study notes</li>
              <li>• Take mock tests</li>
            </ul>
            <button className="text-primary text-sm font-semibold">Start Path →</button>
          </div>
        </div>
      </div>

      {/* Download Progress */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Download Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Physics Materials</span>
              <span className="text-sm font-semibold text-gray-800">8/12 downloaded</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '67%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Chemistry Materials</span>
              <span className="text-sm font-semibold text-gray-800">6/10 downloaded</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Biology Materials</span>
              <span className="text-sm font-semibold text-gray-800">4/8 downloaded</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialsContent;