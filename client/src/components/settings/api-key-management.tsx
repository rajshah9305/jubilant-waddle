import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Key, 
  Eye, 
  EyeOff, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Copy,
  Trash2,
  Plus,
  Settings,
  Lock,
  Unlock,
  Calendar,
  Activity,
  BarChart3,
  Globe,
  Server,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useApiKey } from '@/hooks/use-api-key';

interface ApiKeyInfo {
  id: string;
  name: string;
  key: string;
  provider: 'cerebras' | 'openai' | 'claude' | 'custom';
  status: 'active' | 'inactive' | 'expired' | 'invalid';
  createdAt: Date;
  lastUsed: Date;
  usageCount: number;
  rateLimit: number;
  permissions: string[];
  environment: 'production' | 'development' | 'staging';
}

interface ApiKeyUsage {
  date: string;
  requests: number;
  tokens: number;
  errors: number;
  responseTime: number;
}

export function ApiKeyManagement() {
  const [apiKeys, setApiKeys] = useState<ApiKeyInfo[]>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<'cerebras' | 'openai' | 'claude' | 'custom'>('cerebras');
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [isValidating, setIsValidating] = useState<string | null>(null);
  const [usageData, setUsageData] = useState<ApiKeyUsage[]>([]);
  const [activeTab, setActiveTab] = useState('keys');
  const { toast } = useToast();
  const { isValid: currentKeyValid, updateApiKey, checkValidity } = useApiKey();

  useEffect(() => {
    loadApiKeys();
    loadUsageData();
  }, []);

  const loadApiKeys = async () => {
    // Simulate loading existing API keys
    const mockKeys: ApiKeyInfo[] = [
      {
        id: '1',
        name: 'Primary Cerebras Key',
        key: 'sk-cb-1234567890abcdef',
        provider: 'cerebras',
        status: 'active',
        createdAt: new Date('2024-01-15'),
        lastUsed: new Date('2024-01-20'),
        usageCount: 1247,
        rateLimit: 10000,
        permissions: ['text-generation', 'code-generation', 'document-analysis'],
        environment: 'production'
      },
      {
        id: '2',
        name: 'Development Key',
        key: 'sk-cb-dev-abcdef123456',
        provider: 'cerebras',
        status: 'active',
        createdAt: new Date('2024-01-10'),
        lastUsed: new Date('2024-01-18'),
        usageCount: 423,
        rateLimit: 5000,
        permissions: ['text-generation', 'code-generation'],
        environment: 'development'
      },
      {
        id: '3',
        name: 'Backup OpenAI Key',
        key: 'sk-openai-backup123',
        provider: 'openai',
        status: 'inactive',
        createdAt: new Date('2024-01-05'),
        lastUsed: new Date('2024-01-12'),
        usageCount: 89,
        rateLimit: 3000,
        permissions: ['text-generation'],
        environment: 'production'
      }
    ];
    setApiKeys(mockKeys);
  };

  const loadUsageData = async () => {
    // Simulate loading usage analytics
    const mockUsage: ApiKeyUsage[] = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      requests: Math.floor(Math.random() * 100) + 50,
      tokens: Math.floor(Math.random() * 5000) + 1000,
      errors: Math.floor(Math.random() * 5),
      responseTime: Math.random() * 2 + 1
    }));
    setUsageData(mockUsage);
  };

  const validateApiKey = async (key: string, provider: string) => {
    setIsValidating(key);
    try {
      // Simulate API key validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation logic
      const isValid = key.length > 10 && key.startsWith('sk-');
      
      if (isValid) {
        toast({
          title: "API Key Valid",
          description: "The API key has been successfully validated.",
        });
        return true;
      } else {
        toast({
          title: "Invalid API Key",
          description: "The API key format is incorrect or expired.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Failed to validate API key. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsValidating(null);
    }
  };

  const addApiKey = async () => {
    if (!newKeyName.trim() || !newKeyValue.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both key name and value.",
        variant: "destructive",
      });
      return;
    }

    const isValid = await validateApiKey(newKeyValue, selectedProvider);
    if (!isValid) return;

    const newKey: ApiKeyInfo = {
      id: Date.now().toString(),
      name: newKeyName,
      key: newKeyValue,
      provider: selectedProvider,
      status: 'active',
      createdAt: new Date(),
      lastUsed: new Date(),
      usageCount: 0,
      rateLimit: selectedProvider === 'cerebras' ? 10000 : 5000,
      permissions: ['text-generation', 'code-generation', 'document-analysis'],
      environment: 'production'
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setNewKeyValue('');
    setShowNewKeyForm(false);
    
    toast({
      title: "API Key Added",
      description: `${newKeyName} has been successfully added and validated.`,
    });
  };

  const removeApiKey = async (keyId: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
    toast({
      title: "API Key Removed",
      description: "The API key has been successfully removed.",
    });
  };

  const toggleKeyVisibility = (keyId: string) => {
    const newVisibleKeys = new Set(visibleKeys);
    if (newVisibleKeys.has(keyId)) {
      newVisibleKeys.delete(keyId);
    } else {
      newVisibleKeys.add(keyId);
    }
    setVisibleKeys(newVisibleKeys);
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 8) + '•'.repeat(key.length - 12) + key.substring(key.length - 4);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: "API key copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy API key",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'invalid': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'cerebras': return <Zap className="w-4 h-4 text-blue-600" />;
      case 'openai': return <Globe className="w-4 h-4 text-green-600" />;
      case 'claude': return <Server className="w-4 h-4 text-purple-600" />;
      case 'custom': return <Settings className="w-4 h-4 text-orange-600" />;
      default: return <Key className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <span>API Key Management</span>
          </CardTitle>
          <p className="text-sm text-blue-700">
            Manage your API keys securely with advanced validation and monitoring
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="space-y-6">
          {/* Add New Key Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add New API Key</span>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewKeyForm(!showNewKeyForm)}
                >
                  {showNewKeyForm ? 'Cancel' : 'Add Key'}
                </Button>
              </div>
            </CardHeader>
            {showNewKeyForm && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="keyName">Key Name</Label>
                    <Input
                      id="keyName"
                      placeholder="e.g., Production Key"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="provider">Provider</Label>
                    <select
                      id="provider"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={selectedProvider}
                      onChange={(e) => setSelectedProvider(e.target.value as any)}
                    >
                      <option value="cerebras">Cerebras</option>
                      <option value="openai">OpenAI</option>
                      <option value="claude">Claude</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="keyValue">API Key</Label>
                  <Input
                    id="keyValue"
                    type="password"
                    placeholder="sk-..."
                    value={newKeyValue}
                    onChange={(e) => setNewKeyValue(e.target.value)}
                  />
                </div>
                <Button onClick={addApiKey} className="w-full">
                  Add and Validate Key
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Existing Keys */}
          <div className="space-y-4">
            {apiKeys.map((keyInfo) => (
              <motion.div
                key={keyInfo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getProviderIcon(keyInfo.provider)}
                        <div>
                          <h3 className="font-semibold">{keyInfo.name}</h3>
                          <p className="text-sm text-gray-600 capitalize">{keyInfo.provider} • {keyInfo.environment}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(keyInfo.status)}>
                          {keyInfo.status.toUpperCase()}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeApiKey(keyInfo.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Key Display */}
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-100 rounded-md p-3 font-mono text-sm">
                          {visibleKeys.has(keyInfo.id) ? keyInfo.key : maskKey(keyInfo.key)}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleKeyVisibility(keyInfo.id)}
                        >
                          {visibleKeys.has(keyInfo.id) ? 
                            <EyeOff className="w-4 h-4" /> : 
                            <Eye className="w-4 h-4" />
                          }
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(keyInfo.key)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => validateApiKey(keyInfo.key, keyInfo.provider)}
                          disabled={isValidating === keyInfo.key}
                        >
                          {isValidating === keyInfo.key ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Usage</p>
                          <p className="font-semibold">{keyInfo.usageCount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Rate Limit</p>
                          <p className="font-semibold">{keyInfo.rateLimit.toLocaleString()}/day</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Created</p>
                          <p className="font-semibold">{keyInfo.createdAt.toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Last Used</p>
                          <p className="font-semibold">{keyInfo.lastUsed.toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Permissions */}
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Permissions:</p>
                        <div className="flex flex-wrap gap-2">
                          {keyInfo.permissions.map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission.replace('-', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-6 h-6 text-green-600" />
                <span>Usage Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {usageData.reduce((sum, day) => sum + day.requests, 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">Total Requests</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {usageData.reduce((sum, day) => sum + day.tokens, 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">Total Tokens</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {usageData.reduce((sum, day) => sum + day.errors, 0)}
                  </div>
                  <p className="text-sm text-gray-600">Total Errors</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {(usageData.reduce((sum, day) => sum + day.responseTime, 0) / usageData.length).toFixed(1)}s
                  </div>
                  <p className="text-sm text-gray-600">Avg Response Time</p>
                </div>
              </div>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Usage chart would be rendered here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-6 h-6 text-red-600" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-rotate">Auto-rotate Keys</Label>
                  <p className="text-sm text-gray-600">Automatically rotate API keys every 90 days</p>
                </div>
                <Switch id="auto-rotate" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="usage-alerts">Usage Alerts</Label>
                  <p className="text-sm text-gray-600">Get notified when approaching rate limits</p>
                </div>
                <Switch id="usage-alerts" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ip-whitelist">IP Whitelisting</Label>
                  <p className="text-sm text-gray-600">Restrict API key usage to specific IP addresses</p>
                </div>
                <Switch id="ip-whitelist" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="audit-logs">Audit Logging</Label>
                  <p className="text-sm text-gray-600">Enable detailed audit logs for all API key usage</p>
                </div>
                <Switch id="audit-logs" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}