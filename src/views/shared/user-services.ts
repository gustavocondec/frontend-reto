import axios from 'axios'

const URL = `${process.env.VUE_APP_API}/user`

export const getProfile = async ()=>{
  return await axios.get(URL)
}
