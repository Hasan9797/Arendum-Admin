import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Typography } from "antd";
import { UserAvatar } from "../../../index.ts";
const COLUMNS = [
  {
    title: "Client Name",
    dataIndex: "client_name",
    key: "c_name",
    render: (_, { first_name, last_name }) =>
      _jsx(UserAvatar, { fullName: `${first_name} ${last_name}` }),
  },
  {
    title: "Сумма",
    dataIndex: "total_price",
    key: "client_amount",
    render: (_) => _jsxs(Typography.Text, { children: ["$", _] }),
  },
];
const ClientsTable = ({ data, ...others }) =>
  _jsx(
    Table,
    {
      dataSource: data,
      columns: COLUMNS,
      size: "middle",
      className: "overflow-scroll",
      ...others,
    },
    "client_table"
  );
export default ClientsTable;
