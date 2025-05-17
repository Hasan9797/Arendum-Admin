import { FC } from "react";
import { Card } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../../components";
import MainButton from "../../components/MainButton/MainButton";
import { useNavigate } from "react-router-dom";
import ParamsFilterTable from "../../components/dashboard/default/ParamsFilter/ParamsFilterTable";

const ParamsFilter: FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Card style={{ marginBottom: "1.5rem" }}>
        <Helmet>
          <title>Фильтр параметров техники</title>
        </Helmet>
        <PageHeader
          title="Фильтр параметров техники"
          extra={
            <MainButton
              buttonText="Создать"
              tooltipText="Создать"
              icon={<FormOutlined />}
              type="primary"
              onClick={() => navigate("/dashboards/params_filter/create")}
            />
          }
        />
      </Card>
      <ParamsFilterTable />
    </div>
  );
};

export default ParamsFilter;
