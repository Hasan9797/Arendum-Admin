  import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../../helpers/requests";
import { removeToken } from "../../helpers/api";

const useStatics = create(
  devtools((set) => ({
    activateStatus: [],
    clientStatus: [],
    orderStatus: [],
    roles:[],
    orderLoading: false,
    rolesLoading:false,
    clientLoading: false,
    statusLoading: false,

    getActivateStatus: async (params) => {
      set({ statusLoading: true });
      try {
        const { data } = await requests.fetchDriverStatus(params);
        set({
          activateStatus: data?.data,
          statusLoading: false,
        });
      } catch (err) {
        set({
          statusLoading: false,
        });
        if (err.response.status === 401) {
          removeToken();
          window.location = "/auth/signin";
        }
      }
    },
    getClientStatus: async (params) => {
      set({ clientLoading: true });
      try {
        const { data } = await requests.fetchClientStatus(params);
        set({
          clientStatus: data?.data,
          clientLoading: false,
        });
      } catch (err) {
        set({
          clientLoading: false,
        });
        if (err.response.status === 401) {
          removeToken();
          window.location = "/auth/signin";
        }
      }
    },
    getOrderStatus: async (params) => {
      set({ orderLoading: true });
      try {
        const { data } = await requests.fetchOrderStatus(params);
        set({
          orderStatus: data?.data,
          orderLoading: false,
        });
      } catch (err) {
        set({
          orderLoading: false,
        });
        if (err.response.status === 401) {
          removeToken();
          window.location = "/auth/signin";
        }
      }
    },
    getUserRoles: async (params) => {
      set({ rolesLoading: true });
      try {
        const { data } = await requests.fetchUserRoles(params);
        set({
          roles: data?.data,
          rolesLoading: false,
        });
      } catch (err) {
        set({
          rolesLoading: false,
        });
        if (err.response.status === 401) {
          removeToken();
          window.location = "/auth/signin";
        }
      }
    },
  }))
);

export default useStatics;
