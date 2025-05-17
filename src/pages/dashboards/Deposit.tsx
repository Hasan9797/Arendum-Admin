import { Helmet } from "react-helmet-async";
import { Card, PageHeader } from "../../components";
import DepositTable from "../../components/dashboard/default/Deposit/DepositTable";

const Deposit = () => {
  return (
    <>
      <Card style={{ marginBottom: "1.5rem" }}>
        <Helmet>
          <title>Депозиты </title>
        </Helmet>
        <PageHeader title="Депозиты" />
      </Card>
      <DepositTable/>
    </>
  );
};

export default Deposit;
