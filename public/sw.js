// Service Worker for PathFinder PWA - Enhanced Version
const CACHE_NAME = 'pathfinder-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/career_guidance_app.tsx',
  '/src/index.css',
  '/src/components/NotificationManager.tsx',
  '/src/components/ProgressTracker.tsx',
  '/src/components/ScholarshipDatabase.tsx',
  '/src/components/AptitudeTest.tsx',
  '/src/components/MentorMatching.tsx'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache install failed:', error);
      })
  );
  self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          (response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
      .catch(() => {
        // Return offline page if available
        return caches.match('/index.html');
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Enhanced background sync for offline submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-career-data') {
    event.waitUntil(syncCareerData());
  } else if (event.tag === 'sync-progress-data') {
    event.waitUntil(syncProgressData());
  } else if (event.tag === 'sync-mentor-requests') {
    event.waitUntil(syncMentorRequests());
  } else if (event.tag === 'sync-aptitude-results') {
    event.waitUntil(syncAptitudeResults());
  }
});

async function syncCareerData() {
  try {
    console.log('Syncing career analysis data...');
    
    // Get pending career analysis requests from IndexedDB or localStorage
    const pendingRequests = await getPendingRequests('career_analysis');
    
    for (const request of pendingRequests) {
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request.data)
        });
        
        if (response.ok) {
          // Remove from pending requests
          await removePendingRequest('career_analysis', request.id);
          console.log('Career analysis synced successfully');
        }
      } catch (error) {
        console.error('Failed to sync career analysis:', error);
      }
    }
  } catch (error) {
    console.error('Sync career data failed:', error);
  }
}

async function syncProgressData() {
  try {
    console.log('Syncing progress data...');
    
    const pendingProgress = await getPendingRequests('progress_updates');
    
    for (const progress of pendingProgress) {
      try {
        const response = await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(progress.data)
        });
        
        if (response.ok) {
          await removePendingRequest('progress_updates', progress.id);
          console.log('Progress data synced successfully');
        }
      } catch (error) {
        console.error('Failed to sync progress data:', error);
      }
    }
  } catch (error) {
    console.error('Sync progress data failed:', error);
  }
}

async function syncMentorRequests() {
  try {
    console.log('Syncing mentor requests...');
    
    const pendingRequests = await getPendingRequests('mentor_requests');
    
    for (const request of pendingRequests) {
      try {
        const response = await fetch('/api/mentor-requests', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request.data)
        });
        
        if (response.ok) {
          await removePendingRequest('mentor_requests', request.id);
          console.log('Mentor request synced successfully');
        }
      } catch (error) {
        console.error('Failed to sync mentor request:', error);
      }
    }
  } catch (error) {
    console.error('Sync mentor requests failed:', error);
  }
}

async function syncAptitudeResults() {
  try {
    console.log('Syncing aptitude test results...');
    
    const pendingResults = await getPendingRequests('aptitude_results');
    
    for (const result of pendingResults) {
      try {
        const response = await fetch('/api/aptitude-results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.data)
        });
        
        if (response.ok) {
          await removePendingRequest('aptitude_results', result.id);
          console.log('Aptitude results synced successfully');
        }
      } catch (error) {
        console.error('Failed to sync aptitude results:', error);
      }
    }
  } catch (error) {
    console.error('Sync aptitude results failed:', error);
  }
}

// Helper functions for managing pending requests
async function getPendingRequests(type) {
  try {
    // In a real implementation, this would use IndexedDB
    // For now, we'll use localStorage as a fallback
    const stored = localStorage.getItem(`pending_${type}`);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get pending requests:', error);
    return [];
  }
}

async function removePendingRequest(type, id) {
  try {
    const pending = await getPendingRequests(type);
    const updated = pending.filter(item => item.id !== id);
    localStorage.setItem(`pending_${type}`, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to remove pending request:', error);
  }
}

// Enhanced push notifications with different types
self.addEventListener('push', (event) => {
  let notificationData = {
    title: 'PathFinder',
    body: 'New career recommendations available!',
    icon: '/public/icons/android/android-launchericon-192-192.png',
    badge: '/public/icons/android/android-launchericon-72-72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
      type: 'general'
    },
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/public/icons/android/android-launchericon-48-48.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };

  if (event.data) {
    try {
      const payload = event.data.json();
      
      switch (payload.type) {
        case 'career_update':
          notificationData.title = 'New Career Opportunities';
          notificationData.body = payload.message || 'New career paths match your profile!';
          notificationData.data.type = 'career_update';
          break;
          
        case 'scholarship_alert':
          notificationData.title = 'Scholarship Alert';
          notificationData.body = payload.message || 'New scholarships available for your field!';
          notificationData.data.type = 'scholarship_alert';
          notificationData.icon = '/public/icons/android/android-launchericon-192-192.png';
          break;
          
        case 'mentor_message':
          notificationData.title = 'Mentor Message';
          notificationData.body = payload.message || 'You have a new message from your mentor!';
          notificationData.data.type = 'mentor_message';
          notificationData.data.mentorId = payload.mentorId;
          break;
          
        case 'progress_reminder':
          notificationData.title = 'Progress Check-in';
          notificationData.body = payload.message || 'Time to update your goals progress!';
          notificationData.data.type = 'progress_reminder';
          break;
          
        case 'aptitude_suggestion':
          notificationData.title = 'Aptitude Test Suggestion';
          notificationData.body = payload.message || 'Take a new aptitude test to discover more about yourself!';
          notificationData.data.type = 'aptitude_suggestion';
          break;
          
        default:
          notificationData.body = payload.message || notificationData.body;
      }
    } catch (error) {
      console.error('Failed to parse push notification data:', error);
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const notificationData = event.notification.data;
  let urlToOpen = '/';

  // Determine URL based on notification type
  switch (notificationData.type) {
    case 'career_update':
      urlToOpen = '/#career-results';
      break;
    case 'scholarship_alert':
      urlToOpen = '/#scholarships';
      break;
    case 'mentor_message':
      urlToOpen = `/#mentors?id=${notificationData.mentorId}`;
      break;
    case 'progress_reminder':
      urlToOpen = '/#progress';
      break;
    case 'aptitude_suggestion':
      urlToOpen = '/#aptitude-tests';
      break;
  }

  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.focus();
            client.navigate(urlToOpen);
            return;
          }
        }
        
        // Open new window if app is not open
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});

// Periodic background sync for checking updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-updates') {
    event.waitUntil(checkForUpdates());
  }
});

async function checkForUpdates() {
  try {
    // Check for new scholarships, career opportunities, etc.
    console.log('Checking for updates...');
    
    // This would typically make API calls to check for updates
    // and potentially trigger notifications for important updates
  } catch (error) {
    console.error('Failed to check for updates:', error);
  }
}
