import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Settings } from 'lucide-react';

interface NotificationManagerProps {
  user: any;
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ user }) => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [preferences, setPreferences] = useState({
    careerUpdates: true,
    scholarshipAlerts: true,
    mentorMessages: true,
    progressReminders: true
  });

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
    
    // Load saved preferences
    const saved = localStorage.getItem(`notifications_${user?.email}`);
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, [user]);

  const requestPermission = async () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      const permission = await Notification.requestPermission();
      setPermission(permission);
      
      if (permission === 'granted') {
        await subscribeToPush();
      }
    }
  };

  const subscribeToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY || '')
      });
      
      setSubscription(subscription);
      
      // Send subscription to backend
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription,
          userId: user?.email,
          preferences
        })
      });
    } catch (error) {
      console.error('Push subscription failed:', error);
    }
  };

  const updatePreferences = (key: string, value: boolean) => {
    const updated = { ...preferences, [key]: value };
    setPreferences(updated);
    localStorage.setItem(`notifications_${user?.email}`, JSON.stringify(updated));
    
    // Update backend preferences
    if (subscription) {
      fetch('/api/notification-preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.email,
          preferences: updated
        })
      });
    }
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-blue-600" />
          Notifications
        </h3>
        {permission === 'granted' ? (
          <span className="text-green-600 text-sm font-medium">Enabled</span>
        ) : (
          <button
            onClick={requestPermission}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Enable
          </button>
        )}
      </div>

      {permission === 'granted' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Career Updates</span>
            <button
              onClick={() => updatePreferences('careerUpdates', !preferences.careerUpdates)}
              className={`w-10 h-6 rounded-full transition-colors ${
                preferences.careerUpdates ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                preferences.careerUpdates ? 'translate-x-5' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Scholarship Alerts</span>
            <button
              onClick={() => updatePreferences('scholarshipAlerts', !preferences.scholarshipAlerts)}
              className={`w-10 h-6 rounded-full transition-colors ${
                preferences.scholarshipAlerts ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                preferences.scholarshipAlerts ? 'translate-x-5' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Mentor Messages</span>
            <button
              onClick={() => updatePreferences('mentorMessages', !preferences.mentorMessages)}
              className={`w-10 h-6 rounded-full transition-colors ${
                preferences.mentorMessages ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                preferences.mentorMessages ? 'translate-x-5' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Progress Reminders</span>
            <button
              onClick={() => updatePreferences('progressReminders', !preferences.progressReminders)}
              className={`w-10 h-6 rounded-full transition-colors ${
                preferences.progressReminders ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                preferences.progressReminders ? 'translate-x-5' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationManager;