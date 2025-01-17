import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, Button, Popover, Space, Table, } from "antd";
import { Card } from "../../../index.ts";
import { FacebookFilled, InstagramFilled, LinkedinFilled, QuestionCircleFilled, QuestionOutlined, TwitterCircleFilled, } from "@ant-design/icons";
import { createElement, useEffect, useState } from "react";
import * as _ from "lodash";
import { numberWithCommas } from "../../../../utils";
const PARENT_TABLE_COLUMNS = [
    {
        title: "Source",
        dataIndex: "ad_source",
        key: "total_marketing_source",
        render: (_) => {
            const social = _.toLowerCase();
            let icon;
            if (social.includes("facebook")) {
                icon = FacebookFilled;
            }
            else if (social.includes("linkedin")) {
                icon = LinkedinFilled;
            }
            else if (social.includes("twitter")) {
                icon = TwitterCircleFilled;
            }
            else if (social.includes("instagram")) {
                icon = InstagramFilled;
            }
            else {
                icon = QuestionCircleFilled;
            }
            return (_jsxs(Space, { children: [createElement(icon, { style: { fontSize: 16 } }), _jsx("span", { children: _ })] }));
        },
    },
    {
        title: "Impressions",
        dataIndex: "total_impressions",
        key: "total_marketing_impression",
        render: (_) => _jsx("span", { children: numberWithCommas(Number(_)) }),
    },
    {
        title: "Cost",
        dataIndex: "total_cost",
        key: "total_marketing_cost",
        render: (_) => _jsxs("span", { children: ["$ ", numberWithCommas(Number(_))] }),
    },
    {
        title: "Revenue",
        dataIndex: "total_revenue",
        key: "marketing_revenue",
        render: (_) => _jsxs("span", { children: ["$ ", numberWithCommas(Number(_))] }),
    },
    {
        title: "Clicks",
        dataIndex: "total_clicks",
        key: "total_marketing_clicks",
        render: (_) => _jsx("span", { children: numberWithCommas(Number(_)) }),
    },
];
const CHILD_TABLE_COLUMNS = [
    {
        title: "Impressions",
        dataIndex: "impressions",
        key: "marketing_impression",
        render: (_) => _jsx("span", { children: numberWithCommas(Number(_)) }),
    },
    {
        title: "Cost",
        dataIndex: "cost",
        key: "marketing_cost",
        render: (_) => _jsxs("span", { children: ["$ ", numberWithCommas(Number(_))] }),
    },
    {
        title: "Revenue",
        dataIndex: "revenue",
        key: "marketing_revenue",
        render: (_) => _jsxs("span", { children: ["$ ", numberWithCommas(Number(_))] }),
    },
    {
        title: "Clicks",
        dataIndex: "clicks",
        key: "marketing_clicks",
        render: (_) => _jsx("span", { children: numberWithCommas(Number(_)) }),
    },
    {
        title: "Conversion rate",
        dataIndex: "conversion_rate",
        key: "conversion_rate",
        render: (_) => _jsxs("span", { children: [_, "%"] }),
    },
    {
        title: "ROI",
        dataIndex: "roi",
        key: "marketing_roi",
        render: (_) => _jsxs("span", { children: [_, "%"] }),
    },
];
const ExpandedRowRender = ({ data }) => {
    return (_jsx(Table, { columns: CHILD_TABLE_COLUMNS, dataSource: data, pagination: {
            pageSize: 5,
            position: ["bottomRight"],
        } }));
};
const CampaignsAdsCard = ({ error, data, loading, ...others }) => {
    const [groupedData, setGroupedData] = useState([]);
    useEffect(() => {
        const dd = _.chain(data)
            .groupBy("ad_source")
            .map((items, source) => ({
            id: source,
            ad_source: source,
            items,
            total_impressions: _.sumBy(items, "impressions").toFixed(2),
            total_clicks: _.sumBy(items, "clicks").toFixed(2),
            total_cost: _.sumBy(items, "cost").toFixed(2),
            total_revenue: _.sumBy(items, "revenue").toFixed(2),
        }))
            .value();
        setGroupedData(dd);
    }, [data]);
    return error ? (_jsx(Alert, { message: "Error", description: error.toString(), type: "error", showIcon: true })) : (_jsx(Card, { title: "Campaign performance by source", extra: _jsx(Popover, { content: "Marketing data by several ads resources", children: _jsx(Button, { icon: _jsx(QuestionOutlined, {}), type: "text" }) }), ...others, children: _jsx(Table, { dataSource: groupedData, columns: PARENT_TABLE_COLUMNS, rowKey: (record) => record.id, expandable: {
                expandedRowRender: (record) => (_jsx(ExpandedRowRender, { data: record.items })),
            }, className: "overflow-scroll" }) }));
};
export default CampaignsAdsCard;
