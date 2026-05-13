'use client';

import { isNil } from "es-toolkit";
import Script from "next/script";
import { useEffect, useState } from "react";

export function VisitorTrackingNoCookie() {
  const [initTracerLoaded, setInitTracerLoaded] = useState(false);

  useEffect(() => {
    if (!initTracerLoaded || isNil(window.tracerSingleton)) {
      return;
    }
  }, [initTracerLoaded]);

  if (isNil(window.NEXT_PUBLIC_VISITOR_TRACKING_WEBSITE_ID)) {
    window.NEXT_PUBLIC_VISITOR_TRACKING_WEBSITE_ID = process.env.NEXT_PUBLIC_VISITOR_TRACKING_WEBSITE_ID;
  }

  return (
    <>
      <Script
        src='/js/tracer-no-cookie.js'
        onLoad={() => {
          setInitTracerLoaded(true);
        }}
      />
    </>
  );
}