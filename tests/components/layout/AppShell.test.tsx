import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';

// Mock child components
jest.mock('@/components/shared/ParticlesBackground', () => () => <div>ParticlesBackground</div>);

// Mock Zustand stores
jest.mock('@/store/settingsStore', () => ({
  useSettingsStore: jest.fn(() => ({
    prefersReducedMotion: false
  }))
}));

// Mock hooks
jest.mock('@/hooks/useSceneTransition', () => ({
  useSceneTransition: jest.fn(() => ({
    transitionScene: jest.fn(() => ({}))
  }))
}));

describe('AppShell Component', () => {
  it('renders children correctly', () => {
    render(
      <MemoryRouter>
        <AppShell>
          <div>Test Content</div>
        </AppShell>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('shows offline banner when offline', () => {
    // Mock navigator.onLine to be false
    Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });

    render(
      <MemoryRouter>
        <AppShell>
          <div>Test Content</div>
        </AppShell>
      </MemoryRouter>
    );

    expect(screen.getByText(/You're offline/i)).toBeInTheDocument();
  });

  it('shows install prompt when available', () => {
    const mockPrompt = {
      prompt: jest.fn(),
      userChoice: Promise.resolve({ outcome: 'accepted' })
    };

    // Mock beforeinstallprompt event
    const event = new Event('beforeinstallprompt');
    Object.assign(event, { prompt: mockPrompt.prompt });
    window.dispatchEvent(event);

    render(
      <MemoryRouter>
        <AppShell>
          <div>Test Content</div>
        </AppShell>
      </MemoryRouter>
    );

    expect(screen.getByText(/Install I Love Yolu/i)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Install application'));
    expect(mockPrompt.prompt).toHaveBeenCalled();
  });

  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <AppShell>
          <div>Test Content</div>
        </AppShell>
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Go to Intro')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to Browser Compatibility')).toBeInTheDocument();
  });
});