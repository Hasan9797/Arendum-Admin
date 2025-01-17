import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../../helpers/requests";
import { removeToken } from "../../helpers/api";

const useDrivers = create(
  devtools((set) => ({
    drivers: [],
    detail: {},
    pagination: {},
    listLoading: false,
    createLoading: false,
    createImgLoading: false,
    detailLoading: false,
    updateLoading: false,
    removeLoading: false,
    staticsLoading: false,

    getDrivers: async (params) => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchDriversList(params);
        set({
          drivers: data.data,
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
    getStatics: async () => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchDriversList();
        set({
          drivers: data.data,
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
        const { data } = await requests.postDriverCreate(params);
        set({ createLoading: false });
        return data;
      } catch (err) {
        set({ createLoading: false });
        return err;
      }
    },
    uploadImg: async (params) => {
      set({ createImgLoading: true });
      try {
        const { data } = await requests.fetchFileUpload(params);
        set({ createImgLoading: false });
        return data;
      } catch (err) {
        set({ createImgLoading: false });
        return err;
      }
    },
    getDetail: async (id) => {
      set({ detailLoading: true });
      const { data } = await requests.fetchDriverDetail(id);
      set({
        detail: data,
        detailLoading: false,
      });
    },
    update: async (id, params) => {
      set({ updateLoading: true });
      try {
        const { data } = await requests.driverUpdate(id, params);
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
        const { data } = await requests.facilityDelete(id);
        set({ removeLoading: false });
        return data;
      } catch ({ response }) {
        set({ removeLoading: false });
        return response;
      }
    },
  }))
);

export default useDrivers;
