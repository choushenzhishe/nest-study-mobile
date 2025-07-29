import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Toast,
  Card,
  Avatar,
  Space,
  ImageUploader,
  NavBar,
} from 'antd-mobile';
import { useMutation } from '@apollo/client';
import { useUserContext } from '../../hooks/useUserHook';
import { UPDATE_USER } from '../../graphql/user';
import { useUploadOSS } from '../../hooks/useUploadOSS';
import './index.css';

interface IFormValues {
  name: string;
  desc: string;
  avatar?: string;
}

const My: React.FC = () => {
  const [form] = Form.useForm();
  const { store, setStore } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const { uploadHandler } = useUploadOSS();

  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (store.name || store.tel || store.desc || store.avatar) {
      form.setFieldsValue({
        name: store.name || '',
        desc: store.desc || '',
      });
      setAvatarUrl(store.avatar || '');
    }
  }, [store, form]);

  const handleSubmit = async (values: IFormValues) => {
    setLoading(true);
    try {
      const res = await updateUser({
        variables: {
          id: store.id,
          params: {
            name: values.name,
            desc: values.desc,
            avatar: avatarUrl,
          },
        },
      });

      if (res.data.updateUser.code === 200) {
        // 立即更新本地store状态
        setStore({
          ...store,
          name: values.name,
          desc: values.desc,
          avatar: avatarUrl,
        });
        
        // 延迟刷新获取服务器最新数据
        setTimeout(() => {
          store.refreshHandler?.();
        }, 100);

      } 
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    try {
      const result = await uploadHandler(file);
      setAvatarUrl(result.url);
      return result;
    } catch (error) {

      throw error;
    }
  };

  return (
    <div className="my-container">
      <NavBar back={null}>个人信息</NavBar>
      
      <div className="my-content">
        <Card className="avatar-card">
          <div className="avatar-section">
            <Avatar
              src={avatarUrl}
              style={{
                '--size': '80px',
                '--border-radius': '50%',
              }}
            />
            <div className="avatar-upload">
              <ImageUploader
                value={avatarUrl ? [{ url: avatarUrl }] : []}
                upload={handleAvatarUpload}
                maxCount={1}
                onDelete={() => setAvatarUrl('')}
              >
                <div className="upload-button">
                  {avatarUrl ? '更换头像' : '上传头像'}
                </div>
              </ImageUploader>
            </div>
          </div>
        </Card>

        <Card className="form-card">
          <Form
            form={form}
            onFinish={handleSubmit}
            footer={
              <Button
                block
                type="submit"
                color="primary"
                size="large"
                loading={loading}
              >
                保存修改
              </Button>
            }
          >
            <Form.Item
              name="tel"
              label="手机号"
              disabled
            >
              <Input
                placeholder="手机号"
                value={store.tel || ''}
                disabled
                style={{ color: '#999' }}
              />
            </Form.Item>

            <Form.Item
              name="name"
              label="昵称"
              rules={[
                {
                  required: true,
                  message: '请输入昵称',
                },
              ]}
            >
              <Input placeholder="请输入昵称" clearable />
            </Form.Item>

            <Form.Item
              name="desc"
              label="个人简介"
            >
              <Input
                placeholder="请输入个人简介"
                clearable
              />
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default My;