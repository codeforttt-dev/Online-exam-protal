import React from "react";
import {
  Layout,
  BarChart3,
  Radio,
  Briefcase,
  Megaphone,
  Zap,
  Heart,
} from "lucide-react";

const examCards = [
  {
    title: "Management",
    desc: "Providing optimized solutions tailored to streamline business operations and team efficiency.",
    icon1: <Layout className="text-purple-600" size={20} />,
    icon2: <BarChart3 className="text-blue-500" size={20} />,
    bgColor: "bg-green-50/60",
  },
  {
    title: "Data Analytics",
    desc: "Processing and interpreting complex data to provide actionable insights for your business.",
    icon1: <Radio className="text-blue-800" size={20} />,
    icon2: <Zap className="text-yellow-500" size={20} />,
    bgColor: "bg-blue-50/60",
  },
  {
    title: "CRM Automation",
    desc: "Personalizing customer interactions with automated workflows that drive retention and growth.",
    icon1: <Heart className="text-pink-400" size={20} />,
    icon2: <Briefcase className="text-blue-600" size={20} />,
    bgColor: "bg-purple-50/60",
  },
  {
    title: "Project",
    desc: "Planning and execution of high-impact projects with a focus on timeline and quality delivery.",
    icon1: <Layout className="text-blue-400" size={20} />,
    icon2: <BarChart3 className="text-gray-500" size={20} />,
    bgColor: "bg-indigo-50/60",
  },
  {
    title: "Marketing",
    desc: "Driving brand awareness and engagement through data-driven multi-channel marketing strategies.",
    icon1: <Megaphone className="text-green-500" size={20} />,
    icon2: <Zap className="text-gray-800" size={20} />,
    bgColor: "bg-orange-50/60",
  },
  {
    title: "Automation",
    desc: "Building seamless integrations that connect your tools and save hours of manual labor.",
    icon1: <Briefcase className="text-teal-700" size={20} />,
    icon2: <Zap className="text-teal-400" size={20} />,
    bgColor: "bg-teal-50/60",
  },
];

const ServiceCard = ({ title, desc, icon1, icon2, bgColor }) => {
  return (
    <div
      className={`${bgColor} backdrop-blur-md border border-white-300 
      rounded-[2.5rem] p-8 shadow-sm flex flex-col relative 
      transition-transform hover:scale-[1.02] duration-300`}
    >
      {/* Top Icons */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex gap-3">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
            {icon1}
          </div>
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
            {icon2}
          </div>
        </div>

        <button className="text-gray-400 hover:text-red-400 transition-colors">
          <Heart size={20} />
        </button>
      </div>

      {/* Text */}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-sm mb-8">
        {desc}
      </p>

      {/* Bottom Tag */}
      <div className="mt-auto flex justify-end">
        <div className="bg-gray-800/80 text-white text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          20 000
        </div>
      </div>
    </div>
  );
};

const ServiceGrid = () => {
  return (
    <div className="min-h-screen relative overflow-hidden 
bg-white-120
  p-8 flex items-center justify-center font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 
        md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {examCards.map((card, index) => (
          <ServiceCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;
