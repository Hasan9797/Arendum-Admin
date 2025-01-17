import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../../helpers/requests";
import { removeToken } from "../../helpers/api";

const useApplication = create(
  devtools((set) => ({
    application: [],
    detail: {},
    pagination: {},
    applicationStatuses: {},
    currentTransactions: [],
    totalApplication: 0,
    transactions: {},
    activeUsers: "",
    listLoading: false,
    createLoading: false,
    detailLoading: false,
    updateLoading: false,
    removeLoading: false,

    getApplications: async (params) => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchApplicationList(params);
        set({
          application: data?.items,
          pagination: data?.pagination,
          listLoading: false,
        });
      } catch (err) {
        set({ listLoading: false });
        if (err.response.status === 401) {
          removeToken();
          window.location = "/auth/signin";
        }
        console.log(err);
      }
    },
    getStatisticsCurrentDate: async (params) => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchstatisticsCurrentDate(params);
        set({
          currentTransactions: data?.items,
          applicationStatuses: data?.applicationStatuses,
          activeUsers: data?.activeUsers,
          transactions: data?.transactions,
          totalApplication: data?.totalApplication,
          listLoading: false,
        });
      } catch (err) {
        set({ listLoading: false });
        if (err.response.status === 401) {
          removeToken();
          window.location = "/auth/signin";
        }
        console.log(err);
      }
    },

    create: async (params) => {
      set({ createLoading: true });
      try {
        const { data } = await requests.postApplicationCreate(params);
        set({ createLoading: false });
        return data;
      } catch (err) {
        set({ createLoading: false });
        return err;
      }
    },
    getDetail: async (id) => {
      set({ detailLoading: true });
      const { data } = await requests.fetchApplicationDetail(id);
      set({
        detail: data,
        detailLoading: false,
      });
    },
    update: async (id, params) => {
      set({ updateLoading: true });
      try {
        const { data } = await requests.applicationUpdate(id, params);
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
        const { data } = await requests.applicationDelete(id);
        set({ removeLoading: false });
        return data;
      } catch ({ response }) {
        set({ removeLoading: false });
        return response;
      }
    },
  }))
);

export default useApplication;
