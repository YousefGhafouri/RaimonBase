import { tempBaseUrl } from "@api/constant/apiBase";
import { DemoStoreState } from "./type";
import axios from "axios";
import { createStore } from "zustand";

export const createDemoStore = (initial?:Partial<DemoStoreState>)=>createStore<DemoStoreState>(()=>({
  ...initial,
  getDemo:async(inp)=>{
    return axios.get(`${tempBaseUrl}/api/demos/`+inp)
  },
  getDemos:async()=>{
    return axios.get(`${tempBaseUrl}/api/demos`)
  },
  getFilteredDemos:async(inp:any)=>{
    return axios.post(`${tempBaseUrl}/api/demos`,inp)
  },
  addDemo:async(inp)=>{
    return axios.post(`${tempBaseUrl}/api/demos/create`,inp)
  },
  editDemo:async(inp)=>{
    return axios.patch(`${tempBaseUrl}/api/demos/`+inp.id,inp)
  },
  deleteDemo:async(inp)=>{
    return axios.delete(`${tempBaseUrl}/api/demos/`+inp)
  }
}))