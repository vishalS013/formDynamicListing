import React from "react";
import { Button, Input, Select } from "antd";

export default function createElement(type, fieldProps) {
  const { label, placeholder, options } = fieldProps;

  switch (type) {
    case "number":
      return <Input placeholder={placeholder} />;
    case "email":
      return <Input placeholder={placeholder} />;
    case "text":
      return <Input placeholder={placeholder} />;
    case "password":
      return <Input.Password placeholder={placeholder} />;
    case "date":
      return <Input placeholder={placeholder} type="date" />;
    case "select":
      return (
        <Select placeholder={placeholder}>
          {options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
    case "button":
      return (
        <Button type="primary" htmlType="submit">
          {label}
        </Button>
      );
    default:
      return <div>Unknown type: {type}</div>;
  }
}
