import { Button, Tooltip, Typography } from "antd";
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

export default function Generator({ resolvedUrl }) {
  const { name, description, specialPageCommonCopyPaste } = templates.filter(
    (item) => item.url === resolvedUrl,
  )[0];

  return (
    <Layout>
      <Typography>
        <Title>{name}</Title>
        <Paragraph>{description}</Paragraph>
      </Typography>

      {specialPageCommonCopyPaste.map((item, index) => (
        <Tooltip
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          title="Copied!"
          trigger="click"
          placement="left"
        >
          <Button type="text" onClick={() => copyText(item)}>
            {item}
          </Button>
          <br />
        </Tooltip>
      ))}
    </Layout>
  );
}
