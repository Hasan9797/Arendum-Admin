import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card as AntdCard, Flex, List, Space, Tag, Typography, } from "antd";
import { FacebookFilled, InstagramFilled, LinkedinFilled, TwitterOutlined, YoutubeFilled, } from "@ant-design/icons";
import { Card } from "../../../index.ts";
import { createElement } from "react";
import CountUp from "react-countup";
const SOCIALS_DATA = [
    {
        icon: FacebookFilled,
        title: "facebook",
        diff: 12.3,
        value: 216869,
    },
    {
        icon: InstagramFilled,
        title: "instagram",
        diff: 4.8,
        value: 978342,
    },
    {
        icon: TwitterOutlined,
        title: "twitter",
        diff: -2.4,
        value: 567323,
    },
    {
        icon: LinkedinFilled,
        title: "linkedIn",
        diff: 3.79,
        value: 738382,
    },
    {
        icon: YoutubeFilled,
        title: "youtube",
        diff: -5.3,
        value: 892123,
    },
];
const SocialStatsCard = ({ ...others }) => (_jsx(Card, { title: "Social media analytics", ...others, children: _jsx(List, { grid: {
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 2,
        }, dataSource: SOCIALS_DATA, renderItem: (item, i) => (_jsx(List.Item, { children: _jsx(AntdCard, { hoverable: false, children: _jsxs(Flex, { vertical: true, gap: "middle", justify: "center", children: [_jsxs(Flex, { align: "center", justify: "space-between", children: [_jsxs(Space, { children: [createElement(item.icon), _jsx(Typography.Text, { className: "text-capitalize", children: item.title })] }), _jsxs(Tag, { color: item.diff < 0 ? "red-inverse" : "green-inverse", children: [item.diff, "%"] })] }), _jsxs(Flex, { gap: "small", align: "flex-end", children: [_jsx(Typography.Title, { level: 3, className: "m-0", children: _jsx(CountUp, { end: item.value }) }), _jsx(Typography.Text, { color: "secondary", children: "visitors" })] })] }) }, `${item.title}-${i}`) })) }) }));
export default SocialStatsCard;
