import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Flex, Typography } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { green, red } from "@ant-design/colors";
import { Card } from "../../../index.ts";
import CountUp from "react-countup";
const StatsCard = ({ icon, title, value, diff, ...others }) => {
    return (_jsx(Card, { ...others, children: _jsxs(Flex, { vertical: true, gap: "middle", style: { width: "100%" }, children: [React.createElement(icon, { style: { fontSize: 30 } }), _jsx(Typography.Text, { style: { textTransform: "capitalize" }, children: title }), _jsxs(Flex, { gap: "small", align: "center", justify: "space-between", children: [_jsx(Typography.Title, { level: 2, className: "m-0", children: _jsx(CountUp, { end: value }) }), _jsxs(Typography.Text, { strong: true, style: { color: diff > 0 ? green[5] : red[5] }, children: [diff, "%\u00A0", diff > 0 ? _jsx(ArrowUpOutlined, {}) : _jsx(ArrowDownOutlined, {})] })] })] }) }));
};
export default StatsCard;
