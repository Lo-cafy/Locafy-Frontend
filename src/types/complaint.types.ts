export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  reportedBy: {
    id: string;
    name: string;
    email: string;
    role: 'customer' | 'provider';
  };
  reportedAgainst?: {
    id: string;
    name: string;
    email: string;
    role: 'customer' | 'provider' | 'admin';
  };
  assignedTo?: {
    id: string;
    name: string;
    email: string;
  };
  attachments?: ComplaintAttachment[];
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  resolutionNotes?: string;
  escalationLevel: number;
  tags: string[];
}

export interface ComplaintAttachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'video' | 'audio';
  size: number;
  uploadedAt: Date;
}

export type ComplaintCategory = 
  | 'service_quality'
  | 'payment_dispute'
  | 'inappropriate_behavior'
  | 'technical_issue'
  | 'billing_issue'
  | 'privacy_concern'
  | 'safety_concern'
  | 'other';

export type ComplaintPriority = 'low' | 'medium' | 'high' | 'critical';

export type ComplaintStatus = 
  | 'open'
  | 'in_progress'
  | 'under_review'
  | 'resolved'
  | 'closed'
  | 'escalated';

export interface ComplaintStats {
  totalComplaints: number;
  openComplaints: number;
  inProgressComplaints: number;
  resolvedComplaints: number;
  closedComplaints: number;
  averageResolutionTime: number; // in hours
  complaintsByCategory: Record<ComplaintCategory, number>;
  complaintsByPriority: Record<ComplaintPriority, number>;
  complaintsByStatus: Record<ComplaintStatus, number>;
  monthlyTrends: Array<{
    month: string;
    total: number;
    resolved: number;
  }>;
  topCategories: Array<{
    category: ComplaintCategory;
    count: number;
    percentage: number;
  }>;
  resolutionRate: number; // percentage
}

export interface ComplaintFilter {
  status?: ComplaintStatus[];
  category?: ComplaintCategory[];
  priority?: ComplaintPriority[];
  assignedTo?: string;
  reportedBy?: string;
  dateFrom?: Date;
  dateTo?: Date;
  escalationLevel?: number;
  tags?: string[];
}

export interface ComplaintAction {
  id: string;
  complaintId: string;
  actionType: 'status_change' | 'assignment' | 'note_added' | 'escalation' | 'resolution';
  performedBy: {
    id: string;
    name: string;
    email: string;
  };
  description: string;
  oldValue?: string;
  newValue?: string;
  timestamp: Date;
}

export interface ComplaintResolution {
  id: string;
  complaintId: string;
  resolution: string;
  actionTaken: string;
  preventiveMeasures?: string;
  satisfactionRating?: number; // 1-5 scale
  followUpRequired: boolean;
  followUpDate?: Date;
  resolvedBy: {
    id: string;
    name: string;
    email: string;
  };
  resolvedAt: Date;
}

// Super Admin specific types
export interface SuperAdminComplaintOverview {
  stats: ComplaintStats;
  recentComplaints: Complaint[];
  criticalComplaints: Complaint[];
  escalatedComplaints: Complaint[];
  adminPerformance: Array<{
    adminId: string;
    adminName: string;
    assignedComplaints: number;
    resolvedComplaints: number;
    averageResolutionTime: number;
    resolutionRate: number;
  }>;
}
