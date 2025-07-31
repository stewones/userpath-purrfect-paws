'use client';

import up from '@/lib/userpath';


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