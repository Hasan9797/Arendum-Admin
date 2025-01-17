import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../../helpers/requests";
import { setExpireIn, setToken } from "../../helpers/api";

const useAuth = create(
  devtools((set) => ({
    user: {},
    loginLoading: false,
    userLoading: false,
    logoutLoading: false,
    login: async (params) => {
      set({ loginLoading: true });
      try {
        const data = await requests.postLogin(params);
        if (data?.status === 200) {
          return data;
        }
        return data;
      } catch ({ response }) {
        return response;
      } finally {
        set({ loginLoading: false });
      }
    },
    getMe: async () => {
      set({ userLoading: true });
      try {
        const { data } = await requests.fetchMe();
        set({
          user: data,
          userLoading: false,
        });
        return data;
      } catch ({ response }) {
        set({
          userLoading: false,
        });
        return response?.data;
      }
    },
    logout: async () => {
      set({ logoutLoading: true });
      try {
        const { data } = await requests.postLogout();
        set({ logoutLoading: false });
        return data;
      } catch (err) {
        set({ logoutLoading: false });
        return err;
      }
    },
    refreshToken: async () => {
      try {
        const { data } = await requests.postRefreshToken();
        if (data?.data?.authorisation) {
          setToken(data?.data?.authorisation?.token);
          setExpireIn(data?.data?.authorisation?.expireIn);
          set({ expireIn: data?.data?.authorisation?.expireIn });
        }
        return data;
      } catch ({ response }) {
        return response;
      }
    },
  }))
);

export default useAuth;
