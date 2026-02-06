// src/modules/Students/ResourceCard.jsx
import { FaBook, FaVideo, FaFileAlt, FaChartBar, FaPlayCircle, FaCalendar, FaDownload, FaHeadset } from 'react-icons/fa';

const ResourceCard = ({ 
  title, 
  description, 
  icon = <FaBook />,
  clickable = true,
  onClick = () => {}
}) => {
  const IconComponent = () => {
    // Return the actual icon component if it's passed as a prop
    if (typeof icon === 'string') {
      switch(icon) {
        case 'book': return <FaBook />;
        case 'video': return <FaVideo />;
        case 'file': return <FaFileAlt />;
        case 'chart': return <FaChartBar />;
        case 'play': return <FaPlayCircle />;
        case 'calendar': return <FaCalendar />;
        case 'download': return <FaDownload />;
        case 'headset': return <FaHeadset />;
        default: return <FaBook />;
      }
    }
    return icon;
  };

  return (
    <div 
      className={`bg-white rounded-xl p-5 text-center shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg cursor-pointer ${
        clickable ? 'hover:bg-primary hover:text-white' : ''
      }`}
      onClick={onClick}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl ${
        clickable ? 'bg-primary/10 text-primary group-hover:bg-white group-hover:text-primary' : 'bg-gray-100 text-gray-600'
      }`}>
        <IconComponent />
      </div>
      <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default ResourceCard;