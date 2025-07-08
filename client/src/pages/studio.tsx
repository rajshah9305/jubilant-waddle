import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { StudioSidebar } from '@/components/studio/studio-sidebar';
import { ChatInterface } from '@/components/studio/chat-interface';
import { MissingApiKeyModal } from '@/components/modals/missing-api-key-modal';
import { ApiKeyModal } from '@/components/modals/api-key-modal';
import { useApiKey } from '@/hooks/use-api-key';
import { StudioType } from '@/types/studio';

export default function Studio() {
  const params = useParams();
  const [currentStudio, setCurrentStudio] = useState<StudioType>('text');
  const [showMissingApiKeyModal, setShowMissingApiKeyModal] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const { isValid: apiKeyValid } = useApiKey();

  useEffect(() => {
    // Set studio from URL params
    if (params.studioType && ['text', 'code', 'document', 'creative'].includes(params.studioType)) {
      setCurrentStudio(params.studioType as StudioType);
    }
  }, [params.studioType]);

  const handleStudioChange = (studio: StudioType) => {
    if (!apiKeyValid) {
      setShowMissingApiKeyModal(true);
      return;
    }
    setCurrentStudio(studio);
    // Update URL without full navigation
    window.history.replaceState(null, '', `/studio/${studio}`);
  };

  const handleApiKeyRequired = () => {
    setShowMissingApiKeyModal(true);
  };

  const handleConfigureApiKey = () => {
    setShowApiKeyModal(true);
  };

  return (
    <div className="pt-16 h-screen flex">
      <StudioSidebar 
        currentStudio={currentStudio}
        onStudioChange={handleStudioChange}
      />
      
      <div className="flex-1 flex flex-col">
        <ChatInterface
          studioType={currentStudio}
          apiKeyValid={apiKeyValid}
          onApiKeyRequired={handleApiKeyRequired}
        />
      </div>

      {/* Modals */}
      <MissingApiKeyModal
        open={showMissingApiKeyModal}
        onOpenChange={setShowMissingApiKeyModal}
        onConfigureApiKey={handleConfigureApiKey}
      />
      
      <ApiKeyModal
        open={showApiKeyModal}
        onOpenChange={setShowApiKeyModal}
      />
    </div>
  );
}
