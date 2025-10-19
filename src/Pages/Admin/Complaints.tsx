import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Badge } from '@/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  XCircle,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  User,
  FileText,
  TrendingUp,
  Download,
  RefreshCw
} from 'lucide-react';

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: 'service_quality' | 'billing' | 'no_show' | 'communication' | 'other';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  provider: {
    id: string;
    name: string;
    email: string;
    serviceType: string;
    avatar?: string;
  };
  booking: {
    id: string;
    serviceDate: Date;
    amount: number;
  };
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  resolution?: string;
  resolutionDate?: Date;
}

const Complaints: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);

  // Mock data - replace with actual API calls
  const complaints: Complaint[] = [
    {
      id: '1',
      title: 'Poor Service Quality',
      description: 'The plumber arrived 2 hours late and did not complete the work properly. Water is still leaking from the pipe.',
      category: 'service_quality',
      status: 'open',
      priority: 'high',
      customer: {
        id: 'c1',
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1234567890'
      },
      provider: {
        id: 'p1',
        name: 'Mike Wilson',
        email: 'mike.wilson@email.com',
        serviceType: 'Plumbing'
      },
      booking: {
        id: 'b1',
        serviceDate: new Date('2024-10-15'),
        amount: 150
      },
      createdAt: new Date('2024-10-16T10:30:00'),
      updatedAt: new Date('2024-10-16T10:30:00')
    },
    {
      id: '2',
      title: 'Billing Dispute',
      description: 'I was charged for additional services that were not requested or performed. The original quote was $100 but I was charged $180.',
      category: 'billing',
      status: 'in_progress',
      priority: 'medium',
      customer: {
        id: 'c2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1234567891'
      },
      provider: {
        id: 'p2',
        name: 'Emma Davis',
        email: 'emma.davis@email.com',
        serviceType: 'Electrical'
      },
      booking: {
        id: 'b2',
        serviceDate: new Date('2024-10-14'),
        amount: 180
      },
      createdAt: new Date('2024-10-15T14:20:00'),
      updatedAt: new Date('2024-10-16T09:15:00'),
      assignedTo: 'admin1'
    },
    {
      id: '3',
      title: 'Provider No Show',
      description: 'The cleaning service provider did not show up for the scheduled appointment and did not inform me in advance.',
      category: 'no_show',
      status: 'resolved',
      priority: 'medium',
      customer: {
        id: 'c3',
        name: 'Alex Brown',
        email: 'alex.brown@email.com',
        phone: '+1234567892'
      },
      provider: {
        id: 'p3',
        name: 'Lisa Chen',
        email: 'lisa.chen@email.com',
        serviceType: 'Cleaning'
      },
      booking: {
        id: 'b3',
        serviceDate: new Date('2024-10-13'),
        amount: 80
      },
      createdAt: new Date('2024-10-13T16:45:00'),
      updatedAt: new Date('2024-10-14T11:30:00'),
      resolution: 'Full refund issued and provider warned. Alternative provider arranged.',
      resolutionDate: new Date('2024-10-14T11:30:00')
    }
  ];

  const getStatusColor = (status: Complaint['status']) => {
    switch (status) {
      case 'open': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: Complaint['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getCategoryIcon = (category: Complaint['category']) => {
    switch (category) {
      case 'service_quality': return <AlertTriangle className="w-4 h-4" />;
      case 'billing': return <FileText className="w-4 h-4" />;
      case 'no_show': return <Clock className="w-4 h-4" />;
      case 'communication': return <MessageSquare className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.provider.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || complaint.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || complaint.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const complaintStats = {
    total: complaints.length,
    open: complaints.filter(c => c.status === 'open').length,
    inProgress: complaints.filter(c => c.status === 'in_progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
    resolutionRate: Math.round((complaints.filter(c => c.status === 'resolved').length / complaints.length) * 100)
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Complaints Management</h1>
          <p className="text-gray-400 text-base sm:text-lg">Track and resolve customer complaints</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="bg-gray-800/30 backdrop-blur border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700/50 flex-1 sm:flex-initial"
          >
            <Download className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button 
            className="bg-blue-600/80 backdrop-blur hover:bg-blue-700/80 text-white flex-1 sm:flex-initial"
          >
            <RefreshCw className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Complaints</p>
                <p className="text-2xl font-bold text-white">{complaintStats.total}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Open</p>
                <p className="text-2xl font-bold text-red-400">{complaintStats.open}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-yellow-400">{complaintStats.inProgress}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Resolution Rate</p>
                <p className="text-2xl font-bold text-green-400">{complaintStats.resolutionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search complaints, customers, or providers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32 bg-gray-700/50 border-gray-600 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800/90 backdrop-blur-xl border-gray-700/50">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-36 bg-gray-700/50 border-gray-600 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800/90 backdrop-blur-xl border-gray-700/50">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="service_quality">Service Quality</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="no_show">No Show</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-32 bg-gray-700/50 border-gray-600 text-white">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800/90 backdrop-blur-xl border-gray-700/50">
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complaints List */}
      <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white">Complaints ({filteredComplaints.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {filteredComplaints.map((complaint) => (
              <div
                key={complaint.id}
                className="p-4 hover:bg-gray-700/30 transition-colors cursor-pointer border-b border-gray-700/30 last:border-b-0"
                onClick={() => setSelectedComplaint(complaint.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-700/50">
                      {getCategoryIcon(complaint.category)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium truncate">{complaint.title}</h3>
                        <Badge className={`text-xs ${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-2">{complaint.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{complaint.customer.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(complaint.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Provider: {complaint.provider.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={`border ${getStatusColor(complaint.status)}`}>
                      {complaint.status.replace('_', ' ')}
                    </Badge>
                    
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Complaints;
