import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  FileText, 
  Code, 
  PenTool, 
  Feather,
  Clock,
  Zap,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendChart } from '@/components/ui/trend-chart';
import { useApiKey } from '@/hooks/use-api-key';

interface AnalyticsData {
  overview: {
    totalTokens: number;
    totalProjects: number;
    activeUsers: number;
    averageResponseTime: number;
    tokenGrowth: number;
    projectGrowth: number;
    userGrowth: number;
    responseTimeChange: number;
  };
  studioUsage: {
    text: { count: number; tokens: number; growth: number };
    code: { count: number; tokens: number; growth: number };
    document: { count: number; tokens: number; growth: number };
    creative: { count: number; tokens: number; growth: number };
  };
  timeSeriesData: Array<{
    date: string;
    tokens: number;
    projects: number;
    responseTime: number;
  }>;
  performanceMetrics: {
    qualityScore: number;
    uptime: number;
    errorRate: number;
    satisfaction: number;
  };
}

const studioConfig = {
  text: { name: 'Text Generation', icon: PenTool, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
  code: { name: 'Code Generation', icon: Code, color: 'from-green-500 to-green-600', bgColor: 'bg-green-50' },
  document: { name: 'Document AI', icon: FileText, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50' },
  creative: { name: 'Creative Writing', icon: Feather, color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50' },
};

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const { isValid: apiKeyValid } = useApiKey();

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedPeriod]);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with realistic data
      setTimeout(() => {
        const mockData: AnalyticsData = {
          overview: {
            totalTokens: 2547891,
            totalProjects: 1247,
            activeUsers: 8934,
            averageResponseTime: 2.3,
            tokenGrowth: 23.5,
            projectGrowth: 18.2,
            userGrowth: 12.7,
            responseTimeChange: -8.4
          },
          studioUsage: {
            text: { count: 456, tokens: 987654, growth: 25.3 },
            code: { count: 312, tokens: 654321, growth: 31.2 },
            document: { count: 289, tokens: 432198, growth: 15.7 },
            creative: { count: 190, tokens: 473718, growth: 19.8 }
          },
          timeSeriesData: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            tokens: Math.floor(Math.random() * 50000) + 80000,
            projects: Math.floor(Math.random() * 50) + 30,
            responseTime: Math.random() * 2 + 1.5
          })),
          performanceMetrics: {
            qualityScore: 99.2,
            uptime: 99.9,
            errorRate: 0.08,
            satisfaction: 4.8
          }
        };
        setAnalyticsData(mockData);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const renderTrendIndicator = (value: number) => {
    const isPositive = value > 0;
    return (
      <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span className="text-sm font-bold">{Math.abs(value).toFixed(1)}%</span>
      </div>
    );
  };

  if (isLoading || !analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-orange-50/30 relative">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.02'%3E%3Cpath d='M50 50m-30 0a30 30 0 1 1 60 0a30 30 0 1 1 -60 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            className="flex items-center space-x-4 bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Activity className="w-8 h-8 text-orange-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-900">Loading Analytics</h3>
              <p className="text-gray-600">Gathering insights from your data...</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-orange-50/30 relative">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.02'%3E%3Cpath d='M50 50m-30 0a30 30 0 1 1 60 0a30 30 0 1 1 -60 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="relative z-10 p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 leading-tight">
                  Analytics
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 block lg:inline lg:ml-4">
                    Dashboard
                  </span>
                </h1>
                <p className="text-xl text-gray-600 font-medium max-w-2xl">
                  Comprehensive insights into your AI studio performance, usage patterns, and growth metrics.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6 lg:mt-0">
                <div className="flex bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/60 shadow-lg">
                  {['7d', '30d', '90d'].map((period) => (
                    <Button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-6 py-2 text-sm font-bold rounded-xl transition-all duration-300 ${
                        selectedPeriod === period
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                          : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                      }`}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={fetchAnalyticsData}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-3 shadow-xl hover:shadow-orange-500/25 transition-all duration-400 transform hover:scale-105 rounded-xl"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Refresh
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-2 border-gray-200 hover:border-orange-300 text-gray-700 hover:text-orange-600 font-bold px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Overview Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              {
                title: 'Total Tokens',
                value: formatNumber(analyticsData.overview.totalTokens),
                change: analyticsData.overview.tokenGrowth,
                icon: Zap,
                gradient: 'from-blue-500 to-blue-600',
                trendData: [85000, 92000, 88000, 95000, 101000, 98000, 105000]
              },
              {
                title: 'Active Projects',
                value: formatNumber(analyticsData.overview.totalProjects),
                change: analyticsData.overview.projectGrowth,
                icon: Target,
                gradient: 'from-green-500 to-green-600',
                trendData: [28, 32, 30, 35, 38, 36, 42]
              },
              {
                title: 'Active Users',
                value: formatNumber(analyticsData.overview.activeUsers),
                change: analyticsData.overview.userGrowth,
                icon: Users,
                gradient: 'from-purple-500 to-purple-600',
                trendData: [8200, 8400, 8600, 8300, 8700, 8900, 9100]
              },
              {
                title: 'Avg Response',
                value: `${analyticsData.overview.averageResponseTime}s`,
                change: analyticsData.overview.responseTimeChange,
                icon: Clock,
                gradient: 'from-orange-500 to-red-500',
                trendData: [2.8, 2.5, 2.7, 2.4, 2.2, 2.3, 2.1]
              }
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="relative overflow-hidden bg-white/80 backdrop-blur-xl border-2 border-gray-200/60 hover:border-orange-200 transition-all duration-500 shadow-xl hover:shadow-2xl rounded-2xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-5`} />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${metric.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <metric.icon className="w-6 h-6 text-white" />
                      </div>
                      {renderTrendIndicator(metric.change)}
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">
                        {metric.title}
                      </h3>
                      <p className="text-3xl font-black text-gray-900">
                        {metric.value}
                      </p>
                    </div>
                    {/* Trend Chart */}
                    <div className="mt-4 pt-4 border-t border-gray-200/60">
                      <TrendChart 
                        data={metric.trendData} 
                        color={metric.gradient.includes('blue') ? '#3b82f6' : 
                               metric.gradient.includes('green') ? '#10b981' : 
                               metric.gradient.includes('purple') ? '#8b5cf6' : '#f97316'} 
                        width={200} 
                        height={50} 
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Studio Usage Analytics */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Studio Performance */}
            <Card className="bg-white/80 backdrop-blur-xl border-2 border-gray-200/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-200/60 p-6">
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">Studio Performance</h3>
                    <p className="text-sm text-gray-600 font-medium">Usage across different AI studios</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {Object.entries(analyticsData.studioUsage).map(([key, data]) => {
                    const config = studioConfig[key as keyof typeof studioConfig];
                    const Icon = config.icon;
                    return (
                      <motion.div
                        key={key}
                        className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{config.name}</h4>
                            <p className="text-sm text-gray-600">{formatNumber(data.tokens)} tokens</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-gray-900">{data.count}</p>
                          <div className="flex items-center space-x-1">
                            {renderTrendIndicator(data.growth)}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-white/80 backdrop-blur-xl border-2 border-gray-200/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200/60 p-6">
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">System Health</h3>
                    <p className="text-sm text-gray-600 font-medium">Platform performance metrics</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: 'Quality Score', value: `${analyticsData.performanceMetrics.qualityScore}%`, color: 'text-green-600' },
                    { label: 'Uptime', value: `${analyticsData.performanceMetrics.uptime}%`, color: 'text-blue-600' },
                    { label: 'Error Rate', value: `${analyticsData.performanceMetrics.errorRate}%`, color: 'text-orange-600' },
                    { label: 'Satisfaction', value: `${analyticsData.performanceMetrics.satisfaction}/5`, color: 'text-purple-600' }
                  ].map((metric) => (
                    <motion.div
                      key={metric.label}
                      className="text-center p-4 bg-gray-50/50 rounded-xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      <p className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">
                        {metric.label}
                      </p>
                      <p className={`text-2xl font-black ${metric.color}`}>
                        {metric.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-2xl p-8 text-white relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4">
                Ready to Optimize Your Workflow?
              </h3>
              <p className="text-xl mb-8 text-orange-100 max-w-2xl">
                Use these insights to improve your AI studio performance and maximize productivity.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <PieChart className="w-5 h-5 mr-2" />
                  Detailed Reports
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white/50 text-white hover:bg-white/20 font-bold px-8 py-3 rounded-xl transition-all duration-300"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Custom Filters
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}