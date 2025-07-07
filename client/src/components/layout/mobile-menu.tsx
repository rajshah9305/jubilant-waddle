import { Link } from 'wouter';
import { X, Key, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useApiKey } from '@/hooks/use-api-key';

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navigation: Array<{ name: string; href: string }>;
  isActive: (href: string) => boolean;
}

export function MobileMenu({ open, onOpenChange, navigation, isActive }: MobileMenuProps) {
  const { isValid } = useApiKey();

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold">Cerebras Studio</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col space-y-4 mt-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleLinkClick}
              className={`block py-3 px-4 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-100'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-gray-200">
            <Button className="w-full bg-primary hover:bg-primary/90">
              <Key className="w-4 h-4 mr-2" />
              API Keys
              <div
                className={`w-2 h-2 rounded-full ml-2 ${
                  isValid ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
