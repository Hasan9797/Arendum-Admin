import {
  Button,
  Dropdown,
  Flex,
  FloatButton,
  // Input,
  Layout,
  MenuProps,
  message,
  theme,
  Tooltip,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactNode, useRef, useEffect, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from "react-transition-group";
import { useMediaQuery } from "react-responsive";
import SideNav from "./SideNav.tsx";
import HeaderNav from "./HeaderNav.tsx";
import FooterNav from "./FooterNav.tsx";
import { removeToken } from "../../helpers/api.tsx";
import { PATH_AUTH } from "../../constants/routes.ts";
import useAuth from "../../hooks/auth/useAuth.jsx";
import { IMAGES } from "../../assets/images/images.tsx";

const { Content } = Layout;

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [collapsed, setCollapsed] = useState(true);
  const [navFill, setNavFill] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [, setIsLoading] = useState(false);
  const nodeRef = useRef(null);
  const floatBtnRef = useRef(null);

  const { logout } = useAuth();

  // useEffect(() => {
  //   getMe()
  //     .then((res) => {
  //       if (!res) {
  //         navigate(PATH_AUTH.signin);
  //         removeToken();
  //       }
  //     })
  //     .catch((err) => console.log("catch user", err));
  // }, []);

  const items: MenuProps["items"] = [
    // {
    //   key: "user-profile-link",
    //   label: "profile",
    //   icon: <UserOutlined />,
    // },
    // {
    //   key: "user-settings-link",
    //   label: "settings",
    //   icon: <SettingOutlined />,
    // },
    // {
    //   key: "user-help-link",
    //   label: "help center",
    //   icon: <QuestionOutlined />,
    // },
    // {
    //   type: "divider",
    // },
    {
      key: "user-logout-link",
      label: "logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        logout().then((res) => {
          console.log(res);
          if (res?.message ==='Logout successful') {
            navigate(PATH_AUTH.signin);
            removeToken();
            message.success({
              content: "Успешный выход из системы",
            });
          }
        });
      },
    },
  ];

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 5) {
        setNavFill(true);
      } else {
        setNavFill(false);
      }
    });
  }, []);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          backgroundColor: "rgba(52, 152, 219, 0.1)",
          backgroundImage:
            "radial-gradient(at 47% 33%, hsl(197.95, 0%, 100%) 0, transparent 59%),\n" +
            "radial-gradient(at 82% 65%, hsl(204.07, 70%, 75%) 0, transparent 55%)",
        }}
      >
        <SideNav
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={240}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: "auto",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: "none",
            border: "none",
            transition: "all .2s",
          }}
        />
        <Layout
          style={{
            background: "none",
          }}
        >
          <HeaderNav
            style={{
              marginLeft: collapsed ? 0 : 220,
              padding: "0 2rem 0 0",
              background: navFill ? "#eaf5fc" : "none",
              backdropFilter: navFill ? "blur(8px)" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
              zIndex: 1,
              gap: 8,
              transition: "all .25s",
            }}
          >
            <Flex align="center">
              <Tooltip title={`${collapsed ? "Expand" : "Collapse"} Sidebar`}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 50,
                    height: 50,
                    marginLeft: 10,
                  }}
                />
              </Tooltip>
              {/* <Input.Search
                placeholder="search"
                style={{
                  width: isMobile ? "100%" : "400px",
                  marginLeft: isMobile ? 0 : ".5rem",
                }}
                size="middle"
              /> */}
            </Flex>
            <Flex align="center" gap="small">
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Flex>
                  <img
                    src={IMAGES.userIcon}
                    alt="user profile photo"
                    height={36}
                    width={40}
                    style={{ borderRadius, objectFit: "contain" }}
                  />
                </Flex>
              </Dropdown>
            </Flex>
          </HeaderNav>
          <Content
            style={{
              margin: `0 0 0 ${collapsed ? 0 : "230px"}`,
              background: "rgba(52, 152, 219, 0.35)",
              borderRadius: collapsed ? 0 : borderRadius,
              transition: "all .25s",
              padding: "20px 20px",
              minHeight: 360,
            }}
          >
            <TransitionGroup>
              <SwitchTransition>
                <CSSTransition
                  key={`css-transition-${location.key}`}
                  nodeRef={nodeRef}
                  onEnter={() => {
                    setIsLoading(true);
                  }}
                  onEntered={() => {
                    setIsLoading(false);
                  }}
                  timeout={200}
                  // classNames="bottom-to-top"
                  unmountOnExit
                >
                  {() => (
                    <div ref={nodeRef} style={{ background: "none" }}>
                      {children}
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </TransitionGroup>
            <div ref={floatBtnRef}>
              <FloatButton.BackTop />
            </div>
          </Content>
          <FooterNav
            style={{
              textAlign: "center",
              marginLeft: collapsed ? 0 : "220px",
              background: "none",
            }}
          />
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;
