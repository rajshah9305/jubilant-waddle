import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface ApiKeyContextType {
  isValid: boolean;
  isLoading: boolean;
  updateApiKey: (key: string) => Promise<void>;
  checkValidity: () => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKey] = useState<string>('');
  const queryClient = useQueryClient();

  // Check API key validity
  const { data: validationData, isLoading } = useQuery({
    queryKey: ['/api/user/api-key/validate'],
    refetchInterval: false,
  });

  const updateApiKeyMutation = useMutation({
    mutationFn: async (key: string) => {
      const response = await apiRequest('PUT', '/api/user/api-key', { apiKey: key });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/api-key/validate'] });
    },
  });

  const updateApiKey = async (key: string) => {
    setApiKey(key);
    localStorage.setItem('cerebras-api-key', key);
    await updateApiKeyMutation.mutateAsync(key);
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

  const value = {
    isValid: validationData?.valid || false,
    isLoading,
    updateApiKey,
    checkValidity,
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
