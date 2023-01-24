<template>
  <section>
    <div class="container">
      <h2 class="text-center">1.登録</h2>
        <form @submit.prevent="handleSubmit">

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
            <input type="text" id="fullName" v-model="name">
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email">
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
            <button type="submit" class="button">送信</button>
        </form>
    </div>

    <div class="container">
      <h2 class="text-center">2.登録内容確認</h2>
      <div class="box">
        <p>Date: {{ date }}</p>
        <p>Name: {{ name }}</p>
        <p>Email: {{ email }}</p>
        <p>Message: {{ message }}</p>
      </div>
    </div>

    <div class="container">
      <h2 class="text-center">取得</h2>
      <div class="box">
        <ul>
          <li v-for="item in items" :key="item.id">
            <div>name:{{ item.name }}</div>
            <div>email:{{ item.email }}</div>
            <div>message:{{ item.message }}</div>
            <div>date:{{ item.date }}</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="container">
      <h2 class="text-center">カレンダーにイベントを表示</h2>
      <v-calendar
        locale="ja-jp"
        :events="events"
        @change="getEvents"
      ></v-calendar>
    </div>
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
      items: [],
      events: [],
    }
  },
  created() {
    this.getData();
  },
  methods: {
    handleSubmit() {
      let userMessage = {
        name: this.name,
        email: this.email,
        message: this.message,
        date: this.date
      }

      db.collection('userMessages').add(userMessage)
    },
    getData() {
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
          const events = [
            {
              name: doc.data().name,
              start: moment(doc.data().date).toDate(),
              color: 'blue'
            }
          ];
          this.events = events;
          console.log(events);
        })
      });
    },
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  font-family: "Montserrat";
}
section {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.container {
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