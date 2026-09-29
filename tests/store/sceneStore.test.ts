import { renderHook, act } from '@testing-library/react';
import { useSceneStore } from '@/store/sceneStore';

describe('Scene Store', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSceneStore());

    expect(result.current.currentScene).toBe('intro');
    expect(result.current.transitioning).toBe(false);
    expect(result.current.interactionComplete).toBe(false);
    expect(result.current.transitionState).toEqual({
      from: '',
      to: '',
      progress: 0
    });
  });

  it('should update current scene', () => {
    const { result } = renderHook(() => useSceneStore());

    act(() => {
      result.current.setScene('discovery');
    });

    expect(result.current.currentScene).toBe('discovery');
  });

  it('should update transitioning state', () => {
    const { result } = renderHook(() => useSceneStore());

    act(() => {
      result.current.setTransitioning(true);
    });

    expect(result.current.transitioning).toBe(true);
  });

  it('should update interaction complete state', () => {
    const { result } = renderHook(() => useSceneStore());

    act(() => {
      result.current.setInteractionComplete(true);
    });

    expect(result.current.interactionComplete).toBe(true);
  });

  it('should update transition state partially', () => {
    const { result } = renderHook(() => useSceneStore());

    act(() => {
      result.current.setTransitionState({ from: 'intro', to: 'discovery' });
    });

    expect(result.current.transitionState).toEqual({
      from: 'intro',
      to: 'discovery',
      progress: 0
    });
  });
});