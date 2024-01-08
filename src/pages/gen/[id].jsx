import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Tooltip,
  Typography,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import Layout from "../../component/layout";
import templates from "../../constants/template";
import { copyText } from "../../utils/copy-text";

const { Title, Paragraph } = Typography;

export const getServerSideProps = async (ctx) => {
  const { resolvedUrl } = ctx;

  const template = templates.filter((item) => item.url === resolvedUrl);

  if (template.length === 0) {
    return { notFound: true };
  }

  return { props: { resolvedUrl } };
};

function CheckboxGroupWithAllOptions({ items, onFormChange }) {
  const [checkedList, setCheckedList] = useState([]);

  const onChange = (list) => {
    onFormChange(list);
    setCheckedList(list);
  };

  const onCheckAllChange = (e) => {
    const checked = e.target.checked ? items.map((item) => item.value) : [];
    onChange(checked);
  };

  const checkAll = items.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < items.length;

  return (
    <div style={{ marginBottom: "30px" }}>
      <Checkbox.Group
        style={{ display: "inline-block" }}
        options={items}
        value={checkedList}
        onChange={onChange}
      />

      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        All
      </Checkbox>
    </div>
  );
}

export default function Generator({ resolvedUrl }) {
  const { form, template, name, description } = templates.filter(
    (item) => item.url === resolvedUrl,
  )[0];

  const [formState] = Form.useForm();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    const getLocalStorageForms = localStorage.getItem(
      resolvedUrl.split("/").pop(),
    );

    if (getLocalStorageForms) {
      const parsedForm = { ...JSON.parse(getLocalStorageForms) };

      formState.setFieldsValue(parsedForm);

      forceUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, resolvedUrl]);

  const onFormChange = (event) => {
    formState.setFieldValue(event.target.name, event.target.value);

    localStorage.setItem(
      resolvedUrl.split("/").pop(),
      JSON.stringify(formState.getFieldsValue()),
    );

    forceUpdate();
  };

  const onSelectChange = (value, formName) => {
    formState.setFieldValue(formName, value);
    localStorage.setItem(
      resolvedUrl.split("/").pop(),
      JSON.stringify(formState.getFieldsValue()),
    );

    forceUpdate();
  };

  const onNumberChange = (value, formName) => {
    formState.setFieldValue(formName, value);
    localStorage.setItem(
      resolvedUrl.split("/").pop(),
      JSON.stringify(formState.getFieldsValue()),
    );

    forceUpdate();
  };

  const onRadioChange = (e, formName) => {
    formState.setFieldValue(formName, e.target.value);
    localStorage.setItem(
      resolvedUrl.split("/").pop(),
      JSON.stringify(formState.getFieldsValue()),
    );

    forceUpdate();
  };

  const onCheckboxChange = (value, formName) => {
    formState.setFieldValue(formName, value);
    localStorage.setItem(
      resolvedUrl.split("/").pop(),
      JSON.stringify(formState.getFieldsValue()),
    );

    forceUpdate();
  };

  const renderedTemplate = () => template(formState, form);

  return (
    <Layout>
      <Typography>
        <Title>{name}</Title>
        <Paragraph>{description}</Paragraph>
      </Typography>

      <Form form={formState} layout="vertical" style={{ maxWidth: "600px" }}>
        <Button
          size="small"
          style={{ marginBottom: "30px", fontSize: "75%" }}
          onClick={() => {
            formState.resetFields();

            forceUpdate();
          }}
        >
          Clear Form
        </Button>
        {form.map((item) => {
          if (item.type === "select") {
            return (
              <Form.Item key={item.key} name={item.name} label={item.label}>
                <Select
                  style={{ width: "100%" }}
                  size="large"
                  defaultValue={item.defaultOptions}
                  onChange={(e) => onSelectChange(e, item.name)}
                  name={item.name}
                  placeholder={item.placeholder}
                  options={item.options}
                />
              </Form.Item>
            );
          }

          if (item.type === "number") {
            return (
              <Form.Item key={item.key} name={item.name} label={item.label}>
                <InputNumber
                  style={{ width: "100%" }}
                  size="large"
                  onChange={(e) => onNumberChange(e, item.name)}
                  name={item.name}
                  placeholder={item.placeholder}
                  min={item.min}
                  max={item.max}
                />
              </Form.Item>
            );
          }

          if (item.type === "radio") {
            return (
              <Form.Item key={item.key} name={item.name} label={item.label}>
                <Radio.Group
                  onChange={(e) => onRadioChange(e, item.name)}
                  size="large"
                >
                  {item.options.map((radioItem) => (
                    <Radio.Button key={radioItem.value} value={radioItem.value}>
                      {radioItem.label}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            );
          }

          if (item.type === "checkbox") {
            return (
              <Form.Item key={item.key} name={item.name} label={item.label}>
                <CheckboxGroupWithAllOptions
                  key={item.key}
                  items={item.options}
                  onFormChange={(e) => onCheckboxChange(e, item.name)}
                />
              </Form.Item>
            );
          }

          return (
            <Form.Item key={item.key} name={item.name} label={item.label}>
              <Input
                size="large"
                onChange={onFormChange}
                name={item.name}
                placeholder={item.placeholder}
              />
            </Form.Item>
          );
        })}
      </Form>

      <Tooltip title="Copied!" trigger="click" placement="left">
        <Button type="text" onClick={() => copyText(renderedTemplate())}>
          <div
            style={{
              display: "block",
              wordBreak: "keep-all",
              whiteSpace: "initial",
              width: "565px",
              textAlign: "left",
            }}
          >
            {renderedTemplate()}
          </div>
        </Button>
      </Tooltip>
    </Layout>
  );
}
