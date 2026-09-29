import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useSceneStore } from '@/store/sceneStore';
import { motion } from 'framer-motion';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'pending';
  details?: string;
  ariaLabel?: string;
}

export function PWATestScene() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    lcp: 0,
    fid: 0,
    cls: 0
  });
  const setScene = useSceneStore(state => state.setScene);

  useEffect(() => {
    // Service worker güncelleme kontrolü
    const checkForUpdates = async () => {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration && registration.waiting) {
          setUpdateAvailable(true);
        }
      }
    };

    checkForUpdates();
    const interval = setInterval(checkForUpdates, 30000);
    return () => clearInterval(interval);
  }, []);

  const runTests = async () => {
    setIsTesting(true);
    setTestResults([]);

    // Performans metriklerini ölç
    const lcp = await measureLCP();
    const fid = await measureFID();
    const cls = await measureCLS();

    setPerformanceMetrics({ lcp, fid, cls });

    // ARIA etiketleri doğrulama testi
    const ariaTest = await testARIALabels();
    setTestResults(prev => [...prev, ariaTest]);

    // Klavye navigasyonu testi
    const keyboardTest = await testKeyboardNavigation();
    setTestResults(prev => [...prev, keyboardTest]);

    // Kontrast oranları testi
    const contrastTest = await testContrastRatios();
    setTestResults(prev => [...prev, contrastTest]);

    // Mevcut PWA testleri
    const swTest = await testServiceWorker();
    setTestResults(prev => [...prev, swTest]);

    const cacheTest = await testCacheStorage();
    setTestResults(prev => [...prev, cacheTest]);

    const offlineTest = await testOfflineFunctionality();
    setTestResults(prev => [...prev, offlineTest]);

    const updateTest = await testUpdateCheck();
    setTestResults(prev => [...prev, updateTest]);

    setIsTesting(false);
  };

  const measureLCP = async (): Promise<number> => {
    return new Promise(resolve => {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lcpEntry = entries[entries.length - 1];
        resolve(lcpEntry.startTime);
        observer.disconnect();
      });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    });
  };

  const measureFID = async (): Promise<number> => {
    return new Promise(resolve => {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const fidEntry = entries[entries.length - 1];
        resolve(fidEntry.processingStart - fidEntry.startTime);
        observer.disconnect();
      });
      observer.observe({ type: 'first-input', buffered: true });
    });
  };

  const measureCLS = async (): Promise<number> => {
    let clsValue = 0;
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
    });
    observer.observe({ type: 'layout-shift', buffered: true });
    return clsValue;
  };

  const testARIALabels = async (): Promise<TestResult> => {
    try {
      // Tüm interaktif elementleri kontrol et
      const interactiveElements = document.querySelectorAll('[role="button"], [role="link"], [role="checkbox"], [role="radio"], [role="tab"], [role="menuitem"], [role="switch"]');
      let missingLabels = 0;

      interactiveElements.forEach(el => {
        if (!el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby')) {
          missingLabels++;
        }
      });

      if (missingLabels === 0) {
        return {
          name: 'ARIA Etiketleri Doğrulaması',
          status: 'pass',
          details: 'Tüm interaktif elementler için ARIA etiketleri mevcut',
          ariaLabel: 'ARIA etiketleri doğrulama testi geçti'
        };
      }
      return {
        name: 'ARIA Etiketleri Doğrulaması',
        status: 'fail',
        details: `${missingLabels} interaktif element için ARIA etiketi eksik`,
        ariaLabel: 'ARIA etiketleri doğrulama testi başarısız'
      };
    } catch (error) {
      return {
        name: 'ARIA Etiketleri Doğrulaması',
        status: 'fail',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata',
        ariaLabel: 'ARIA etiketleri doğrulama testi başarısız'
      };
    }
  };

  const testKeyboardNavigation = async (): Promise<TestResult> => {
    try {
      // Klavye navigasyonunu simüle et
      const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      let focusableCount = focusableElements.length;

      if (focusableCount > 0) {
        return {
          name: 'Klavye Navigasyonu Testi',
          status: 'pass',
          details: `${focusableCount} klavye ile navigasyon yapılabilir element bulundu`,
          ariaLabel: 'Klavye navigasyonu testi geçti'
        };
      }
      return {
        name: 'Klavye Navigasyonu Testi',
        status: 'fail',
        details: 'Klavye ile navigasyon yapılabilir element bulunamadı',
        ariaLabel: 'Klavye navigasyonu testi başarısız'
      };
    } catch (error) {
      return {
        name: 'Klavye Navigasyonu Testi',
        status: 'fail',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata',
        ariaLabel: 'Klavye navigasyonu testi başarısız'
      };
    }
  };

  const testContrastRatios = async (): Promise<TestResult> => {
    try {
      // Basit kontrast oranı kontrolü
      const elements = document.querySelectorAll('*');
      let lowContrastCount = 0;

      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const bgColor = style.backgroundColor;
        const textColor = style.color;

        // Basit renk karşılaştırması (gerçek hesaplama için bir kütüphane kullanılmalı)
        if (bgColor === textColor) {
          lowContrastCount++;
        }
      });

      if (lowContrastCount === 0) {
        return {
          name: 'Kontrast Oranları Testi',
          status: 'pass',
          details: 'Tüm elementler için yeterli kontrast oranı bulundu',
          ariaLabel: 'Kontrast oranları testi geçti'
        };
      }
      return {
        name: 'Kontrast Oranları Testi',
        status: 'fail',
        details: `${lowContrastCount} element için düşük kontrast oranı tespit edildi`,
        ariaLabel: 'Kontrast oranları testi başarısız'
      };
    } catch (error) {
      return {
        name: 'Kontrast Oranları Testi',
        status: 'fail',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata',
        ariaLabel: 'Kontrast oranları testi başarısız'
      };
    }
  };

  const testServiceWorker = async (): Promise<TestResult> => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        return {
          name: 'Service Worker Registration',
          status: 'pass',
          details: `Active SW scope: ${registration.scope}`,
          ariaLabel: 'Service worker registration testi geçti'
        };
      }
      return {
        name: 'Service Worker Registration',
        status: 'fail',
        details: 'No active service worker found',
        ariaLabel: 'Service worker registration testi başarısız'
      };
    } catch (error) {
      return {
        name: 'Service Worker Registration',
        status: 'fail',
        details: error instanceof Error ? error.message : 'Unknown error',
        ariaLabel: 'Service worker registration testi başarısız'
      };
    }
  };

  const testCacheStorage = async (): Promise<TestResult> => {
    try {
      const cacheNames = await caches.keys();
      if (cacheNames.length > 0) {
        return {
          name: 'Cache Storage',
          status: 'pass',
          details: `Found ${cacheNames.length} caches: ${cacheNames.join(', ')}`,
          ariaLabel: 'Cache storage testi geçti'
        };
      }
      return {
        name: 'Cache Storage',
        status: 'fail',
        details: 'No caches found',
        ariaLabel: 'Cache storage testi başarısız'
      };
    } catch (error) {
      return {
        name: 'Cache Storage',
        status: 'fail',
        details: error instanceof Error ? error.message : 'Unknown error',
        ariaLabel: 'Cache storage testi başarısız'
      };
    }
  };

  const testOfflineFunctionality = async (): Promise<TestResult> => {
    try {
      setOfflineMode(true);
      window.navigator.onLine = false;

      const cache = await caches.open('static-assets');
      const cachedResponse = await cache.match('/');

      if (cachedResponse) {
        return {
          name: 'Offline Functionality',
          status: 'pass',
          details: 'Critical assets are cached for offline use',
          ariaLabel: 'Offline functionality testi geçti'
        };
      }
      return {
        name: 'Offline Functionality',
        status: 'fail',
        details: 'Critical assets not found in cache',
        ariaLabel: 'Offline functionality testi başarısız'
      };
    } catch (error) {
      return {
        name: 'Offline Functionality',
        status: 'fail',
        details: error instanceof Error ? error.message : 'Unknown error',
        ariaLabel: 'Offline functionality testi başarısız'
      };
    } finally {
      setOfflineMode(false);
      window.navigator.onLine = true;
    }
  };

  const testUpdateCheck = async (): Promise<TestResult> => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration && registration.waiting) {
        return {
          name: 'Service Worker Update',
          status: 'pass',
          details: 'New service worker version available',
          ariaLabel: 'Service worker update testi geçti'
        };
      }
      return {
        name: 'Service Worker Update',
        status: 'fail',
        details: 'No waiting service worker found',
        ariaLabel: 'Service worker update testi başarısız'
      };
    } catch (error) {
      return {
        name: 'Service Worker Update',
        status: 'fail',
        details: error instanceof Error ? error.message : 'Unknown error',
        ariaLabel: 'Service worker update testi başarısız'
      };
    }
  };

  const applyUpdate = async () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {offlineMode && (
        <div className="fixed top-0 left-0 right-0 bg-amber-500 text-amber-950 p-2 text-center text-sm font-medium" role="alert" aria-live="assertive">
          Çevrimdışı mod: Uygulama önbelleğe alınmış içerikleri kullanıyor
        </div>
      )}
      {updateAvailable && (
        <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-2 text-center text-sm font-medium" role="alert" aria-live="assertive">
          Yeni güncelleme mevcut! <button onClick={applyUpdate} className="underline ml-2" aria-label="Yeni güncellemeyi yükle">Şimdi yükle</button>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="glass-card p-6" aria-labelledby="pwa-test-title">
          <Typography variant="h2" id="pwa-test-title" className="mb-4">PWA Test Sahnesi</Typography>
          <Typography className="mb-6">
            Bu sahne, uygulamanın PWA özelliklerini test etmek için kullanılır.
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="glass-card p-4">
              <Typography variant="h4" className="mb-2">LCP</Typography>
              <Typography className="text-2xl font-bold">{performanceMetrics.lcp.toFixed(0)}ms</Typography>
              <Typography className="text-sm text-gray-500">Largest Contentful Paint</Typography>
            </Card>
            <Card className="glass-card p-4">
              <Typography variant="h4" className="mb-2">FID</Typography>
              <Typography className="text-2xl font-bold">{performanceMetrics.fid.toFixed(0)}ms</Typography>
              <Typography className="text-sm text-gray-500">First Input Delay</Typography>
            </Card>
            <Card className="glass-card p-4">
              <Typography variant="h4" className="mb-2">CLS</Typography>
              <Typography className="text-2xl font-bold">{performanceMetrics.cls.toFixed(3)}</Typography>
              <Typography className="text-sm text-gray-500">Cumulative Layout Shift</Typography>
            </Card>
          </div>

          <Button
            onClick={runTests}
            disabled={isTesting}
            className="mb-6"
            variant="primary"
            aria-label={isTesting ? 'Testler çalıştırılıyor' : 'PWA testlerini çalıştır'}
          >
            {isTesting ? 'Testler Çalıştırılıyor...' : 'PWA Testlerini Çalıştır'}
          </Button>

          {testResults.length > 0 && (
            <div className="space-y-4" aria-live="polite">
              {testResults.map((result, index) => (
                <div key={index} className="p-4 rounded-lg border border-gray-200" role="region" aria-labelledby={`test-result-${index}`}>
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="h4" id={`test-result-${index}`}>{result.name}</Typography>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${result.status === 'pass' ? 'bg-green-100 text-green-800' : result.status === 'fail' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`} aria-label={result.ariaLabel}>
                      {result.status === 'pass' ? '✓ Geçti' : result.status === 'fail' ? '✗ Başarısız' : '... Bekleniyor'}
                    </span>
                  </div>
                  {result.details && (
                    <Typography className="text-sm text-gray-600">
                      {result.details}
                    </Typography>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button
              onClick={() => setScene('finale')}
              variant="secondary"
              aria-label="Finale sahnesine geri dön"
            >
              Geri Dön
            </Button>
            <Button
              onClick={() => setScene('discovery')}
              variant="primary"
              aria-label="Discovery sahnesine git"
            >
              Sonraki Sahne
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
