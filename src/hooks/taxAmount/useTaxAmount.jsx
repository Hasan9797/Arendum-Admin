import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../../helpers/requests";
import { removeToken } from "../../helpers/api";

const useTaxAmount = create(
  devtools((set) => ({
    taxAmounts: [],
    pagination: {},
    detail: {},
    listLoading: false,
    createLoading: false,
    detailLoading: false,
    updateLoading: false,
    removeLoading: false,
    staticsLoading: false,

   

    getTaxAmounts: async (params) => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchTaxAmountList(params);
        set({
          taxAmounts: data.data,
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

    create: async (params) => {
      set({ createLoading: true });
      try {
        const { data } = await requests.postTaxAmountCreate(params);
        set({ createLoading: false });
        return data;
      } catch (err) {
        set({ createLoading: false });
        return err;
      }
    },
    getDetail: async (id) => {
      set({ detailLoading: true });
      const { data } = await requests.fetchTaxAmountDetail(id);
      set({
        detail: data?.data,
        detailLoading: false,
      });
    },
    update: async (id, params) => {
      set({ updateLoading: true });
      try {
        const { data } = await requests.taxAmountUpdate(id, params);
        set({ updateLoading: false });
        return data;
      } catch ({ response }) {
        set({ updateLoading: false });
        return response;
      }
    },
    remove: async (id) => {
      set({ removeLoading: true });
      try {
        const { data } = await requests.taxAmountDelete(id);
        set({ removeLoading: false });
        return data;
      } catch ({ response }) {
        set({ removeLoading: false });
        return response;
      }
    },
  }))
);

export default useTaxAmount;
