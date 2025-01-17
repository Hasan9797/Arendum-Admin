/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input, Select, TreeSelect } from "antd";
import { FC, useEffect, useState } from "react";
import useUser from "../../../../hooks/user/useUser.jsx";
import useRegion from "../../../../hooks/region/useRegion.jsx";
import { copyText } from "../../../../utils/index";
import { CopyOutlined } from "@ant-design/icons";
import { doctypeList } from "../../../list.js";
import MainButton from "../../../MainButton/MainButton.js";
import useAuth from "../../../../hooks/auth/useAuth.jsx";
import { generatePassword } from "../../../../utils/index";

const UserCreatePage: FC = () => {
  const [form] = Form.useForm();
  const { createLoading, roles, getRoles, getPermissions, permissions } =
    useUser();
  const { regions, getRegions } = useRegion();
  const { user } = useAuth();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [value, setValue] = useState<string>();
  console.log(selectedRegion);

  useEffect(() => {
    getRegions();
    getRoles();
    getPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(null);
    form.setFieldValue("permissions", undefined);
  }, [selectedRole]);

  const filterRoles = roles.filter(
    (role) => role.name !== "admin" && role.name !== "super_admin"
  );
  const allowedNames = ["manage", "semimanage"];

  const filteredPermissions =
    (selectedRole === "super_admin" &&
      permissions.filter((item) => item?.name === "manage")) ||
    (selectedRole === "admin" &&
      permissions.filter((item) => item?.name === "semimanage")) ||
    permissions.filter((item) => !allowedNames.includes(item?.name));

  const forms = [
    {
      label: "Логин",
      name: "login",
      required: true,
      message: "Заполните",
      child: (
        <div>
          <Input
            minLength={8}
            maxLength={15}
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
              form.setFieldValue("login", e.target.value);
            }}
            suffix={
              <CopyOutlined
                onClick={() => copyText(login)}
                style={{ cursor: "pointer" }}
              />
            }
          />
        </div>
      ),
    },
    {
      label: "Пароль",
      name: "password",
      required: true,
      message: "Заполните",
      child: (
        <div>
          <Input
            minLength={6}
            maxLength={12}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              form.setFieldValue("password", e.target.value);
            }}
            suffix={
              <CopyOutlined
                onClick={() => copyText(password)}
                style={{ cursor: "pointer" }}
              />
            }
          />
          <MainButton
            onClick={() => generatePassword(setPassword, form)}
            type="primary"
            buttonText="Создать пароль"
            className="w-100"
            style={{ marginTop: "1rem" }}
          />
        </div>
      ),
    },
    {
      label: "Имя и фамилия",
      name: "fullName",
      required: true,
      message: "Заполните",
      child: (
        <div>
          <Input
            onChange={(e) => {
              form.setFieldValue("fullName", e.target.value);
            }}
          />
        </div>
      ),
    },
    {
      label: "Серийный номер например: (AC1234567)",
      name: "serialNumber",
      required: true,
      message: "Заполните",
      child: (
        <div>
          <Input
            onChange={(e) => {
              form.setFieldValue("serialNumber", e.target.value);
            }}
          />
        </div>
      ),
    },
    {
      label: "ПИНФЛ",
      name: "pinpp",
      required: true,
      message: "Заполните",
      child: (
        <div>
          <Input
            onChange={(e) => {
              form.setFieldValue("pinpp", e.target.value);
            }}
          />
        </div>
      ),
    },
    {
      label: "Роль",
      name: "role",
      required: true,
      message: "Заполните",
      child: (
        <Select
          showSearch
          allowClear
          loading={createLoading}
          disabled={createLoading}
          filterOption={(
            inputValue,
            option: { label: string; value: string }
          ) =>
            option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
          options={
            (user?.role === "admin" &&
              filterRoles?.map((item) => ({
                value: item.name,
                label: item.name.toUpperCase(),
              }))) ||
            (user?.role === "super_admin" &&
              roles?.map((item) => ({
                value: item.name,
                label: item.name.toUpperCase(),
              })))
          }
          onChange={(e) => {
            setSelectedRole(e);
            form.setFieldValue("role", e);
          }}
        />
      ),
    },
    {
      label: "Doctype",
      name: "doctype",
      required: true,
      message: "Заполните",
      child: (
        <Select
          showSearch
          allowClear
          loading={createLoading}
          disabled={createLoading}
          filterOption={(inputValue, option: { label: string }) =>
            option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
          options={
            doctypeList &&
            doctypeList?.map((item) => ({
              value: item.value,
              label: item.label,
            }))
          }
          onChange={(e) => form.setFieldValue("doctype", e)}
        />
      ),
    },
    {
      label: "Регион",
      name: "region",
      required: true,
      message: "Заполните",
      child: (
        <Select
          showSearch
          allowClear
          loading={createLoading}
          disabled={createLoading}
          filterOption={(inputValue, option: { label: string }) =>
            option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
          options={
            regions &&
            regions?.map((item) => {
              return {
                value: item.id,
                label: item.regionNameRU,
              };
            })
          }
          onChange={(e) => {
            setSelectedRegion(e);
          }}
        />
      ),
    },
    // {
    //   label: "Объект",
    //   name: "facilityId",
    //   required: true,
    //   message: "Заполните",
    //   child: (
    //     <Select
    //       showSearch
    //       allowClear
    //       loading={createLoading}
    //       disabled={createLoading}
    //       filterOption={(inputValue, option: { label: string }) =>
    //         option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
    //       }
    //       options={
    //         selectedRegion
    //           ? regions
    //               .find((item) => item.id === selectedRegion)
    //               ?.facilities?.map((facility) => ({
    //                 value: facility.id,
    //                 label: facility.facilityNameRU,
    //               }))
    //           : facilties &&
    //             facilties?.map((facility) => ({
    //               value: facility.id,
    //               label: facility.facilityNameRU,
    //             }))
    //       }
    //       onChange={(e) => form.setFieldValue("facilityId", e)}
    //     />
    //   ),
    // },
    {
      label: "Доступы",
      name: "permissions",
      required: true,
      message: "Заполните",
      child: (
        <TreeSelect
          showSearch
          style={{ width: "100%" }}
          value={value}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Please select"
          allowClear
          multiple
          disabled={createLoading}
          treeDefaultExpandAll
          onChange={onChange}
          treeData={
            permissions
              ? filteredPermissions.length > 0 &&
                filteredPermissions.map((permission) => ({
                  title: permission?.name.toUpperCase(),
                  value: permission.name,
                }))
              : ""
          }
        />
      ),
    },
  ];

  return (
    <Form form={form} layout="vertical">
      {forms.map((item, index) => (
        <Form.Item
          key={index}
          label={item.label}
          name={item.name}
          rules={[{ required: item.required, message: item.message }]}
        >
          {item.child}
        </Form.Item>
      ))}
    </Form>
  );
};

export default UserCreatePage;
