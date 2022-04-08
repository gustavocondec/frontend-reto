<template>
<q-card>
  <q-form ref="formMember" @submit.prevent="createMember">
    <q-input label="First Name" v-model="firstName" :rules="firstNameRules"></q-input>
    <q-input label="Last Name" v-model="lastName" :rules="lastNameRules"></q-input>
    <q-input label="Address" v-model="address" :rules="addressRules"></q-input>
    <div>{{ssn}}</div>
    <q-input label="SSN" v-model="ssn" :rules="ssnRules" mask="###-##-####" hint="###-##-####"></q-input>
    <div class="my-buttons">
      <q-btn label="Reset" @click.prevent="reset"></q-btn>
      <q-btn label="Save" type="submit"></q-btn>
    </div>
  </q-form>
</q-card>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {QForm} from "quasar";
import {postMember} from "@/views/shared/members-services";
import {useQuasar} from "quasar";

export default defineComponent({
  name: "Home",
  setup(){
    let $q = useQuasar()
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

    const reset = ()=>{
      formMember.value?.reset()
    }

    const createMember = async ()=>{
      try {
        isLoading.value = true
        let successForm = await formMember.value?.validate()
        console.log('hola', successForm)

        if(!successForm) return;

        let response = await postMember(firstName.value.trim(), lastName.value.trim(),address.value.trim(), ssn.value)
        $q.notify({type:'positive', message:'Se creo miembro'})
      }catch (e) {
        console.log('error', e)
        $q.notify({type:'negative',message:String(e)})
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

      reset,
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
