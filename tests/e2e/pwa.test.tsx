import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { setupWorker, rest } from 'msw';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

// Mock service worker setup
const worker = setupWorker(
  rest.get('*', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Mocked response' })
    )
  })
);

beforeAll(() => worker.start());

describe('PWA Functionality', () => {
  it('should register service worker and cache assets', async () => {
    // Test service worker registration
    const registration = await navigator.serviceWorker.getRegistration();
    expect(registration).toBeDefined();
  });

  it('should work offline after caching assets', async () => {
    // Simulate offline mode
    window.navigator.onLine = false;

    // Render app
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Verify content is displayed even in offline mode
    await waitFor(() => {
      expect(screen.getByText(/Giriş sahnesi/i)).toBeInTheDocument();
    });
  });

  it('should update service worker when new version is available', async () => {
    // Simulate new service worker version
    const newWorker = new Worker('/sw.js');
    newWorker.postMessage({ type: 'SKIP_WAITING' });

    // Verify update notification
    await waitFor(() => {
      expect(screen.getByText(/Yeni sürüm mevcut/i)).toBeInTheDocument();
    });
  });

  it('should display PWA test results correctly', async () => {
    // Render app with PWA test route
    render(
      <MemoryRouter initialEntries={['/pwa-test']}>
        <App />
      </MemoryRouter>
    );

    // Verify PWA test scene is rendered
    await waitFor(() => {
      expect(screen.getByText(/PWA Test Sahnesi/i)).toBeInTheDocument();
    });

    // Verify test results are displayed after running tests
    const testButton = screen.getByText(/PWA Testlerini Çalıştır/i);
    fireEvent.click(testButton);

    await waitFor(() => {
      expect(screen.getByText(/Service Worker Registration/i)).toBeInTheDocument();
      expect(screen.getByText(/Cache Storage/i)).toBeInTheDocument();
      expect(screen.getByText(/Offline Functionality/i)).toBeInTheDocument();
      expect(screen.getByText(/Service Worker Update/i)).toBeInTheDocument();
    });
  });
});
