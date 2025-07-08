import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Clock, 
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface UsageOptimization {
  id: string;
  type: 'efficiency' | 'cost' | 'quality' | 'workflow';
  title: string;
  description: string;
  potentialSavings: number;
  impact: 'high' | 'medium' | 'low';
  implementationEffort: 'easy' | 'moderate' | 'complex';
  currentUsage: number;
  optimizedUsage: number;
  actionItems: string[];
}

interface UsageOptimizerProps {
  userId: number;
  timeframe: '7d' | '30d' | '90d';
}

export function UsageOptimizer({ userId, timeframe }: UsageOptimizerProps) {
  const [optimizations, setOptimizations] = useState<UsageOptimization[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [totalPotentialSavings, setTotalPotentialSavings] = useState(0);

  useEffect(() => {
    analyzeUsagePatterns();
  }, [userId, timeframe]);

  const analyzeUsagePatterns = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI-powered usage analysis
    setTimeout(() => {
      const mockOptimizations: UsageOptimization[] = [
        {
          id: '1',
          type: 'efficiency',
          title: 'Optimize prompt length',
          description: 'Your prompts are averaging 45% longer than optimal. Shorter, more focused prompts can reduce token usage while maintaining quality.',
          potentialSavings: 1250,
          impact: 'high',
          implementationEffort: 'easy',
          currentUsage: 2800,
          optimizedUsage: 1550,
          actionItems: [
            'Use bullet points instead of paragraphs',
            'Remove redundant context',
            'Focus on specific requirements'
          ]
        },
        {
          id: '2',
          type: 'workflow',
          title: 'Batch similar requests',
          description: 'You could combine 3-4 similar requests into single conversations, reducing overhead and improving context retention.',
          potentialSavings: 890,
          impact: 'medium',
          implementationEffort: 'moderate',
          currentUsage: 1800,
          optimizedUsage: 910,
          actionItems: [
            'Group related questions',
            'Use conversation threads',
            'Prepare comprehensive queries'
          ]
        },
        {
          id: '3',
          type: 'quality',
          title: 'Improve context retention',
          description: 'Better use of conversation history can reduce repetitive explanations and improve response accuracy.',
          potentialSavings: 675,
          impact: 'high',
          implementationEffort: 'easy',
          currentUsage: 1200,
          optimizedUsage: 525,
          actionItems: [
            'Reference previous responses',
            'Build on existing context',
            'Use conversation summaries'
          ]
        },
        {
          id: '4',
          type: 'cost',
          title: 'Studio optimization',
          description: 'Document AI is being used for simple text tasks. Using Text Generation for basic content could save 30% on tokens.',
          potentialSavings: 420,
          impact: 'medium',
          implementationEffort: 'easy',
          currentUsage: 980,
          optimizedUsage: 560,
          actionItems: [
            'Use Text Studio for simple content',
            'Reserve Document AI for complex analysis',
            'Choose appropriate studio for each task'
          ]
        }
      ];

      const totalSavings = mockOptimizations.reduce((sum, opt) => sum + opt.potentialSavings, 0);
      
      setOptimizations(mockOptimizations);
      setTotalPotentialSavings(totalSavings);
      setIsAnalyzing(false);
    }, 1500);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'complex': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'efficiency': return <Zap className="w-5 h-5 text-blue-600" />;
      case 'cost': return <Target className="w-5 h-5 text-green-600" />;
      case 'quality': return <CheckCircle className="w-5 h-5 text-purple-600" />;
      case 'workflow': return <Clock className="w-5 h-5 text-orange-600" />;
      default: return <Lightbulb className="w-5 h-5 text-gray-600" />;
    }
  };

  if (isAnalyzing) {
    return (
      <Card className="border-2 border-orange-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </motion.div>
            <span>Analyzing Usage Patterns...</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">AI-Powered Analysis</p>
                <p className="text-sm text-gray-600">Examining your usage patterns to identify optimization opportunities</p>
              </div>
            </div>
            <Progress value={85} className="h-2" />
            <p className="text-sm text-gray-500">Processing conversation history and token usage data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-green-600" />
            <span>Optimization Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {totalPotentialSavings.toLocaleString()}
              </div>
              <p className="text-sm text-green-700">Potential Token Savings</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {optimizations.length}
              </div>
              <p className="text-sm text-blue-700">Optimization Opportunities</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.round((totalPotentialSavings / 8500) * 100)}%
              </div>
              <p className="text-sm text-purple-700">Efficiency Improvement</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {optimizations.map((optimization, index) => (
          <motion.div
            key={optimization.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-2 border-gray-200 hover:border-orange-300 transition-all duration-200 shadow-sm hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(optimization.type)}
                    <div>
                      <CardTitle className="text-lg">{optimization.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{optimization.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={`text-xs ${getImpactColor(optimization.impact)}`}>
                      {optimization.impact.toUpperCase()} IMPACT
                    </Badge>
                    <Badge className={`text-xs ${getEffortColor(optimization.implementationEffort)}`}>
                      {optimization.implementationEffort.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Savings Display */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">Token Savings</span>
                      <span className="text-xl font-bold text-green-600">
                        {optimization.potentialSavings.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-green-700">
                      <span>{optimization.currentUsage.toLocaleString()}</span>
                      <ArrowRight className="w-4 h-4" />
                      <span>{optimization.optimizedUsage.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Action Items */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Action Items:</h4>
                    <ul className="space-y-1">
                      {optimization.actionItems.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Implementation Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    size="sm"
                  >
                    Apply Optimization
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}