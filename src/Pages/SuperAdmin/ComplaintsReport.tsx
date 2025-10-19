import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Users,
  MessageSquare,
  Eye,
  MoreVertical
} from 'lucide-react';
import type { 
  SuperAdminComplaintOverview,
  ComplaintCategory,
  ComplaintPriority,
  ComplaintStatus
} from '@/types/complaint.types';

const ComplaintsReport: React.FC = () => {
  const [overview, setOverview] = useState<SuperAdminComplaintOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'complaints' | 'analytics' | 'performance'>('overview');

  // Mock data for demonstration
  useEffect(() => {
    const mockOverview: SuperAdminComplaintOverview = {
      stats: {
        totalComplaints: 1247,
        openComplaints: 89,
        inProgressComplaints: 156,
        resolvedComplaints: 987,
        closedComplaints: 15,
        averageResolutionTime: 24.5,
        complaintsByCategory: {
          service_quality: 456,
          payment_dispute: 234,
          inappropriate_behavior: 189,
          technical_issue: 167,
          billing_issue: 123,
          privacy_concern: 45,
          safety_concern: 33,
          other: 0
        },
        complaintsByPriority: {
          low: 567,
          medium: 456,
          high: 189,
          critical: 35
        },
        complaintsByStatus: {
          open: 89,
          in_progress: 156,
          under_review: 67,
          resolved: 987,
          closed: 15,
          escalated: 23
        },
        monthlyTrends: [
          { month: 'Jan', total: 98, resolved: 89 },
          { month: 'Feb', total: 112, resolved: 105 },
          { month: 'Mar', total: 134, resolved: 128 },
          { month: 'Apr', total: 156, resolved: 142 },
          { month: 'May', total: 189, resolved: 178 },
          { month: 'Jun', total: 167, resolved: 159 }
        ],
        topCategories: [
          { category: 'service_quality', count: 456, percentage: 36.6 },
          { category: 'payment_dispute', count: 234, percentage: 18.8 },
          { category: 'inappropriate_behavior', count: 189, percentage: 15.2 }
        ],
        resolutionRate: 79.2
      },
      recentComplaints: [
        {
          id: '1',
          title: 'Service provider was unprofessional',
          description: 'The service provider arrived late and was rude to my family.',
          category: 'inappropriate_behavior',
          priority: 'high',
          status: 'open',
          reportedBy: {
            id: 'user1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user'
          },
          reportedAgainst: {
            id: 'provider1',
            name: 'Jane Smith',
            email: 'jane@provider.com',
            role: 'provider'
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          escalationLevel: 1,
          tags: ['unprofessional', 'late']
        }
      ],
      criticalComplaints: [],
      escalatedComplaints: [],
      adminPerformance: [
        {
          adminId: 'admin1',
          adminName: 'John Admin',
          assignedComplaints: 45,
          resolvedComplaints: 38,
          averageResolutionTime: 18.5,
          resolutionRate: 84.4
        },
        {
          adminId: 'admin2',
          adminName: 'Sarah Manager',
          assignedComplaints: 52,
          resolvedComplaints: 41,
          averageResolutionTime: 22.3,
          resolutionRate: 78.8
        }
      ]
    };

    setOverview(mockOverview);
    setIsLoading(false);
  }, []);

  const getPriorityColor = (priority: ComplaintPriority) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-900/20';
      case 'high': return 'text-orange-400 bg-orange-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getStatusColor = (status: ComplaintStatus) => {
    switch (status) {
      case 'open': return 'text-blue-400 bg-blue-900/20';
      case 'in_progress': return 'text-yellow-400 bg-yellow-900/20';
      case 'under_review': return 'text-purple-400 bg-purple-900/20';
      case 'resolved': return 'text-green-400 bg-green-900/20';
      case 'closed': return 'text-gray-400 bg-gray-900/20';
      case 'escalated': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getCategoryIcon = (category: ComplaintCategory) => {
    switch (category) {
      case 'service_quality': return <BarChart3 className="w-4 h-4" />;
      case 'payment_dispute': return <AlertTriangle className="w-4 h-4" />;
      case 'inappropriate_behavior': return <Users className="w-4 h-4" />;
      case 'technical_issue': return <MessageSquare className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!overview) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Complaints Report</h1>
          <p className="text-gray-400 mt-1">Monitor and analyze customer complaints across the platform</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Date Range</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'complaints', label: 'All Complaints', icon: AlertTriangle },
            { id: 'analytics', label: 'Analytics', icon: PieChart },
            { id: 'performance', label: 'Admin Performance', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'complaints' | 'analytics' | 'performance')}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Complaints</p>
                  <p className="text-2xl font-bold text-white">{overview.stats.totalComplaints}</p>
                </div>
                <div className="p-3 bg-blue-900/20 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+12%</span>
                <span className="text-gray-400 ml-1">from last month</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Open Complaints</p>
                  <p className="text-2xl font-bold text-white">{overview.stats.openComplaints}</p>
                </div>
                <div className="p-3 bg-orange-900/20 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                <span className="text-red-400">-8%</span>
                <span className="text-gray-400 ml-1">from last month</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Resolution Rate</p>
                  <p className="text-2xl font-bold text-white">{overview.stats.resolutionRate}%</p>
                </div>
                <div className="p-3 bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+5%</span>
                <span className="text-gray-400 ml-1">from last month</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Resolution Time</p>
                  <p className="text-2xl font-bold text-white">{overview.stats.averageResolutionTime}h</p>
                </div>
                <div className="p-3 bg-purple-900/20 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">-15%</span>
                <span className="text-gray-400 ml-1">from last month</span>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Monthly Trends</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {overview.stats.monthlyTrends.map((month, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gray-700 rounded-t relative" style={{ height: `${(month.total / 200) * 100}%` }}>
                      <div 
                        className="w-full bg-emerald-600 rounded-t absolute bottom-0" 
                        style={{ height: `${(month.resolved / month.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400 mt-2">{month.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center mt-4 space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-700 rounded mr-2"></div>
                  <span className="text-gray-400">Total</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-600 rounded mr-2"></div>
                  <span className="text-gray-400">Resolved</span>
                </div>
              </div>
            </div>

            {/* Top Categories */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Top Complaint Categories</h3>
              <div className="space-y-4">
                {overview.stats.topCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-700 rounded-lg">
                        {getCategoryIcon(category.category)}
                      </div>
                      <div>
                        <p className="text-white font-medium capitalize">
                          {category.category.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-gray-400">{category.count} complaints</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{category.percentage}%</p>
                      <div className="w-20 h-2 bg-gray-700 rounded-full mt-1">
                        <div 
                          className="h-full bg-emerald-600 rounded-full" 
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Complaints */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Recent Complaints</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Complaint
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Reported By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {overview.recentComplaints.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{complaint.title}</p>
                          <p className="text-sm text-gray-400 truncate max-w-xs">
                            {complaint.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(complaint.category)}
                          <span className="text-gray-300 capitalize">
                            {complaint.category.replace('_', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(complaint.status)}`}>
                          {complaint.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white">{complaint.reportedBy.name}</p>
                          <p className="text-sm text-gray-400">{complaint.reportedBy.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gray-700 rounded">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-700 rounded">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
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
      )}

      {/* Admin Performance Tab */}
      {activeTab === 'performance' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Admin Performance Metrics</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-750">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Admin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Assigned
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Resolved
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Resolution Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Avg Resolution Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {overview.adminPerformance.map((admin) => (
                  <tr key={admin.adminId} className="hover:bg-gray-750">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={`https://ui-avatars.com/api/?name=${admin.adminName}&background=10b981&color=fff`}
                          alt={admin.adminName}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-white font-medium">{admin.adminName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{admin.assignedComplaints}</td>
                    <td className="px-6 py-4 text-gray-300">{admin.resolvedComplaints}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-white">{admin.resolutionRate}%</span>
                        <div className="w-16 h-2 bg-gray-700 rounded-full">
                          <div 
                            className="h-full bg-emerald-600 rounded-full" 
                            style={{ width: `${admin.resolutionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{admin.averageResolutionTime}h</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        admin.resolutionRate >= 80 ? 'text-green-400 bg-green-900/20' :
                        admin.resolutionRate >= 60 ? 'text-yellow-400 bg-yellow-900/20' :
                        'text-red-400 bg-red-900/20'
                      }`}>
                        {admin.resolutionRate >= 80 ? 'Excellent' :
                         admin.resolutionRate >= 60 ? 'Good' : 'Needs Improvement'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsReport;
