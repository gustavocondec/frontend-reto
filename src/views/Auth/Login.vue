<template>
  <div class="container__form">
      <q-card class="q-pa-md form__login">
        <p class="text-h5 text-center">Iniciar Sesion</p>
        <q-form ref="formLogin" @submit.prevent="login">
          <q-input data-test="username" v-model="username" label="Username" :rules="usernameRules"></q-input>
          <q-input data-test="password" v-model="password" label="Password" :rules="passwordRules" ></q-input>
          <div class="text-center"><q-btn data-test="button" type="submit" color="primary" label="Iniciar Sesion" :loading="isLoading"></q-btn></div>
        </q-form>
      </q-card>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {signin} from "@/views/Auth/auth-services";

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
        let response  = await signin(this.username, this.password)
        console.log('response', response)
        let {data:{token}} =  response
        if(!token) return this.$q.notify({type: 'negative', message:'No hay token'})
        this.$store.commit('auth/SET_ISAUTHENTICATED',true)
        await this.$store.dispatch('auth/setAuthHeaderRequest', token)
        await this.$store.dispatch('auth/getUserInfo')
        this.$q.notify({type:'positive',message:`Bienvenido(a) ${this.$store?.state?.auth?.user?.name}`})
        await this.$router.push('/home')
      }catch (e){
        //@ts-ignore
        let message = e?.response?.data?.message
        this.$q.notify({type:'negative',
          message:message|| 'Ocurrio un error'
        })
      }finally {
        this.isLoading = false
      }
    }
  }
})
</script>

<style scoped lang="sass">
.container__form
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  height: 90vh
.form__login
  width: 90%

@media only screen and (min-width: 600px)
  .form__login
    width: 60%

@media only screen and (min-width: 800px)
  .form__login
    width: 50%

@media only screen and (min-width: 1000px)
  .form__login
    width: 30%
</style>
