import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Badge } from '@/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip,
  Smile,
  MessageSquare,
  Clock,
  CheckCheck,
  ArrowLeft
} from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
  unreadCount?: number;
  serviceType: string;
}

interface Message {
  id: string;
  senderId: string;
  senderType: 'admin' | 'provider';
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
}

interface Conversation {
  providerId: string;
  messages: Message[];
  lastMessage?: Message;
}

const Chat: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'offline'>('all');
  const [showProviderList, setShowProviderList] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setShowProviderList(!selectedProvider);
      } else {
        setShowProviderList(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [selectedProvider]);

  // Mock data - replace with actual API calls
  const providers: Provider[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      status: 'online',
      unreadCount: 3,
      serviceType: 'Plumbing'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      status: 'away',
      lastSeen: '2 hours ago',
      unreadCount: 1,
      serviceType: 'Electrical'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@example.com',
      status: 'offline',
      lastSeen: '1 day ago',
      serviceType: 'Cleaning'
    },
    {
      id: '4',
      name: 'Emma Davis',
      email: 'emma@example.com',
      status: 'online',
      serviceType: 'Gardening'
    }
  ];

  const conversations: Record<string, Conversation> = {
    '1': {
      providerId: '1',
      messages: [
        {
          id: '1',
          senderId: '1',
          senderType: 'provider',
          content: 'Hello admin, I have a question about the new booking system.',
          timestamp: new Date(Date.now() - 3600000),
          status: 'read',
          type: 'text'
        },
        {
          id: '2',
          senderId: 'admin',
          senderType: 'admin',
          content: 'Hi John! I\'d be happy to help. What specific issue are you facing?',
          timestamp: new Date(Date.now() - 3000000),
          status: 'read',
          type: 'text'
        },
        {
          id: '3',
          senderId: '1',
          senderType: 'provider',
          content: 'I\'m not receiving notifications for new bookings. Could you check my settings?',
          timestamp: new Date(Date.now() - 1800000),
          status: 'delivered',
          type: 'text'
        }
      ]
    },
    '2': {
      providerId: '2',
      messages: [
        {
          id: '4',
          senderId: '2',
          senderType: 'provider',
          content: 'Can you help me update my service pricing?',
          timestamp: new Date(Date.now() - 7200000),
          status: 'read',
          type: 'text'
        }
      ]
    }
  };

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || provider.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const currentConversation = selectedProvider ? conversations[selectedProvider] : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedProvider) return;

    // Here you would typically send the message to your backend
    console.log('Sending message:', message, 'to provider:', selectedProvider);
    
    setMessage('');
  };

  const getStatusColor = (status: Provider['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (provider: Provider) => {
    if (provider.status === 'online') return 'Online';
    if (provider.status === 'away') return 'Away';
    return provider.lastSeen ? `Last seen ${provider.lastSeen}` : 'Offline';
  };

  const formatMessageTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    if (isMobile) {
      setShowProviderList(false);
    }
  };

  const handleBackToProviders = () => {
    if (isMobile) {
      setSelectedProvider(null);
      setShowProviderList(true);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-2 md:gap-4 relative">
      {/* Mobile Header - Only show on mobile when chat is open */}
      {isMobile && selectedProvider && !showProviderList && (
        <div className="flex items-center gap-3 p-4 bg-gray-800/30 backdrop-blur-xl border-gray-700/50 rounded-lg mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToProviders}
            className="text-gray-400 hover:text-white p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gray-600 text-white text-sm">
                  {providers.find(p => p.id === selectedProvider)?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(providers.find(p => p.id === selectedProvider)?.status || 'offline')}`} />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">
                {providers.find(p => p.id === selectedProvider)?.name}
              </h3>
              <p className="text-gray-400 text-xs">
                {getStatusText(providers.find(p => p.id === selectedProvider)!)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Providers List */}
      <Card className={`${
        isMobile 
          ? showProviderList ? 'flex' : 'hidden' 
          : 'flex'
      } ${
        isMobile ? 'w-full' : 'w-80 md:w-80 lg:w-96'
      } bg-gray-800/30 backdrop-blur-xl border-gray-700/50 flex-col`}>
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Provider Chat
          </CardTitle>
          
          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
                className="text-xs"
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'online' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('online')}
                className="text-xs"
              >
                Online
              </Button>
              <Button
                variant={filterStatus === 'offline' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('offline')}
                className="text-xs"
              >
                Offline
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-0">
          <div className="space-y-1 px-4 pb-4">
            {filteredProviders.map((provider) => (
              <div
                key={provider.id}
                onClick={() => handleProviderSelect(provider.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedProvider === provider.id
                    ? 'bg-blue-600/20 border border-blue-500/30'
                    : 'hover:bg-gray-700/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={provider.avatar} />
                      <AvatarFallback className="bg-gray-600 text-white">
                        {provider.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(provider.status)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-white font-medium truncate">{provider.name}</p>
                      {provider.unreadCount && (
                        <Badge variant="destructive" className="text-xs">
                          {provider.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm truncate">{provider.serviceType}</p>
                    <p className="text-gray-500 text-xs">{getStatusText(provider)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className={`${
        isMobile 
          ? showProviderList ? 'hidden' : 'flex w-full' 
          : 'flex flex-1'
      } bg-gray-800/30 backdrop-blur-xl border-gray-700/50 flex-col`}>
        {selectedProvider ? (
          <>
            {/* Chat Header - Hide on mobile since we have mobile header */}
            <CardHeader className={`${isMobile ? 'hidden' : 'block'} border-b border-gray-700/50`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gray-600 text-white">
                        {providers.find(p => p.id === selectedProvider)?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(providers.find(p => p.id === selectedProvider)?.status || 'offline')}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {providers.find(p => p.id === selectedProvider)?.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {getStatusText(providers.find(p => p.id === selectedProvider)!)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-2 md:p-4 space-y-3 md:space-y-4">
              {currentConversation?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderType === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 md:px-4 py-2 rounded-lg ${
                    msg.senderType === 'admin'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-white'
                  }`}>
                    <p className="text-sm break-words">{msg.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs opacity-70">
                        {formatMessageTime(msg.timestamp)}
                      </span>
                      {msg.senderType === 'admin' && (
                        <div className="ml-2">
                          {msg.status === 'sent' && <Clock className="w-3 h-3 opacity-70" />}
                          {msg.status === 'delivered' && <CheckCheck className="w-3 h-3 opacity-70" />}
                          {msg.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-300" />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Message Input */}
            <div className="p-2 md:p-4 border-t border-gray-700/50">
              <div className="flex items-center gap-1 md:gap-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2 md:p-3">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 pr-10 text-sm md:text-base"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 md:p-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center text-gray-400">
              <MessageSquare className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-base md:text-lg font-medium mb-2">Select a Provider</h3>
              <p className="text-xs md:text-sm">Choose a provider from the list to start chatting</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Chat;
