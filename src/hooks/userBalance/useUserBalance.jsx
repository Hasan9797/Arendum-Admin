import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../../helpers/requests";
import { removeToken } from "../../helpers/api";

const useUserBalance = create(
  devtools((set) => ({
    userBalances: [],
    pagination: {},
    detail: {},
    listLoading: false,
    detailLoading: false,
    updateLoading: false,

    getList: async (params) => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchUserBalanceList(params);
        set({
          userBalances: data?.data,
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
   
    getDetail: async (id) => {
      set({ detailLoading: true });
      const { data } = await requests.fetchUserBalanceDetail(id);
      set({
        detail: data?.data,
        detailLoading: false,
      });
    },
    update: async (id, params) => {
      set({ updateLoading: true });
      try {
        const data = await requests.userBalanceUpdate(id, params);
        return data?.data;
      } catch ({ response }) {
        return response;
      } finally {
        set({ updateLoading: false });
      }
    },
   
  }))
);

export default useUserBalance;


