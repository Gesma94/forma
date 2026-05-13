'use client';

import Script from 'next/script';

export function VisitorTrackingNoCookie() {
  const handleClientScriptLoad = () => {
    new window.Tracer({
      websiteId: process.env.NEXT_PUBLIC_VISITOR_TRACKING_WEBSITE_ID,
      async: true,
      debug: false
    });
  };

  return <Script src='/js/tracer-no-cookie.js' onLoad={handleClientScriptLoad} />;
}
