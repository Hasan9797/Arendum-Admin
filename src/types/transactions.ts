import { ReactNode } from "react";

export type TransactionTableType = {
  id?: number;
  driver?: string;
  payment?: string;
  status?: ReactNode;
  date?: string;
  amount?: number;
  type_order?: string;
  type_of_equipment?: string;
  user: string;
};
