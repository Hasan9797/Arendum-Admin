import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Row,
  theme,
  Typography,
} from "antd";
import { Logo } from "../../components";
import { useMediaQuery } from "react-responsive";
import { PATH_DASHBOARD } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { showErrors } from "../../errorHandler/errors";
import { setToken } from "../../helpers/api";
import { LoginParamsType } from "../../types";
import useAuth from "../../hooks/auth/useAuth";

const { Title, Text } = Typography;

type FieldType = {
  login?: string;
  password?: string;
};

const SignInPage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();
  const [params, setParams] = useState<LoginParamsType>({
    login: "hasandev",
    password: "hasandev97",
  });
  const { login, loginLoading } = useAuth();

  const handleChangeParams = (name: string, value: string) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = () => {
    login(params).then((res) => {
      if (!res?.data?.accessToken) {
        if (res?.errors || res?.message) {
          showErrors(res);
        }
        if (res?.data?.errors || res?.data?.message) {
          message.error({ content: res?.data?.message });
        }
      } else {
        setToken(res?.data?.accessToken);
        navigate(PATH_DASHBOARD.default);
        message.success("Login successful");
      }
    });
    // if (e.login === "admin" && e.password === "test1") {
    //   navigate(PATH_DASHBOARD.default);
    //   message.success("Login successful");
    // }
  };

  return (
    <Row style={{ minHeight: isMobile ? "auto" : "100vh", overflow: "hidden" }}>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align="center"
          justify="center"
          className="text-center"
          style={{ background: colorPrimary, height: "100%", padding: "1rem" }}
        >
          <Logo color="white" />
          <Title level={2} className="text-white">
            Панель упраления агрегатором
          </Title>
          <Text className="text-white" style={{ fontSize: 18 }}>
            Для авторизации укажите логин и пароль, полученый от администрации
            сервиса.
          </Text>
        </Flex>
      </Col>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align={isMobile ? "center" : "flex-start"}
          justify="center"
          gap="middle"
          style={{ height: "100%", padding: "2rem" }}
        >
          <Title className="m-0">Авторизация</Title>
          <Flex gap={4}>
            <Text>Пожалуйста, заполните следующие поля для входа:</Text>
            {/* <Link href={PATH_AUTH.signup}>Create an account here</Link> */}
          </Flex>
          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onLogin}
            autoComplete="off"
            requiredMark={false}
            initialValues={{ login: "hasandev", password: "hasandev97" }}
          >
            <Row gutter={[8, 0]}>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Логин"
                  name="login"
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, введите свой логин",
                    },
                  ]}
                >
                  <Input
                    value={params.login}
                    onChange={(e) =>
                      handleChangeParams("login", e.target.value)
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Пароль"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, введите свой пароль",
                    },
                  ]}
                >
                  <Input.Password
                    value={params.password}
                    onChange={(e) =>
                      handleChangeParams("password", e.target.value)
                    }
                  />
                </Form.Item>
              </Col>
              {/* <Col xs={24}>
                <Checkbox
                  checked={params.remember || true}
                  onChange={(e) =>
                    handleChangeParams("remember", e.target.checked.toString())
                  }
                  style={{ marginBottom: "1.5rem" }}
                >
                  Авто сохранение
                </Checkbox>
              </Col> */}
            </Row>
            <Form.Item>
              <Flex align="center" justify="space-between">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loginLoading}
                  disabled={loginLoading}
                  style={{ width: "100%" }}
                >
                  Вход
                </Button>
              </Flex>
            </Form.Item>
          </Form>

          <Divider className="m-0"></Divider>
        </Flex>
      </Col>
    </Row>
  );
};

export default SignInPage;
