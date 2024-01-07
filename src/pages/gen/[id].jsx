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
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
      <Checkbox.Group options={items} value={checkedList} onChange={onChange} />

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
  const router = useRouter();
  const [formValue, setFormValue] = useState({});
  const { form, template, name, description } = templates.filter(
    (item) => item.url === resolvedUrl,
  )[0];

  // Reset count to 0 on dynamic route change.
  useEffect(() => setFormValue({}), [router.asPath]);

  const onFormChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const onSelectChange = (value, formName) => {
    setFormValue({
      ...formValue,
      [formName]: value,
    });
  };

  const onNumberChange = (value, formName) => {
    setFormValue({
      ...formValue,
      [formName]: value,
    });
  };

  const onRadioChange = (e, formName) => {
    setFormValue({
      ...formValue,
      [formName]: e.target.value,
    });
  };

  const onCheckboxChange = (value, formName) => {
    setFormValue({
      ...formValue,
      [formName]: value,
    });
  };

  const renderedTemplate = formValue && template(formValue, form);

  return (
    <Layout>
      <Typography>
        <Title>{name}</Title>
        <Paragraph>{description}</Paragraph>
      </Typography>

      <Form autoComplete="off" layout="vertical">
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
              <CheckboxGroupWithAllOptions
                key={item.key}
                items={item.options}
                onFormChange={(e) => onCheckboxChange(e, item.name)}
              />
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
        <Button type="text" onClick={() => copyText(renderedTemplate)}>
          {renderedTemplate}
        </Button>
      </Tooltip>
    </Layout>
  );
}
