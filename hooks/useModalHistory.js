'use client';

import { useEffect } from 'react';

export function useModalHistory(onClose) {
  useEffect(() => {
    if (window.innerWidth > 640) return;

    if (window.location.hash !== '#sc-modal') {
      history.pushState({ scModal: true }, '', '#sc-modal');
    }

    const onPop = () => onClose();
    window.addEventListener('popstate', onPop);

    return () => {
      window.removeEventListener('popstate', onPop);
      if (window.location.hash === '#sc-modal') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
  }, [onClose]);
}
