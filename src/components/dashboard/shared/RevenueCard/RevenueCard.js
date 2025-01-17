import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Space, Typography } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { green, red } from "@ant-design/colors";
import CountUp from "react-countup";
import { Card } from "../../../index.ts";
const RevenueCard = (props) => {
    const { title, value, diff, justify, height, ...others } = props;
    return (_jsx(Card, { ...others, style: { height }, children: _jsxs(Flex, { vertical: true, gap: justify ? 0 : "large", justify: justify, style: { height: height ? height - 60 : "auto" }, children: [_jsx(Typography.Text, { children: title }), _jsxs(Flex, { justify: "space-between", align: "center", children: [_jsx(Typography.Title, { level: 2, style: { margin: 0 }, children: typeof value === "number" ? (_jsxs(_Fragment, { children: ["$", _jsx(CountUp, { end: value })] })) : (_jsx("span", { children: value })) }), _jsxs(Space, { style: { color: diff > 0 ? green[6] : red[5] }, children: [diff > 0 ? _jsx(ArrowUpOutlined, {}) : _jsx(ArrowDownOutlined, {}), _jsxs(Typography.Text, { style: {
                                        color: diff > 0 ? green[6] : red[5],
                                        fontWeight: 500,
                                    }, children: [_jsx(CountUp, { end: diff }), "%"] })] })] })] }) }));
};
export default RevenueCard;
