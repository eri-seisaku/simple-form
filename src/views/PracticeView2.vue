<template>
  <v-app style="background-color:#f3f3f3;">
    <v-container fill-height>
      <v-row class="text-center">
        <v-col cols="12">
          <!-- <v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            height="100"
          /> -->
          <h3 class="display-2 mb-3">
            新規登録
          </h3>
          <v-card width="400px" class="mx-auto mt-5">
            <v-card-text>
              <v-form @submit.prevent="registerUser">
                <!-- <v-text-field 
                  prepend-icon="mdi-account-circle" 
                  label="ユーザ名" 
                  v-model="name" 
                /> -->
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
                  <v-btn class="info">登録</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { projectAuth } from '../firebase/config.js'


export default {
  name: 'App',
  data(){
    return {
      showPassword : false,
      email:'',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password:'',
    }
  },
  methods:{
    registerUser(){
      projectAuth.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    },
  }
};
</script>

<style>

</style>
