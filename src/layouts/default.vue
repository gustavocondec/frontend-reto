<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="menu"
        />

        <q-toolbar-title>
          Sistemita de Registros
        </q-toolbar-title>

        <div v-show="isAuthenticated">
          <span  style="margin-right: 10px">Usuario: {{userName}}</span>
          |
          <span style="margin-left: 10px">Admnistador: {{isAdmin}}</span>
        </div>

      </q-toolbar>
    </q-header>

    <q-drawer
        v-if="isAuthenticated"
        v-model="leftDrawerOpen"
        bordered
        class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Links</q-item-label>
        <q-item clickable @click.prevent="$router.push('/member')">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Members</q-item-label>
          </q-item-section>
        </q-item>
        <q-item style="position: absolute; bottom: 0;width: 100%; color: red; font-weight: bold" clickable @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cerrar Sesion</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed } from 'vue'
import {useStore} from "vuex";
import {useRouter} from 'vue-router'
export default {
  name: 'default',

  setup () {
    const $store = useStore()
    const $router = useRouter()

    const userName = computed(()=>$store?.state?.auth?.user?.name||'User')
    const isAdmin = computed(()=>$store?.state?.auth?.user?.admin?'Si':'No')
    const isAuthenticated = computed(()=>$store.state.auth.isAuthenticated)

    const logout =()=>{
      $store.dispatch('auth/logout')
      $store.commit('member/SET_MEMBERS', [])
      $router.push('/login')
    }

    return {
      leftDrawerOpen: ref(false),
      userName, isAdmin, isAuthenticated,
      logout
    }
  }
}
</script>
