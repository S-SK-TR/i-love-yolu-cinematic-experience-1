import React from 'react';
import { Card } from '@/components/ui/Card';
import { useBrowserCompatibilityStore } from '@/store/browserCompatibilityStore';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

interface BrowserCompatibilityReportProps {
  onBack: () => void;
}

export function BrowserCompatibilityReport({ onBack }: BrowserCompatibilityReportProps) {
  const { testResults } = useBrowserCompatibilityStore();

  if (!testResults || testResults.length === 0) {
    return (
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <Card className="glass-card p-6">
          <h2 className="text-2xl font-bold mb-4">No Test Results</h2>
          <p className="text-[var(--text-muted)] mb-6">
            Please run the browser compatibility test first.
          </p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg hover:bg-[var(--bg-surface)] transition-colors"
          >
            Back to Test
          </button>
        </Card>
      </div>
    );
  }

  const allCompatible = testResults.every(result => result.compatible);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <Card className={`glass-card p-6 ${allCompatible ? 'border-green-500/30' : 'border-red-500/30'}`}>
          <div className="flex items-center gap-3 mb-4">
            {allCompatible ? (
              <CheckCircle2 className="text-green-500" size={24} />
            ) : (
              <XCircle className="text-red-500" size={24} />
            )}
            <h2 className="text-2xl font-bold">
              {allCompatible ? 'Your Browser is Fully Compatible' : 'Compatibility Issues Detected'}
            </h2>
          </div>

          <p className="text-[var(--text-muted)] mb-6">
            {allCompatible
              ? 'Your browser supports all required features for the best experience.'
              : 'Some features may not work properly in your current browser.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg hover:bg-[var(--bg-surface)] transition-colors"
            >
              Back to Test
            </button>
            <button
              onClick={() => window.location.href = 'https://browsehappy.com/'}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Update Browser
            </button>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-4">Detailed Results</h3>
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
                {testResults.map((result, index) => (
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

        <Card className="glass-card p-6">
          <div className="flex items-start gap-3">
            <Info className="text-blue-500 mt-1" size={20} />
            <div>
              <h4 className="text-lg font-semibold mb-2">Recommendations</h4>
              <ul className="list-disc pl-5 space-y-2 text-[var(--text-muted)]">
                <li>For the best experience, use the latest version of Chrome, Firefox, Safari, or Edge.</li>
                <li>Enable hardware acceleration in your browser settings.</li>
                <li>Clear your browser cache if you're experiencing issues.</li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}