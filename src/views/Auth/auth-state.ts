import {setAuthHeader} from "@/views/Auth/auth-services";
import {IUser} from "@/views/shared/IUser";
import {getProfile} from "@/views/shared/user-services";

export interface authStateInterface{
  isAuthenticated: boolean,
  user:IUser|null
}

export const auth={
  namespaced: true,
  state:{
    isAuthenticated:false,
    user: null
  } as authStateInterface,
  mutations: {
    SET_ISAUTHENTICATED(state:authStateInterface,value:boolean){
      state.isAuthenticated = value
    },
    SET_USER(state:authStateInterface,value:IUser|null){
      state.user = value
    }
  },
  actions: {
    async logout(context:any){
      context.commit('SET_ISAUTHENTICATED', false)
      context.commit('SET_USER', null)
      await context.dispatch('setAuthHeaderRequest','')
    },
    setAuthHeaderRequest(context:any, token:string){
      setAuthHeader(token)
    },
    async getUserInfo(context:any){
      let response = await getProfile()
      let {uid,name,admin} = response.data
      context.commit('SET_USER', {uid,name,admin})
    }
  }
}
