// src/modules/Students/ResourceCard.jsx
import {
  FaBook,
  FaVideo,
  FaFileAlt,
  FaChartBar,
  FaPlayCircle,
  FaCalendar,
  FaDownload,
  FaHeadset,
} from 'react-icons/fa';

const ResourceCard = ({
  title,
  description,
  icon = <FaBook />,
  clickable = true,
  onClick = () => {},
}) => {
  const IconComponent = () => {
    if (typeof icon === 'string') {
      switch (icon) {
        case 'book':
          return <FaBook />;
        case 'video':
          return <FaVideo />;
        case 'file':
          return <FaFileAlt />;
        case 'chart':
          return <FaChartBar />;
        case 'play':
          return <FaPlayCircle />;
        case 'calendar':
          return <FaCalendar />;
        case 'download':
          return <FaDownload />;
        case 'headset':
          return <FaHeadset />;
        default:
          return <FaBook />;
      }
    }
    return icon;
  };

  return (
    <div
      className={`group bg-white rounded-lg px-4 py-3.5 text-center shadow-sm border border-gray-100 transition-all duration-200 ${
        clickable
          ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:border-orange-200'
          : 'cursor-default'
      }`}
      onClick={onClick}
    >
      {/* Icon circle */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2.5 text-lg ${
          clickable
            ? 'bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        <IconComponent />
      </div>

      {/* Heading with color */}
      <h4
        className={`font-semibold text-sm mb-1.5 ${
          clickable
            ? 'text-gray-800 group-hover:text-orange-600'
            : 'text-gray-800'
        }`}
      >
        {title}
      </h4>

      <p className="text-xs text-gray-600 leading-snug">{description}</p>
    </div>
  );
};

export default ResourceCard;
