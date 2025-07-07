import { useState, useRef, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { ChatMessage, StudioType } from '@/types/studio';
import { nanoid } from 'nanoid';

interface UseChatProps {
  studioType: StudioType;
  projectId?: number;
}

export function useChat({ studioType, projectId }: UseChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [metrics, setMetrics] = useState({
    tokensUsed: 0,
    processingSpeed: 0,
  });
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);

  const welcomeMessages = {
    text: "Welcome to the Text Generation Studio! I'm here to help you create compelling content. What would you like to work on today?",
    code: "Welcome to the Code Generation Studio! I can help you write, debug, and optimize code. What programming challenge can I assist with?",
    document: "Welcome to the Document AI Studio! I can analyze, summarize, and extract insights from your documents. Upload a file or ask me anything!",
    creative: "Welcome to the Creative Writing Studio! Let's craft amazing stories, poetry, or creative content together. What shall we create?"
  };

  // Initialize with welcome message
  const initializeChat = useCallback(() => {
    setMessages([{
      id: nanoid(),
      content: welcomeMessages[studioType],
      sender: 'ai',
      timestamp: new Date(),
    }]);
  }, [studioType]);

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const userMessage: ChatMessage = {
        id: nanoid(),
        content,
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setIsStreaming(true);

      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch('/api/ai/generate-simple', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: content,
            studioType,
            projectId,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to generate response');
        }

        const data = await response.json();
        
        const aiMessage: ChatMessage = {
          id: nanoid(),
          content: data.content,
          sender: 'ai',
          timestamp: new Date(),
          tokensUsed: data.tokensUsed,
        };

        setMessages(prev => [...prev, aiMessage]);
        
        // Update metrics
        setMetrics(prev => ({
          tokensUsed: prev.tokensUsed + (data.tokensUsed || 0),
          processingSpeed: data.processingTime || prev.processingSpeed,
        }));

        return aiMessage;
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    onError: (error) => {
      console.error('Failed to send message:', error);
      setIsStreaming(false);
    },
  });

  const sendMessage = useCallback((content: string) => {
    return sendMessageMutation.mutateAsync(content);
  }, [sendMessageMutation]);

  const clearChat = useCallback(() => {
    setMessages([{
      id: nanoid(),
      content: welcomeMessages[studioType],
      sender: 'ai',
      timestamp: new Date(),
    }]);
    setMetrics({ tokensUsed: 0, processingSpeed: 0 });
  }, [studioType]);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  }, []);

  const exportChat = useCallback(() => {
    const chatData = {
      studioType,
      messages,
      metrics,
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cerebras-chat-${studioType}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [studioType, messages, metrics]);

  return {
    messages,
    isStreaming,
    metrics,
    sendMessage,
    clearChat,
    stopGeneration,
    exportChat,
    initializeChat,
    isLoading: sendMessageMutation.isPending,
  };
}
