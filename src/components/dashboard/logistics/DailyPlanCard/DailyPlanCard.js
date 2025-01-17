import { jsx as _jsx } from "react/jsx-runtime";
import { Bar } from "@ant-design/charts";
import { Card } from "../../../index.ts";
const BarChart = ({ data }) => {
    const config = {
        data,
        xField: "value",
        yField: "type",
        seriesField: "type",
        legend: {
            position: "top-left",
        },
    };
    // @ts-ignore
    return _jsx(Bar, { ...config });
};
const DailyPlanCard = ({ data, ...others }) => {
    return (_jsx(Card, { title: "Daily activities", ...others, children: _jsx(BarChart, { data: data || [] }) }));
};
export default DailyPlanCard;
