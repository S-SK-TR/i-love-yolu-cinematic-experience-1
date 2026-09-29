import React from 'react';
import { render, screen } from '@testing-library/react';
import { SceneWrapper } from '@/components/layout/SceneWrapper';

// Mock Zustand store
jest.mock('@/store/sceneStore', () => ({
  useSceneStore: jest.fn(() => ({
    currentScene: 'test-scene',
    transitionState: { from: '', to: '', progress: 0 },
    setTransitionState: jest.fn()
  }))
}));

// Mock hook
jest.mock('@/hooks/useSceneTransition', () => ({
  useSceneTransition: jest.fn(() => ({
    transitionScene: jest.fn(() => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 }
    }))
  }))
}));

describe('SceneWrapper Component', () => {
  it('renders children when current scene matches', () => {
    render(
      <SceneWrapper sceneKey="test-scene">
        <div>Test Content</div>
      </SceneWrapper>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render children when current scene does not match', () => {
    render(
      <SceneWrapper sceneKey="other-scene">
        <div>Test Content</div>
      </SceneWrapper>
    );

    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(
      <SceneWrapper sceneKey="test-scene">
        <div>Test Content</div>
      </SceneWrapper>
    );

    const region = screen.getByRole('region');
    expect(region).toHaveAttribute('aria-label', 'Scene: test-scene');
    expect(region).toHaveAttribute('aria-live', 'polite');
  });
});