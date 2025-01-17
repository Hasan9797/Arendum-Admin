import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../../helpers/requests";
import { removeToken } from "../../helpers/api";

const useUser = create(
  devtools((set) => ({
    users: [],
    pagination: {},
    permissions: [],
    roles: [],
    status: [],
    detail: {},
    statics: [],
    listLoading: false,
    createLoading: false,
    detailLoading: false,
    updateLoading: false,
    removeLoading: false,

    getList: async (params) => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchUserList(params);
        set({
          users: data?.data,
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
    create: async (params) => {
      set({ createLoading: true });
      try {
        const data = await requests.postUserCreate(params);
        return data;
      } catch (err) {
        return err?.response?.data;
      } finally {
        set({ createLoading: false });
      }
    },
    getDetail: async (id) => {
      set({ detailLoading: true });
      const { data } = await requests.fetchUserDetail(id);
      set({
        detail: data,
        detailLoading: false,
      });
    },
    update: async (id, params) => {
      set({ updateLoading: true });
      try {
        const data = await requests.userUpdate(id, params);
        return data;
      } catch ({ response }) {
        return response;
      } finally {
        set({ updateLoading: false });
      }
    },
    remove: async (id) => {
      set({ removeLoading: true });
      try {
        const { data } = await requests.userDelete(id);
        set({ removeLoading: false });
        return data;
      } catch ({ response }) {
        set({ removeLoading: false });
        return response;
      }
    },
    getPermissions: async () => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchUserPermissions();
        set({
          permissions: data,
          listLoading: false,
        });
      } catch (err) {
        set({ listLoading: false });
        console.log(err);
      }
    },
    getRoles: async () => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchUserRoles();
        set({
          roles: data,
          listLoading: false,
        });
      } catch (err) {
        set({ listLoading: false });
        console.log(err);
      }
    },
    getStatus: async () => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchUserStatus();
        set({
          status: data,
          listLoading: false,
        });
      } catch (err) {
        set({ listLoading: false });
        console.log(err);
      }
    },
    changeUserStatus: async (id, params) => {
      set({ updateLoading: true });
      try {
        const data = await requests.updateUserChangeStatus(id, params);
        return data;
      } catch ({ response }) {
        return response;
      } finally {
        set({ updateLoading: false });
      }
    },
  }))
);

export default useUser;
