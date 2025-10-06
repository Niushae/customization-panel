import { defineStore } from 'pinia';

interface ThemeState {
  globalBackground: string;
  globalText: string;
  sectionColor: string;
  originalState: ThemeState | null;
}

const STORAGE_KEY = 'themeCustomizerState';

const defaultState: ThemeState = {
  globalBackground: '#FFFFFF',
  globalText: '#333333',
  sectionColor: '#007BFF',
  originalState: null,
};

const getInitialState = (): ThemeState => {
  const storedState = localStorage.getItem(STORAGE_KEY);
  if (storedState) {
    const state = JSON.parse(storedState) as ThemeState;
    return { ...state, originalState: JSON.parse(JSON.stringify(state)) };
  }

  const state = { ...defaultState };
  return { ...state, originalState: JSON.parse(JSON.stringify(state)) };
};


export const useThemeStore = defineStore('theme', {
  state: () => getInitialState(),

  actions: {
    setThemeValue(key: keyof ThemeState, value: string) {
      if (key !== 'originalState') {
        this.$patch({ [key]: value });
      }
    },
    saveTheme() {
      const stateToSave = { ...this.$state };
      delete (stateToSave as { originalState?: ThemeState | null }).originalState;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      this.originalState = JSON.parse(JSON.stringify(stateToSave));
    },
    cancelChanges() {
      if (this.originalState) {
        this.$patch({
          globalBackground: this.originalState.globalBackground,
          globalText: this.originalState.globalText,
          sectionColor: this.originalState.sectionColor,
        });
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