import { FC } from "react";
import { useParams } from "react-router-dom";

const MerchantEditPage: FC = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default MerchantEditPage;
