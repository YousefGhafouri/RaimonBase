import { AxiosResponse } from "axios";

interface DemoStoreActions {
  getDemo:(inp:number)=>Promise<AxiosResponse<any, any>>
  getDemos:()=>Promise<AxiosResponse<any, any>>
  getFilteredDemos:(inp:any)=>Promise<AxiosResponse<any, any>>
  addDemo:(inp:any)=>Promise<AxiosResponse<any, any>>
  editDemo:(inp:any)=>Promise<AxiosResponse<any, any>>
  deleteDemo:(inp:number)=>Promise<AxiosResponse<any, any>>
}

export interface DemoStoreState extends DemoStoreActions {
}