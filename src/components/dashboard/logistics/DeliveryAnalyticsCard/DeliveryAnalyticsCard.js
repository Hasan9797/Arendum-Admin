import { jsx as _jsx } from "react/jsx-runtime";
import { Alert } from "antd";
import { Column } from "@ant-design/charts";
import { useEffect, useState } from "react";
import * as _ from "lodash";
import { Card, Loader } from "../../../index.ts";
const MultiLineChart = ({ data }) => {
    const [refinedData, setRefinedData] = useState([]);
    useEffect(() => {
        const formattedData = _.sortBy(data, (item) => {
            // Map the month names to their corresponding numerical values for sorting
            const monthMap = {
                January: 1,
                February: 2,
                March: 3,
                April: 4,
                May: 5,
                June: 6,
                July: 7,
                August: 8,
                September: 9,
                October: 10,
                November: 11,
                December: 12,
            };
            // Use the numerical value for sorting
            return monthMap[item.month];
        });
        setRefinedData(formattedData);
    }, [data]);
    const config = {
        data: refinedData,
        isStack: true,
        xField: "month",
        yField: "value",
        seriesField: "status",
        radius: 0.2,
        label: {
            // 可手动配置 label 数据标签位置
            position: "top", // 'top', 'bottom', 'middle',
            offset: 10,
            style: {
                fill: "transparent",
            },
        },
        interactions: [
            {
                type: "active-region",
                enable: false,
            },
        ],
        connectedArea: {
            style: (oldStyle) => {
                return {
                    fill: "rgba(0,0,0,0.25)",
                    stroke: oldStyle.fill,
                    lineWidth: 0.5,
                };
            },
        },
        slider: {
            start: 0,
            end: 0.5,
        },
        barStyle: {
            lineCap: "round",
        },
    };
    // @ts-ignore
    return _jsx(Column, { ...config });
};
const DeliveryAnalyticsCard = ({ data, loading, error, ...others }) => {
    return (_jsx(Card, { title: "Analytics", ...others, children: error ? (_jsx(Alert, { message: "Error", description: error.toString(), type: "error", showIcon: true })) : loading ? (_jsx(Loader, {})) : (_jsx(MultiLineChart, { data: data || [] })) }));
};
export default DeliveryAnalyticsCard;
