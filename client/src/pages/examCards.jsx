import React, { useEffect } from "react";
import {
  Layout,
  BarChart3,
  Radio,
  Briefcase,
  Megaphone,
  Zap,
  Heart,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExams } from "../redux/thunks/examThunks";

// 🎨 Function to assign styles dynamically
const getStyle = () => {
  const styles = [
    {
      icon1: <Layout className="text-purple-600" size={20} />,
      icon2: <BarChart3 className="text-blue-500" size={20} />,
      bgColor: "bg-green-50/60",
    },
    {
      icon1: <Radio className="text-blue-800" size={20} />,
      icon2: <Zap className="text-yellow-500" size={20} />,
      bgColor: "bg-blue-50/60",
    },
    {
      icon1: <Heart className="text-pink-400" size={20} />,
      icon2: <Briefcase className="text-blue-600" size={20} />,
      bgColor: "bg-purple-50/60",
    },
    {
      icon1: <Megaphone className="text-green-500" size={20} />,
      icon2: <Zap className="text-gray-800" size={20} />,
      bgColor: "bg-orange-50/60",
    },
  ];

  return styles[Math.floor(Math.random() * styles.length)];
};

const ServiceCard = ({ title, desc }) => {
  const { icon1, icon2, bgColor } = getStyle();

  return (
    <div
      className={`${bgColor} backdrop-blur-md border border-gray-200
      rounded-2xl p-4
      shadow-sm flex flex-col relative
      min-h-[90px]
      transition-transform hover:scale-105 duration-300`}
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
  const dispatch = useDispatch();
  const { exams = [], loading, error } = useSelector((state) => state.exam);

  useEffect(() => {
    dispatch(fetchExams());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center ">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

 return (
  <div className="w-full p-5">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exams.length > 0 ? (
        exams.map((exam) => (
          <ServiceCard
            key={exam._id}
            title={exam.title}
            desc={exam.description}
          />
        ))
      ) : (
        <p className="text-gray-400 col-span-full text-center">
          No Exams Available
        </p>
      )}
    </div>
  </div>
 );
};

export default ServiceGrid;