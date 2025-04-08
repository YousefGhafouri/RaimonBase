import { axiosLikeResponse } from "@Base/api/mock/MockAxios"

export const mockApiLikeResponse = async <T = unknown>(data:T)=>{
  return await axiosLikeResponse({data,message:"success"})
}