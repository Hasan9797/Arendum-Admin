import { Card } from "antd";
import UserTable from "../../components/dashboard/default/User/UserTable";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../../components";
import MainButton from "../../components/MainButton/MainButton";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  return (
    <>
      <Card style={{ marginBottom: "1.5rem" }}>
        <Helmet>
          <title>Параметры техники</title>
        </Helmet>
        <PageHeader
          title="Параметры техники"
          extra={
            <MainButton
              buttonText="Создать"
              tooltipText="Создать"
              icon={<FormOutlined />}
              type="primary"
              onClick={() => navigate("/dashboards/user/create")}
            />
          }
        />
      </Card>
      <UserTable />
    </>
  );
};

export default User;
