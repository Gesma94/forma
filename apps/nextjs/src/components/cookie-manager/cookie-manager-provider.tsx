'use client';

import type { PropsWithChildren } from 'react';
import { CookieManager } from 'react-cookie-manager';
import { VisitorTracking } from './visitor-tracking';

export function CookieManagerProvider({ children }: PropsWithChildren) {
  return (
    <div className='bg-primary ring-offset-2 '>
      <CookieManager
        showManageButton={true}
        classNames={{
          popupContainer:
            'fixed bottom-4 left-4 w-80 bg-white/95 ring-1 ring-black/10 shadow-lg rounded-lg backdrop-blur-sm backdrop-saturate-150 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] z-[99999] opacity-100 scale-100',
          declineButton:
            'px-3 py-1.5 text-xs font-medium rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all duration-200 focus-visible:outline-none focus:outline-none focus-visible:outline-transparent focus:outline-transparent flex-1',
          acceptButton:
            'px-3 py-1.5 text-xs font-medium rounded-md bg-primary! hover:bg-primary-hover! text-primary-text! transition-all duration-200 focus-visible:outline-none focus:outline-none focus-visible:outline-transparent focus:outline-transparent flex-1',
          manageButton:
            'px-3 py-1.5 text-xs font-medium rounded-md border border-primary! text-primary! bg-transparent hover:text-primary! hover:border-primary-hover! transition-all duration-200 focus-visible:outline-none focus:outline-none focus-visible:outline-transparent focus:outline-transparent flex-1 w-full justify-center',
          floatingButton:
            'fixed bottom-4 left-4 z-[99999] size-10 rounded-full flex items-center justify-center transition-all duration-500 hover:rotate-90 ease-[cubic-bezier(0.32,0.72,0,1)] focus:outline-none group cursor-pointer bg-bg! shadow-lg ring-1 ring-black/10 text-primary! hover:text-primary!',
          floatingButtonCloseButton: 'hidden',
          manageCancelButton:
            'w-full sm:w-auto px-3 py-2 sm:py-1.5 text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary! focus:ring-offset-2 transition-all duration-20 bg-gray-200 hover:bg-gray-300 text-gray-800',
          manageSaveButton:
            'w-full sm:w-auto px-3 py-2 sm:py-1.5 text-xs font-medium text-primary-text! bg-primary! rounded-md hover:bg-primary-hover! focus:outline-none focus:ring-2 focus:ring-primary! focus:ring-offset-2 transition-all duration-200',
          manageCookieToggle:
            'w-11 h-6 rounded-full peer peer-focus:ring-2 peer-focus:ring-offset-2! peer-focus:ring-primary! bg-gray-200 peer-checked:bg-primary! peer-checked:after:left-[22px]! after:content-[""] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all'
        }}
        enableFloatingButton={true}
        displayType='popup'
        cookieCategories={{ Analytics: true, Advertising: false, Social: false }}
        theme='light'
      >
        <VisitorTracking />
        {children}
      </CookieManager>
    </div>
  );
}
