export {};

declare global {
  interface Window {
    tracerSingleton?: {
      enabled: boolean;
    };
  }
}