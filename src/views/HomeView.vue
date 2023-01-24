<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        Title
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/about" class="navbar-item">About</router-link>
            <!-- viewsにコンポーネントを追加したら最後にrouter-linkを設定などする -->
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <!-- ログインしていないときのみ表示 -->
            <h2>ログインしてください</h2>
            <div class="field is-grouped" v-if="!isAuthenticated">
              <p class="control">
              <router-link to="/signup" class="button is-primary">アカウントを作成</router-link>
              </p>
              <p class="control">
              <router-link to="/login" class="button is-info">ログイン</router-link>
              </p>
            </div>
            <div class="field" v-else>
              <p class="control">
                <button class="button is-danger" @click="logout">ログアウト</button>
              </p>
            </div>
          </div>
      </div>
     </div>
    </nav>

  <router-view/>
  </div>
</template>

<script>
import { projectAuth } from '../firebase/config.js'

export default {
  data () {
    return {
      isAuthenticated: false
    }
  },
    // authの状態を設定する3/3
  created() {
    projectAuth.onAuthStateChanged(user => {
      if(user) {
        this.isAuthenticated = true
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

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
