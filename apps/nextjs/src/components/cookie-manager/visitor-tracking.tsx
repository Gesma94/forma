'use client';

import { isNil, isNotNil } from 'es-toolkit';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useCookieConsent } from 'react-cookie-manager';

export function VisitorTracking() {
  const { detailedConsent } = useCookieConsent();
  const [initTracerLoaded, setInitTracerLoaded] = useState(false);

  useEffect(() => {
    if (!initTracerLoaded || isNil(window.tracerSingleton)) {
      return;
    }

    const hasAnalyticsConsent = isNotNil(detailedConsent) && detailedConsent.Analytics.consented;
    window.tracerSingleton.enabled = hasAnalyticsConsent;
  }, [initTracerLoaded, detailedConsent]);

  return (
    <>
      <Script
        src='/js/tracer.js'
        onLoad={() => {
          setInitTracerLoaded(true);
        }}
      />
    </>
  );
}
