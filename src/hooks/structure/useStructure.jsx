import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../../helpers/requests";
import { removeToken } from "../../helpers/api";

const useStructure = create(
  devtools((set) => ({
    structure: [],
    pagination: {},
    detail: {},
    statics: [],
    listLoading: false,
    createLoading: false,
    detailLoading: false,
    updateLoading: false,
    removeLoading: false,
    staticsLoading: false,

    getStructure: async (params) => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchStructureList(params);
        set({
          structure: data.data,
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
        const { data } = await requests.postStructureCreate(params);
        set({ createLoading: false });
        return data;
      } catch (err) {
        set({ createLoading: false });
        return err;
      }
    },
    getDetail: async (id) => {
      set({ detailLoading: true });
      const { data } = await requests.fetchStructureDetail(id);
      set({
        detail: data,
        detailLoading: false,
      });
    },
    update: async (id, params) => {
      set({ updateLoading: true });
      try {
        const { data } = await requests.structureUpdate(id, params);
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
        const { data } = await requests.structureDelete(id);
        set({ removeLoading: false });
        return data;
      } catch ({ response }) {
        set({ removeLoading: false });
        return response;
      }
    },
  }))
);

export default useStructure;
