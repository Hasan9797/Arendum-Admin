import { Card } from "antd";
import ClientTable from "../../components/dashboard/default/Client/ClientTable";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../../components";

const Client = () => {
  return (
    <>
      <div>
      <Card style={{ marginBottom: "1.5rem" }}>
          <Helmet>
            <title>Пользователи</title>
          </Helmet>
          <PageHeader
            title="Пользователи"
          />
        </Card>
        <ClientTable />
      </div>
    </>
  );
};

export default Client;
