import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstall(false);
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-slide-up">
      <div className="bg-white rounded-xl shadow-2xl p-4 border-2 border-indigo-200">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Download className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 text-sm mb-1">Install PathFinder</h3>
            <p className="text-xs text-slate-600 mb-3">Add to your home screen for quick access!</p>
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="flex-1 bg-linear-to-r from-indigo-500 to-purple-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:shadow-lg transition-all"
              >
                Install
              </button>
              <button
                onClick={() => setShowInstall(false)}
                className="px-3 py-2 text-slate-600 text-xs font-semibold hover:bg-slate-100 rounded-lg transition-all"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPWA;
