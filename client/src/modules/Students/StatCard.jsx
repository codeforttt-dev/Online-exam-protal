// src/components/StatCard.jsx
import { useEffect, useState } from 'react';

const colorMap = {
  primary: {
    strip: 'bg-orange-500',
    iconBg: 'bg-orange-50 text-orange-500',
  },
  success: {
    strip: 'bg-green-500',
    iconBg: 'bg-green-50 text-green-600',
  },
  info: {
    strip: 'bg-blue-500',
    iconBg: 'bg-blue-50 text-blue-600',
  },
  warning: {
    strip: 'bg-yellow-500',
    iconBg: 'bg-yellow-50 text-yellow-600',
  },
};

// simple number animation
const useCountUp = (target, duration = 1000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const num = typeof target === 'number' ? target : parseFloat(String(target)) || 0;
    const stepTime = 16;
    const totalSteps = Math.round(duration / stepTime);
    let currentStep = 0;

    if (num === 0) {
      setValue(0);
      return;
    }

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

const StatCard = ({ title, value, icon, color = 'primary', suffix = '' }) => {
  const palette = colorMap[color] || colorMap.primary;
  const numericValue =
    typeof value === 'number'
      ? value
      : parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;

  const animated = useCountUp(numericValue);

  return (
    <div className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center">
      {/* left color strip */}
      <div
        className={`absolute left-0 top-0 h-full w-1 rounded-l-xl ${palette.strip}`}
      />

      {/* icon */}
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 text-xl ${palette.iconBg}`}
      >
        {icon}
      </div>

      {/* text */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 leading-tight">
          {Number.isNaN(animated) ? value : `${animated.toFixed(1)}${suffix}`}
        </h3>
        <p className="text-xs text-gray-600 mt-1">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
