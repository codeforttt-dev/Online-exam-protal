// AdminDashboard.jsx
import React from 'react';
 import Layout from '../adminComponent/layout/layout';
import {
  UsersIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  ClockIcon,
  DocumentPlusIcon,
  CloudArrowUpIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

function AdminDashboard() {
  // Mock data for registration trends
  const registrationData = [45, 52, 68, 74, 65, 55, 40];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const stats = [
    { label: 'Total Participants', value: '1,234', change: '+12% from last month' },
    { label: 'Registered Schools', value: '156', change: '+5% from last month' },
    { label: 'Total Revenue', value: '$24,580', change: '+18% from last month' },
    { label: 'Pending Applications', value: '24', change: '+4 from yesterday' }
  ];

  const recentActivities = [
    { type: 'New Registration', user: 'Sarah Johnson', detail: 'from Lincoln High School', time: '10 min ago' },
    { type: 'Payment Received', user: 'Ella50', detail: 'from Michael Chen', time: '1 hour ago' },
    { type: 'Test Completed', user: 'Emma Wilson', detail: 'scored 92% on Physics Test', time: '2 hours ago' },
    { type: 'System Update', user: '', detail: 'Question bank updated with 30 new questions', time: '5 hours ago' }
  ];

  const recentRegistrations = [
    { participant: 'Sarah Robinson', school: 'Lincoln High School', grade: '11th', date: 'Feb 5, 2026', status: 'Active' },
    { participant: 'Michael Chen', school: 'Northwood Academy', grade: '10th', date: 'Feb 4, 2026', status: 'Active' },
    { participant: 'David Miller', school: 'Central High School', grade: '12th', date: 'Feb 3, 2026', status: 'Pending' },
    { participant: 'Jessica Williams', school: 'Southside Academy', grade: '11th', date: 'Feb 3, 2026', status: 'Active' },
    { participant: 'Robert Brown', school: 'Eastwood High', grade: '10th', date: 'Feb 2, 2026', status: 'Active' }
  ];

  const quickActions = [
    { title: 'New Olympiad', desc: 'Create a new Science Olympiad', icon: DocumentPlusIcon, color: 'bg-blue-500' },
    { title: 'Add Questions', desc: 'Add new questions to the bank', icon: DocumentPlusIcon, color: 'bg-green-500' },
    { title: 'Import Data', desc: 'Bulk import participants or schools', icon: CloudArrowUpIcon, color: 'bg-purple-500' },
    { title: 'Export Reports', desc: 'Generate and download reports', icon: DocumentArrowDownIcon, color: 'bg-amber-500' }
  ];

  return (
    <Layout>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-xl border border-gray-200 p-5 shadow-sm 
            transition-all duration-300 hover:shadow-md hover:-translate-y-1
            ${
              index === 0
                ? "border-l-4 border-orange-500"
                : index === 1
                ? "border-l-4 border-green-500"
                : index === 2
                ? "border-l-4 border-blue-500"
                : "border-l-4 border-amber-500"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stat.value}
                </p>
                <p
                  className={`text-xs mt-1 font-medium ${
                    index === 3
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {stat.change}
                </p>
              </div>

              {/* Icon Box */}
              <div
                className={`p-3 rounded-lg ${
                  index === 0
                    ? "bg-orange-100 text-orange-600"
                    : index === 1
                    ? "bg-green-100 text-green-600"
                    : index === 2
                    ? "bg-blue-100 text-blue-600"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                {index === 0 && <UsersIcon className="h-6 w-6" />}
                {index === 1 && <AcademicCapIcon className="h-6 w-6" />}
                {index === 2 && <CurrencyDollarIcon className="h-6 w-6" />}
                {index === 3 && <ClockIcon className="h-6 w-6" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Registration Trends */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-semibold text-gray-800">
                Registration Trends
              </h3>
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                  ⬇
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                  ⛶
                </button>
              </div>
            </div>

            <div className="flex items-end justify-between h-64 mt-6 px-4">
              {registrationData.map((value, index) => (
                <div key={index} className="flex flex-col items-center flex-1 mx-2">
                  {/* Building Bar */}
                  <div
                    className="w-full rounded-l relative transition-all duration-500 hover:scale-105"
                    style={{
                      height: `${value * 2}px`,
                      background: "linear-gradient(to top, #f59e0b, #fbbf24, #fde68a)"
                    }}
                  >
                    {/* Gloss Effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 rounded-xl"></div>
                  </div>

                  {/* Day Label */}
                  <div className="text-sm text-gray-500 mt-3 font-medium">
                    {days[index]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Registrations */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-gray-800">
                Recent Registrations
              </h3>
              <button className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition font-medium">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">
                    <th className="pb-4 font-semibold">Participant</th>
                    <th className="pb-4 font-semibold">School</th>
                    <th className="pb-4 font-semibold">Grade</th>
                    <th className="pb-4 font-semibold">Registration Date</th>
                    <th className="pb-4 font-semibold">Status</th>
                    <th className="pb-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {recentRegistrations.map((reg, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      {/* Participant with Avatar */}
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold">
                            {reg.participant.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {reg.participant}
                            </p>
                            <p className="text-xs text-gray-400">
                              sample@email.com
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-5 text-gray-700">{reg.school}</td>
                      <td className="py-5 text-gray-700">{reg.grade}</td>
                      <td className="py-5 text-gray-600">{reg.date}</td>

                      {/* Status Pill */}
                      <td className="py-5">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            reg.status === "Active"
                              ? "bg-green-50 text-green-600"
                              : "bg-yellow-50 text-yellow-600"
                          }`}
                        >
                          {reg.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-5 text-center">
                        <div className="flex justify-center space-x-3">
                          <button className="p-2 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100 transition">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button className="p-2 bg-yellow-50 text-yellow-500 rounded-md hover:bg-yellow-100 transition">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="p-2 bg-red-50 text-red-500 rounded-md hover:bg-red-100 transition">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl border border-gray-200 p-7 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Activities</h3>
            
            <div className="space-y-8">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : index === 2 ? 'bg-purple-500' : 'bg-amber-500'}`}></div>
                    {index < recentActivities.length - 1 && (
                      <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-800">{activity.type}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.user && <span className="font-medium">{activity.user}</span>} {activity.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Quick Actions
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="group flex flex-col items-center justify-center p-5 
                  bg-white border border-gray-200 rounded-xl 
                  transition-all duration-300 
                  hover:-translate-y-1 hover:shadow-lg hover:border-gray-300"
                >
                  {/* Icon */}
                  <div
                    className={`${action.color} p-3 rounded-lg mb-3 
                    transition-transform duration-300 
                    group-hover:scale-110`}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Title */}
                  <h4 className="font-medium text-gray-800 text-center transition-colors duration-300 group-hover:text-gray-900">
                    {action.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-gray-500 text-center mt-1">
                    {action.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;