/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { Modal, Input, Form, message } from "antd";
import { PhoneOutlined } from "@ant-design/icons";

interface DeleteUserModalProps {
  isModalVisible: boolean;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteUserWithModal: React.FC<DeleteUserModalProps> = ({
  isModalVisible,
  setIsModalVisible,
}) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const otpRef = useRef<any>(null); // Input.OTP uchun ref

  const phoneDisplayPattern = /^\(\d{2}\)\s\d{3}\s\d{2}\s\d{2}$/;
  const phonePattern = /^\d{9}$/;

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/[\s()]/g, "").slice(0, 9);
    let formatted = "";

    if (digits.length > 0) {
      if (digits.length <= 2) {
        formatted = digits;
      } else {
        formatted += `(${digits.slice(0, 2)})`;
        if (digits.length > 2) {
          formatted += " " + digits.slice(2, 5);
          if (digits.length > 5) {
            formatted += " " + digits.slice(5, 7);
            if (digits.length > 7) {
              formatted += " " + digits.slice(7, 9);
            }
          }
        }
      }
    }

    return formatted;
  };

  const cleanPhoneNumber = (value: string) => {
    return value.replace(/[\s()]/g, "");
  };

  const handleOk = () => {
    if (isCodeSent) {
      if (verificationCode === "123456") {
        message.success("Аккаунт успешно удален!");
        setIsModalVisible?.(false);
        setIsCodeSent(false);
        setPhoneNumber("");
        setVerificationCode("");
      } else {
        message.error("Неверный код!");
      }
    } else {
      const cleanedPhone = cleanPhoneNumber(phoneNumber);
      if (!phonePattern.test(cleanedPhone)) {
        message.error(
          "Введите правильный номер телефона (например, (90) 123 34 54)!"
        );
        return;
      }
      const fullPhoneNumber = "+998" + cleanedPhone;
      message.success("Код отправлен на номер " + fullPhoneNumber);
      setIsCodeSent(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible?.(false);
    setIsCodeSent(false);
    setPhoneNumber("");
    setVerificationCode("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatPhoneNumber(rawValue);
    setPhoneNumber(formattedValue);
  };

  const handleCodeChange = (value: string) => {
    setVerificationCode(value);
  };

  // Kod kiritish maydoni ko‘ringanda birinchi inputga fokus berish
  useEffect(() => {
    if (isCodeSent && otpRef.current) {
      const firstInput = otpRef.current.querySelector("input");
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [isCodeSent]);

  return (
    <>
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <Modal
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={isCodeSent ? "Подтвердить" : "Получить код"}
          cancelText=""
          footer={null}
          closable={true}
          closeIcon={
            <span style={{ fontSize: "16px", color: "#1890ff" }}>✕</span>
          }
          bodyStyle={{ padding: "20px" }}
          style={{ top: 200 }}
        >
          <Form layout="vertical">
            {!isCodeSent ? (
              <Form.Item
                validateStatus={
                  phoneNumber && !phoneDisplayPattern.test(phoneNumber)
                    ? "error"
                    : ""
                }
             
              >
                <Input
                  placeholder="(xx) xxx-xx-xx"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={14}
                  required
                  prefix={<PhoneOutlined style={{ color: "#bfbfbf" }} />}
                  suffix={
                    phoneNumber ? (
                      <span
                        onClick={() => setPhoneNumber("")}
                        style={{ cursor: "pointer", color: "#bfbfbf" }}
                      >
                        ✕
                      </span>
                    ) : null
                  }
                  style={{
                    borderRadius: "4px",
                    border: "1px solid #d9d9d9",
                    padding: "8px 12px",
                  }}
                />
              </Form.Item>
            ) : (
              <Form.Item
                label="Введите код из SMS"
                validateStatus={
                  verificationCode && verificationCode.length !== 6
                    ? "error"
                    : ""
                }
                help={
                  verificationCode && verificationCode.length !== 6
                    ? "Код должен содержать 6 цифр"
                    : ""
                }
              >
                <div ref={otpRef}>
                  <Input.OTP
                    length={6}
                    value={verificationCode}
                    onChange={handleCodeChange}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  />
                </div>
              </Form.Item>
            )}
          </Form>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={handleOk}
              style={{
                backgroundColor: "#e6f7ff",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                color: "#1890ff",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                width: "100%",
              }}
            >
              {isCodeSent ? "ПОДТВЕРДИТЬ" : "ПОЛУЧИТЬ КОД"}
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default DeleteUserWithModal;
