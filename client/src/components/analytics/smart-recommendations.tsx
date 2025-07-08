import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Clock, 
  Star,
  ArrowRight,
  PenTool,
  Code,
  FileText,
  Feather,
  Zap,
  Target,
  Lightbulb,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface SmartRecommendation {
  id: string;
  type: 'studio' | 'workflow' | 'feature' | 'template';
  title: string;
  description: string;
  confidence: number;
  reasoning: string;
  benefits: string[];
  action: string;
  data: {
    usage: number;
    success_rate: number;
    time_saved: string;
    similar_users: number;
  };
}

interface SmartRecommendationsProps {
  userId: number;
  currentStudio?: string;
}

export function SmartRecommendations({ userId, currentStudio }: SmartRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);

  useEffect(() => {
    generateRecommendations();
  }, [userId, currentStudio]);

  const generateRecommendations = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI-powered recommendation generation
    setTimeout(() => {
      const mockRecommendations: SmartRecommendation[] = [
        {
          id: '1',
          type: 'studio',
          title: 'Try Code Generation Studio',
          description: 'Based on your text patterns, you might benefit from Code Generation for structured content creation.',
          confidence: 92,
          reasoning: 'Your recent text generation requests include many structured formats, lists, and technical documentation that Code Studio handles more efficiently.',
          benefits: [
            'Better syntax highlighting and formatting',
            '40% faster generation for structured content',
            'Advanced code completion and suggestions',
            'Integration with development workflows'
          ],
          action: 'Switch to Code Studio',
          data: {
            usage: 78,
            success_rate: 94,
            time_saved: '15 min/session',
            similar_users: 234
          }
        },
        {
          id: '2',
          type: 'workflow',
          title: 'Implement Template-Based Workflow',
          description: 'Create reusable templates for your most common request patterns to save time and improve consistency.',
          confidence: 88,
          reasoning: 'You repeat similar request structures 65% of the time. Templates would eliminate repetitive setup and ensure consistent quality.',
          benefits: [
            'Reduce setup time by 70%',
            'Consistent output quality',
            'Quick project initialization',
            'Shareable team templates'
          ],
          action: 'Create Templates',
          data: {
            usage: 156,
            success_rate: 91,
            time_saved: '22 min/session',
            similar_users: 189
          }
        },
        {
          id: '3',
          type: 'feature',
          title: 'Enable Advanced Context Mode',
          description: 'Turn on advanced context retention to maintain conversation history across sessions for better continuity.',
          confidence: 85,
          reasoning: 'Your projects show high interconnection. Advanced context mode would eliminate the need to re-explain background information.',
          benefits: [
            'Seamless conversation continuation',
            'Reduced context repetition',
            'Better long-term project tracking',
            'Enhanced AI understanding'
          ],
          action: 'Enable Feature',
          data: {
            usage: 203,
            success_rate: 89,
            time_saved: '8 min/session',
            similar_users: 312
          }
        },
        {
          id: '4',
          type: 'template',
          title: 'Marketing Copy Template Pack',
          description: 'Access our premium marketing templates based on your content creation patterns.',
          confidence: 79,
          reasoning: 'Your text generation frequently involves marketing copy, product descriptions, and promotional content.',
          benefits: [
            'Professional marketing frameworks',
            'A/B testing variations',
            'Industry-specific templates',
            'Conversion-optimized structures'
          ],
          action: 'Access Templates',
          data: {
            usage: 67,
            success_rate: 87,
            time_saved: '12 min/session',
            similar_users: 145
          }
        }
      ];

      setRecommendations(mockRecommendations);
      setIsAnalyzing(false);
    }, 1200);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'studio': return <Zap className="w-5 h-5 text-blue-600" />;
      case 'workflow': return <Target className="w-5 h-5 text-green-600" />;
      case 'feature': return <Star className="w-5 h-5 text-purple-600" />;
      case 'template': return <FileText className="w-5 h-5 text-orange-600" />;
      default: return <Lightbulb className="w-5 h-5 text-gray-600" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 80) return 'text-blue-600 bg-blue-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  if (isAnalyzing) {
    return (
      <Card className="border-2 border-purple-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Brain className="w-6 h-6 text-purple-600" />
            </motion.div>
            <span>Generating Smart Recommendations...</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">AI Analysis in Progress</p>
                <p className="text-sm text-gray-600">Analyzing your usage patterns and comparing with similar users</p>
              </div>
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-sm text-gray-500">Processing behavioral data and generating personalized suggestions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <span>Smart Recommendations</span>
          </CardTitle>
          <p className="text-sm text-purple-700">
            Personalized suggestions based on your usage patterns and AI analysis
          </p>
        </CardHeader>
      </Card>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((recommendation, index) => (
          <motion.div
            key={recommendation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={`border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                selectedRecommendation === recommendation.id 
                  ? 'border-purple-300 shadow-md' 
                  : 'border-gray-200 hover:border-purple-200'
              }`}
              onClick={() => setSelectedRecommendation(
                selectedRecommendation === recommendation.id ? null : recommendation.id
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(recommendation.type)}
                    <div>
                      <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={`text-xs ${getConfidenceColor(recommendation.confidence)}`}>
                      {recommendation.confidence}% CONFIDENCE
                    </Badge>
                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                      selectedRecommendation === recommendation.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{recommendation.data.usage}%</div>
                    <p className="text-xs text-gray-600">Usage Match</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{recommendation.data.success_rate}%</div>
                    <p className="text-xs text-gray-600">Success Rate</p>
                  </div>
                </div>

                {/* Expanded Details */}
                <motion.div
                  initial={false}
                  animate={{ 
                    height: selectedRecommendation === recommendation.id ? 'auto' : 0,
                    opacity: selectedRecommendation === recommendation.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    {/* Reasoning */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Why This Recommendation?</h4>
                      <p className="text-sm text-gray-700">{recommendation.reasoning}</p>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {recommendation.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                            <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Additional Stats */}
                    <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Time Saved</p>
                        <p className="text-lg font-bold text-orange-600">{recommendation.data.time_saved}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Similar Users</p>
                        <p className="text-lg font-bold text-purple-600">{recommendation.data.similar_users}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Action Button */}
                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
                  size="sm"
                >
                  <span>{recommendation.action}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}