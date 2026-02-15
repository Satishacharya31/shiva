import React, { useEffect, useRef } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}

interface SplineProps {
  scene: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Spline({ scene, width, height, className, style }: SplineProps) {
  const viewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    // Function to inject styles into shadow DOM to hide logo
    const hideLogo = () => {
      if (viewer.shadowRoot) {
        // Check if style already exists
        if (!viewer.shadowRoot.querySelector('#hide-logo-style')) {
          const styleSheet = document.createElement('style');
          styleSheet.id = 'hide-logo-style';
          styleSheet.textContent = `
            #logo { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }
            a[href*="spline.design"] { display: none !important; }
          `;
          viewer.shadowRoot.appendChild(styleSheet);
        }
      }
    };

    // Attempt immediately
    hideLogo();

    // Set up an observer to catch it when Shadow DOM is attached/updated
    const observer = new MutationObserver(() => {
      hideLogo();
    });

    observer.observe(viewer, { childList: true, subtree: true }); // Observe changes to detect when shadow root is populated

    // Also retry on interval for a short time to catch race conditions
    const interval = setInterval(hideLogo, 100);
    setTimeout(() => clearInterval(interval), 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [scene]);

  return (
    <div 
      className={className} 
      style={{ 
        width: width || '100%', 
        height: height || '100%', 
        position: 'relative',
        ...style 
      }}
    >
      <spline-viewer
        ref={viewerRef}
        url={scene}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* Fallback loading state or image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin"></div>
        </div>
      </spline-viewer>
    </div>
  );
}