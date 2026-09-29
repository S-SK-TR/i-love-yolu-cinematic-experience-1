import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '@/store/settingsStore';
import { useSceneTransition } from '@/hooks/useSceneTransition';
import { cn } from '@/lib/utils';
import { WifiOff, Download, Monitor } from 'lucide-react';
import { ParticlesBackground } from '@/components/shared/ParticlesBackground';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [offline, setOffline] = useState(!navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const { prefersReducedMotion } = useSettingsStore();
  const { transitionScene } = useSceneTransition();
  const location = useLocation();

  useEffect(() => {
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      setInstallPrompt(null);
    });
  };

  return (
    <div className="flex flex-col h-dvh bg-[var(--bg-base)] text-[var(--text-primary)]" role="main">
      {/* Skip Navigation Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>

      {/* Particles Background */}
      <ParticlesBackground aria-hidden="true" />

      {/* PWA Banner */}
      {installPrompt && (
        <div className="fixed top-0 inset-x-0 z-50 bg-blue-600 text-white p-2 sm:p-3 flex items-center justify-between" role="alert" aria-live="polite">
          <span className="text-xs sm:text-sm font-medium">Install I Love Yolu for a better experience</span>
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Install application"
          >
            <Download size={14} className="sm:hidden" />
            <Download size={16} className="hidden sm:block" />
            <span className="text-xs sm:text-sm font-medium">Install</span>
          </button>
        </div>
      )}

      {/* Offline Banner */}
      {offline && (
        <div className="fixed top-0 inset-x-0 z-50 bg-amber-500 text-amber-950 p-2 sm:p-3 flex items-center gap-1 sm:gap-2" role="alert" aria-live="polite">
          <WifiOff size={14} className="sm:hidden" />
          <WifiOff size={16} className="hidden sm:block" />
          <span className="text-xs sm:text-sm font-medium">You're offline - Changes will be saved when you're back online</span>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden" id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            {...transitionScene({ duration: prefersReducedMotion ? 0 : 0.5 })}
            className="h-full"
            role="region"
            aria-label={`Current scene: ${location.pathname}`}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-surface)]/90 backdrop-blur-xl border-t border-[var(--border)] p-2 sm:hidden">
        <div className="flex justify-around">
          <NavLink
            to="/"
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-1 p-2 rounded-lg",
              isActive ? "text-blue-500" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            )}
            aria-label="Go to Intro"
          >
            <Monitor size={20} />
            <span className="text-xs">Intro</span>
          </NavLink>
          <NavLink
            to="/browser-compatibility"
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-1 p-2 rounded-lg",
              isActive ? "text-blue-500" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            )}
            aria-label="Go to Browser Compatibility"
          >
            <Monitor size={20} />
            <span className="text-xs">Compatibility</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}