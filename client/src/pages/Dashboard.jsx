import React from 'react';
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, FolderOpen, BarChart3, Trophy, 
  Search, Bell, MoreVertical, CheckCircle2, Circle, 
  ChevronLeft, ChevronRight, ChevronDown 
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer} from 'recharts';
import ExamCards from  "./examCards";

// Mock data for the performance graph
const performanceData = [
  { value: 20 }, { value: 25 }, { value: 22 }, 
  { value: 30 }, { value: 28 }, { value: 45 }, { value: 40 }
];

const Dashboard = () => {

 const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserName(storedUser.name);
    }
  }, []);

  return (
<div className="min-h-screen relative overflow-hidden 
  bg-gradient-to-br from-[#fff8dc] via-[#ffe9a8] to-[#ffd86b] 
  p-8 flex items-center justify-center font-sans">
<div className="bg-white w-full max-w-6xl rounded-[40px] shadow-2xl flex overflow-hidden min-h-[800px] relative">
        
        {/* SIDEBAR */}
        <div className="w-24 bg-white flex flex-col items-center py-10 space-y-12 border-r border-gray-100">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <div className="w-5 h-5 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin-slow"></div>
          </div>
          <nav className="flex flex-col space-y-10">
            <SidebarItem icon={<LayoutDashboard size={24} />} label="Dashboard" active />
            <SidebarItem icon={<FolderOpen size={24} />} label="Saved files" />
            <SidebarItem icon={<BarChart3 size={24} />} label="Statistics" />
            <SidebarItem icon={<Trophy size={24} />} label="Achievements" />
          </nav>
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-10 bg-[#FAF9F6]">
          {/* Header */}
          <header className="flex justify-between items-center mb-10">
            <div className="relative w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search subject" 
                className="w-full bg-white py-3 pl-12 pr-4 rounded-2xl shadow-sm focus:outline-none text-sm"
              />
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-sm font-medium">EN <ChevronDown size={16} className="ml-1" /></div>
              <div className="relative">
                <Bell size={22} className="text-gray-700" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
              </div>
       <div className="flex items-center space-x-3">
  <span className="font-semibold">
    {userName ? userName : "Guest"}
  </span>

</div>
      

            </div>
          </header>
          <ExamCards/>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="col-span-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Upcoming Tests */}
                <div className="bg-white p-6 rounded-[32px] shadow-sm text-center">
                  <h3 className="text-left font-bold text-lg mb-4">Upcoming Tests</h3>
                  <div className="flex justify-center my-6">
                    <div className="relative">
  <div className="w-32 h-32 bg-yellow-400 opacity-20 rounded-full blur-2xl absolute"></div>
<img src="https://cdn-icons-png.flaticon.com/512/2622/2622415.png" alt="flask" className="w-32 relative z-10" />
     </div>
                </div>
                  <h4 className="font-bold">Organic Chemistry <span className="text-gray-400 font-normal">( 50 marks )</span></h4>
                  <p className="text-xs text-gray-400 mt-1">Chapter 2 & 3 (MCQs)</p>
                  <p className="text-xs text-orange-400 font-bold mt-2 italic">Deadline : 2nd May 2021</p>
                  <div className="flex space-x-3 mt-6">
                    <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-2xl text-sm transition-all">Take The Test</button>
                    <button className="flex-1 border-2 border-gray-800 text-black font-bold py-3 rounded-2xl text-sm">Postpone</button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Performance */}
                  <div className="bg-white p-6 rounded-[32px] shadow-sm h-44">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">Performance</h3>
                      <span className="text-[10px] text-gray-400">21st Jan</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-2xl font-bold">6.5<span className="text-sm">%</span></span>
                      <span className="text-[10px] text-orange-400 font-bold">Decline</span>
                    </div>
                    <div className="h-16 w-full mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <Line type="monotone" dataKey="value" stroke="#FBBF24" strokeWidth={3} dot={{ r: 4, fill: '#FBBF24' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* New Solved Papers */}
                  <div className="bg-white p-6 rounded-[32px] shadow-sm flex items-center justify-between">
                    <div>
                      <h3 className="font-bold mb-1">New Solved Papers</h3>
                      <h4 className="text-sm font-bold">Human Biology <span className="text-gray-400 font-normal">( Theory )</span></h4>
                      <p className="text-[10px] text-gray-400">( 50 marks )</p>
                      <button className="mt-4 bg-yellow-400 px-6 py-2 rounded-xl text-xs font-bold shadow-lg shadow-yellow-100">Take A Look</button>
                    </div>
                    <div className="relative w-20 h-20">
                       <svg className="w-full h-full transform -rotate-90">
                         <circle cx="40" cy="40" r="35" stroke="#eee" strokeWidth="8" fill="none" />
                         <circle cx="40" cy="40" r="35" stroke="#111" strokeWidth="8" fill="none" strokeDasharray="219" strokeDashoffset="33" />
                       </svg>
                       <span className="absolute inset-0 flex items-center justify-center font-bold text-sm">85%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Test Results */}
              <div className="bg-white p-8 rounded-[32px] shadow-sm">
                <h3 className="font-bold text-lg mb-6">Recent Test Results</h3>
                <div className="space-y-6">
                  <ResultRow title="Organic Chemistry" chapter="Chapter 1" date="21st Jan 2021" score={35} color="stroke-orange-400" />
                  <ResultRow title="Human Biology" chapter="Chapter 2" date="5th Jan 2021" score={85} color="stroke-black" />
                </div>
                <div className="flex justify-center mt-6 text-gray-400"><ChevronDown size={20} /></div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-4 space-y-6">
              {/* Tasks */}
              <div className="bg-white p-6 rounded-[32px] shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Tasks</h3>
                  <MoreVertical size={20} className="text-gray-400" />
                </div>
                <p className="text-[10px] text-gray-400 text-center mb-4 underline">Today</p>
                <div className="space-y-5">
                  <TaskItem title="Assignment I" status="Pending" icon={<Circle size={18} className="text-yellow-400" />} />
                  <TaskItem title="Assignment I" status="Completed" completed icon={<CheckCircle2 size={18} className="text-yellow-400" />} />
                  <TaskItem title="Chemistry Test" status="Pending" urgent icon={<Circle size={18} className="text-orange-400" />} />
                  <TaskItem title="Assignment I" status="Pending" icon={<Circle size={18} className="text-yellow-400" />} />
                </div>
                <div className="flex justify-center mt-6 text-gray-400"><ChevronDown size={20} /></div>
              </div>

              {/* Calendar Widget */}
              <div className="bg-white p-6 rounded-[32px] shadow-xl transform translate-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Calendar</h3>
                  <div className="flex space-x-2">
                    <button className="p-1 bg-black text-white rounded-full"><ChevronLeft size={16} /></button>
                    <button className="p-1 bg-black text-white rounded-full"><ChevronRight size={16} /></button>
                  </div>
                </div>
                <div className="flex justify-around mb-6 text-center">
                  <div className="opacity-40"><p className="text-xs">22</p><p className="text-[10px]">Tues</p></div>
                  <div className="font-bold scale-110">
                    <p className="text-lg">23</p>
                    <p className="text-[10px]">Wed</p>
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mx-auto mt-1"></div>
                  </div>
                  <div className="opacity-40"><p className="text-xs">24</p><p className="text-[10px]">Thur</p></div>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <p className="font-bold text-sm">Chemistry Test</p>
                  <p className="text-xs text-gray-400">9:00 pm</p>
                </div>
                <button className="w-full bg-yellow-400 py-3 rounded-2xl font-bold text-sm">Monthly view</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const SidebarItem = ({ icon, label, active = false }) => (
  <div className={`flex flex-col items-center cursor-pointer group`}>
    <div className={`${active ? 'text-black' : 'text-gray-300'} group-hover:text-black transition-colors`}>
      {icon}
    </div>
    <span className={`text-[10px] mt-2 font-medium ${active ? 'text-black' : 'text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity'}`}>
      {label}
    </span>
  </div>
);

const TaskItem = ({ title, status, completed, urgent, icon }) => (
  <div className="flex items-center justify-between">
    <div>
      <h4 className="text-sm font-bold">{title}</h4>
      <div className="flex space-x-2 items-center">
        <span className={`text-[10px] ${completed ? 'text-yellow-500' : 'text-gray-400'}`}>{status}</span>
        {urgent && <span className="text-[10px] text-orange-500 font-bold">Urgent</span>}
      </div>
    </div>
    {icon}
  </div>
);

const ResultRow = ({ title, chapter, date, score, color }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-4 w-1/3">
      <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
        <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
      </div>
      <p className="text-sm font-bold">{title}</p>
    </div>
    <p className="text-xs text-gray-400 w-1/4">{chapter}</p>
    <p className="text-xs text-gray-400 w-1/4">{date}</p>
    <div className="relative w-12 h-12">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="24" cy="24" r="20" stroke="#eee" strokeWidth="4" fill="none" />
        <circle cx="24" cy="24" r="20" className={`${color}`} strokeWidth="4" fill="none" strokeDasharray="125" strokeDashoffset={125 - (125 * score) / 100} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-bold text-[10px]">{score}%</span>
    </div>
    <MoreVertical size={16} className="text-gray-400" />
  </div>
);

export default Dashboard;




