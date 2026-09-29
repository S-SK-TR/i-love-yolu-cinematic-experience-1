import { renderHook, act } from '@testing-library/react';
import { useSettingsStore } from '@/store/settingsStore';

describe('Settings Store', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSettingsStore());

    expect(result.current.prefersReducedMotion).toBe(false);
    expect(result.current.audioEnabled).toBe(true);
    expect(result.current.audioVolume).toBe(0.7);
    expect(result.current.pwaInstallPrompt).toBeNull();
    expect(result.current.backgroundMusicEnabled).toBe(true);
    expect(result.current.soundEffectsEnabled).toBe(true);
  });

  it('should update prefers reduced motion', () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.setPrefersReducedMotion(true);
    });

    expect(result.current.prefersReducedMotion).toBe(true);
  });

  it('should toggle reduced motion', () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.toggleReducedMotion();
    });

    expect(result.current.prefersReducedMotion).toBe(true);

    act(() => {
      result.current.toggleReducedMotion();
    });

    expect(result.current.prefersReducedMotion).toBe(false);
  });

  it('should update audio enabled state', () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.setAudioEnabled(false);
    });

    expect(result.current.audioEnabled).toBe(false);
  });

  it('should update audio volume', () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.setAudioVolume(0.5);
    });

    expect(result.current.audioVolume).toBe(0.5);
  });

  it('should update PWA install prompt', () => {
    const { result } = renderHook(() => useSettingsStore());
    const mockPrompt = { prompt: jest.fn() };

    act(() => {
      result.current.setPwaInstallPrompt(mockPrompt);
    });

    expect(result.current.pwaInstallPrompt).toBe(mockPrompt);
  });

  it('should update background music enabled state', () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.setBackgroundMusicEnabled(false);
    });

    expect(result.current.backgroundMusicEnabled).toBe(false);
  });

  it('should update sound effects enabled state', () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.setSoundEffectsEnabled(false);
    });

    expect(result.current.soundEffectsEnabled).toBe(false);
  });
});