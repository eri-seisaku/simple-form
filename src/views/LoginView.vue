<template>
  <v-app>

  <!-- メニューバーここから -->
  <v-app-bar color="primary" dark app clipped-left>
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text href="/signup">Signup&nbsp;<v-icon>mdi-open-in-new</v-icon></v-btn>
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
        ログイン
      </h3>
      <v-card width="400px" class="mx-auto mt-5">
        <v-card-text>
          <v-form @submit.prevent>
            <v-text-field
              prepend-icon="mdi-email" 
              :rules="emailRules"
              label="メールアドレス"
              id="email"
              v-model="email"
            ></v-text-field>
            <v-text-field 
              v-bind:type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              prepend-icon="mdi-lock" 
              v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="パスワード"
              id="password"
              v-model="password"
            /> 
              <v-btn class="info" @click="login">ログイン</v-btn>
    
              <article class="message is-danger" v-if="error">
                <div class="message-body">
                  {{ error }}
                </div>
              </article>
    
          </v-form>
        </v-card-text>
      </v-card>
    </v-main>

    <v-footer color="primary" dark app>
      <small class="py-2 white--text text-center">
        © 2023 Eri Imanishi
      </small>
    </v-footer>
  </v-app>
</template>

<script>
import { projectAuth } from '../firebase/config.js'

export default {
  name: 'Login',
  data (){
    return {
      drawer: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      showPassword : false,
      isAuthenticated: false,
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
  created() {
    projectAuth.onAuthStateChanged(user => {
      if(user) {
        this.isAuthenticated = true
        this.$router.push('/admin')
      }
    })
  },
  methods: {
    login () {
      projectAuth.signInWithEmailAndPassword(this.email, this.password)
      .catch(err => this.error = err.message)
    },
    logout() {
      projectAuth.signOut()
      .then(() => {
        this.isAuthenticated = false
      })
    }
  }
}
</script>
