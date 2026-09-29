import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const IntroScene = lazy(() => import('@/features/intro/IntroScene'));
const DiscoveryScene = lazy(() => import('@/features/discovery/DiscoveryScene'));
const ReflectionScene = lazy(() => import('@/features/reflection/ReflectionScene'));
const InteractionScene = lazy(() => import('@/features/interaction/InteractionScene'));
const FinaleScene = lazy(() => import('@/features/finale/FinaleScene'));
const BrowserCompatibilityTest = lazy(() => import('@/features/browser-compatibility/BrowserCompatibilityTest'));
const PWATestScene = lazy(() => import('@/features/pwa/PWATestScene'));

function App() {
  usePrefersReducedMotion();

  return (
    <BrowserRouter>
      <AppShell>
        <Suspense fallback={<LoadingSpinner />}> 
          <Routes>
            <Route path="/" element={<IntroScene />} aria-label="Giriş sahnesi" />
            <Route path="/discovery" element={<DiscoveryScene />} aria-label="Keşif sahnesi" />
            <Route path="/reflection" element={<ReflectionScene onNext={() => {}} />} aria-label="Yansıma sahnesi" />
            <Route path="/interaction" element={<InteractionScene />} aria-label="Etkileşim sahnesi" />
            <Route path="/finale" element={<FinaleScene />} aria-label="Final sahnesi" />
            <Route path="/browser-compatibility" element={<BrowserCompatibilityTest />} aria-label="Tarayıcı uyumluluk testi" />
            <Route path="/pwa-test" element={<PWATestScene />} aria-label="PWA testi" />
          </Routes>
        </Suspense>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
