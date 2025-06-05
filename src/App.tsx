import './App.css'
import { useMutation, useQuery } from '@apollo/client'
import { FIND, UPDATE } from './graphql/demo'
import { useState } from 'react'

function App() {
  const [name, setName] = useState('');
  const [desc,setDesc] = useState('')
  
  const { loading, data } = useQuery(FIND, {
    variables: {
      id:'2000630e-4f1f-4d47-8bdc-bcf5b845a61a'
    }
  })

  const [update] = useMutation(UPDATE)
  const onChangeNameHandler = (v: React.ChangeEvent<HTMLInputElement>) => {
    setName(v.target.value);
  }

  const onChangeDescHandler =  (v: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(v.target.value);
  }

  const onClickHandle = () => {
    update({
      variables: {
        id: '2000630e-4f1f-4d47-8bdc-bcf5b845a61a',
        params: {
          id: '2000630e-4f1f-4d47-8bdc-bcf5b845a61a',
          name,
          desc,
        }
  }})
}


  return (<div><p>data:{JSON.stringify(data)}</p>
    <p>loading:{`${loading}`}</p>
    
    <p>
      name:
      <input type="text" onChange={onChangeNameHandler} />
    </p>
      <p>
      desc:
      <input type="text" onChange={onChangeDescHandler} />
    </p>
    <p><button onClick={onClickHandle}>更新</button></p>
  </div>)
}

export default App
