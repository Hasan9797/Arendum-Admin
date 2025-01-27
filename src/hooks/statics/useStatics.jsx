import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../../helpers/requests";
import { removeToken } from "../../helpers/api";

const useStatics = create(
  devtools((set) => ({
    driverStatus: [],
    clientStatus: [],
    orderStatus: [],
    orderLoading: false,
    clientLoading: false,
    driverLoading: false,

    getDriverStatus: async (params) => {
      set({ driverLoading: true });
      try {
        const { data } = await requests.fetchDriverStatus(params);
        set({
          driverStatus: data?.data,
          driverLoading: false,
        });
      } catch (err) {
        set({
          driverLoading: false,
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
  }))
);

export default useStatics;
