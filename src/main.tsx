import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import './index.css'
import App from './App.tsx'
import { client } from './utils/apollo.ts'
import { ConfigProvider } from "antd-mobile";
import zhCn from 'antd-mobile/es/locales/zh-Cn'


createRoot(document.getElementById('root')!).render(

  <ConfigProvider locale={zhCn}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  </ConfigProvider>

)
