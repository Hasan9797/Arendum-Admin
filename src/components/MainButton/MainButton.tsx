import { Button, ButtonProps, Tooltip } from "antd";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

type MainButtonProps = {
  link?: string | undefined;
  icon?: ReactNode | undefined;
  tooltipText?: string | undefined;
  buttonText?: string;
} & ButtonProps;

const MainButton: FC<MainButtonProps> = ({
  link,
  icon,
  tooltipText,
  buttonText,
  ...others
}: MainButtonProps) => {
  return !link ? (
    <Tooltip title={tooltipText}>
      <Button icon={icon} {...others}>
        {buttonText}
      </Button>
    </Tooltip>
  ) : (
    <Link to={link}>
      <Button icon={icon} {...others}>
        {buttonText}
      </Button>
    </Link>
  );
};

export default MainButton;
