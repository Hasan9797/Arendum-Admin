import { Helmet } from "react-helmet-async";
import { Card, PageHeader } from "../../components";
import { useState } from "react";
import UserBalanceTable from "../../components/dashboard/default/UserBalance/UserBalanceTable.jsx";
import RegionCreateModal from "../../components/dashboard/default/Region/RegionCreateModal";

const UserBalance = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div>
        <Card style={{ marginBottom: "1.5rem" }}>
          <Helmet>
            <title>Балансы </title>
            {/* <title>Балансы пользователей</title> */}
          </Helmet>
          <PageHeader
            title="Балансы пользователей"
            
          />
        </Card>
        <UserBalanceTable />
      </div>
      <RegionCreateModal
        onSuccessFields={() => setModal(false)}
        open={modal}
        onCancel={() => {
          setModal(false);
        }}
      />
    </>
  );
};

export default UserBalance;
