import axios from 'axios'
const URL = `${process.env.VUE_APP_API}/auth`

export const signin  =async (username='',password='')=>{
  return await axios.post(URL, {username,password})
}

export const setAuthHeader = (token:string)=>{
  if(token) axios.defaults.headers.common.Authorization = `Bearer ${token}`
  else axios.defaults.headers.common.Authorization = ''

}
