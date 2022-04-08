import axios from "axios";
const URL = `${process.env.VUE_APP_API}/api/members`

export const getMembers = async ()=>{
  return await axios.get(URL)
}

export const postMember = async (firstName:string,lastName:string,address:string,ssn:string)=>{
  console.log('envia', firstName, lastName, address, ssn)
  return await axios.post(URL,{
    firstName,
    lastName,
    address,
    ssn
  })
}
