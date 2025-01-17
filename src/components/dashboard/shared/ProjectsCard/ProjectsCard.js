import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Card as AntdCard, Descriptions, Flex, Tooltip, Typography, } from "antd";
import { CalendarOutlined, ClockCircleOutlined, UsergroupAddOutlined, } from "@ant-design/icons";
import "./styles.css";
const { Text, Title } = Typography;
const ProjectsCard = (props) => {
    const { size, project: { client_name, end_date, project_duration, project_manager, project_name, project_type, project_location, priority, team_size, status, }, ...others } = props;
    const items = [
        {
            key: "project_name",
            label: "Title",
            children: (_jsxs("span", { className: "text-capitalize", children: [project_name.slice(0, 36), "..."] })),
            span: 24,
        },
        {
            key: "project_manager",
            label: "Manager",
            children: project_manager,
            span: 24,
        },
        {
            key: "project_client",
            label: "Client",
            children: client_name,
            span: 24,
        },
        {
            key: "project_type",
            label: "Type",
            children: _jsx("span", { className: "text-capitalize", children: project_type }),
            span: 24,
        },
        {
            key: "project_location",
            label: "Location",
            children: project_location,
            span: 24,
        },
        {
            key: "project_priority",
            label: "Priority",
            children: _jsx("span", { className: "text-capitalize", children: priority }),
        },
        {
            key: "project_status",
            label: "Status",
            children: _jsx("span", { className: "text-capitalize", children: status }),
        },
        {
            key: "team_size",
            label: _jsx(UsergroupAddOutlined, {}),
            children: (_jsx(Tooltip, { title: "Team size", children: _jsx(Typography.Text, { children: team_size }) })),
        },
        {
            key: "period",
            label: _jsx(ClockCircleOutlined, {}),
            children: (_jsx(Tooltip, { title: "Project duration (months)", children: _jsx(Typography.Text, { children: project_duration }) })),
        },
        {
            key: "end_date",
            label: _jsx(CalendarOutlined, {}),
            children: (_jsx(Tooltip, { title: "Project end date", children: _jsx(Typography.Text, { children: end_date }) })),
        },
    ];
    return size === "small" ? (_jsxs(AntdCard, { bordered: true, hoverable: true, className: "project-small-card", ...others, children: [_jsx(Title, { level: 5, className: "text-capitalize m-0", children: project_name.slice(0, 15) }), _jsx("br", {}), _jsxs(Flex, { wrap: "wrap", gap: "small", className: "text-capitalize", children: [_jsxs(Text, { children: ["Owner: ", _jsxs("b", { children: [project_manager, ","] })] }), _jsxs(Text, { children: ["Client: ", _jsxs("b", { children: [client_name, ","] })] }), _jsxs(Text, { children: ["Priority: ", _jsxs("b", { children: [priority, ","] })] }), _jsxs(Text, { children: ["Type: ", _jsxs("b", { children: [project_type, ","] })] }), _jsxs(Text, { children: ["Location: ", _jsx("b", { children: project_location })] })] })] })) : (_jsx(AntdCard, { bordered: true, hoverable: true, ...others, children: _jsx(Descriptions, { items: items, column: { xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 } }) }));
};
export default ProjectsCard;
