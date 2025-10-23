export interface ChatMessage {
  id: string;
  senderId: string;
  senderType: 'admin' | 'provider' | 'customer';
  receiverId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file' | 'system';
  attachments?: ChatAttachment[];
  replyTo?: string; // ID of message being replied to
}

export interface ChatAttachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'video' | 'audio';
  size: number;
}

export interface ChatConversation {
  id: string;
  participants: ChatParticipant[];
  lastMessage?: ChatMessage;
  lastActivity: Date;
  unreadCount: number;
  isActive: boolean;
  type: 'direct' | 'group' | 'support';
}

export interface ChatParticipant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'provider' | 'customer';
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen?: Date;
}

export interface ChatRoom {
  id: string;
  name?: string;
  description?: string;
  type: 'direct' | 'group' | 'support';
  participants: string[]; // User IDs
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  isArchived: boolean;
  settings: ChatRoomSettings;
}

export interface ChatRoomSettings {
  allowFileSharing: boolean;
  allowImageSharing: boolean;
  maxFileSize: number; // in bytes
  retentionDays?: number; // how long to keep messages
  notifications: boolean;
}

export interface ChatNotification {
  id: string;
  userId: string;
  conversationId: string;
  messageId: string;
  type: 'new_message' | 'mention' | 'file_shared';
  isRead: boolean;
  createdAt: Date;
}

export interface ChatTypingIndicator {
  userId: string;
  conversationId: string;
  isTyping: boolean;
  timestamp: Date;
}

export interface ChatSearchResult {
  messageId: string;
  conversationId: string;
  content: string;
  timestamp: Date;
  sender: ChatParticipant;
  context: string; // surrounding text for context
}

export interface ChatFilter {
  conversationId?: string;
  senderId?: string;
  senderType?: 'admin' | 'provider' | 'customer';
  messageType?: 'text' | 'image' | 'file' | 'system';
  dateFrom?: Date;
  dateTo?: Date;
  status?: 'sent' | 'delivered' | 'read';
  hasAttachments?: boolean;
}

export interface ChatStats {
  totalMessages: number;
  totalConversations: number;
  activeConversations: number;
  averageResponseTime: number; // in minutes
  messagesByType: Record<string, number>;
  messagesByStatus: Record<string, number>;
  topParticipants: Array<{
    participant: ChatParticipant;
    messageCount: number;
  }>;
}

// API Response types
export interface ChatApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedChatResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// WebSocket event types
export interface ChatWebSocketEvent {
  type: 'message' | 'typing' | 'status_update' | 'user_joined' | 'user_left';
  payload: unknown;
  timestamp: Date;
  conversationId: string;
}

export interface MessageDeliveryStatus {
  messageId: string;
  status: 'sent' | 'delivered' | 'read';
  timestamp: Date;
  userId: string;
}

// Chat store state interface
export interface ChatState {
  conversations: ChatConversation[];
  messages: Record<string, ChatMessage[]>; // conversationId -> messages
  activeConversation: string | null;
  participants: ChatParticipant[];
  typingIndicators: ChatTypingIndicator[];
  notifications: ChatNotification[];
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

// Chat service interface
export interface ChatServiceInterface {
  // Conversation management
  getConversations(): Promise<ChatConversation[]>;
  getConversation(id: string): Promise<ChatConversation>;
  createConversation(participants: string[], type?: 'direct' | 'group'): Promise<ChatConversation>;
  archiveConversation(id: string): Promise<void>;
  deleteConversation(id: string): Promise<void>;

  // Message management
  getMessages(conversationId: string, page?: number, limit?: number): Promise<PaginatedChatResponse<ChatMessage>>;
  sendMessage(conversationId: string, content: string, type?: 'text' | 'image' | 'file'): Promise<ChatMessage>;
  editMessage(messageId: string, content: string): Promise<ChatMessage>;
  deleteMessage(messageId: string): Promise<void>;
  markAsRead(conversationId: string, messageIds: string[]): Promise<void>;

  // File handling
  uploadFile(file: File, conversationId: string): Promise<ChatAttachment>;
  downloadFile(attachmentId: string): Promise<Blob>;

  // Search and filter
  searchMessages(query: string, filter?: ChatFilter): Promise<ChatSearchResult[]>;
  filterMessages(conversationId: string, filter: ChatFilter): Promise<ChatMessage[]>;

  // Real-time features
  startTyping(conversationId: string): void;
  stopTyping(conversationId: string): void;
  subscribeToConversation(conversationId: string): void;
  unsubscribeFromConversation(conversationId: string): void;

  // Notifications
  getNotifications(): Promise<ChatNotification[]>;
  markNotificationAsRead(notificationId: string): Promise<void>;
  clearAllNotifications(): Promise<void>;

  // Statistics
  getChatStats(dateFrom?: Date, dateTo?: Date): Promise<ChatStats>;
}
