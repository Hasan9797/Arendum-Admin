import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../../helpers/requests";

const useTransaction = create(
  devtools((set) => ({
    list: {},
    detail: {},
    statics: [],
    applicationsByRegion: [],
    applicationByServiceList: [],
    listLoading: false,
    detailLoading: false,
    updateLoading: false,
    removeLoading: false,
    staticsLoading: false,
    getList: async (params) => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchTransactionList(params);
        set({
          list: data,
          listLoading: false,
        });
      } catch (err) {
        set({ listLoading: false });
        console.log(err);
      }
    },
    getListByRegion: async (params) => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchApplicationByTodayList(params);
        set({
          applicationsByRegion: data.items,
          listLoading: false,
        });
      } catch (err) {
        set({ listLoading: false });
        console.log(err);
      }
    },
    getListByService: async (params) => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchApplicationByServiceList(params);
        set({
          applicationByServiceList: data.items,
          listLoading: false,
        });
      } catch (err) {
        set({ listLoading: false });
        console.log(err);
      }
    },
    getDetail: async (id) => {
      set({ detailLoading: true });
      const { data } = await requests.fetchTransactionDetail(id);
      set({
        detail: data?.data?.transaction,
        detailLoading: false,
      });
    },
    update: async (id, params) => {
      set({ updateLoading: true });
      try {
        const { data } = await requests.transactionUpdate(id, params);
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
        const { data } = await requests.transactionDelete(id);
        set({ removeLoading: false });
        return data;
      } catch ({ response }) {
        set({ removeLoading: false });
        return response;
      }
    },
    getStatics: async () => {
      set({ staticsLoading: true });
      const { data } = await requests.fetchTransactionStatic();
      set({
        statics: data?.data,
        staticsLoading: false,
      });
    },
  }))
);

export default useTransaction;
