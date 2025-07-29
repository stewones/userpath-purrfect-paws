'use client';

import { useEffect } from 'react';
import up from '@/lib/userpath';

export function UserPathProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // UserPath SDK is automatically initialized when imported
    const appId = process.env.NEXT_PUBLIC_USERPATH_APP_ID;
    if (appId) {
      console.log('UserPath initialized with app ID:', appId);
    } else {
      console.warn('UserPath app ID not configured. Set NEXT_PUBLIC_USERPATH_APP_ID environment variable.');
    }
  }, []);

  return <>{children}</>;
}

// Custom hook for tracking events
export function useUserPath() {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    up.track('event', {
      name: eventName,
      properties,
    });
  };

  const trackPurchase = (price: number, currency: string = 'USD', properties?: Record<string, any>) => {
    up.track('purchase', {
      price,
      currency,
      amount: 1,
      properties,
    });
  };

  return {
    trackEvent,
    trackPurchase,
  };
} 