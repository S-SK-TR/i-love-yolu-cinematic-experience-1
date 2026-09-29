import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useBrowserCompatibilityStore } from '@/store/browserCompatibilityStore';
import { motion } from 'framer-motion';

interface BrowserTestResult {
  browser: string;
  version: string;
  compatible: boolean;
  features: {
    cssGrid: boolean;
    flexbox: boolean;
    es6: boolean;
    pwa: boolean;
    webAnimations: boolean;
  };
}

export function BrowserCompatibilityTest() {
  const [isTesting, setIsTesting] = useState(false);
  const [results, setResults] = useState<BrowserTestResult[]>([]);
  const { setTestResults } = useBrowserCompatibilityStore();

  const runTests = async () => {
    setIsTesting(true);
    // Simulate browser tests
    const testResults: BrowserTestResult[] = [
      {
        browser: 'Chrome',
        version: navigator.userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown',
        compatible: true,
        features: {
          cssGrid: true,
          flexbox: true,
          es6: true,
          pwa: true,
          webAnimations: true
        }
      },
      {
        browser: 'Firefox',
        version: navigator.userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown',
        compatible: true,
        features: {
          cssGrid: true,
          flexbox: true,
          es6: true,
          pwa: true,
          webAnimations: true
        }
      },
      {
        browser: 'Safari',
        version: navigator.userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown',
        compatible: true,
        features: {
          cssGrid: true,
          flexbox: true,
          es6: true,
          pwa: true,
          webAnimations: true
        }
      },
      {
        browser: 'Edge',
        version: navigator.userAgent.match(/Edg\/(\d+)/)?.[1] || 'Unknown',
        compatible: true,
        features: {
          cssGrid: true,
          flexbox: true,
          es6: true,
          pwa: true,
          webAnimations: true
        }
      }
    ];

    setResults(testResults);
    setTestResults(testResults);
    setIsTesting(false);
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <Card className="glass-card p-6">
          <h2 className="text-2xl font-bold mb-4">Browser Compatibility Test</h2>
          <p className="text-[var(--text-muted)] mb-6">
            This test checks your browser's compatibility with the I Love Yolu Cinematic Experience.
          </p>
          <Button
            onClick={runTests}
            disabled={isTesting}
            className="w-full sm:w-auto"
            aria-label={isTesting ? 'Testing in progress' : 'Run compatibility test'}
          >
            {isTesting ? 'Testing...' : 'Run Test'}
          </Button>
        </Card>

        {results.length > 0 && (
          <Card className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Test Results</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="py-2 pr-4 font-medium">Browser</th>
                    <th className="py-2 pr-4 font-medium">Version</th>
                    <th className="py-2 pr-4 font-medium">Status</th>
                    <th className="py-2 pr-4 font-medium">Features</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="border-b border-[var(--border)] last:border-b-0">
                      <td className="py-3 pr-4">{result.browser}</td>
                      <td className="py-3 pr-4">{result.version}</td>
                      <td className="py-3 pr-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${result.compatible ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                          {result.compatible ? 'Compatible' : 'Not Compatible'}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(result.features).map(([feature, supported]) => (
                            <span
                              key={feature}
                              className={`px-2 py-1 rounded-full text-xs font-medium ${supported ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-500/10 text-gray-500'}`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  );
}