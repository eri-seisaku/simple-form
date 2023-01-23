<template>
  <v-card
    class="mx-auto overflow-hidden"
    max-width="800"
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
          <router-link to="/signin">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
          </router-link>
        <!-- Result -->
          <router-link href="/result">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Result</v-list-item-title>
            </v-list-item>
          </router-link>

        <!-- Practice -->
        <router-link href="/practice">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Practice</v-list-item-title>
          </v-list-item>
        </router-link>

        <!-- EventCalender -->
        <router-link href="/calender">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-alert-decagram</v-icon>
            </v-list-item-icon>
            <v-list-item-title>EventCalender</v-list-item-title>
          </v-list-item>
        </router-link>


        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  <!-- メニューバーここまで -->
    <form @submit.prevent="handleSubmit">
      <v-container>
        <v-row dense>
          <!-- 希望日 -->
          <v-col cols="12">
            <v-card>
              <!-- タイトル -->
              <v-card-title class="text-h5">
                ご希望日の選択<span class="required" id="i29" aria-label="必須の質問"> *</span>
              </v-card-title>
              <!-- サブタイトル -->
              <v-card-subtitle>ご希望の日を選択してください</v-card-subtitle>
              <!-- 区切り線 -->
              <v-divider class="mx-4"></v-divider>
              <!-- カレンダー -->
              <v-card-actions>
                <v-date-picker
                  v-model="dates"
                  single
                  no-title
                  locale="jp-ja"
                  :day-format="date => new Date(date).getDate()"
                ></v-date-picker>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- 施設・時間 -->
          <v-col cols="12">
            <v-card>
              <!-- タイトル -->
              <v-card-title class="text-h5">
                施設・時間の選択<span class="required" id="i29" aria-label="必須の質問"> *</span>
              </v-card-title>
              <!-- サブタイトル -->
              <v-card-subtitle>ご希望の施設、時間、人数を選択してください</v-card-subtitle>
              <!-- 区切り線 -->
              <v-divider class="mx-4"></v-divider>
              <!-- コンテンツ -->
              <v-container fluid>
                <v-row dense>
                  <v-col
                    v-for="card in cards"
                    :key="card.title"
                    sm="12"
                    md="6"
                  >
                    <v-card>
                      <!-- image -->
                      <v-img
                        :src="card.src"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="200px"
                      >
                        <v-card-title v-text="card.title"></v-card-title>
                      </v-img>

                      <v-card-actions>
                      <!-- checkbox -->
                        <v-checkbox
                          v-model="selectTitle"
                          :value="card.title"
                        ></v-checkbox>

                      <!-- selectTime 修正する必要あり -->
                      <v-select
                        v-model="selectTime"
                        :value="card.time"
                        :items="card.time"
                        :rules="[v => !!v || '選択してください']"
                        label="開始時間"
                        required
                      ></v-select>

                      <!-- selectUse 修正する必要あり -->
                      <v-select
                        v-model="selectUse"
                        :value="card.use"
                        :items="card.use"
                        :rules="[v => !!v || '選択してください']"
                        label="利用時間"
                        required
                      ></v-select>

                      <!-- selectPerson 修正する必要あり -->
                      <v-select
                        v-model="selectPerson"
                        :items="card.person"
                        :rules="[v => !!v || '選択してください']"
                        label="利用人数"
                        required
                      ></v-select>

                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>


          <!-- お客様情報入力 -->
          <v-col cols="12">
            <v-card>
              <!-- タイトル -->
              <v-card-title class="text-h5">
                お客様情報入力<span class="required" id="i29" aria-label="必須の質問"> *</span>
              </v-card-title>
              <!-- サブタイトル -->
              <v-card-subtitle>お客様情報入力してください</v-card-subtitle>
              <!-- 区切り線 -->
              <v-divider class="mx-4"></v-divider>
              <!-- フォーム -->
              <v-card-actions>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <!-- 名前 -->
                  <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    label="お名前"
                    required
                  ></v-text-field>
                  <!-- 電話番号 -->
                  <v-text-field
                    v-model="phone"
                    :counter="7"
                    :error-messages="errors"
                    label="電話番号"
                    required
                  ></v-text-field>
                  <!-- メールアドレス -->
                  <v-text-field
                    v-model.trim="email"
                    :rules="emailRules"
                    label="メールアドレス"
                    required
                  ></v-text-field>
                  <!-- 利用規約 -->
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || '同意するにチェックを入れてください']"
                    label="利用規約に同意する"
                    required
                  ></v-checkbox>
                  <!-- 送信ボタン -->
                  <v-btn
                    color="primary"
                    class="mr-4"
                    type="submit"
                    :disabled="invalid"
                    @click.prevent="snackbar = true"
                  >
                    送信
                  </v-btn>
                  <!-- ページ移動
                  <v-btn
                    color="primary"
                    class="mr-4"
                    type="submit"
                    :disabled="invalid"
                    @click="moveNextScreen"
                  >
                    送信
                  </v-btn>
                  -->
                </v-form>
              </v-card-actions>
            </v-card>
            <v-snackbar
              v-model="snackbar"
              color="#008B93"
              bottom
              :timeout="6000"
            >
              {{ text }}

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="#fff"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>
          </v-col>

          <!-- v-model確認用 -->
          <v-col cols="12">
            <v-card>
              <v-card-text>
                <h2>v-modelの値</h2>
                <P>ご希望日: {{ dates }}</P>
                <P>ご希望施設: {{ selectTitle }}</P>
                <P>ご希望施設: {{ selectTime }}</P>
                <P>ご希望時間: {{ selectUse }}</P>
                <P>ご利用人数: {{ selectPerson }}</P>
                <P>お名前: {{ name }}</P>
                <P>メールアドレス: {{ email }}</P>
              </v-card-text>
            </v-card>
          </v-col>
          
        </v-row>
      </v-container>
  </form>
  </v-card>

