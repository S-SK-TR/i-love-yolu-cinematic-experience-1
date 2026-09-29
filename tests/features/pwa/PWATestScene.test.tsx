import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PWATestScene } from '@/features/pwa/PWATestScene';
import { useSceneStore } from '@/store/sceneStore';

// Mock the useSceneStore
vi.mock('@/store/sceneStore', () => ({
  useSceneStore: vi.fn()
}));

// Mock service worker API
const mockServiceWorker = {
  getRegistration: vi.fn(),
  register: vi.fn()
};

// Mock cache API
const mockCacheStorage = {
  open: vi.fn(),
  keys: vi.fn()
};

beforeEach(() => {
  // Reset mocks
  vi.resetAllMocks();

  // Mock service worker
  Object.defineProperty(navigator, 'serviceWorker', {
    value: mockServiceWorker,
    configurable: true
  });

  // Mock cache storage
  Object.defineProperty(window, 'caches', {
    value: mockCacheStorage,
    configurable: true
  });

  // Mock scene store
  useSceneStore.mockReturnValue({
    setScene: vi.fn()
  });
});

describe('PWATestScene', () => {
  it('renders the test scene with all elements', () => {
    render(<PWATestScene />);

    expect(screen.getByText('PWA Test Sahnesi')).toBeInTheDocument();
    expect(screen.getByText(/Bu sahne, uygulamanın PWA özelliklerini test etmek için kullanılır./i)).toBeInTheDocument();
    expect(screen.getByText('PWA Testlerini Çalıştır')).toBeInTheDocument();
    expect(screen.getByText('Geri Dön')).toBeInTheDocument();
    expect(screen.getByText('Sonraki Sahne')).toBeInTheDocument();
  });

  it('runs all PWA tests when button is clicked', async () => {
    // Mock successful service worker registration
    mockServiceWorker.getRegistration.mockResolvedValue({
      scope: '/',
      active: { state: 'activated' }
    });

    // Mock cache storage
    mockCacheStorage.keys.mockResolvedValue(['static-assets']);
    mockCacheStorage.open.mockResolvedValue({
      match: vi.fn().mockResolvedValue(new Response('Mocked response'))
    });

    render(<PWATestScene />);

    const testButton = screen.getByText('PWA Testlerini Çalıştır');
    fireEvent.click(testButton);

    // Wait for tests to complete
    await waitFor(() => {
      expect(screen.getAllByText(/✓ Geçti/i)).toHaveLength(7); // 4 existing + 3 new tests
    });

    // Verify all test results are displayed
    expect(screen.getByText('ARIA Etiketleri Doğrulaması')).toBeInTheDocument();
    expect(screen.getByText('Klavye Navigasyonu Testi')).toBeInTheDocument();
    expect(screen.getByText('Kontrast Oranları Testi')).toBeInTheDocument();
    expect(screen.getByText('Service Worker Registration')).toBeInTheDocument();
    expect(screen.getByText('Cache Storage')).toBeInTheDocument();
    expect(screen.getByText('Offline Functionality')).toBeInTheDocument();
    expect(screen.getByText('Service Worker Update')).toBeInTheDocument();
  });

  it('handles ARIA labels test failure', async () => {
    // Mock DOM with missing ARIA labels
    document.body.innerHTML = '<button>Test Button</button>';

    render(<PWATestScene />);
    fireEvent.click(screen.getByText('PWA Testlerini Çalıştır'));

    await waitFor(() => {
      expect(screen.getByText('ARIA Etiketleri Doğrulaması')).toBeInTheDocument();
      expect(screen.getByText(/✗ Başarısız/i)).toBeInTheDocument();
      expect(screen.getByText(/1 interaktif element için ARIA etiketi eksik/i)).toBeInTheDocument();
    });
  });

  it('handles keyboard navigation test failure', async () => {
    // Mock DOM with no focusable elements
    document.body.innerHTML = '<div>No interactive elements</div>';

    render(<PWATestScene />);
    fireEvent.click(screen.getByText('PWA Testlerini Çalıştır'));

    await waitFor(() => {
      expect(screen.getByText('Klavye Navigasyonu Testi')).toBeInTheDocument();
      expect(screen.getByText(/✗ Başarısız/i)).toBeInTheDocument();
      expect(screen.getByText(/Klavye ile navigasyon yapılabilir element bulunamadı/i)).toBeInTheDocument();
    });
  });

  it('handles contrast ratios test failure', async () => {
    // Mock DOM with low contrast elements
    document.body.innerHTML = '<div style="background-color: #000; color: #000">Low contrast text</div>';

    render(<PWATestScene />);
    fireEvent.click(screen.getByText('PWA Testlerini Çalıştır'));

    await waitFor(() => {
      expect(screen.getByText('Kontrast Oranları Testi')).toBeInTheDocument();
      expect(screen.getByText(/✗ Başarısız/i)).toBeInTheDocument();
      expect(screen.getByText(/1 element için düşük kontrast oranı tespit edildi/i)).toBeInTheDocument();
    });
  });

  it('handles service worker registration failure', async () => {
    mockServiceWorker.getRegistration.mockRejectedValue(new Error('SW registration failed'));

    render(<PWATestScene />);
    fireEvent.click(screen.getByText('PWA Testlerini Çalıştır'));

    await waitFor(() => {
      expect(screen.getByText('Service Worker Registration')).toBeInTheDocument();
      expect(screen.getByText(/✗ Başarısız/i)).toBeInTheDocument();
      expect(screen.getByText(/SW registration failed/i)).toBeInTheDocument();
    });
  });

  it('handles cache storage failure', async () => {
    mockCacheStorage.keys.mockRejectedValue(new Error('Cache access failed'));

    render(<PWATestScene />);
    fireEvent.click(screen.getByText('PWA Testlerini Çalıştır'));

    await waitFor(() => {
      expect(screen.getByText('Cache Storage')).toBeInTheDocument();
      expect(screen.getByText(/✗ Başarısız/i)).toBeInTheDocument();
      expect(screen.getByText(/Cache access failed/i)).toBeInTheDocument();
    });
  });

  it('handles offline functionality failure', async () => {
    mockCacheStorage.open.mockResolvedValue({
      match: vi.fn().mockResolvedValue(null)
    });

    render(<PWATestScene />);
    fireEvent.click(screen.getByText('PWA Testlerini Çalıştır'));

    await waitFor(() => {
      expect(screen.getByText('Offline Functionality')).toBeInTheDocument();
      expect(screen.getByText(/✗ Başarısız/i)).toBeInTheDocument();
      expect(screen.getByText(/Critical assets not found in cache/i)).toBeInTheDocument();
    });
  });

  it('handles service worker update failure', async () => {
    mockServiceWorker.getRegistration.mockResolvedValue({
      scope: '/',
      active: { state: 'activated' }
    });

    render(<PWATestScene />);
    fireEvent.click(screen.getByText('PWA Testlerini Çalıştır'));

    await waitFor(() => {
      expect(screen.getByText('Service Worker Update')).toBeInTheDocument();
      expect(screen.getByText(/✗ Başarısız/i)).toBeInTheDocument();
      expect(screen.getByText(/No waiting service worker found/i)).toBeInTheDocument();
    });
  });

  it('shows offline mode banner when testing offline functionality', async () => {
    mockCacheStorage.open.mockResolvedValue({
      match: vi.fn().mockResolvedValue(new Response('Mocked response'))
    });

    render(<PWATestScene />);
    fireEvent.click(screen.getByText('PWA Testlerini Çalıştır'));

    await waitFor(() => {
      expect(screen.getByText(/Çevrimdışı mod/i)).toBeInTheDocument();
    });
  });

  it('shows update available banner when new service worker is waiting', async () => {
    mockServiceWorker.getRegistration.mockResolvedValue({
      scope: '/',
      active: { state: 'activated' },
      waiting: { state: 'installed' }
    });

    render(<PWATestScene />);

    await waitFor(() => {
      expect(screen.getByText(/Yeni güncelleme mevcut/i)).toBeInTheDocument();
      expect(screen.getByText('Şimdi yükle')).toBeInTheDocument();
    });
  });

  it('applies update when button is clicked', async () => {
    const mockPostMessage = vi.fn();
    mockServiceWorker.getRegistration.mockResolvedValue({
      scope: '/',
      active: { state: 'activated' },
      waiting: { state: 'installed', postMessage: mockPostMessage }
    });

    render(<PWATestScene />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Şimdi yükle'));
    });

    expect(mockPostMessage).toHaveBeenCalledWith({ type: 'SKIP_WAITING' });
  });
});
