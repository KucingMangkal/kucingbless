import { ConfigProvider, theme } from "antd";

import "../styles/globals.css";

const { darkAlgorithm } = theme;

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm,
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
