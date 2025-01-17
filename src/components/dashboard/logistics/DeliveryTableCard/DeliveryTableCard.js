import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, Button, Table } from "antd";
import { useState } from "react";
import { Card, UserAvatar } from "../../../index.ts";
import { numberWithCommas } from "../../../../utils";
const TAB_LIST = [
    {
        key: "all",
        tab: "All",
    },
    {
        key: "in transit",
        tab: "In Transit",
    },
    {
        key: "delivered",
        tab: "Delivered",
    },
    {
        key: "delayed",
        tab: "Delayed",
    },
];
const DELIVERY_TABLE_COLUMNS = [
    {
        title: "Id",
        dataIndex: "shipment_id",
        key: "shipment_id",
        render: (text) => text.split("-")[0],
    },
    {
        title: "Destination",
        dataIndex: "destination_city",
        key: "destination",
    },
    {
        title: "Customer",
        dataIndex: "customer_name",
        key: "customer_name",
    },
    {
        title: "Driver",
        dataIndex: "driver_name",
        key: "driver_name",
        render: (_) => _jsx(UserAvatar, { fullName: _ }),
    },
    {
        title: "Status",
        dataIndex: "delivery_status",
        key: "delivery_status",
    },
    {
        title: "Cost",
        dataIndex: "shipment_cost",
        key: "shipment_cost",
        render: (_) => _jsxs("span", { children: ["$", numberWithCommas(_)] }),
    },
    {
        title: "Delivery date",
        dataIndex: "shipment_date",
        key: "shipment_date",
    },
];
const DeliveryTable = ({ data, ...others }) => {
    return (_jsx(Table, { dataSource: data || [], columns: DELIVERY_TABLE_COLUMNS, className: "overflow-scroll", ...others }));
};
const DeliveryTableCard = ({ data, loading, error, ...others }) => {
    const [activeTabKey, setActiveTabKey] = useState("all");
    const onTabChange = (key) => {
        setActiveTabKey(key);
    };
    return (_jsx(Card, { title: "Deliveries", extra: _jsx(Button, { children: "See all" }), tabList: TAB_LIST, activeTabKey: activeTabKey, onTabChange: onTabChange, ...others, children: error ? (_jsx(Alert, { message: "Error", description: error.toString(), type: "error", showIcon: true })) : (_jsx(DeliveryTable, { data: activeTabKey !== "all"
                ? data?.filter((d) => d.delivery_status.toLowerCase() === activeTabKey)
                : data || [], loading: loading })) }));
};
export default DeliveryTableCard;
