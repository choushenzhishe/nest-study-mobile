import React, { useState } from 'react';
import { Form, Input, Button, Toast, Space, Checkbox } from 'antd-mobile';
import { useMutation } from '@apollo/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LOGIN_BY_ACCOUNT } from '../../graphql/user';
import { AUTH_TOKEN } from '../../utils/constants';
import { useUserContext } from '../../hooks/useUserHook';
import './index.css';

type LoginType = 'account';

interface IValues {
  password?: string;
  account?: string;
  autoLogin?: boolean;
}

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { store } = useUserContext();
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [loginByAccount] = useMutation(LOGIN_BY_ACCOUNT);

  const loginHandler = async (values: IValues) => {
    setLoading(true);
    try {
      const res = await loginByAccount({ variables: values });
      console.log('🚀 ~ file: index.tsx ~ line 31 ~ ', res);
      if (res.data.loginByAccount.code === 200) {


        if (values.autoLogin) {
          localStorage.setItem(AUTH_TOKEN, res.data.loginByAccount.data);
        }
        sessionStorage.setItem(AUTH_TOKEN, res.data.loginByAccount.data);
        navigate(params.get('orgPath') || '/');
        return;
      }

    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img 
          src="https://chou-nest-study.oss-cn-shenzhen.aliyuncs.com/user-dirhenglogo%402x.png" 
          alt="Logo" 
          className="login-logo"
        />
        <h1 className="login-title">欢迎登录</h1>
      </div>
      
      <Form
        form={form}
        onFinish={loginHandler}
        footer={
          <Button 
            block 
            type='submit' 
            color='primary' 
            size='large'
            loading={loading}
          >
            登录
          </Button>
        }
      >
        <Form.Item
          name="account"
          label="账号"
          rules={[
            {
              required: true,
              message: '请输入账号！',
            },
          ]}
        >
          <Input placeholder="请输入账号" clearable />
        </Form.Item>
        
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        >
          <Input type="password" placeholder="请输入密码" clearable />
        </Form.Item>
        
        <Form.Item name="autoLogin" childElementPosition="right">
          <Checkbox>自动登录</Checkbox>
        </Form.Item>
      </Form>
      
      <div className="login-footer">
        <Space>
          <a onClick={() => navigate('/register')}>注册账号</a>
          <a>忘记密码</a>
        </Space>
      </div>
    </div>
  );
}