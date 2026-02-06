// src/modules/Students/OlympiadCard.jsx
import { FaTrophy, FaCalendarAlt } from 'react-icons/fa';

const OlympiadCard = ({
  title,
  subtitle,
  status,
  testsCompleted,
  currentScore,
  progress,
  // ignore custom "from-primary" etc, we give fallback
  color,
  showRank,
  rank,
  showFee,
  fee,
  paymentStatus,
  certificate,
  performance,
}) => {
  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-400';
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      default:
        return 'bg-gray-400';
    }
  };

  // fallback gradient color same as dashboard
  const headerGradient =
    color === 'blue'
      ? 'from-blue-500 to-blue-600'
      : color === 'green'
      ? 'from-green-500 to-green-600'
      : 'from-orange-500 to-orange-600';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-sm">
      {/* Gradient header */}
      <div className={`bg-gradient-to-r ${headerGradient} px-4 py-2.5 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-xs text-white">
            <FaTrophy />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2">
              {title}
            </h3>
            <p className="text-white/90 text-[11px] mt-0.5 flex items-center gap-1">
              <FaCalendarAlt className="inline-block" />
              <span>{subtitle}</span>
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 bg-white/15 text-white">
          <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(status)}`}></span>
          {status}
        </span>
      </div>

      {/* Body – compact */}
      <div className="px-4 py-3 space-y-3">
        {/* Row: tests + score */}
        <div className="flex justify-between gap-3">
          <div className="flex-1">
            <p className="text-[11px] text-gray-500">Tests Completed</p>
            <p className="text-sm font-semibold text-gray-800">{testsCompleted}</p>
          </div>
          <div className="flex-1 text-right">
            <p className="text-[11px] text-gray-500">Current Score</p>
            <p className="text-sm font-semibold text-gray-800">
              {currentScore}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500">Progress</span>
            <span className="font-semibold text-gray-800">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Extra info pills */}
        {(showRank || showFee || certificate || performance) && (
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            {showRank && rank && (
              <span className="px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 font-semibold">
                Rank {rank}
              </span>
            )}
            {showFee && fee && (
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                Fee: {fee} {paymentStatus ? `• ${paymentStatus}` : ''}
              </span>
            )}
            {certificate && (
              <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                {certificate}
              </span>
            )}
            {performance && (
              <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                {performance}
              </span>
            )}
          </div>
        )}

        {/* Action button – small */}
        <button className="w-full mt-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1.5 rounded-lg text-xs transition-colors">
          {status === 'Active' ? 'Continue Olympiad' : status === 'Upcoming' ? 'View Details' : 'View Performance'}
        </button>
      </div>
    </div>
  );
};

export default OlympiadCard;
