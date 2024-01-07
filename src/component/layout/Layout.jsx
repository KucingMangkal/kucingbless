import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import templates from "../../constants/template";

const { Content, Sider } = Layout;

const items = templates.map((item) => ({
  key: item.url,
  label: <a href={item.url}>{item.name}</a>,
}));

function CustomLayout({ children }) {
  const router = useRouter();

  return (
    <Layout>
      <Sider>
        <Menu
          mode="vertical"
          defaultSelectedKeys={[router.asPath]}
          items={items}
          style={{ minHeight: "100vh", height: "100%" }}
        />
      </Sider>

      <Layout>
        <Content style={{ margin: "0 16px 30px" }}>
          <div
            style={{
              padding: 24,
              minHeight: "97vh",
              borderRadius: 5,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

CustomLayout.displayName = "CustomLayout";

export default CustomLayout;
