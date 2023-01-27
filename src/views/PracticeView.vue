<!-- <template>
  <div class="home">
    <MyCalender />
  </div>
</template>

<script>
import MyCalender from '@/components/MyCalender.vue'

export default {
  components: {
    MyCalender
  }
}

</script> -->
<template>
  <section>
    <div class="wrapper">
      <h2 class="text-center">1.登録</h2>
        <form @submit.prevent="handleSubmit" id="form">
        <!-- <form @submit="handleSubmit" id="form"> -->
          <div class="form-group">
            <label for="date">Data:</label>
            <v-date-picker
              v-model="date"
              id="date"
              single
              no-title
              locale="jp-ja"
              :day-format="date => new Date(date).getDate()"
            ></v-date-picker>

          </div>

          <div class="form-group">
            <label for="fullName">Full name:</label>
            <input type="text" id="fullName" v-model="name" required>
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
          </div>

          <div class="form-group">
            <label for="massage">Message:</label>
            <textarea id="massage" rows="5" v-model="message"></textarea>
          </div>
            <!-- <div class="form-group">
              <label for="select-day">Select Day:</label>
              <select v-model="selectDay">
                <option v-for="day in days" :key="day.id" :value="day.value">
                  {{ day.text }}
                </option>
              </select>
            </div> -->
            <button 
              type="submit" 
              class="button" 
              id="button"
            >
              送信
            </button>

            <div v-if="errors.length" style="margin-top:30px;">
              <v-alert
                dense
                outlined
                type="error"
                v-for="error in errors"
                :key="error.id"
              >
              {{ error }}
              </v-alert>
            </div>
        </form>
    </div>

    <div class="wrapper">
      <h2 class="text-center">2.登録内容確認</h2>
      <p>Date: {{ date }}</p>
      <p>Name: {{ name }}</p>
      <p>Email: {{ email }}</p>
      <p>Message: {{ message }}</p>
    </div>

    <div class="wrapper">
      <h2 class="text-center">取得</h2>
      <ul>
        <li v-for="item in items" :key="item.id">
          <div>name:{{ item.name }}</div>
          <div>email:{{ item.email }}</div>
          <div>message:{{ item.message }}</div>
          <div>date:{{ item.date }}</div>
        </li>
      </ul>
    </div>
    <!-- @click:event="" イベントをクリックしたとき-->
    <div class="wrapper">
      <h2 class="text-center">カレンダーにイベントを表示</h2>
      <v-calendar
        locale="ja-jp"
        :events="events"
        @change="getEvents"
        @click:event="alertMessage"
        @click:date="alertMessage"
      ></v-calendar>
    </div>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <div style="background:white;color: #222222; padding:15px;">
        <h2 class="text-center">{{ `${title}の予定` }}</h2>
        <div>{{ filteredData }}</div>
        <!-- <p>Date: {{ date }}</p>
        <p>Name: {{ name }}</p>
        <p>Email: {{ email }}</p>
        <p>Message: {{ message }}</p> -->
      </div>
    </v-dialog>
  
  </section>
</template>

<script>
import { db } from '../firebase/config'
import moment from "moment";

export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      date: '',
      title: '',
      items: [],
      events: [],
      errors: [],
      filteredData: [],
      dialog: false,
    }
  },
  created() {
    this.getData();
    // this.getEvents();
  },
  methods: { // 入力した値を送信
    handleSubmit() {
      if(this.date === ''){
        // console.log('日付を入力しないと送信できません');
        this.errors.push("日付を選択してください");
        // const button = document.getElementById("button");
        // button.disabled = true;
        return false
      } else {
        let userMessage = {
          name: this.name,
          email: this.email,
          message: this.message,
          date: this.date
        }
      db.collection('userMessages').add(userMessage)
      this.errors = [];
      console.log('送信しました');
      }
    },
    getData() { // 値を取得
      db.collection("userMessages").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          this.items.push(doc.data()); // dbの値を配列に追加している
        })
      });
    },
    getEvents() {
      db.collection("userMessages").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const event = {
            name: doc.data().name,
            start: moment(doc.data().date).toDate(),
            color: 'blue'
          };
          this.events.push(event);
        })
      });
    },
    // checkForm(e) {
    //   if (this.date && this.name) {
    //     return true;
    //   }
    //   this.errors = [];
    //   if (!this.name) {
    //     this.errors.push('Name required.');
    //   }
    //   if (!this.date) {
    //     this.errors.push('Age required.');
    //   }
    //   e.preventDefault();
    // },
    // alertMessage(day) {
    //   this.name = this.items[0].name;
    //   this.email = this.items[0].email;
    //   this.message = this.items[0].message;
    //   this.date = this.items[0].date;
    //   // ここまではfirebaseに登録した値の0番目を取得している
    //   this.dialog = true;
    //   console.log(day);
    // },
    // alertMessage(date) {
    //   console.log(`クリックした日付:${date.day.date}`);
    //   for (const element of this.items) {
    //     console.log(`エレメントデータ:${element.date}`);
    //   let result = element.date.indexOf(date.day.date)
    //   console.log(result);
      
    //   // let answer = element.date.filter( function(value) {
    //   //   return value === date.day.date;
    //   // })
      
    //   // console.log(answer);
    //   }
    //   this.dialog = true;
    // },// クリックした日付とfirebaseのデータを比べて同じなら0、違うなら-1を返す
    // alertMessage(date) {
    //   this.title = date.day.date;
    //   console.log(this.items[2]);
    //   // console.log(date.day.date);
    //   for (const element of this.items){
    //     // console.log("Element" + element.date);
    //     let result = element.date.indexOf(date.day.date); // indexOfは最初に一致した要素のみなので使えない
    //     console.log(this.items[result]);
    //     // this.name = this.items[result].name;
    //     // this.email = this.items[result].email;
    //     // this.message = this.items[result].message;
    //     // this.date = this.items[result].date;
    //   }
    //   this.dialog = true;
    // }
    alertMessage(date) { // とりあえずクリックした日付
      this.title = date.day.date;
      const allData = this.items;
      const filteredData = allData.filter(data => data.date === date.day.date)
      this.filteredData = filteredData;
      console.log(filteredData);
      this.dialog = true;
    }
  },
  computed: {
    // checkForm() {
    //   if (this.date === '') {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  font-family: "Montserrat";
}
li {
  list-style: none;
}
section {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.wrapper {
  width: 90%;
  max-width: 500px;
  margin: 0 auto 30px auto;
  padding: 20px;
  box-shadow: 0px 0px 20px #00000033;
  border-radius: 8px;
}
.box {
  padding: 10px;
  margin: 20px 0 20px 0;
  background-color: #f3f3f3;
  border-radius: 10px;
}
.form-group {
  margin-top: 20px;
  font-size: 20px;
  color: #9e9e9e;
}
.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 5px;
  font-size: 18px;
  border: 1px solid rgba(128, 128, 128, 0.199);
  margin-top: 5px;
}
textarea {
  resize: vertical;
}
.button {
  width: 100%;
  border: none;
  padding: 20px;
  font-size: 24px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  background-color: #005caf;
  color: #fff;
}
</style>
