import { FC } from "react";
import { Card } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../../components";
import MainButton from "../../components/MainButton/MainButton";
import { useNavigate } from "react-router-dom";
import PricingTable from "../../components/dashboard/default/Pricing/PricingTable";

const Pricing: FC = () => {
  const navigate = useNavigate();

  return (
    <div>
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
              onClick={() => navigate("/dashboards/pricing/create")}
            />
          }
        />
      </Card>
      <PricingTable />
    </div>
  );
};

export default Pricing;
