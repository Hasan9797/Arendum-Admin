import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Alert, Avatar, Button, Col, Divider, Flex, Image, List, Row, Space, theme, Typography, } from "antd";
import { CommentOutlined, DeleteFilled, EditFilled, LikeOutlined, ShareAltOutlined, } from "@ant-design/icons";
import React from "react";
import { getNameInitials } from "../../../../utils";
import { Card, Loader } from "../../../index.ts";
import "./styles.css";
const IconText = ({ icon, text, }) => (_jsxs(Space, { children: [React.createElement(icon), text] }));
const PostsCard = ({ as, data, error, loading, ...others }) => {
    const { token } = theme.useToken();
    return (_jsx(Card, { className: "posts-lists-card card", ...others, children: error ? (_jsx(Alert, { message: "Error", description: error.toString(), type: "error", showIcon: true })) : loading ? (_jsx(Loader, {})) : (_jsx(List, { itemLayout: "vertical", size: "large", pagination: {
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 5,
                align: "center",
            }, dataSource: data, renderItem: (item) => as === "active" ? (_jsxs(List.Item, { actions: [
                    _jsx(IconText, { icon: LikeOutlined, text: item.likes_count }, "list-vertical-star-o"),
                    _jsx(IconText, { icon: CommentOutlined, text: item.comments_count }, "list-vertical-like-o"),
                    _jsx(IconText, { icon: ShareAltOutlined, text: item.shares_count }, "list-vertical-message"),
                ], extra: _jsx("img", { width: 32, alt: "logo", src: item.image_url }), children: [_jsx(List.Item.Meta, { avatar: _jsx(Avatar, { style: { backgroundColor: token.colorPrimary }, children: getNameInitials(item.author) }), title: _jsxs(Typography.Link, { style: { textTransform: "capitalize" }, children: [item.title.slice(0, 30), "..."] }), description: _jsxs(Space, { children: [_jsx(Typography.Text, { children: item.category }), _jsx(Divider, { type: "vertical" }), _jsx(Typography.Text, { children: item.date }), _jsx(Divider, { type: "vertical" }), _jsx(Typography.Text, { children: item.location })] }) }), _jsx(Typography.Paragraph, { ellipsis: { rows: 3 }, children: item.content })] }, item.title)) : (_jsx(List.Item, { children: _jsxs(Row, { gutter: [8, 8], children: [_jsx(Col, { span: 2, children: _jsx(Flex, { justify: "center", align: "center", style: { height: "100%" }, children: _jsx(Image, { src: item.image_url, width: 24, height: 24, alt: item.title, placeholder: true, preview: false }) }) }), _jsx(Col, { span: 20, children: _jsxs(Flex, { vertical: true, gap: "small", children: [_jsxs(Typography.Text, { strong: true, className: "text-capitalize m-0", children: [item.title.slice(0, 50), "..."] }), _jsxs(Flex, { vertical: true, gap: "small", children: [_jsxs(Flex, { gap: "small", children: [_jsx(Typography.Text, { children: "Category:" }), _jsx(Typography.Text, { children: item.category })] }), _jsxs(Flex, { gap: "small", children: [_jsx(Typography.Text, { children: "Posting date:" }), _jsxs(Typography.Text, { children: [item.date, " - ", item.time, ":00h"] })] })] })] }) }), _jsx(Col, { span: 2, children: _jsxs(Flex, { vertical: true, align: "flex-end", gap: "middle", children: [_jsx(Button, { shape: "circle", children: _jsx(EditFilled, {}) }), _jsx(Button, { shape: "circle", children: _jsx(DeleteFilled, {}) })] }) })] }) }, item.title)) })) }));
};
export default PostsCard;
