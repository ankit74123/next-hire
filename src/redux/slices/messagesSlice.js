import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: [],
  selectedConversation: null,
  templates: [],
  unreadCount: 0,
  filters: {
    search: '',
    status: 'all' // 'all', 'unread', 'archived'
  },
  loading: false,
  error: null
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // Conversations Management
    setConversations: (state, action) => {
      state.conversations = action.payload;
      state.unreadCount = action.payload.filter(c => c.unread).length;
    },
    
    addConversation: (state, action) => {
      state.conversations.push(action.payload);
      if (action.payload.unread) {
        state.unreadCount += 1;
      }
    },
    
    updateConversation: (state, action) => {
      const index = state.conversations.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        const wasUnread = state.conversations[index].unread;
        state.conversations[index] = { ...state.conversations[index], ...action.payload };
        
        // Update unread count
        if (wasUnread && !action.payload.unread) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        } else if (!wasUnread && action.payload.unread) {
          state.unreadCount += 1;
        }
      }
    },
    
    deleteConversation: (state, action) => {
      const conversation = state.conversations.find(c => c.id === action.payload);
      if (conversation && conversation.unread) {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      state.conversations = state.conversations.filter(c => c.id !== action.payload);
    },
    
    // Messages Management
    sendMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      const conversation = state.conversations.find(c => c.id === conversationId);
      
      if (conversation) {
        const newMessage = {
          ...message,
          id: conversation.messages.length + 1,
          sender: 'recruiter',
          timestamp: new Date().toISOString(),
          read: false
        };
        
        conversation.messages.push(newMessage);
        conversation.lastMessage = message.text;
        conversation.timestamp = new Date().toISOString();
      }
    },
    
    receiveMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      const conversation = state.conversations.find(c => c.id === conversationId);
      
      if (conversation) {
        const newMessage = {
          ...message,
          id: conversation.messages.length + 1,
          sender: 'candidate',
          timestamp: new Date().toISOString(),
          read: false
        };
        
        conversation.messages.push(newMessage);
        conversation.lastMessage = message.text;
        conversation.timestamp = new Date().toISOString();
        conversation.unread = true;
        state.unreadCount += 1;
      }
    },
    
    // Mark as Read
    markAsRead: (state, action) => {
      const conversation = state.conversations.find(c => c.id === action.payload);
      if (conversation && conversation.unread) {
        conversation.unread = false;
        conversation.messages = conversation.messages.map(m => ({ ...m, read: true }));
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    
    markAllAsRead: (state) => {
      state.conversations = state.conversations.map(c => ({
        ...c,
        unread: false,
        messages: c.messages.map(m => ({ ...m, read: true }))
      }));
      state.unreadCount = 0;
    },
    
    // Archive
    archiveConversation: (state, action) => {
      const conversation = state.conversations.find(c => c.id === action.payload);
      if (conversation) {
        conversation.archived = true;
        if (conversation.unread) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      }
    },
    
    unarchiveConversation: (state, action) => {
      const conversation = state.conversations.find(c => c.id === action.payload);
      if (conversation) {
        conversation.archived = false;
      }
    },
    
    // Selected Conversation
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
      
      // Mark as read when selected
      if (action.payload) {
        const conversation = state.conversations.find(c => c.id === action.payload.id);
        if (conversation && conversation.unread) {
          conversation.unread = false;
          conversation.messages = conversation.messages.map(m => ({ ...m, read: true }));
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      }
    },
    
    clearSelectedConversation: (state) => {
      state.selectedConversation = null;
    },
    
    // Templates Management
    setTemplates: (state, action) => {
      state.templates = action.payload;
    },
    
    addTemplate: (state, action) => {
      state.templates.push({
        ...action.payload,
        id: state.templates.length + 1,
        createdAt: new Date().toISOString()
      });
    },
    
    updateTemplate: (state, action) => {
      const index = state.templates.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.templates[index] = { 
          ...state.templates[index], 
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
      }
    },
    
    deleteTemplate: (state, action) => {
      state.templates = state.templates.filter(t => t.id !== action.payload);
    },
    
    incrementTemplateUsage: (state, action) => {
      const template = state.templates.find(t => t.id === action.payload);
      if (template) {
        template.usageCount = (template.usageCount || 0) + 1;
        template.lastUsed = new Date().toISOString();
      }
    },
    
    // Filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    
    // Search
    setSearchQuery: (state, action) => {
      state.filters.search = action.payload;
    },
    
    // Bulk Actions
    sendBulkMessage: (state, action) => {
      const { conversationIds, message } = action.payload;
      conversationIds.forEach(id => {
        const conversation = state.conversations.find(c => c.id === id);
        if (conversation) {
          const newMessage = {
            ...message,
            id: conversation.messages.length + 1,
            sender: 'recruiter',
            timestamp: new Date().toISOString(),
            read: false
          };
          
          conversation.messages.push(newMessage);
          conversation.lastMessage = message.text;
          conversation.timestamp = new Date().toISOString();
        }
      });
    },
    
    // Loading and Error
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    // Reset
    resetMessages: (state) => {
      return initialState;
    }
  }
});

export const {
  setConversations,
  addConversation,
  updateConversation,
  deleteConversation,
  sendMessage,
  receiveMessage,
  markAsRead,
  markAllAsRead,
  archiveConversation,
  unarchiveConversation,
  setSelectedConversation,
  clearSelectedConversation,
  setTemplates,
  addTemplate,
  updateTemplate,
  deleteTemplate,
  incrementTemplateUsage,
  setFilters,
  clearFilters,
  setSearchQuery,
  sendBulkMessage,
  setLoading,
  setError,
  clearError,
  resetMessages
} = messagesSlice.actions;

export default messagesSlice.reducer;
