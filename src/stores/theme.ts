import { defineStore } from 'pinia';

interface ThemeState {
  globalBackground: string;
  globalText: string;
  sectionColor: string;
}

const STORAGE_KEY = 'themeCustomizerState';

const defaultState: ThemeState = {
  globalBackground: '#FFFFFF',
  globalText: '#333333',
  sectionColor: '#007BFF',
};

const getInitialState = (): ThemeState => {
  const storedState = localStorage.getItem(STORAGE_KEY);
  if (storedState) {
    return JSON.parse(storedState) as ThemeState;
  }
  return defaultState;
};


export const useThemeStore = defineStore('theme', {
  state: () => getInitialState(),

  actions: {
    setThemeValue(key: keyof ThemeState, value: string) {
      if (key in this.$state) {

        if (key.includes('Color') && !/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
          console.warn(`Invalid hex value for ${key}: ${value}`);
          return;
        }

        this.$patch({ [key]: value });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state));
      }
    },
  },

  getters: {
    cssVariables(state) {
      return {
        '--color-bg-global': state.globalBackground,
        '--color-text-global': state.globalText,
        '--color-section': state.sectionColor,
      };
    },
  },
});