import { useState, useEffect } from 'react';
import { connect, useGetUserInfo, useUserContext } from '../../hooks/useUserHook';
// import { Spin } from 'antd';


/**
*
*/
const UserInfo = ({children }:IPropChild) => {
    const { loading } = useGetUserInfo()
    
    return  <div>{children}</div>;
};

export default connect(UserInfo) ;
