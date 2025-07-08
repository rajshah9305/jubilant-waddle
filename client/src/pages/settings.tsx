import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe,
  Key,
  Database,
  Monitor,
  Smartphone,
  Moon,
  Sun,
  Download,
  Upload,
  Trash2,
  Save
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ApiKeyManagement } from '@/components/settings/api-key-management';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '',
    bio: 'AI enthusiast and content creator',
    timezone: 'UTC-5',
    language: 'en'
  });
  
  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
    emailNotifications: true,
    marketingEmails: false,
    autoSave: true,
    compactMode: false,
    showMetrics: true,
    soundEffects: true
  });

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully updated.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be ready shortly.",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Data Import",
      description: "Please select a file to import your data.",
    });
  };

  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:block">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="api-keys" className="flex items-center space-x-2">
              <Key className="w-4 h-4" />
              <span className="hidden sm:block">API Keys</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center space-x-2">
              <SettingsIcon className="w-4 h-4" />
              <span className="hidden sm:block">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:block">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:block">Data</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-6 h-6 text-blue-600" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={profile.timezone}
                      onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                    >
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-7">Mountain Time (UTC-7)</option>
                      <option value="UTC-6">Central Time (UTC-6)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC+0">GMT (UTC+0)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={profile.language}
                      onChange={(e) => setProfile({...profile, language: e.target.value})}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full md:w-auto">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api-keys">
            <ApiKeyManagement />
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-6 h-6 text-purple-600" />
                  <span>Interface Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-gray-600">Enable dark theme for better night viewing</p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={preferences.darkMode}
                    onCheckedChange={(checked) => setPreferences({...preferences, darkMode: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact-mode">Compact Mode</Label>
                    <p className="text-sm text-gray-600">Reduce spacing for a more compact interface</p>
                  </div>
                  <Switch
                    id="compact-mode"
                    checked={preferences.compactMode}
                    onCheckedChange={(checked) => setPreferences({...preferences, compactMode: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-metrics">Show Performance Metrics</Label>
                    <p className="text-sm text-gray-600">Display response time and token usage metrics</p>
                  </div>
                  <Switch
                    id="show-metrics"
                    checked={preferences.showMetrics}
                    onCheckedChange={(checked) => setPreferences({...preferences, showMetrics: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sound-effects">Sound Effects</Label>
                    <p className="text-sm text-gray-600">Play sounds for notifications and actions</p>
                  </div>
                  <Switch
                    id="sound-effects"
                    checked={preferences.soundEffects}
                    onCheckedChange={(checked) => setPreferences({...preferences, soundEffects: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-save">Auto-Save</Label>
                    <p className="text-sm text-gray-600">Automatically save your work</p>
                  </div>
                  <Switch
                    id="auto-save"
                    checked={preferences.autoSave}
                    onCheckedChange={(checked) => setPreferences({...preferences, autoSave: checked})}
                  />
                </div>

                <Button onClick={handleSave} className="w-full md:w-auto">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-6 h-6 text-green-600" />
                  <span>Notification Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications in your browser</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={preferences.notifications}
                    onCheckedChange={(checked) => setPreferences({...preferences, notifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Get notified via email for important updates</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => setPreferences({...preferences, emailNotifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-gray-600">Receive promotional emails and product updates</p>
                  </div>
                  <Switch
                    id="marketing-emails"
                    checked={preferences.marketingEmails}
                    onCheckedChange={(checked) => setPreferences({...preferences, marketingEmails: checked})}
                  />
                </div>

                <Button onClick={handleSave} className="w-full md:w-auto">
                  <Save className="w-4 h-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-6 h-6 text-orange-600" />
                  <span>Data Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Export Data</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Download all your data including projects, chat history, and settings
                    </p>
                    <Button onClick={handleExportData} variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Import Data</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Import your data from a previous export or another platform
                    </p>
                    <Button onClick={handleImportData} variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Data
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-red-600 mb-2">Danger Zone</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Permanently delete your account and all associated data
                  </p>
                  <Button variant="destructive" className="w-full md:w-auto">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}