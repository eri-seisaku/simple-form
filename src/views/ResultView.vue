<template>
  <div class="container">
    <h2 class="text-center">created関数で値を表示</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        <div>{{ item.name }}</div>
        <div>{{ item.email }}</div>
        <div>{{ item.message }}</div>
      </li>
    </ul>

</div>
</template>
<script>
import { db } from '../firebase/config'
export default {
  data() {
      return {
          items: [] // 配列に
      }
  },
  created() { // createdではDOMが作成されていないタイミング
    this.getData();
  },
  methods: {
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