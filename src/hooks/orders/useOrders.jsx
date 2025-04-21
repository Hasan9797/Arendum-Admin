import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../../helpers/requests";
import { removeToken } from "../../helpers/api";

const useOrders = create(
  devtools((set) => ({
    orders: [],
    detail: {},
    pagination: {},
    listLoading: false,
    detailLoading: false,

    getOrders: async (params) => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchOrdersList(params);
        set({
          orders: data.data,
          pagination: data.pagination,
          listLoading: false,
        });
      } catch (err) {
        set({ listLoading: false });
        if (err.response.status === 401) {
          removeToken();
          window.location = "/auth/signin";
        }
      }
    },
    getDetail: async (id) => {
      set({ detailLoading: true });
      const { data } = await requests.fetchOrderDetail(id);
      set({
        detail: data.data,
        detailLoading: false,
      });
    },
  }))
);

export default useOrders;
