export {};

declare global {
  interface Window {
    NEXT_PUBLIC_VISITOR_TRACKING_WEBSITE_ID?: string;
    tracerSingleton?: {
      enabled: boolean;
    };
  }
}