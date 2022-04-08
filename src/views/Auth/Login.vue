<template>
  <div>
    <q-card class="q-pa-md">
      <q-form ref="formLogin" @submit.prevent="login">
        <q-input v-model="username" label="Username" :rules="usernameRules"></q-input>
        <q-input v-model="password" label="Password" :rules="passwordRules" ></q-input>
        <q-btn type="submit" label="Iniciar Sesion" :loading="isLoading"></q-btn>
      </q-form>
    </q-card>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {setAuthHeader, signin} from "@/views/Auth/auth-services";

export default defineComponent({
  name: "Login",
  data(){
    return {
      username: '',
      usernameRules: [(val: string)=>val&&val.length>0||'Debe ingresar username'],
      password: '',
      passwordRules: [(val: string)=>val&&val.length>0||'Debe ingresar password'],
      isLoading: false
    }
  },
  methods: {
    async login() {
      //@ts-ignore
      let isValidated = await this.$refs['formLogin'].validate()
      console.log('Is validate', isValidated)
      if(!isValidated) return ;
      this.isLoading = true
      try {
        let {data:{token}} = await signin(this.username, this.password)
        if(!token) return this.$q.notify({type: 'negative', message:'No hay token'})
        setAuthHeader(token)
        console.log('store', this.$store.commit('auth/SET_ISAUTHENTICATED',true))
        console.log('ingreso',token)
      }catch (e){
        this.$q.notify({type:'negative', message: 'Error'})
      }finally {
        this.isLoading = false
      }
    }
  }
})
</script>

<style scoped>

</style>
