// ParticipantsDashboard.jsx
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Mail, 
  Edit, 
  Trash2, 
  Download, 
  UserPlus, 
  Printer, 
  RefreshCw 
} from 'lucide-react';
import Layout from '../adminComponent/layout/layout';

const Participants = () => {
  const [filters, setFilters] = useState({
    grade: 'All Grades',
    status: 'All Status',
    school: 'All Schools',
    search: ''
  });

  const participants = [
    {
      id: 1,
      initials: 'SR',
      name: 'Sarah Robinson',
      email: 'sarah@email.com',
      school: 'Lincoln High School',
      grade: '11th',
      registrationDate: 'Feb 5, 2026',
      status: 'Active'
    },
    {
      id: 2,
      initials: 'MC',
      name: 'Michael Chen',
      email: 'michael@email.com',
      school: 'Northwood Academy',
      grade: '10th',
      registrationDate: 'Feb 4, 2026',
      status: 'Active'
    },
    {
      id: 3,
      initials: 'EW',
      name: 'Emma Wilson',
      email: 'emma@email.com',
      school: 'Greenwood International',
      grade: '12th',
      registrationDate: 'Feb 3, 2026',
      status: 'Posting'
    },
    {
      id: 4,
      initials: 'JR',
      name: 'James Rodriguez',
      email: 'james@email.com',
      school: 'Central High School',
      grade: '9th',
      registrationDate: 'Feb 2, 2026',
      status: 'Active'
    },
    {
      id: 5,
      initials: 'AK',
      name: 'Aisha Khan',
      email: 'aisha@email.com',
      school: 'Westwood School',
      grade: '11th',
      registrationDate: 'Feb 1, 2026',
      status: 'Inactive'
    }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Posting':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredParticipants = participants.filter(participant => {
    if (filters.grade !== 'All Grades' && participant.grade !== filters.grade) return false;
    if (filters.status !== 'All Status' && participant.status !== filters.status) return false;
    if (filters.school !== 'All Schools' && participant.school !== filters.school) return false;
    if (filters.search && 
        !participant.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !participant.email.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Participants Management</h1>
          <p className="text-gray-600 mt-2">Manage all registered participants and their details</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Filter Participants</h2>
            <Filter className="text-gray-500" size={20} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Grade Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade Level
              </label>
              <select
                name="grade"
                value={filters.grade}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option>All Grades</option>
                <option>9th</option>
                <option>10th</option>
                <option>11th</option>
                <option>12th</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Posting</option>
                <option>Inactive</option>
              </select>
            </div>

            {/* School Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School
              </label>
              <select
                name="school"
                value={filters.school}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option>All Schools</option>
                <option>Lincoln High School</option>
                <option>Northwood Academy</option>
                <option>Greenwood International</option>
                <option>Central High School</option>
                <option>Westwood School</option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleSearchChange}
                  placeholder="Name or email..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {Object.entries(filters).map(([key, value]) => {
              if (key === 'search' || value.includes('All')) return null;
              return (
                <span 
                  key={key}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {key}: {value}
                  <button 
                    onClick={() => setFilters(prev => ({ ...prev, [key]: key === 'grade' ? 'All Grades' : key === 'status' ? 'All Status' : 'All Schools' }))}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        {/* Participants Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <h2 className="text-xl font-semibold text-gray-900">All Participants</h2>
              <span className="ml-3 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                {filteredParticipants.length}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2.5 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-300 transition">
                <Download size={18} className="mr-2" />
                Export
              </button>
              <button className="flex items-center px-4 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                <UserPlus size={18} className="mr-2" />
                Add Participant
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredParticipants.map((participant) => (
                  <tr key={participant.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                          {participant.initials}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                          <div className="text-sm text-gray-500">{participant.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{participant.school}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{participant.grade}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{participant.registrationDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(participant.status)}`}>
                        {participant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <Mail size={18} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Actions */}
          <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="text-sm text-gray-500 mb-4 sm:mb-0">
              Showing <span className="font-medium">{filteredParticipants.length}</span> of <span className="font-medium">{participants.length}</span> participants
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                <Printer size={18} className="mr-2" />
                Print
              </button>
              <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                <RefreshCw size={18} className="mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Participants;