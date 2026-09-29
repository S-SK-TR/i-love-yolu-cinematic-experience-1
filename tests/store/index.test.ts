import * as stores from '@/store';

describe('Store Exports', () => {
  it('should export all store modules', () => {
    expect(stores).toHaveProperty('useSceneStore');
    expect(stores).toHaveProperty('useSettingsStore');
    expect(stores).toHaveProperty('useBrowserCompatibilityStore');
  });
});