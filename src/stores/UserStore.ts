import Cookies from 'js-cookie';
import { defineStore } from 'pinia';

const cookiesStorage: Storage = {
  setItem(key, state) {
    return Cookies.set(key, state, { expires: 3 });
  },
  getItem(key) {
    const store = Cookies.get(key);
    if (store === undefined) {
      return '';
    }

    return Cookies.get(key) || '';
  },
  length: 0,
  clear: function (): void {
    Cookies.remove('userInfo');
  },
  key: function (index: number): string | null {
    throw new Error('Function not implemented.');
  },
  removeItem: function (key: string): void {
    throw new Error('Function not implemented.');
  },
};


export type UserStoreInfo = {
  username?: string;
  accessToken?: string;
  role?: string;
};

export const useUserInfoStore = defineStore('UserInfoStore', {
  state: () => ({
    username: '',
    accessToken: '',
    role: ''
  }),
  actions: {
    setUserInfo(userinfo: UserStoreInfo) {
      this.$state.username = userinfo.username || '';
      this.$state.role = userinfo.role || '';
    },
    setUsername(username: string) {
      this.$state.username = username;
    },
    setAccessToken(accessToken: string) {
      this.$state.accessToken = accessToken;
    },
    clearUserInfo() {
      this.$state.username = '';
      this.$state.accessToken = '';
      this.$state.role = '';
    }
  },
  getters: {
    isLoggedIn(): boolean {
      return this.accessToken !== '';
    },
  },
  persist: {
    enabled: true,
    strategies: [{ key: 'userInfo', storage: cookiesStorage }]
  }
});