</template>

<script>
// import { db } from '../firebase/config'

  export default {
      data () {
        return {
          drawer: false,
          group: null,
          dates: '',
          snackbar: false,
          text: `送信されました`,
          /*
          selectTime: '',
          items: [
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
          ],*/
          /*
          selectPerson: '',
          persons: [
            '1人',
            '2人',
            '3人',
            '4人'
          ],*/
          name: '',
          nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || '名前は 10 文字未満にする必要があります',
          ],
          phone: '',
          email: '',
          emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'メールアドレスを入力してください',
          ],
          cards: [
            { 
              title: 'Log house A', 
              src: require('../../assets/area_a.jpg'), 
              time: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
              use: ['1時間', '2時間', '1DAY'],
              person: ['1人', '2人', '3人', '4人']
            },
            { 
              title: 'Log house B', 
              src: require('../../assets/area_b.jpg'), 
              time: ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'],
              use: ['1時間', '2時間', '1DAY'],
              person: ['1人', '2人', '3人', '4人']
            },
            { 
              title: 'Free camp site', 
              src: require('../../assets/area_c.jpg'), 
              time: ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'],
              use: ['1時間', '2時間', '1DAY'],
              person: ['1人', '2人', '3人', '4人']
            },
            { 
              title: 'Tree house', 
              src: require('../../assets/area_d.jpg'), 
              time: ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'],
              use: ['1時間', '2時間', '1DAY'],
              person: ['1人', '2人', '3人']
            },
          ],
          selectTitle: [],
          selectTime: [],
          selectUse: '',
          selectPerson: ''
        }
      },
      methods: {
        /*moveNextScreen: function () {
          this.$router.push('/admin')
          console.log('送信')
        }*/
      }
    }
</script>

<style>

a {
  text-decoration: none;
}
.container {
  background: #F1F2F6;
}
.container.container--fluid {
  background: #fff;
}
.required {
  color: #d93025;
  padding-left: 0.25em;
}
.v-picker__body {
  width: 100%!important;
}
form.v-form {
  width: 100%;
  padding: 16px;
}
.row--dense > .col, .row--dense > [class*=col-] {
  margin-bottom: 10px;
}
.v-icon.v-icon {
  padding: 0 8px;
}
.v-application .primary--text {
  padding: 0;
}

</style>

