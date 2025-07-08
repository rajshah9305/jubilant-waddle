import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface ApiKeyInfo {
  id: string;
  name: string;
  provider: string;
  status: 'active' | 'inactive' | 'expired' | 'invalid';
  lastUsed: Date;
  usageCount: number;
  rateLimit: number;
}

interface ApiKeyContextType {
  isValid: boolean;
  isLoading: boolean;
  currentKey: ApiKeyInfo | null;
  apiKeys: ApiKeyInfo[];
  updateApiKey: (key: string) => Promise<void>;
  addApiKey: (key: string, name: string, provider: string) => Promise<boolean>;
  removeApiKey: (keyId: string) => Promise<void>;
  validateApiKey: (key: string, provider: string) => Promise<boolean>;
  setActiveKey: (keyId: string) => Promise<void>;
  checkValidity: () => void;
  refreshKeys: () => Promise<void>;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKey] = useState<string>('');
  const [currentKey, setCurrentKey] = useState<ApiKeyInfo | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKeyInfo[]>([]);
  const queryClient = useQueryClient();

  // Check API key validity
  const { data: validationData, isLoading } = useQuery({
    queryKey: ['/api/user/api-key/validate'],
    refetchInterval: false,
  });

  // Load API keys list
  const { data: apiKeysData } = useQuery({
    queryKey: ['/api/user/api-keys'],
    refetchInterval: false,
  });

  const updateApiKeyMutation = useMutation({
    mutationFn: async (key: string) => {
      const response = await apiRequest('PUT', '/api/user/api-key', { apiKey: key });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/api-key/validate'] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/api-keys'] });
    },
  });

  const addApiKeyMutation = useMutation({
    mutationFn: async ({ key, name, provider }: { key: string; name: string; provider: string }) => {
      const response = await apiRequest('POST', '/api/user/api-keys', { 
        apiKey: key, 
        name, 
        provider 
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/api-keys'] });
    },
  });

  const removeApiKeyMutation = useMutation({
    mutationFn: async (keyId: string) => {
      const response = await apiRequest('DELETE', `/api/user/api-keys/${keyId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/api-keys'] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/api-key/validate'] });
    },
  });

  const updateApiKey = async (key: string) => {
    setApiKey(key);
    localStorage.setItem('cerebras-api-key', key);
    await updateApiKeyMutation.mutateAsync(key);
  };

  const addApiKey = async (key: string, name: string, provider: string): Promise<boolean> => {
    try {
      await addApiKeyMutation.mutateAsync({ key, name, provider });
      return true;
    } catch (error) {
      console.error('Failed to add API key:', error);
      return false;
    }
  };

  const removeApiKey = async (keyId: string) => {
    await removeApiKeyMutation.mutateAsync(keyId);
  };

  const validateApiKey = async (key: string, provider: string): Promise<boolean> => {
    try {
      const response = await apiRequest('POST', '/api/user/api-key/validate', { 
        apiKey: key, 
        provider 
      });
      const data = await response.json();
      return data.valid;
    } catch (error) {
      console.error('Failed to validate API key:', error);
      return false;
    }
  };

  const setActiveKey = async (keyId: string) => {
    try {
      const response = await apiRequest('POST', `/api/user/api-keys/${keyId}/activate`);
      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ['/api/user/api-key/validate'] });
        queryClient.invalidateQueries({ queryKey: ['/api/user/api-keys'] });
      }
    } catch (error) {
      console.error('Failed to set active key:', error);
    }
  };

  const refreshKeys = async () => {
    queryClient.invalidateQueries({ queryKey: ['/api/user/api-keys'] });
  };

  const checkValidity = () => {
    queryClient.invalidateQueries({ queryKey: ['/api/user/api-key/validate'] });
  };

  useEffect(() => {
    // Load API key from localStorage on mount
    const savedKey = localStorage.getItem('cerebras-api-key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  useEffect(() => {
    // Update current key and keys list when data changes
    if (validationData?.keyInfo) {
      setCurrentKey(validationData.keyInfo);
    }
    if (apiKeysData?.keys) {
      setApiKeys(apiKeysData.keys);
    }
  }, [validationData, apiKeysData]);

  const value = {
    isValid: validationData?.valid || false,
    isLoading,
    currentKey,
    apiKeys,
    updateApiKey,
    addApiKey,
    removeApiKey,
    validateApiKey,
    setActiveKey,
    checkValidity,
    refreshKeys,
  };

  return (
    <ApiKeyContext.Provider value={value}>
      {children}
    </ApiKeyContext.Provider>
  );
}

export function useApiKey() {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
}
