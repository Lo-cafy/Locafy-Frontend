import type { 
  ChatMessage, 
  ChatConversation, 
  ChatParticipant, 
  ChatAttachment,
  ChatNotification,
  ChatStats,
  ChatFilter,
  ChatSearchResult,
  PaginatedChatResponse,
  ChatApiResponse,
  ChatServiceInterface
} from '@/types/chat.types';

class ChatService implements ChatServiceInterface {
  private baseUrl = '/chat';
  private wsConnection: WebSocket | null = null;
  private eventListeners: Map<string, ((data: unknown) => void)[]> = new Map();

  // WebSocket connection management
  private connectWebSocket() {
    if (this.wsConnection?.readyState === WebSocket.OPEN) {
      return;
    }

    const wsUrl = `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws/chat`;
    this.wsConnection = new WebSocket(wsUrl);

    this.wsConnection.onopen = () => {
      console.log('Chat WebSocket connected');
      this.emit('connected', true);
    };

    this.wsConnection.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleWebSocketMessage(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.wsConnection.onclose = () => {
      console.log('Chat WebSocket disconnected');
      this.emit('connected', false);
      // Attempt to reconnect after 3 seconds
      setTimeout(() => this.connectWebSocket(), 3000);
    };

    this.wsConnection.onerror = (error) => {
      console.error('Chat WebSocket error:', error);
      this.emit('error', error);
    };
  }

  private handleWebSocketMessage(data: { type: string; payload: unknown }) {
    switch (data.type) {
      case 'new_message':
        this.emit('message', data.payload);
        break;
      case 'typing':
        this.emit('typing', data.payload);
        break;
      case 'status_update':
        this.emit('status_update', data.payload);
        break;
      case 'user_joined':
        this.emit('user_joined', data.payload);
        break;
      case 'user_left':
        this.emit('user_left', data.payload);
        break;
      default:
        console.log('Unknown WebSocket message type:', data.type);
    }
  }

  // Event system for real-time updates
  on(event: string, callback: (data: unknown) => void) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off(event: string, callback: (data: unknown) => void) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: unknown) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  // API helper methods
  private async apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ChatApiResponse<T> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'API request failed');
    }

    return result.data;
  }

  // Initialize the service
  initialize() {
    this.connectWebSocket();
  }

  // Cleanup
  disconnect() {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
    this.eventListeners.clear();
  }

  // Conversation management
  async getConversations(): Promise<ChatConversation[]> {
    return this.apiRequest<ChatConversation[]>('/conversations');
  }

  async getConversation(id: string): Promise<ChatConversation> {
    return this.apiRequest<ChatConversation>(`/conversations/${id}`);
  }

  async createConversation(participants: string[], type: 'direct' | 'group' = 'direct'): Promise<ChatConversation> {
    return this.apiRequest<ChatConversation>('/conversations', {
      method: 'POST',
      body: JSON.stringify({ participants, type }),
    });
  }

  async archiveConversation(id: string): Promise<void> {
    await this.apiRequest<void>(`/conversations/${id}/archive`, {
      method: 'PUT',
    });
  }

  async deleteConversation(id: string): Promise<void> {
    await this.apiRequest<void>(`/conversations/${id}`, {
      method: 'DELETE',
    });
  }

  // Message management
  async getMessages(conversationId: string, page = 1, limit = 50): Promise<PaginatedChatResponse<ChatMessage>> {
    return this.apiRequest<PaginatedChatResponse<ChatMessage>>(
      `/conversations/${conversationId}/messages?page=${page}&limit=${limit}`
    );
  }

  async sendMessage(conversationId: string, content: string, type: 'text' | 'image' | 'file' = 'text'): Promise<ChatMessage> {
    const message = await this.apiRequest<ChatMessage>(`/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content, type }),
    });

    // Send via WebSocket for real-time delivery
    if (this.wsConnection?.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify({
        type: 'send_message',
        payload: { conversationId, message },
      }));
    }

    return message;
  }

  async editMessage(messageId: string, content: string): Promise<ChatMessage> {
    return this.apiRequest<ChatMessage>(`/messages/${messageId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
  }

  async deleteMessage(messageId: string): Promise<void> {
    await this.apiRequest<void>(`/messages/${messageId}`, {
      method: 'DELETE',
    });
  }

  async markAsRead(conversationId: string, messageIds: string[]): Promise<void> {
    await this.apiRequest<void>(`/conversations/${conversationId}/read`, {
      method: 'PUT',
      body: JSON.stringify({ messageIds }),
    });

    // Send read status via WebSocket
    if (this.wsConnection?.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify({
        type: 'mark_read',
        payload: { conversationId, messageIds },
      }));
    }
  }

  // File handling
  async uploadFile(file: File, conversationId: string): Promise<ChatAttachment> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('conversationId', conversationId);

    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${this.baseUrl}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const result: ChatApiResponse<ChatAttachment> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Upload failed');
    }

    return result.data;
  }

  async downloadFile(attachmentId: string): Promise<Blob> {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${this.baseUrl}/download/${attachmentId}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      throw new Error(`Download failed: ${response.status}`);
    }

    return response.blob();
  }

  // Search and filter
  async searchMessages(query: string, filter?: ChatFilter): Promise<ChatSearchResult[]> {
    const params = new URLSearchParams({ query });
    
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    return this.apiRequest<ChatSearchResult[]>(`/search?${params.toString()}`);
  }

  async filterMessages(conversationId: string, filter: ChatFilter): Promise<ChatMessage[]> {
    const params = new URLSearchParams();
    
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    return this.apiRequest<ChatMessage[]>(`/conversations/${conversationId}/filter?${params.toString()}`);
  }

  // Real-time features
  startTyping(conversationId: string): void {
    if (this.wsConnection?.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify({
        type: 'start_typing',
        payload: { conversationId },
      }));
    }
  }

  stopTyping(conversationId: string): void {
    if (this.wsConnection?.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify({
        type: 'stop_typing',
        payload: { conversationId },
      }));
    }
  }

  subscribeToConversation(conversationId: string): void {
    if (this.wsConnection?.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify({
        type: 'subscribe',
        payload: { conversationId },
      }));
    }
  }

  unsubscribeFromConversation(conversationId: string): void {
    if (this.wsConnection?.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify({
        type: 'unsubscribe',
        payload: { conversationId },
      }));
    }
  }

  // Notifications
  async getNotifications(): Promise<ChatNotification[]> {
    return this.apiRequest<ChatNotification[]>('/notifications');
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    await this.apiRequest<void>(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  async clearAllNotifications(): Promise<void> {
    await this.apiRequest<void>('/notifications', {
      method: 'DELETE',
    });
  }

  // Statistics
  async getChatStats(dateFrom?: Date, dateTo?: Date): Promise<ChatStats> {
    const params = new URLSearchParams();
    
    if (dateFrom) {
      params.append('dateFrom', dateFrom.toISOString());
    }
    
    if (dateTo) {
      params.append('dateTo', dateTo.toISOString());
    }

    return this.apiRequest<ChatStats>(`/stats?${params.toString()}`);
  }

  // Utility methods
  async getParticipants(conversationId: string): Promise<ChatParticipant[]> {
    return this.apiRequest<ChatParticipant[]>(`/conversations/${conversationId}/participants`);
  }

  async addParticipant(conversationId: string, userId: string): Promise<void> {
    await this.apiRequest<void>(`/conversations/${conversationId}/participants`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  async removeParticipant(conversationId: string, userId: string): Promise<void> {
    await this.apiRequest<void>(`/conversations/${conversationId}/participants/${userId}`, {
      method: 'DELETE',
    });
  }

  async updateUserStatus(status: 'online' | 'offline' | 'away' | 'busy'): Promise<void> {
    await this.apiRequest<void>('/status', {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });

    // Send status update via WebSocket
    if (this.wsConnection?.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify({
        type: 'status_update',
        payload: { status },
      }));
    }
  }
}

// Create and export a singleton instance
export const chatService = new ChatService();
export default chatService;
