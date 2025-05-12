import { Helmet } from "react-helmet-async";
import { Card, PageHeader } from "../../components";
import { Typography } from "antd";

const Deposit = () => {
  return (
    <>
      <div>
        <Card style={{ marginBottom: "1.5rem" }}>
          <Helmet>
            <title>Депозиты </title>
          </Helmet>
          <PageHeader title="Депозиты" />
        </Card>
      </div>
      <Card>
        <Typography.Title level={5}>
          Bu sahifa tez orada ishga tushadi😴!
        </Typography.Title>
      </Card>
    </>
  );
};

export default Deposit;
