export const APP_THEME_CHANGE_EVENT = 'app-theme-change';

export type ThemeName = 'light' | 'dark';

export interface AppThemeChangeDetail {
  theme: ThemeName;
  prevTheme: ThemeName;
  colors: {
    from: string;
    to: string;
  };
  initial?: boolean;
}
