import { useState, useEffect, useRef } from 'react';
import { Send, Copy, ThumbsUp, ThumbsDown, Trash2, Download, BrainCircuit, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@/hooks/use-chat';
import { StudioType } from '@/types/studio';
import { useToast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  studioType: StudioType;
  apiKeyValid: boolean;
  onApiKeyRequired: () => void;
}

export function ChatInterface({ 
  studioType, 
  apiKeyValid, 
  onApiKeyRequired 
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  const {
    messages,
    isStreaming,
    metrics,
    sendMessage,
    clearChat,
    exportChat,
    initializeChat,
  } = useChat({ studioType });

  useEffect(() => {
    initializeChat();
  }, [studioType, initializeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    if (!apiKeyValid) {
      onApiKeyRequired();
      return;
    }

    const message = input.trim();
    setInput('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      await sendMessage(message);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: "Message copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy message",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${apiKeyValid ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-600">
              {apiKeyValid ? 'API Connected' : 'API Disconnected'}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Tokens: <span className="font-semibold text-primary">{metrics.tokensUsed.toLocaleString()}</span>
          </div>
          <div className="text-sm text-gray-500">
            Speed: <span className="font-semibold text-primary">{metrics.processingSpeed}ms</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={clearChat}>
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={exportChat}>
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="chat-message"
            >
              {message.sender === 'user' ? (
                <div className="flex items-start space-x-3 justify-end">
                  <div className="bg-primary text-white rounded-lg p-4 max-w-2xl">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <BrainCircuit className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-lg p-4 max-w-2xl shadow-sm border border-gray-200">
                    <p className="text-gray-900 whitespace-pre-wrap">{message.content}</p>
                    <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(message.content)}
                        className="p-1 h-auto"
                      >
                        <Copy className="w-4 h-4 text-gray-400" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1 h-auto">
                        <ThumbsUp className="w-4 h-4 text-gray-400" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1 h-auto">
                        <ThumbsDown className="w-4 h-4 text-gray-400" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isStreaming && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start space-x-3"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator" />
                <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-end space-x-4">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="resize-none min-h-[56px] pr-12"
              disabled={isStreaming}
            />
          </div>
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="bg-primary hover:bg-primary/90 px-6"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
