import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Col, Progress, Row, Space, Statistic, Tooltip, } from "antd";
import ProjectsData from "../../../../../public/mocks/Projects.json";
import "./styles.scss";
const PROGRESS_PROPS = {
    type: "circle",
    showInfo: false,
    size: 24,
    style: {
        paddingBottom: ".35rem",
    },
};
const SPACE_PROPS = {
    align: "end",
};
const ProjectsCountCard = ({ ...others }) => {
    const completed = ProjectsData.filter((_) => _.status === "completed"), inProgress = ProjectsData.filter((_) => _.status === "in progress"), onHold = ProjectsData.filter((_) => _.status === "on hold");
    return (_jsx(Card, { title: "Project stats", bodyStyle: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "80%",
        }, className: "card", style: {
            height: "100%",
        }, ...others, children: _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 8, children: _jsxs(Space, { ...SPACE_PROPS, children: [_jsx(Statistic, { title: "Active", value: inProgress.length }), _jsx(Tooltip, { title: `${inProgress.length} / ${ProjectsData.length} active`, children: _jsx(Progress, { percent: Number(((inProgress.length / ProjectsData.length) * 100).toFixed(2)), ...PROGRESS_PROPS }) })] }) }), _jsx(Col, { span: 8, children: _jsxs(Space, { ...SPACE_PROPS, children: [_jsx(Statistic, { title: "On Hold", value: onHold.length }), _jsx(Tooltip, { title: `${onHold.length} / ${ProjectsData.length} on hold`, children: _jsx(Progress, { percent: Number(((onHold.length / ProjectsData.length) * 100).toFixed(2)), ...PROGRESS_PROPS }) })] }) }), _jsx(Col, { span: 8, children: _jsxs(Space, { ...SPACE_PROPS, children: [_jsx(Statistic, { title: "Completed", value: completed.length }), _jsx(Tooltip, { title: `${completed.length} / ${ProjectsData.length} completed`, children: _jsx(Progress, { percent: Number(((completed.length / ProjectsData.length) * 100).toFixed(2)), ...PROGRESS_PROPS }) })] }) })] }) }));
};
export default ProjectsCountCard;
