import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../../helpers/requests";
import { removeToken } from "../../helpers/api";

const useReport = create(
  devtools((set) => ({
    reports: [],
    total: {},
    listLoading: false,
    downloadLoading: false,

    getReports: async (params) => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchReportList(params);
        set({
          reports: data.items,
          total: data.total,
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
    getReportsDownload: async (params) => {
      set({ downloadLoading: true });
      try {
        const response = await requests.fetchReportsDownloadList(params);

        // Blob yaratish (Excel fayli)
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Faylni foydalanuvchiga yuklash
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "reports.xlsx"; // Fayl nomi
        link.click();
        set({ downloadLoading: false });
      } catch (err) {
        set({ downloadLoading: false });
        if (err.response.status === 401) {
          removeToken();
          window.location = "/auth/signin";
        }
      }
    },
  }))
);

export default useReport;
