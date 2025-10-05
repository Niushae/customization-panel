import { defineStore } from 'pinia';

interface ThemeState {
  globalBackground: string;
  globalText: string;
  sectionColor: string;
}

const defaultState: ThemeState = {
  globalBackground: '#FFFFFF',
  globalText: '#333333',
  sectionColor: '#007BFF',
};

export const useThemeStore = defineStore('theme', {
  state: () => defaultState,

  actions: {
    setThemeValue(key: keyof ThemeState, value: string) {
      if (key in this.$state) {
        this.$patch({ [key]: value });
      }
    },
  },

  getters: {
    cssVariables(state) {
      return {
        '--color-bg-global': state.globalBackground,
        '--color-text-global': state.globalText,
        '--section-color': state.sectionColor,
      };
    },
  },
});