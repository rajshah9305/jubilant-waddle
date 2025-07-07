import { Key } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface MissingApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfigureApiKey: () => void;
}

export function MissingApiKeyModal({ 
  open, 
  onOpenChange, 
  onConfigureApiKey 
}: MissingApiKeyModalProps) {
  const handleConfigureClick = () => {
    onOpenChange(false);
    onConfigureApiKey();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Key className="w-8 h-8 text-red-600" />
          </div>
          
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">
              API Key Required
            </h2>
            <p className="text-gray-600">
              You need to configure your Cerebras API key to use this studio.
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              onClick={handleConfigureClick}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Configure API Key
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
