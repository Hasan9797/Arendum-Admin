import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../../helpers/requests";
import { removeToken } from "../../helpers/api";

const useRoles = create(
  devtools((set) => ({
    roles: [],
    detail: {},
    listLoading: false,
    createLoading: false,
    detailLoading: false,
    updateLoading: false,
    removeLoading: false,

    getRoles: async () => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchRolesList();
        set({
          roles: data,
          listLoading: false,
        });
      } catch (err) {
        if (err.response.status === 401) {
          removeToken();
          window.location = "/auth/signin";
        }
        set({ listLoading: false });
      }
    },

    create: async (params) => {
      set({ createLoading: true });
      try {
        const { data } = await requests.postRolesCreate(params);
        set({ createLoading: false });
        return data;
      } catch (err) {
        set({ createLoading: false });
        return err;
      }
    },
    getDetail: async (id) => {
      set({ detailLoading: true });
      const { data } = await requests.fetchRolesDetail(id);
      set({
        detail: data,
        detailLoading: false,
      });
    },
    update: async (id, params) => {
      set({ updateLoading: true });
      try {
        const { data } = await requests.rolesUpdate(id, params);
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
        const { data } = await requests.rolesDelete(id);
        set({ removeLoading: false });
        return data;
      } catch ({ response }) {
        set({ removeLoading: false });
        return response;
      }
    },
  }))
);

export default useRoles;
