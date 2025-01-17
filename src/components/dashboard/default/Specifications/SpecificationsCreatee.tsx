// import React, { useState } from "react";
// import { Input, Button, Select, Space, Form, Typography } from "antd";
// import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

// const { Option, OptGroup } = Select;

// interface ParameterOption {
//   value: string;
//   label: string;
//   disableWhen?: string[];
// }

// interface Parameter {
//   group: string;
//   options: ParameterOption[];
// }

// const SpecificationsCreatee: React.FC = () => {
//   const [parameters, setParameters] = useState<Parameter[]>([]);
//   const [selectedValues, setSelectedValues] = useState<{
//     [key: string]: string;
//   }>({});

//   const addParameter = () => {
//     setParameters((prev) => [
//       ...prev,
//       { group: "", options: [{ value: "", label: "" }] },
//     ]);
//   };

//   const updateParameterGroup = (index: number, group: string) => {
//     const updated = [...parameters];
//     updated[index].group = group;
//     setParameters(updated);
//   };

//   const addOption = (index: number) => {
//     const updated = [...parameters];
//     updated[index].options.push({ value: "", label: "" });
//     setParameters(updated);
//   };

//   const updateOption = (
//     paramIndex: number,
//     optionIndex: number,
//     field: keyof ParameterOption,
//     value: string
//   ) => {
//     const updated = [...parameters];
//     updated[paramIndex].options[optionIndex][field] = value;
//     setParameters(updated);
//   };

//   const handleChange = (group: string, value: string) => {
//     setSelectedValues((prev) => ({
//       ...prev,
//       [group]: value,
//     }));
//   };

//   const isOptionDisabled = (group: string, optionValue: string) => {
//     const currentGroup = parameters.find((p) => p.group === group);
//     if (!currentGroup) return false;

//     const selectedOptions = Object.entries(selectedValues).map(([_, v]) => v);
//     const option = currentGroup.options.find((o) => o.value === optionValue);

//     return (
//       option?.disableWhen?.some((cond) => selectedOptions.includes(cond)) ||
//       false
//     );
//   };

//   return (
//     <Space direction="vertical" style={{ width: "100%" }}>
//       <Typography.Title level={4}>Добавление параметров</Typography.Title>

//       {parameters.map((param, paramIndex) => (
//         <div key={paramIndex} style={{ marginBottom: "16px" }}>
//           <Input
//             placeholder="Название группы"
//             value={param.group}
//             onChange={(e) => updateParameterGroup(paramIndex, e.target.value)}
//             style={{ marginBottom: "8px", width: "300px" }}
//           />
//           {param.options.map((option, optionIndex) => (
//             <Space
//               key={optionIndex}
//               style={{ display: "flex", marginBottom: "8px" }}
//             >
//               <Input
//                 placeholder="Значение"
//                 value={option.value}
//                 onChange={(e) =>
//                   updateOption(paramIndex, optionIndex, "value", e.target.value)
//                 }
//                 style={{ width: "150px" }}
//               />
//               <Input
//                 placeholder="Метка"
//                 value={option.label}
//                 onChange={(e) =>
//                   updateOption(paramIndex, optionIndex, "label", e.target.value)
//                 }
//                 style={{ width: "150px" }}
//               />
//               <MinusCircleOutlined
//                 onClick={() => {
//                   const updated = [...parameters];
//                   updated[paramIndex].options.splice(optionIndex, 1);
//                   setParameters(updated);
//                 }}
//               />
//             </Space>
//           ))}
//           <Button
//             type="dashed"
//             onClick={() => addOption(paramIndex)}
//             icon={<PlusOutlined />}
//           >
//             Добавить опцию
//           </Button>
//         </div>
//       ))}

//       <Button type="primary" onClick={addParameter}>
//         Добавить параметр
//       </Button>

//       <Typography.Title level={4}>Выбор параметров</Typography.Title>
//       {parameters.map((param) => (
//         <Select
//           key={param.group}
//           placeholder={`Выберите ${param.group}`}
//           onChange={(value) => handleChange(param.group, value)}
//           style={{ width: 300, marginBottom: "16px" }}
//           value={selectedValues[param.group]}
//         >
//           <OptGroup label={param.group}>
//             {param.options.map((option) => (
//               <Option
//                 key={option.value}
//                 value={option.value}
//                 disabled={isOptionDisabled(param.group, option.value)}
//               >
//                 {option.label}
//               </Option>
//             ))}
//           </OptGroup>
//         </Select>
//       ))}
//     </Space>
//   );
// };

// export default SpecificationsCreatee;
