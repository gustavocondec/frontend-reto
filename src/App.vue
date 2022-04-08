<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      counter:null
    }
  },
  computed:{
    isAuthenticated(){
      return this.$store.state.auth?.isAuthenticated
    }
  },
  created() {
    window.onload=()=>{
      this.resetTimer()
    }
    window.onmousemove=()=>{
      this.resetTimer()
    }
    window.onmousedown=()=>{
      this.resetTimer()
    }
    window.onkeypress=()=>{
      this.resetTimer()
    }
  },
  methods:{
    resetTimer(){
      if(this.counter) clearTimeout(this.counter)
      if(this.isAuthenticated){
        this.counter=setInterval(async ()=>{
          await this.loadTable()
          }, 120000)
      }
    },
    async loadTable() {
      try{
        await this.$store.dispatch('member/loadDataFromApi')
        this.$q.notify({type:'positive', message:'Se cargo lista desde la API'})

      }catch (e) {
        this.$q.notify({type:'negative', message:'Ocurrio un error al cargar la lista de miembros desde la api'})
      }
    }
  }
}
</script>
