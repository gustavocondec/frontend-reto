import {IMember} from "@/views/Member/shared/IMember";
import {getMembers} from "@/views/Member/members-services";

export interface memberStateInterface{
  members: Array<IMember>
}

export const member = {
  namespaced:true,
  state: {
    members: []
  },
  mutations: {
    SET_MEMBERS(state:memberStateInterface, value: Array<IMember>){
      state.members = value
    },
    ADD_MEMBER(state:memberStateInterface,value:IMember){
      state.members.push(value)
    }
  },
  actions:{
    async loadDataFromApi(context:any){
      let response = await getMembers()
      console.log('load table',response.data)
      context.commit('SET_MEMBERS', response.data)
    }
  }
}
