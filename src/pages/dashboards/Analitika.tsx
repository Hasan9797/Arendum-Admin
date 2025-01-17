/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Column } from "@ant-design/charts";
import { Card, RevenueCard } from "../../components";
import { Col, Row, Segmented } from "antd";
import {
  dailyStatistics,
  monthlyStatistics,
  weeklyStatistics,
} from "../../constants";
import { useState } from "react";

const RevenueColumnChart = ({ data }) => {
  const config = {
    data,
    isGroup: true,
    xField: "period",
    yField: "value",
    seriesField: "name",
    // isRange: true,
    // isPercent: true,

    /** set color */
    // color: ['#1ca9e6', '#f88c24'],

    /** Set spacing */
    // marginRatio: 0.1,
    label: {
      // Label data label position can be manually configured
      position: "middle",
      // 'top', 'middle', 'bottom'
      // Configurable additional layout method
      layout: [
        // Column chart data label position automatically adjusted
        {
          type: "interval-adjust-position",
        }, // Data label anti-obstruction
        {
          type: "interval-hide-overlap",
        }, // Data label text color automatically adjusted
        {
          type: "adjust-color",
        },
      ],
    },
  };
  // @ts-ignore
  return <Column {...config} />;
};

const Analitika = () => {
  const [data, setData] = useState(dailyStatistics);
  const [title, setTitle] = useState<string>("Daily");

  const handleChandeStatistics = (e: string) => {
    setTitle(e);
    switch (e) {
      case "Daily":
        setData(dailyStatistics);
        break;
      case "Weekly":
        setData(weeklyStatistics);
        break;
      case "Monthly":
        setData(monthlyStatistics);
        break;
      default:
        break;
    }
  };
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
        <Col xs={24} sm={12} xl={24}>
          <Card
            title={`${title} statistics`}
            extra={
              <Segmented
                options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
                onChange={(e) => handleChandeStatistics(e)}
              />
            }
          >
            <RevenueColumnChart data={data} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Analitika;
