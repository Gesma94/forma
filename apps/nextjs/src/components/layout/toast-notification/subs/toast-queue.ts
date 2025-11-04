import { UNSTABLE_ToastQueue as ToastQueue } from 'react-aria-components';

export interface IToastContent {
  kind: 'success' | 'error';
  title: string;
  description: string;
}

export const toastQueue = new ToastQueue<IToastContent>();
