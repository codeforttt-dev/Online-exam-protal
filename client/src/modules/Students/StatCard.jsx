// src/components/StatCard.jsx
const StatCard = ({ title, value, icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary text-white',
    success: 'bg-success text-white',
    info: 'bg-info text-white',
    warning: 'bg-warning text-white',
  };

  return (
    <div className={`stat-card ${color}`}>
      <div className={`w-16 h-16 rounded-xl ${colorClasses[color]} flex items-center justify-center mr-4 text-2xl`}>
        {icon}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        <p className="text-gray-600">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;