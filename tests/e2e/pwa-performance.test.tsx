import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PWATestScene } from '@/features/pwa/PWATestScene';

// Mock service worker setup
const server = setupServer(
  rest.get('https://api.example.com/test', (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  })
);

beforeAll(() => server.listen());

describe('PWA Performance Tests', () => {
  it('should measure LCP (Largest Contentful Paint)', async () => {
    const startTime = performance.now();
    render(<PWATestScene />);
    const lcpElement = await screen.findByRole('heading', { name: 'PWA Test Sahnesi' });
    const lcpTime = performance.now() - startTime;
    expect(lcpTime).toBeLessThan(2000); // 2 seconds threshold
  });

  it('should measure FID (First Input Delay)', async () => {
    render(<PWATestScene />);
    const button = await screen.findByRole('button', { name: 'PWA Testlerini Çalıştır' });
    const startTime = performance.now();
    await userEvent.click(button);
    const fidTime = performance.now() - startTime;
    expect(fidTime).toBeLessThan(100); // 100ms threshold
  });

  it('should measure CLS (Cumulative Layout Shift)', async () => {
    render(<PWATestScene />);
    const initialLayout = document.body.getBoundingClientRect();
    const button = await screen.findByRole('button', { name: 'PWA Testlerini Çalıştır' });
    await userEvent.click(button);
    const finalLayout = document.body.getBoundingClientRect();
    const layoutShift = Math.abs(initialLayout.top - finalLayout.top);
    expect(layoutShift).toBeLessThan(0.1); // 0.1px threshold
  });
});

afterAll(() => server.close());
