<template>
  <v-app>

  <!-- メニューバーここから -->
  <v-app-bar color="primary" dark app clipped-left>
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text @click="logout">Logout&nbsp;<v-icon>mdi-open-in-new</v-icon></v-btn>
    </v-toolbar-items>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
  >
    <v-list dense nav>
      <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name" :href="nav_list.url">
        <v-list-item-icon>
          <v-icon>{{ nav_list.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

    <v-main>
      <h3 class="display-2 mb-3 text-center">
        admin
      </h3>
    </v-main>

    <v-footer color="primary" dark app>
      <small class="py-2 white--text text-center">
        © 2023 Eri Imanishi
      </small>
    </v-footer>
  </v-app>
</template>

<script>
import { projectAuth } from '../../firebase/config.js'

export default {
  data () {
    return {
      isAuthenticated: false,
      drawer: false,
      error: null,
      nav_lists:[
        {
          name: 'HOME',
          icon: 'mdi-home',
          url: '/'
        },
        {
          name: 'RESERVE',
          icon: 'mdi-calendar-account',
          url: '/reserve'
        }
      ]
    }
  },
    // authの状態を設定する3/3
  created() {
    projectAuth.onAuthStateChanged(user => {
      if(user) {
        this.isAuthenticated = true
      } else {
        this.$router.push('/')
      }
    })
  },
  methods: {
    logout() {
      projectAuth.signOut()
      .then(() => {
        this.isAuthenticated = false
        this.$router.push('/login')
      })
    }
  }
}
</script>
