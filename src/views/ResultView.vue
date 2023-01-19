<template>
  <div class="container">
    <h2 class="text-center">created関数で値を表示</h2>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item }}</li>
    </ul>

</div>
</template>
<script>
import { db } from '../firebase/config'
export default {
data() {
    return {
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
  }
}



</script>