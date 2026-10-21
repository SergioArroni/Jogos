import { localSetting } from '../data/local';

export type ThemePreference = 'system' | 'light' | 'dark';

class ThemeStore {
  preference = $state<ThemePreference>((localSetting.get('el-baul-theme') as ThemePreference) || 'system');

  set(preference: ThemePreference): void {
    this.preference = preference;
    localSetting.set('el-baul-theme', preference);
    this.apply();
  }

  /** Light/dark colours come from CSS; this only sets data-theme and the browser bar colour. */
  apply(): void {
    const root = document.documentElement;
    if (this.preference === 'system') delete root.dataset.theme;
    else root.dataset.theme = this.preference;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = getComputedStyle(root).getPropertyValue('--bg').trim();
  }
}

export const theme = new ThemeStore();
