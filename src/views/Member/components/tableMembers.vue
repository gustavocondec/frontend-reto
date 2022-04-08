<template>
  <div>
    <q-card class="q-pa-md">
      <p class="text-h5 text-center">Lista de Miembros</p>
      <q-table
          title="Members"
          :rows="rows"
          :columns="columns"
          row-key="ssn"
      >
      </q-table>
    </q-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref ,computed, onMounted} from "vue";
import {useQuasar} from "quasar";
import {useStore} from "vuex";
export default defineComponent({
  name: "tableMembers",
  setup(){
    const $q = useQuasar()
    const $store = useStore()

    const columns = ref([
      {
        name: 'firstName',
        label: 'First Name',
        field: (row: { firstName: any; })=>row.firstName,
        sorteable: true
      },
      {
        name: 'lastName',
        label: 'Last Name',
        field: (row: { lastName: any; })=>row.lastName,
        sorteable: true
      },
      {
        name: 'address',
        label: 'Address',
        field: (row: { address: any; }) => row.address,
        sorteable: true
      },
      {
        name: 'ssn',
        label: 'Ssn',
        field: (row: { ssn: any; }) => row.ssn
      }
    ])
    const rows = computed(()=>$store.state.member.members)

    const loadTable = async ()=>{
      try{
        await $store.dispatch('member/loadDataFromApi')
        $q.notify({type:'positive', message:'Se cargo lista desde la API'})

      }catch (e) {
        $q.notify({type:'negative', message:'Ocurrio un error al cargar la lista de miembros desde la api'})
      }
    }

    onMounted(()=>{
      loadTable()
    })

    return {
      columns,
      rows
    }
  }
})
</script>

<style scoped>

</style>
