import { Layout } from "antd";

const { Footer } = Layout;

type FooterNavProps = React.HTMLAttributes<HTMLDivElement>;

const FooterNav = ({ ...others }: FooterNavProps) => {
  return (
    <Footer {...others}>
      Arendum Dashboard © 2024 Created by Morvine LLC
    </Footer>
  );
};

export default FooterNav;
