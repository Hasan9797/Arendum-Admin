import { jsx as _jsx } from "react/jsx-runtime";
import { Badge, Table, Tag, Typography, } from "antd";
const COLUMNS = [
    {
        title: "Name",
        dataIndex: "project_name",
        key: "proj_name",
        render: (_, { project_name }) => (_jsx(Typography.Paragraph, { ellipsis: { rows: 1 }, className: "text-capitalize", style: { marginBottom: 0 }, children: project_name.substring(0, 20) })),
    },
    {
        title: "Client",
        dataIndex: "client_name",
        key: "proj_client_name",
    },
    {
        title: "Category",
        dataIndex: "project_category",
        key: "proj_category",
        render: (_) => _jsx("span", { className: "text-capitalize", children: _ }),
    },
    {
        title: "Priority",
        dataIndex: "priority",
        key: "proj_priority",
        render: (_) => {
            let color;
            if (_ === "low") {
                color = "cyan";
            }
            else if (_ === "medium") {
                color = "geekblue";
            }
            else {
                color = "magenta";
            }
            return (_jsx(Tag, { color: color, className: "text-capitalize", children: _ }));
        },
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "proj_status",
        render: (_) => {
            let status;
            if (_ === "on hold") {
                status = "default";
            }
            else if (_ === "completed") {
                status = "success";
            }
            else {
                status = "processing";
            }
            return _jsx(Badge, { status: status, text: _, className: "text-capitalize" });
        },
    },
    {
        title: "Team size",
        dataIndex: "team_size",
        key: "proj_team_size",
    },
    {
        title: "Duration",
        dataIndex: "project_duration",
        key: "project_duration",
    },
    {
        title: "Start date",
        dataIndex: "start_date",
        key: "proj_start_date",
    },
];
const ProjectsTable = ({ data, ...others }) => {
    return (_jsx(Table, { dataSource: data, columns: COLUMNS, className: "overflow-scroll", ...others }));
};
export default ProjectsTable;
