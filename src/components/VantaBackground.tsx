import { useEffect, useRef } from 'react';

interface VantaBackgroundProps {
  effect?: 'net' | 'globe';
  children: React.ReactNode;
}

export default function VantaBackground({ effect = 'net', children }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaRef.current) return;

    const initVanta = () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
      
      // Check device capabilities for performance optimization
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const isDesktop = window.innerWidth >= 1024;
      
      if (effect === 'globe' && (window as any).VANTA?.GLOBE) {
        vantaEffect.current = (window as any).VANTA.GLOBE({
          el: vantaRef.current,
          mouseControls: !isMobile,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: isMobile ? 0.7 : isTablet ? 0.9 : 1.0,
          scaleMobile: 0.7,
          color: 0x00f7ff,
          color2: 0xae00ff,
          backgroundColor: 0x0e0e1a,
          size: isMobile ? 0.5 : isTablet ? 0.7 : 0.8
        });
      } else if ((window as any).VANTA?.NET) {
        vantaEffect.current = (window as any).VANTA.NET({
          el: vantaRef.current,
          mouseControls: !isMobile,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: isMobile ? 0.7 : isTablet ? 0.9 : 1.0,
          scaleMobile: 0.7,
          color: 0x00f7ff,
          backgroundColor: 0x0e0e1a,
          points: isMobile ? 5.0 : isTablet ? 7.0 : 10.0,
          maxDistance: isMobile ? 12.0 : isTablet ? 18.0 : 25.0,
          spacing: isMobile ? 10.0 : isTablet ? 13.0 : 16.0
        });
      }
    };

    // Try to initialize immediately if VANTA is already loaded
    if ((window as any).VANTA) {
      initVanta();
    } else {
      // Otherwise wait for scripts to load
      const checkVanta = setInterval(() => {
        if ((window as any).VANTA) {
          initVanta();
          clearInterval(checkVanta);
        }
      }, 100);

      return () => clearInterval(checkVanta);
    }

    // Reinitialize on resize for responsive behavior
    const handleResize = () => {
      if (vantaEffect.current) {
        setTimeout(initVanta, 200);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, [effect]);

  return (
    <div ref={vantaRef} className="fixed inset-0 z-0">
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
}