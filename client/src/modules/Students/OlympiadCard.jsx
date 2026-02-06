// src/modules/Students/OlympiadCard.jsx
import { FaPlayCircle, FaChartBar, FaBookOpen, FaAward, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const OlympiadCard = ({ 
  title, 
  subtitle, 
  status, 
  testsCompleted, 
  currentScore, 
  progress, 
  color = 'from-primary to-primary-dark',
  detailed = false,
  showRank = false,
  rank,
  showFee = false,
  fee,
  paymentStatus,
  certificate,
  performance
}) => {
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'upcoming': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'Active';
      case 'upcoming': return 'Upcoming';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${color} text-white p-5`}>
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="text-sm opacity-90 mt-1">{subtitle}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {getStatusText(status)}
          </span>
        </div>
      </div>
      
      {/* Body */}
      <div className="p-5">
        {/* Info Items */}
        <div className="space-y-3 mb-4">
          {detailed && showRank && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 flex items-center">
                <FaAward className="mr-2" /> Rank:
              </span>
              <span className="font-semibold">{rank}</span>
            </div>
          )}
          
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Tests Completed:</span>
            <span className="font-semibold">{testsCompleted}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">
              {detailed && status === 'Completed' ? 'Final Score:' : 'Current Score:'}
            </span>
            <span className="font-semibold">{currentScore}</span>
          </div>
          
          {detailed && showFee && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Registration Fee:</span>
              <span className="font-semibold">{fee}</span>
            </div>
          )}
          
          {detailed && paymentStatus && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Payment Status:</span>
              <span className="font-semibold text-green-600">{paymentStatus}</span>
            </div>
          )}
          
          {detailed && certificate && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Certificate:</span>
              <span className="font-semibold text-green-600">{certificate}</span>
            </div>
          )}
          
          {detailed && performance && (
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Performance:</span>
              <span className="font-semibold">{performance}</span>
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="mb-5">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">
              {detailed && status === 'Completed' ? 'Final Result' : 'Overall Progress'}
            </span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          {status.toLowerCase() === 'active' ? (
            <>
              <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg transition-colors duration-300 flex items-center justify-center">
                <FaPlayCircle className="mr-2" />
                Continue
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 rounded-lg transition-colors duration-300 flex items-center justify-center">
                <FaChartBar className="mr-2" />
                Analytics
              </button>
            </>
          ) : status.toLowerCase() === 'upcoming' ? (
            <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg transition-colors duration-300 flex items-center justify-center">
              <FaBookOpen className="mr-2" />
              Start Prep
            </button>
          ) : status.toLowerCase() === 'completed' ? (
            <>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 rounded-lg transition-colors duration-300 flex items-center justify-center">
                <FaAward className="mr-2" />
                Certificate
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 rounded-lg transition-colors duration-300 flex items-center justify-center">
                <FaChartBar className="mr-2" />
                Results
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OlympiadCard;