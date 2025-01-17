import { FC } from "react";
import PhoneInputPackage from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneInputProps {
  onChange?: (e: string) => void;
  value?: string;
}

const PhoneInput: FC<PhoneInputProps> = ({ onChange, value }) => {
  return (
    <PhoneInputPackage
      country={"uz"}
      countryCodeEditable={false}
      disableDropdown
      inputClass="w-100"
      onChange={(e) => onChange && onChange(e)}
      value={value}
    />
  );
};

export default PhoneInput;
