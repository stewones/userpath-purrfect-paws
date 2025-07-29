import { UserPath } from 'userpath-js';

// Get configuration from environment variables
const appId = process.env.NEXT_PUBLIC_USERPATH_APP_ID;
const serverUrl = process.env.NEXT_PUBLIC_USERPATH_SERVER_URL;

if (!appId) {
  console.warn('NEXT_PUBLIC_USERPATH_APP_ID environment variable is not set. UserPath tracking will not work properly.');
}

const up = new UserPath({
  // App ID from environment variable
  appId: appId!,
  // Use configurable server URL
  serverUrl: serverUrl,
  // Use API version 1
  version: 1,
  // Configure automatic event tracking
  autoTrack: {
    errors: true,          // JavaScript errors and unhandled promises
    clicks: true,          // Clicks on buttons, links, etc.
    scrolling: true,       // Scroll depth milestones
    forms: true,           // Form interactions and submissions
    videos: true,          // Video play/pause/complete events
    pageVisibility: true,  // Page visibility and time tracking
    pageInactivity: true,  // User activity/inactivity detection
    performance: true      // Core Web Vitals and performance metrics
  }
});

export { up };
export default up; 