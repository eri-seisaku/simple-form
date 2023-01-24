<template>
  <div class="home">
      <div class="container">
        <h2 class="text-center">firestoreでデータの登録取得</h2>
          <form @submit.prevent="handleSubmit">
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

              <button type="submit">送信</button>
              <button @click="getData">取得</button>
              <p class="text-center">[※コンソールに値を表示させています]</p>
          </form>
      </div>

      <div class="container">
        <div>
          <h2 class="text-center">v-modelで値を表示</h2>
          <p>Name: {{ name }}</p>
          <p>Email: {{ email }}</p>
          <p>Message: {{ message }}</p>
        </div>
    </div>

  </div>
</template>

<script>
/*
import { db } from '../firebase/config'

export default {
data() {
    return {
        name: '',
        email: '',
        message: '',
        items: {
          name: '',
          email: '',
          message: '',
        }
    }
},
created() { // createdではDOMが作成されていないタイミング
  db.collection('userMessages').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      // this.items = [doc.data()];
      this.items = {
        name: doc.data().name,
        email: doc.data().email,
        message: doc.data().message
      }
    })
  })
},
methods: { 
  handleSubmit() {
    let userMessage = {
      name: this.name,
      email: this.email,
      message: this.message
    }

    db.collection('userMessages').add(userMessage)
  },
  getData() { // 取得を押すと取得する
    db.collection("userMessages").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
  });
  },
}
}

*/
</script>

<style>
* {
  box-sizing: border-box;
  font-family: "Montserrat";
}
.text-center {
  text-align: center;
}
section {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.container {
  width: 90%;
  max-width: 500px;
  margin: 0 auto 20px auto;
  padding: 20px;
  box-shadow: 0px 0px 20px #00000033;
  border-radius: 8px;
}
.form-group {
  margin-top: 20px;
  font-size: 20px;
  color: #9e9e9e;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 5px;
  font-size: 18px;
  border: 1px solid rgba(128, 128, 128, 0.199);
  margin-top: 5px;
}
textarea {
  resize: vertical;
}

</style>