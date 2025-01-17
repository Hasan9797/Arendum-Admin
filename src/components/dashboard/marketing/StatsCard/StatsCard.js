import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Col, Flex, Row, Tag, Typography } from "antd";
import { TinyColumn } from "@ant-design/charts";
import { Card } from "../../../index.ts";
import CountUp from "react-countup";
const ColumnChart = ({ data, color }) => {
    const brandColor = color || "#5B8FF9";
    const config = {
        height: 64,
        autoFit: true,
        data,
        color: brandColor,
        tooltip: {
            customContent: function (x, data) {
                return `NO.${x}: ${data[0]?.data?.y.toFixed(2)}`;
            },
        },
    };
    return _jsx(TinyColumn, { ...config });
};
const StatsCard = ({ data, diff, title, value, asCurrency, ...others }) => {
    return (_jsx(Card, { ...others, children: _jsxs(Flex, { vertical: true, children: [_jsx(Typography.Text, { className: "text-capitalize m-0", children: title }), _jsxs(Row, { children: [_jsx(Col, { span: 14, children: _jsx(Typography.Title, { level: 2, children: typeof value === "number" ? (_jsxs(_Fragment, { children: [asCurrency && _jsx("span", { children: "$" }), _jsx(CountUp, { end: value })] })) : (value) }) }), _jsx(Col, { span: 10, children: _jsx(ColumnChart, { data: data }) })] }), _jsxs(Flex, { align: "center", children: [_jsxs(Tag, { color: diff < 0 ? "red" : "green", children: [diff, "%"] }), _jsx(Typography.Text, { children: "compared to last month." })] })] }) }));
};
export default StatsCard;
