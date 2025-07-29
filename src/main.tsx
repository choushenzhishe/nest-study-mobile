import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import './index.css'
import { client } from './utils/apollo.ts'
import { ConfigProvider } from "antd-mobile";
import zhCn from 'antd-mobile/es/locales/zh-Cn'
import UserInfo from './components/UserInfo/index.tsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {routes}from './routes'
import Login from './pages/login/index.tsx'


createRoot(document.getElementById('root')!).render(

  <ConfigProvider locale={zhCn}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserInfo>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/'>
            {routes.map((route) => (
              <Route key={route.key} path={route.path} element={route.element()} />
            ))}
            </Route>
          </Routes>
        </UserInfo>
      </BrowserRouter>
    </ApolloProvider>,
  </ConfigProvider>

)
