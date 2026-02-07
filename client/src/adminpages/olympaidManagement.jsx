// pages/OlympiadManagement/OlympiadManagement.jsx
import React, { useState } from 'react';
import Layout from '../adminComponent/layout/layout';
import {
  UsersIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  ClockIcon,
  DocumentPlusIcon,
  CloudArrowUpIcon,
  DocumentArrowDownIcon,
  TrophyIcon,
  QuestionMarkCircleIcon,
  BuildingLibraryIcon,
  PencilIcon,
  CalendarIcon,
  PlusIcon,
  FunnelIcon,
  ArrowRightOnRectangleIcon,
  LifebuoyIcon,
  TrashIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

function OlympiadManagement() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const olympiads = [
    {
      id: 1,
      title: 'NSO 2026 - National Round',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      date: 'Feb 15 - Mar 30, 2026',
      participants: '1,234',
      schools: '156',
      questions: '250',
      iconColor: 'bg-blue-100 text-blue-600',
      showManage: true
    },
    {
      id: 2,
      title: 'Physics Olympiad 2026',
      status: 'Upcoming',
      statusColor: 'bg-yellow-100 text-yellow-800',
      date: 'Apr 10 - May 15, 2026',
      participants: '856',
      schools: '98',
      questions: '180',
      iconColor: 'bg-purple-100 text-purple-600',
      showManage: true
    },
    {
      id: 3,
      title: 'Chemistry Challenge 2025',
      status: 'Completed',
      statusColor: 'bg-gray-100 text-gray-800',
      date: 'Nov 1 - Dec 15, 2025',
      participants: '1,045',
      schools: '132',
      questions: '200',
      iconColor: 'bg-red-100 text-red-600',
      showManage: true
    },
    {
      id: 4,
      title: 'Biology Olympiad 2026',
      status: 'Upcoming',
      statusColor: 'bg-yellow-100 text-yellow-800',
      date: 'Jun 5 - Jul 20, 2026',
      participants: '723',
      schools: '87',
      questions: '160',
      iconColor: 'bg-green-100 text-green-600',
      showManage: true
    },
    {
      id: 5,
      title: 'Mathematics Olympiad 2025',
      status: 'Completed',
      statusColor: 'bg-gray-100 text-gray-800',
      date: 'Sep 10 - Oct 25, 2025',
      participants: '1,542',
      schools: '187',
      questions: '300',
      iconColor: 'bg-indigo-100 text-indigo-600',
      showManage: true
    },
    {
      id: 6,
      title: 'Computer Science Olympiad 2026',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      date: 'Jan 20 - Mar 10, 2026',
      participants: '945',
      schools: '115',
      questions: '220',
      iconColor: 'bg-amber-100 text-amber-600',
      showManage: true
    }
  ];

  const filters = ['All', 'Active', 'Upcoming', 'Completed', 'Draft'];

  const filteredOlympiads = selectedFilter === 'All' 
    ? olympiads 
    : olympiads.filter(olympiad => 
        olympiad.status.toLowerCase() === selectedFilter.toLowerCase()
      );

  return (
    <Layout>
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Olympiad Management</h1>
          <p className="text-gray-600 mt-2">Create and manage Science Olympiad events</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm hover:shadow">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Olympiad
          </button>
          
          <button className="flex items-center px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <CloudArrowUpIcon className="h-5 w-5 mr-2" />
            Import
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <FunnelIcon className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">Filter by:</span>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${selectedFilter === filter ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          Showing {filteredOlympiads.length} of {olympiads.length} olympiads
        </div>
      </div>

      {/* Olympiad Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOlympiads.map((olympiad) => (
          <div key={olympiad.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            {/* Olympiad Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${olympiad.iconColor}`}>
                  <TrophyIcon className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold text-gray-800">{olympiad.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center mt-1 gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${olympiad.statusColor}`}>
                      {olympiad.status}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {olympiad.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Olympiad Stats */}
            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <UsersIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Participants</p>
                      <p className="text-lg font-semibold text-gray-800">{olympiad.participants}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <BuildingLibraryIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Schools</p>
                      <p className="text-lg font-semibold text-gray-800">{olympiad.schools}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Questions</p>
                      <p className="text-lg font-semibold text-gray-800">{olympiad.questions}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="text-lg font-semibold text-gray-800">{olympiad.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-gray-100">
              <button className="flex-1 flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Manage
              </button>
              
              <button className="flex-1 flex items-center justify-center px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <PencilIcon className="h-5 w-5 mr-2" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no olympiads) */}
      {filteredOlympiads.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <TrophyIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No olympiads found</h3>
          <p className="text-gray-600 mb-6">Create your first olympiad to get started</p>
          <button className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Olympiad
          </button>
        </div>
      )}

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Olympiads</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">12</p>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <TrophyIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Now</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">3</p>
            </div>
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <ClockIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Upcoming</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">4</p>
            </div>
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
              <CalendarIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Participants</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">6,405</p>
            </div>
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <UsersIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <PlusIcon className="h-4 w-4" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Created new olympiad</p>
                <p className="text-xs text-gray-500">Physics Olympiad 2026</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <PencilIcon className="h-4 w-4" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Updated questions</p>
                <p className="text-xs text-gray-500">NSO 2026 - National Round</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <UsersIcon className="h-4 w-4" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">New participants registered</p>
                <p className="text-xs text-gray-500">Chemistry Challenge 2025</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OlympiadManagement;