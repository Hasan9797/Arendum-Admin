/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RevenueCard } from "../../components";
import { Col, Row } from "antd";
import LastApplicationsTable from "../../components/dashboard/default/Main/LastTransactionsTable";

const DefaultDashboardPage = () => {
  return (
    <>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} md={12} lg={6}>
          <RevenueCard
            title="Пользователей"
            value={15}
            diff={20}
            // loading={listLoading}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <RevenueCard
            title="Водителей"
            value={23}
            diff={-20}

            // loading={listLoading}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <RevenueCard
            title="Заказов"
            value={56}
            diff={20}

            // loading={listLoading}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <RevenueCard
            title="Мерчанты"
            value={16}
            diff={13}

            // loading={listLoading}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <RevenueCard
            title="Arendum.UZS"
            value={3079225}
            diff={20}

            // loading={listLoading}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <RevenueCard
            title="Merchants.UZS"
            value={50794564}
            diff={20}

            // loading={listLoading}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <RevenueCard
            title="Atom Pay.UZS"
            value={10792000}
            diff={20}

            // loading={listLoading}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <RevenueCard
            title="Оборот.UZS"
            value={207922544}
            diff={20}

            // loading={listLoading}
          />
        </Col>
      </Row>
      <Col style={{ marginTop: 20 }}>
        <LastApplicationsTable />
      </Col>
    </>
  );
};

export default DefaultDashboardPage;
