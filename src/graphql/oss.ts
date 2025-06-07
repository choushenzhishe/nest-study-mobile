import { gql, useQuery } from "@apollo/client";

export const GET_OSS_INFO = gql`
    query getOSSInfo {
        getOSSInfo{
        policy,
        signature,
        x_oss_date,
        host,
        x_oss_signature_version,
        x_oss_credential,
        dir,
        security_token,
    }
}
`