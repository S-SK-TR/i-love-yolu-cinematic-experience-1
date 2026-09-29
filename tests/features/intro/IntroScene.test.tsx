import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntroScene } from '@/features/intro/IntroScene';

// Mock Zustand store
jest.mock('@/store/sceneStore', () => ({
  useSceneStore: jest.fn(() => ({
    setScene: jest.fn()
  }))
}));

// Mock hooks
jest.mock('@/hooks/usePerformanceOptimizer', () => ({
  usePerformanceOptimizer: jest.fn()
}));

// Mock child components
jest.mock('@/components/ui/Button', () => ({ Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button onClick={onClick}>{children}</button>
)}));

jest.mock('@/components/ui/Typography', () => ({
  Typography: ({ children, variant }: { children: React.ReactNode; variant?: string }) => (
    variant === 'h1' ? <h1>{children}</h1> : <p>{children}</p>
  )
}));

jest.mock('@/components/layout/SceneWrapper', () => ({
  SceneWrapper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('IntroScene Component', () => {
  it('renders correctly', () => {
    render(<IntroScene />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls setScene when button is clicked', () => {
    const mockSetScene = jest.fn();
    jest.mock('@/store/sceneStore', () => ({
      useSceneStore: jest.fn(() => ({
        setScene: mockSetScene
      }))
    }));

    render(<IntroScene />);
    fireEvent.click(screen.getByRole('button'));

    expect(mockSetScene).toHaveBeenCalled();
  });
});