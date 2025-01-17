import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../../helpers/requests";
import { removeToken } from "../../helpers/api";

const useRegion = create(
  devtools((set) => ({
    regions: [],
    pagination: {},
    detail: {},
    statics: [],
    listLoading: false,
    createLoading: false,
    detailLoading: false,
    updateLoading: false,
    removeLoading: false,
    staticsLoading: false,

    addRegion: (region) => {
      return new Promise((resolve) => {
        set((state) => {
          const newRegion = { id: state.regions.length + 1, ...region };
          resolve(newRegion); // Yangi regionni qaytaramiz
          return {
            regions: [...state.regions, newRegion],
          };
        });
      });
    },

    getRegions: async (params) => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchRegionList(params);
        set({
          regions: data.data,
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
        const { data } = await requests.postRegionCreate(params);
        set({ createLoading: false });
        return data;
      } catch (err) {
        set({ createLoading: false });
        return err;
      }
    },
    getDetail: async (id) => {
      set({ detailLoading: true });
      const { data } = await requests.fetchRegionDetail(id);
      set({
        detail: data,
        detailLoading: false,
      });
    },
    update: async (id, params) => {
      set({ updateLoading: true });
      try {
        const { data } = await requests.regionUpdate(id, params);
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
        const { data } = await requests.regionDelete(id);
        set({ removeLoading: false });
        return data;
      } catch ({ response }) {
        set({ removeLoading: false });
        return response;
      }
    },
  }))
);

export default useRegion;
