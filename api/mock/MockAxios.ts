import { AxiosResponse } from "axios"

export const axiosLikeResponse = async <T = unknown, D = any>(data:T)=>{
  return {
    data,          // so it looks like an axios response
    status: 200,        // optional
    statusText: 'OK',   // optional
    headers: {},        // optional
    config: {},         // optional
  } as AxiosResponse<T,D>
}