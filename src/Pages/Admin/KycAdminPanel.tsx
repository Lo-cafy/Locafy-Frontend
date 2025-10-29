import { useState, useEffect } from 'react';
import { X, Eye, Check, XCircle, Search, Filter, FileText, User, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import api from '@/Api/baseurl';

type KycStatus = "Pending" | "Approved" | "Rejected";
type DocumentType = "Passport" | "DriversLicense" | "NationalId";

interface KycSubmission {
  id: number;
  userId: number;
  documentType: DocumentType;
  documentFrontUrl: string;
  documentBackUrl?: string;
  status: KycStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: number;
  reviewerNotes?: string;
  documentNumber: string;
  selfieUrl: string;
}

interface KycStatistics {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  createdAt: string;
}

export default function KYCAdminPanel() {
  const [statistics, setStatistics] = useState<KycStatistics>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  const [submissions, setSubmissions] = useState<KycSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<KycSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<KycSubmission | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<KycStatus | 'All'>('All');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [searchQuery, statusFilter, submissions]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, submissionsRes] = await Promise.all([
        api.get('/kyc/statistics', { withCredentials: true }),
        api.get('/kyc/pending', { withCredentials: true })
      ]);

      if (statsRes.data.success) {
        setStatistics(statsRes.data.data);
      }

      if (submissionsRes.data.success) {
        setSubmissions(submissionsRes.data.data);
      }
    } catch (error) {
      console.error('Error fetching KYC data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = [...submissions];

    if (statusFilter !== 'All') {
      filtered = filtered.filter(s => s.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.documentNumber.toLowerCase().includes(query) ||
        s.id.toString().includes(query) ||
        s.userId.toString().includes(query)
      );
    }

    setFilteredSubmissions(filtered);
  };

  const fetchUserProfile = async (userId: number) => {
    try {
      const res = await api.get(`/users/${userId}`, { withCredentials: true });
      if (res.data.success) {
        setUserProfile(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const openReviewModal = async (submission: KycSubmission) => {
    setSelectedSubmission(submission);
    setReviewNotes(submission.reviewerNotes || '');
    await fetchUserProfile(submission.userId);
    setShowReviewModal(true);
  };

  const handleReview = async (status: KycStatus) => {
    if (!selectedSubmission) return;

    setSubmitting(true);
    try {
      const res = await api.put('/kyc/review', {
        id: selectedSubmission.id,
        status: status,
        reviewerNotes: reviewNotes
      }, { withCredentials: true });

      if (res.data.success) {
        setShowReviewModal(false);
        setSelectedSubmission(null);
        setUserProfile(null);
        setReviewNotes('');
        fetchData();
      }
    } catch (error) {
      console.error('Error reviewing submission:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: KycStatus) => {
    const styles = {
      Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Approved: 'bg-green-500/20 text-green-400 border-green-500/30',
      Rejected: 'bg-red-500/20 text-red-400 border-red-500/30'
    };

    const icons = {
      Pending: <Clock className="w-3 h-3" />,
      Approved: <CheckCircle className="w-3 h-3" />,
      Rejected: <XCircle className="w-3 h-3" />
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading KYC data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">KYC Management</h1>
          <p className="text-slate-400">Review and manage user verification submissions</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Total Submissions</span>
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white">{statistics.total}</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Pending Review</span>
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-yellow-400">{statistics.pending}</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Approved</span>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-green-400">{statistics.approved}</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg border border-red-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Rejected</span>
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-3xl font-bold text-red-400">{statistics.rejected}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by ID, User ID, or Document Number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as KycStatus | 'All')}
                className="px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Document Type</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Document Number</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-slate-400">
                      No submissions found
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">#{submission.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">User #{submission.userId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{submission.documentType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 font-mono">{submission.documentNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(submission.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{formatDate(submission.submittedAt)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => openReviewModal(submission)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          Review
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Review Modal */}
        {showReviewModal && selectedSubmission && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">KYC Submission Review</h2>
                  <p className="text-slate-400 text-sm mt-1">Submission ID: #{selectedSubmission.id}</p>
                </div>
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    setSelectedSubmission(null);
                    setUserProfile(null);
                  }}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* User Information */}
                {userProfile && (
                  <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <User className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">User Information</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-400 text-sm">Full Name</span>
                        <p className="text-white font-medium">{userProfile.fullName}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Email</span>
                        <p className="text-white font-medium">{userProfile.email}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Phone</span>
                        <p className="text-white font-medium">{userProfile.phoneNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Member Since</span>
                        <p className="text-white font-medium">{formatDate(userProfile.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Document Information */}
                <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">Document Information</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400 text-sm">Document Type</span>
                      <p className="text-white font-medium">{selectedSubmission.documentType}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-sm">Document Number</span>
                      <p className="text-white font-medium font-mono">{selectedSubmission.documentNumber}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-sm">Status</span>
                      <div className="mt-1">{getStatusBadge(selectedSubmission.status)}</div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-sm">Submitted At</span>
                      <p className="text-white font-medium">{formatDate(selectedSubmission.submittedAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Document Images */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold mb-3">Document Front</h3>
                    <img
                      src={selectedSubmission.documentFrontUrl}
                      alt="Document Front"
                      className="w-full h-64 object-contain bg-slate-900 rounded-lg border border-slate-700"
                    />
                  </div>

                  {selectedSubmission.documentBackUrl && (
                    <div>
                      <h3 className="text-white font-semibold mb-3">Document Back</h3>
                      <img
                        src={selectedSubmission.documentBackUrl}
                        alt="Document Back"
                        className="w-full h-64 object-contain bg-slate-900 rounded-lg border border-slate-700"
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="text-white font-semibold mb-3">Selfie Verification</h3>
                    <img
                      src={selectedSubmission.selfieUrl}
                      alt="Selfie"
                      className="w-full h-64 object-contain bg-slate-900 rounded-lg border border-slate-700"
                    />
                  </div>
                </div>

                {/* Review Notes */}
                <div>
                  <label className="block text-white font-semibold mb-2">Review Notes</label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add notes for this review..."
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  />
                </div>

                {/* Previous Review Info */}
                {selectedSubmission.reviewerNotes && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5" />
                      <div>
                        <h4 className="text-amber-400 font-semibold mb-1">Previous Review Notes</h4>
                        <p className="text-slate-300 text-sm">{selectedSubmission.reviewerNotes}</p>
                        {selectedSubmission.reviewedAt && (
                          <p className="text-slate-400 text-xs mt-2">
                            Reviewed on {formatDate(selectedSubmission.reviewedAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleReview('Approved')}
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white font-semibold rounded-lg transition-colors"
                  >
                    <Check className="w-5 h-5" />
                    {submitting ? 'Processing...' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleReview('Rejected')}
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white font-semibold rounded-lg transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                    {submitting ? 'Processing...' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}