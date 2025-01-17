/* eslint-disable @typescript-eslint/no-unused-vars */
import { Flex, FlexProps } from "antd";
import { CSSProperties } from "react";

import "./styles.css";
import { IMAGES } from "../../assets/images/images";

type LogoProps = {
  color: CSSProperties["color"];
  imgSize?: {
    h?: number | string;
    w?: number | string;
  };
  asLink?: boolean;
  href?: string;
  bgColor?: CSSProperties["backgroundColor"];
} & Omit<FlexProps, "children">;

const Logo = ({ asLink, href, imgSize, ...others }: LogoProps) => {
  // const {
  //   token: { borderRadius },
  // } = theme.useToken();

  return asLink ? (
    // <Link to={href || "#"} className="logo-link">
    <Flex gap={others.gap || "small"} align="center" {...others}>
      <img
        src={IMAGES.logo}
        alt="design sparx logo"
        height={imgSize?.h || 48}
      />
    </Flex>
  ) : (
    // </Link>
    <Flex gap={others.gap || "small"} align="center" {...others}>
      <img
        src={IMAGES.logo}
        alt="design sparx logo"
        height={imgSize?.h || 48}
      />
      {/* <Typography.Title
        level={4}
        type="secondary"
        style={{
          color,
          margin: 0,
          padding: `4px 8px`,
          backgroundColor: bgColor,
          borderRadius,
        }}
      >
        Admin
      </Typography.Title> */}
    </Flex>
  );
};

export default Logo;
