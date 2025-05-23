/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "../config";
import {
  AccountFilterType,
  LoginParamsType,
  RegionParamsType,
  UserParamsType,
} from "../types";
import { ClientParamsType } from "../types/clinet";
import {
  DriversFilterType,
  DriversParamsType,
  UploadImgType,
} from "../types/drivers";
import { MachinesFilterType, MachinesParamsType } from "../types/machines";
import { RegionFilterType } from "../types/region";
import { ReportFilterType } from "../types/reprortFilterType";
import { RolesParamsType } from "../types/roles";
import { ServicesFilterType, ServicesParamsType } from "../types/service";
import { PricingParamsType } from "../types/pricing";
import { SpecificationParamsType } from "../types/specification";
import { StructureFilterType, StructureParamsType } from "../types/structure";
import { $api } from "./api";
import { TaxAmountFilterType } from "../types/taxAmount";

export const requests = {
  //TODO: API Requests
  //* AUTH
  postLogin: (params: LoginParamsType) =>
    $api.post(`${API_URL}/auth/login`, params),
  fetchMe: () => $api.get(`${API_URL}/users/me`),
  postLogout: () => $api.get(`${API_URL}/auth/logout`),
  postRefreshToken: () => $api.post(`${API_URL}/auth/refresh-token`),

  //* REGION
  postRegionCreate: (params: RegionParamsType) =>
    $api.post(`${API_URL}/region/create`, params), //! done
  fetchRegionList: (params: RegionFilterType) =>
    $api.get(`${API_URL}/region`, { params }), //! done
  regionUpdate: (id: string, params: RegionParamsType) =>
    $api.put(`${API_URL}/region/update/${id}`, params), //! done
  fetchRegionDetail: (id: string) => $api.get(`${API_URL}/region/${id}`), //! done
  regionDelete: (id: string) => $api.delete(`${API_URL}/region/delete/${id}`), //! done

  //* Machines
  postMachinesCreate: (params: MachinesParamsType) =>
    $api.post(`${API_URL}/machines/create`, params), //! done
  fetchMachinesList: (params: MachinesFilterType) =>
    $api.get(`${API_URL}/machines`, { params }), //! done
  machinesUpdate: (id: string, params: RegionParamsType) =>
    $api.put(`${API_URL}/machines/update/${id}`, params), //! done
  fetchMachinesDetail: (id: string) => $api.get(`${API_URL}/machines/${id}`), //! done
  machinesDelete: (id: string) =>
    $api.delete(`${API_URL}/machines/delete/${id}`), //! done

  //* Structure
  postStructureCreate: (params: StructureFilterType) =>
    $api.post(`${API_URL}/structure/create`, params), //! done
  fetchStructureList: (params: StructureFilterType) =>
    $api.get(`${API_URL}/structure`, { params }), //! done
  structureUpdate: (id: string, params: StructureParamsType) =>
    $api.put(`${API_URL}/structure/update/${id}`, params), //! done
  fetchStructureDetail: (id: string) => $api.get(`${API_URL}/structure/${id}`), //! done
  structureDelete: (id: string) =>
    $api.delete(`${API_URL}/structure/delete/${id}`), //! done

  //* Drivers
  fetchDriversList: (params: DriversFilterType) =>
    $api.get(`${API_URL}/driver`, { params }),
  fetchFileUpload: (params: UploadImgType) =>
    $api.post(`${API_URL}/file-upload`, params),
  postDriverCreate: (params: DriversParamsType) =>
    $api.post(`${API_URL}/driver/create`, params),
  fetchDriverDetail: (id: string) => $api.get(`${API_URL}/driver/${id}`), //! done
  driverUpdate: (id: string, params: DriversParamsType) =>
    $api.put(`${API_URL}/driver/update/${id}`, params), //! done
  driverDelete: (id: string) => $api.delete(`${API_URL}/driver/delete/${id}`), //! done

  //* Orders
  fetchOrdersList: (params: DriversFilterType) =>
    $api.get(`${API_URL}/order`, { params }),
  fetchOrderDetail: (id: string) => $api.get(`${API_URL}/order/${id}`), //! done
  
  //* Services
  fetchServicesList: (params: ServicesFilterType) =>
    $api.get(`${API_URL}/services`, { params }),
  postServicesCreate: (params: ServicesParamsType) =>
    $api.post(`${API_URL}/services`, params),
  fetchServicesDetail: (id: string) => $api.get(`${API_URL}/services/${id}`), //! done
  servicesUpdate: (id: string, params: ServicesParamsType) =>
    $api.patch(`${API_URL}/services/${id}`, params), //! done
  servicesDelete: (id: string) => $api.delete(`${API_URL}/services/${id}`),
  //* Tax_Amounts
  fetchTaxAmountList: (params: TaxAmountFilterType) =>
    $api.get(`${API_URL}/service-commission`, { params }),
  postTaxAmountCreate: (params: TaxAmountFilterType) =>
    $api.post(`${API_URL}/service-commission/create`, params),
  fetchTaxAmountDetail: (id: string) => $api.get(`${API_URL}/service-commission/${id}`), //! done
  taxAmountUpdate: (id: string, params: TaxAmountFilterType) =>
    $api.put(`${API_URL}/service-commission/update/${id}`, params), //! done
  taxAmountDelete: (id: string) => $api.delete(`${API_URL}/service-commission/delete/${id}`),

  //* Specifications
  fetchSpecificationList: (params: AccountFilterType) =>
    $api.get(`${API_URL}/machines-params`, { params }),
  postSpecificationCreate: (params: SpecificationParamsType) =>
    $api.post(`${API_URL}/machines-params/create`, params),
  specificationGetByMachine: (id) =>
    $api.get(`${API_URL}/machines-params/get-by-machine-id?id=${id}`),
  // specificationGetByMachine: (params) =>
  //   $api.post(`${API_URL}/machines-params/by-machine`, params),
  fetchSpecificationDetail: (id: string) =>
    $api.get(`${API_URL}/machines-params/${id}`), //! done
  specificationUpdate: (id: string, params: SpecificationParamsType) =>
    $api.put(`${API_URL}/machines-params/update/${id}`, params), //! done
  specificationDelete: (id: string) =>
    $api.delete(`${API_URL}/machines-params/delete/${id}`),

  //* Pricing
  fetchPricingList: (params: AccountFilterType) =>
    $api.get(`${API_URL}/machine-price`, { params }),
  postPricingCreate: (params: PricingParamsType) =>
    $api.post(`${API_URL}/machine-price/create`, params),
  fetchPricingDetail: (id: string) =>
    $api.get(`${API_URL}/machine-price/update/${id}`), //! done
  pricingUpdate: (id: string, params: PricingParamsType) =>
    $api.put(`${API_URL}/machine-price/update/${id}`, params), //! done
  pricingDelete: (id: string) =>
    $api.delete(`${API_URL}/machine-price/delete/${id}`),

  //* ParamsFilter
  fetchParamsFilterList: (params: AccountFilterType) =>
    $api.get(`${API_URL}/params-filter`, { params }),
  postParamsFilterCreate: (params) =>
    $api.post(`${API_URL}/params-filter/create`, params),
  fetchParamsFilterDetail: (id: string) =>
    $api.get(`${API_URL}/params-filter/update/${id}`), //! done
  paramsFilterUpdate: (id: string, params: PricingParamsType) =>
    $api.patch(`${API_URL}/params-filter/${id}`, params), //! done
  paramsFilterDelete: (id: string) =>
    $api.delete(`${API_URL}/params-filter/delete/${id}`),

  //* USER
  fetchUserList: (params: AccountFilterType) =>
    $api.get(`${API_URL}/users`, { params }),
  postUserCreate: (params: UserParamsType) =>
    $api.post(`${API_URL}/users/create`, params),
  userUpdate: (id: string, params: UserParamsType) =>
    $api.put(`${API_URL}/users/update/${id}`, params),
  fetchUserDetail: (id: string) => $api.get(`${API_URL}/users/${id}`),
  userDelete: (id: string) => $api.delete(`${API_URL}/users/delete/${id}`),

  //* CLIENT
  fetchClientList: (params: AccountFilterType) =>
    $api.get(`${API_URL}/client`, { params }),
  clientUpdate: (id: string, params: ClientParamsType) =>
    $api.put(`${API_URL}/client/update/${id}`, params),
  fetchClientDetail: (id: string) => $api.get(`${API_URL}/client/${id}`),
  clientDelete: (id: string) => $api.delete(`${API_URL}/client/delete/${id}`),


  //* Statics
  fetchDriverStatus: (params) =>
    $api.get(`${API_URL}/static/driver/status`, { params }),
  fetchClientStatus: (params) =>
    $api.get(`${API_URL}/static/client/status`, { params }),
  fetchOrderStatus: (params) =>
    $api.get(`${API_URL}/static/order/status`, { params }),
  fetchUserRoles: (params) =>
    $api.get(`${API_URL}/static/users/options`, { params }),

  //*User Balance 
  fetchUserBalanceList: (params: AccountFilterType) =>
    $api.get(`${API_URL}/user-balance`, { params }),
  userBalanceUpdate: (id: string, params: ClientParamsType) =>
    $api.put(`${API_URL}/user-balance/update/${id}`, params),
  fetchUserBalanceDetail: (id: string) => $api.get(`${API_URL}/user-balance/${id}`),
  // clientDelete: (id: string) => $api.delete(`${API_URL}/client/delete/${id}`),

  //*Deposit 
  fetchDepositList: (params: AccountFilterType) =>
    $api.get(`${API_URL}/deposit`, { params }),
  // userBalanceUpdate: (id: string, params: ClientParamsType) =>
  //   $api.put(`${API_URL}/user-balance/update/${id}`, params),
  fetchDepositDetail: (id: string) => $api.get(`${API_URL}/deposit/${id}`),
  // clientDelete: (id: string) => $api.delete(`${API_URL}/client/delete/${id}`),


  //* Roles
  fetchRolesList: (params: AccountFilterType) =>
    $api.get(`${API_URL}/roles`, { params }),
  postRolesCreate: (params: RolesParamsType) =>
    $api.post(`${API_URL}/roles`, params),
  rolesUpdate: (id: string, params: RolesParamsType) =>
    $api.patch(`${API_URL}/roles/${id}`, params),
  fetchRolesDetail: (id: string) => $api.get(`${API_URL}/roles/${id}`),
  rolesDelete: (id: string) => $api.delete(`${API_URL}/roles/${id}`),
  
  //*Reports
  fetchReportList: (params: ReportFilterType) =>
    $api.get(`${API_URL}/applications/find/reports`, { params }),
  fetchReportsDownloadList: (params: ReportFilterType) =>
    $api.get(`${API_URL}/applications/reports/excel`, {
      params,
      responseType: "blob", // Faylni binary formatda olish
    }),
};
