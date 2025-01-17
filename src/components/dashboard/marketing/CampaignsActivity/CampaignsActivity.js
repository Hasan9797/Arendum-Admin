import { jsx as _jsx } from "react/jsx-runtime";
import { Button, Calendar, Popover } from "antd";
import { QuestionOutlined } from "@ant-design/icons";
import { Card } from "../../../index.ts";
const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
};
const CampaignsActivity = ({ ...others }) => {
    return (_jsx(Card, { title: "Campaign activity", extra: _jsx(Popover, { content: "Check the campaign activity schedule", children: _jsx(Button, { icon: _jsx(QuestionOutlined, {}), type: "text" }) }), ...others, children: _jsx(Calendar, { fullscreen: false, onPanelChange: onPanelChange }) }));
};
export default CampaignsActivity;
