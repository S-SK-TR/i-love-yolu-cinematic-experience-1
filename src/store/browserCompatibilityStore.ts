import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
    ariaLabels: boolean;
    keyboardNavigation: boolean;
    contrastRatios: boolean;
    lcp: number;
    fid: number;
    cls: number;
  };
}

interface BrowserCompatibilityState {
  testResults: BrowserTestResult[];
  setTestResults: (results: BrowserTestResult[]) => void;
  addTestResult: (result: BrowserTestResult) => void;
}

export const useBrowserCompatibilityStore = create(
  persist<BrowserCompatibilityState>( 
    (set) => ({
      testResults: [],
      setTestResults: (results) => set({ testResults: results }),
      addTestResult: (result) => set((state) => ({
        testResults: [...state.testResults, result]
      })),
    }),
    {
      name: 'browser-compatibility-storage',
      partialize: (state) => ({ testResults: state.testResults }),
    }
  )
);