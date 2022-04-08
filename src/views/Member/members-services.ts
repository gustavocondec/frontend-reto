import axios from "axios";
import {IMember} from "@/views/Member/shared/IMember";
const URL = `${process.env.VUE_APP_API}/api/members`

export const getMembers = async ()=>{
  return await axios.get(URL)
}

export const postMember = async (data: IMember)=>{
  return await axios.post(URL,data)
}
