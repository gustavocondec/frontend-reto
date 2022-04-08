
export interface authStateInterface{
  isAuthenticated: boolean
}

export const auth={
  namespaced: true,
  state:{
    isAuthenticated:false
  },
  mutations: {
    SET_ISAUTHENTICATED(state:authStateInterface,value:boolean){
      state.isAuthenticated = value
    }
  }
}
