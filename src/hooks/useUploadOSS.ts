import { useQuery } from "@apollo/client"
import { GET_OSS_INFO } from "../graphql/oss"

export const useUploadOSS = () => {
    // 1,获取签名信息
    // 2.feach post 请求把参数传输到服务端
    const { data:d } = useQuery(GET_OSS_INFO)
    const uploadHandler = async (file: File) => {
        const data = d.getOSSInfo;       
        console.log('data,',data);
        
        const formData = new FormData()
        const key = `images/${file.name}`
        formData.append("success_action_statuss", "200");
        formData.append("policy", data.policy);
        formData.append("x-oss-signature", data.signature);
        formData.append("x-oss-signature-version", "OSS4-HMAC-SHA256");
        formData.append("x-oss-credential", data.x_oss_credential);
        formData.append("x-oss-date", data.x_oss_date);
        formData.append("key", data.dir + file.name); // 文件名
        formData.append("x-oss-security-token", data.security_token);
        formData.append("file", file); 
        const res = await fetch(data.host, {
            method: "POST",
            body:formData
        })
        console.log('res',res);
        return {url: res.url + key}
    }

   return {uploadHandler}
}