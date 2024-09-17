import React, { useState } from "react";
import {Form, Table } from "antd";
import createElement from "./JSON/createElement";
import { employeeData } from "./JSON/employeeData";

const FormInput = () => {
  const [formData, setFormData] = useState([]);

  const onSuccess = (data) => {
    console.log("success=-=-=-=>", data);
    setFormData((prevData) => [...prevData, data]);
  };

  const onError = (error) => {
    console.log("error -=-=-=-=-=>", error);
  };

  const fields = employeeData.flatMap((item) => item.fields);
  console.log("fields", fields);
  console.log("emplooyeeeeeeeeeeee", employeeData);


  const tableData = fields
    .filter((field) => field.type !== "button")
    .map((field) => ({
      title: field.label,
      dataIndex: field.id,
      key: field.id,
      render: (text) => text || "-",
    }));

  return (
    <div>
      {employeeData.map((data) => {
        return (
          <React.Fragment key={data.label}>
            <p>{data.name}</p>
            <Form
              name={data.label}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 1200, justifyContent: "center" }}
              initialValues={{ remember: true }}
              onFinish={onSuccess}
              onFinishFailed={onError}
              autoComplete="off"
            >
              {fields.map((field) =>
                field.type !== "button" ? (
                  <Form.Item
                    key={field.id}
                    label={field.label}
                    name={field.id}
                    rules={field.validation?.map((valid) => ({
                      required: valid.type === "required",
                      message: valid.message,
                      max: valid.value ? Number(valid.value) : undefined,
                    }))}
                  >
                    {createElement(field.type, field)}
                  </Form.Item>
                ) : null
              )}

              {fields
                .filter((field) => field.type === "button")
                .map((button) => (
                  <Form.Item key={button.id} wrapperCol={{ offset: 8, span: 16 }}>
                    {createElement(button.type, button)}
                  </Form.Item>
                ))}
            </Form>

            {formData.length > 0 && (
              <Table
                columns={tableData}
                dataSource={formData}
                rowKey={(index) => index}
                style={{ marginTop: 20 }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default FormInput;
