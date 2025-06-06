import './App.css'
import { useMutation, useQuery } from '@apollo/client'
import { FIND, UPDATE } from './graphql/demo'
import { useState } from 'react'
import { Button, Form, Input } from 'antd-mobile';

function App() {
  const [name, setName] = useState('');
  const [desc,setDesc] = useState('')
  
  const { loading, data } = useQuery(FIND, {
    variables: {
      id:'2000630e-4f1f-4d47-8bdc-bcf5b845a61a'
    }
  })

  const [update] = useMutation(UPDATE)
  // const onChangeNameHandler = (v: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(v.target.value);
  // }

  const onChangeNameHandler = (v: string) => {
    console.log('name',v);
    
    setName(v)
  }

  const onChangeDescHandler = (v: string) => {
     console.log('desc',v);
    setDesc(v) ;
  }

  const onClickHandle = (v: any) => {
    console.log(v,"????");
    update({
      variables: {
        id: '2000630e-4f1f-4d47-8bdc-bcf5b845a61a',
        params: {
          // id: '2000630e-4f1f-4d47-8bdc-bcf5b845a61a',
          ...v
        }
  }})
}


  return (<div><p>data:{JSON.stringify(data)}</p>
    <p>loading:{`${loading}`}</p>
    
    {/* <p>
      name:
      <input type="text" onChange={onChangeNameHandler} />
    </p>
      <p>
      desc:
      <input type="text" onChange={onChangeDescHandler} />
    </p> */} 
    <Form layout='horizontal'  onFinish={onClickHandle} footer={(<Button block type='submit' color='primary' size='large'>提交</Button>)}>
      <Form.Item name='name' label='姓名'
        rules={[{ required: true, message: '姓名不能为空' }]}>
          <Input onChange={onChangeNameHandler}/>
      </Form.Item>
            <Form.Item name='desc' label='描述'>
        <Input onChange={onChangeDescHandler} />
        </Form.Item>
    </Form>
    {/* <p><button onClick={onClickHandle}>更新</button></p> */}
  </div>)
}

export default App
