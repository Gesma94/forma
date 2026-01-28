'use client';

import { isNil } from 'es-toolkit';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { useCookieConsent } from 'react-cookie-manager';

declare global {
  interface Window {
    init_tracer?: () => void;
    Tracer?: new (config: {
      websiteId: string;
      async: boolean;
      debug: boolean;
      enabled: boolean;
    }) => { enabled: boolean };
  }
}

export function VisitorTracking() {
  const tracerRef = useRef<{ enabled: boolean }>(null);
  const { detailedConsent } = useCookieConsent();

  useEffect(() => {
    if (isNil(tracerRef.current)) {
      return;
    }

    console.log(detailedConsent);
    console.log(tracerRef.current);

    const hasAnalyticsConsent = detailedConsent.Analytics.consented;
    tracerRef.current.enabled = hasAnalyticsConsent;
  }, [detailedConsent]);

  return (
    <Script
      src='https://app.visitortracking.com/assets/js/tracer.js'
      strategy='afterInteractive'
      onLoad={() => {
        (function init_tracer() {
          tracerRef.current = new window.Tracer({
            websiteId: '90da5051-aa79-4f77-9b69-78e0768f5ea9',
            async: true,
            debug: false,
            enabled: detailedConsent.Analytics.consented
          });
        })();
      }}
    />
  );
}
