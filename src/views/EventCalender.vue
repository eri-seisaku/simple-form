<template>
  <v-card
    class="mx-auto overflow-hidden"
  >
  <!-- メニューバーここから -->
    <v-app-bar
      color="#008B93"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>予約フォーム</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
        <!-- Home -->
          <a href="/">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
          </a>
        <!-- Result -->
          <a href="/result">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Result</v-list-item-title>
            </v-list-item>
          </a>

        <!-- Practice -->
        <a href="/practice">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Practice</v-list-item-title>
          </v-list-item>
        </a>

        <!-- EventCalender -->
        <a href="/calender">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-alert-decagram</v-icon>
            </v-list-item-icon>
            <v-list-item-title>EventCalender</v-list-item-title>
          </v-list-item>
        </a>


        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  <!-- メニューバーここまで -->

  </v-card>
</template>


<script>
import { db } from '../firebase/config'

  export default {
    data () {
      return {
        drawer: false,
        group: null,
        items: [],
        arrayEvents: null,
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      }
    },
    mounted () {
      this.arrayEvents = [...Array(6)].map(() => {
        const day = Math.floor(Math.random() * 30)
        const d = new Date()
        d.setDate(day)
        return d.toISOString().substr(0, 10)
      })
    },
    created() { // createdではDOMが作成されていないタイミング
      this.getData();
    },
    methods: {
      functionEvents (date) {
        const [,, day] = date.split('-')
        if ([12, 17, 28].includes(parseInt(day, 10))) return true
        if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
        return false
      },
      getData(){
        db.collection("userMessages").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            this.items.push(doc.data()); // dbの値を配列に追加している
          })
        });
      }
    }
  }
</script>



