import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, Crown, BarChart3, FileText, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface UserProfileProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    plan: 'free' | 'pro' | 'enterprise';
    tokensUsed: number;
    tokensLimit: number;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultUser = {
    name: 'Alex Creator',
    email: 'alex@example.com',
    plan: 'pro' as const,
    tokensUsed: 45200,
    tokensLimit: 100000,
  };

  const currentUser = user || defaultUser;
  const usagePercentage = (currentUser.tokensUsed / currentUser.tokensLimit) * 100;

  const planConfig = {
    free: { color: 'bg-gray-500', label: 'Free', icon: User },
    pro: { color: 'bg-orange-500', label: 'Pro', icon: Crown },
    enterprise: { color: 'bg-purple-500', label: 'Enterprise', icon: Zap },
  };

  const plan = planConfig[currentUser.plan];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-12 w-12 rounded-full border-2 border-transparent hover:border-orange-200 transition-all duration-300"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-lg"
            style={{ backgroundColor: plan.color }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Button>
      </DropdownMenuTrigger>
      
      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent
            className="w-80 p-0 border-0 shadow-2xl"
            align="end"
            forceMount
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-white via-orange-50/30 to-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 border-3 border-white/30">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback className="bg-white/20 text-white font-bold text-xl">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{currentUser.name}</h3>
                    <p className="text-white/80 text-sm">{currentUser.email}</p>
                    <Badge
                      className={`mt-2 ${plan.color} text-white border-0 hover:${plan.color}`}
                    >
                      <plan.icon className="w-3 h-3 mr-1" />
                      {plan.label} Plan
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Usage Stats */}
              <div className="p-6 border-b border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Token Usage</span>
                    <span className="text-sm text-gray-500">
                      {currentUser.tokensUsed.toLocaleString()} / {currentUser.tokensLimit.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${usagePercentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="text-center">
                      <div className="font-bold text-lg text-orange-600">24</div>
                      <div className="text-xs text-gray-500">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-orange-600">156</div>
                      <div className="text-xs text-gray-500">Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-orange-600">8.2h</div>
                      <div className="text-xs text-gray-500">Saved</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <DropdownMenuLabel className="px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Account
                </DropdownMenuLabel>
                
                <DropdownMenuItem className="px-6 py-3 cursor-pointer hover:bg-orange-50 transition-colors">
                  <User className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="font-medium">Profile Settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="px-6 py-3 cursor-pointer hover:bg-orange-50 transition-colors">
                  <BarChart3 className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="font-medium">Usage Analytics</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="px-6 py-3 cursor-pointer hover:bg-orange-50 transition-colors">
                  <FileText className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="font-medium">Billing & Plans</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="px-6 py-3 cursor-pointer hover:bg-orange-50 transition-colors">
                  <Settings className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="font-medium">Preferences</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="my-2" />
                
                <DropdownMenuItem className="px-6 py-3 cursor-pointer hover:bg-red-50 transition-colors text-red-600">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="font-medium">Sign Out</span>
                </DropdownMenuItem>
              </div>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}