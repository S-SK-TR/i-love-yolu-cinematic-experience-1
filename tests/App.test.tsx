import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

// Mock child components
jest.mock('@/features/intro/IntroScene', () => () => <div>IntroScene</div>);
jest.mock('@/features/discovery/DiscoveryScene', () => () => <div>DiscoveryScene</div>);
jest.mock('@/features/reflection/ReflectionScene', () => () => <div>ReflectionScene</div>);
jest.mock('@/features/interaction/InteractionScene', () => () => <div>InteractionScene</div>);
jest.mock('@/features/finale/FinaleScene', () => () => <div>FinaleScene</div>);
jest.mock('@/features/browser-compatibility/BrowserCompatibilityTest', () => () => <div>BrowserCompatibilityTest</div>);
jest.mock('@/features/pwa/PWATestScene', () => () => <div>PWATestScene</div>);

describe('App Component', () => {
  it('renders all routes correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Check if AppShell is rendered
    expect(screen.getByRole('main')).toBeInTheDocument();

    // Check if all routes are present in the Routes component
    expect(screen.getByLabelText('Giriş sahnesi')).toBeInTheDocument();
    expect(screen.getByLabelText('Keşif sahnesi')).toBeInTheDocument();
    expect(screen.getByLabelText('Yansıma sahnesi')).toBeInTheDocument();
    expect(screen.getByLabelText('Etkileşim sahnesi')).toBeInTheDocument();
    expect(screen.getByLabelText('Final sahnesi')).toBeInTheDocument();
    expect(screen.getByLabelText('Tarayıcı uyumluluk testi')).toBeInTheDocument();
    expect(screen.getByLabelText('PWA testi')).toBeInTheDocument();
  });

  it('renders loading spinner during lazy loading', () => {
    // Mock lazy loading to test fallback
    jest.mock('@/features/intro/IntroScene', () => {
      throw { default: () => <div>Loading...</div> }
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});