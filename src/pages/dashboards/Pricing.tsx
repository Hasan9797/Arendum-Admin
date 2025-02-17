import { FC } from "react";
import { Card, Col, Row } from "antd";
import { FormOutlined, WalletOutlined } from "@ant-design/icons";
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
          <title>Ценообразование</title>
        </Helmet>
        <PageHeader
          title="Ценообразование"
          extra={
            <>
              <Row gutter={[16, 16]}>
                <Col>
                  <MainButton
                    buttonText="Сумма налога"
                    tooltipText="Сумма налога"
                    icon={<WalletOutlined  />}
                    type="primary"
                    onClick={() => navigate("/dashboards/tax_amount")}
                  />
                </Col>
                <Col>
                  <MainButton
                    buttonText="Создать"
                    tooltipText="Создать"
                    icon={<FormOutlined />}
                    type="primary"
                    onClick={() => navigate("/dashboards/pricing/create")}
                  />
                </Col>
              </Row>
            </>
          }
        />
      </Card>
      <PricingTable />
    </div>
  );
};

export default Pricing;
