<template>
  <div>
    <q-card class="q-pa-md">
      <p class="text-h5 text-center">Crear Miembro</p>
      <q-form ref="formMember" @submit.prevent="createMember">
        <q-input label="First Name" v-model="firstName" :rules="firstNameRules"></q-input>
        <q-input label="Last Name" v-model="lastName" :rules="lastNameRules"></q-input>
        <q-input label="Address" v-model="address" :rules="addressRules"></q-input>
        <q-input label="SSN" v-model="ssn" :rules="ssnRules" mask="###-##-####" hint="###-##-####"></q-input>
        <br>
        <div class="my-buttons">
          <q-btn label="Reset" color="warning" @click.prevent="resetForm"></q-btn>
          <q-btn label="Save"  color="primary" :loading="isLoading" type="submit"></q-btn>
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {QForm} from "quasar";
import {postMember} from "@/views/Member/members-services";
import {useQuasar} from "quasar";
import {useStore} from "vuex";
import {IMember} from "@/views/Member/shared/IMember";

export default defineComponent({
  name: "formMember",
  setup(){
    let $q = useQuasar()
    let $store = useStore()

    let firstName= ref('')
    let lastName = ref('')
    let address = ref('')
    let ssn= ref('')

    const formMember = ref<null| QForm>(null)

    let firstNameRules = [(val: string)=>val&&val.length>0||'Debe ingresar First name']
    let lastNameRules = [(val: string)=>val&&val.length>0||'Debe ingresar Last Name']
    let addressRules = [(val: string)=>val&&val.length>0||'Debe ingresar Address']
    let ssnRules = [(val: string)=>!!val||'Debe ingresar SSN'
      , (val:string)=>val.length==11||'SSN consta de 9 numeros']

    let isLoading = ref(false)

    const resetForm = ()=>{
      firstName.value=''
      lastName.value=''
      address.value=''
      ssn.value=''
      formMember.value?.reset()
    }

    const createMember = async ()=>{
      try {
        isLoading.value = true
        let successForm = await formMember.value?.validate()
        console.log('hola', successForm)

        if(!successForm) return;

        let payload:IMember ={
          firstName: firstName.value.trim(),
          lastName: lastName.value.trim(),
          address: address.value.trim(),
          ssn: ssn.value.trim()
        }

        await postMember(payload)

        $store.commit('member/ADD_MEMBER', payload)

        $q.notify({type:'positive', message:'Se creo miembro'})
        resetForm()
      }catch (e) {
        //@ts-ignore
        let message = e?.response?.data?.message
        $q.notify({type:'negative',
          message: message||'Ocurrio un error'
        })
      }
      finally {
        isLoading.value = false
      }
    }


    return{
      formMember,

      firstName,
      lastName,
      address,
      ssn,

      firstNameRules,
      lastNameRules,
      addressRules,
      ssnRules,

      isLoading,

      resetForm,
      createMember
    }
  }
})

</script>

<style lang="sass" scoped>
.my-buttons
  display: flex
  flex-direction: row
  justify-content: space-around
</style>
