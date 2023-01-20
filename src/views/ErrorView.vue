<template>
  <section>
    <!-- <SimpleForm /> -->
    <p>試行錯誤ページ</p>
  </section>
</template>

<script>
// import SimpleForm from '@/components/SimpleForm.vue'
// import { db } from '../firebase/config'

// db.collection('userMessages')
//     .onSnapshot(function (querySnapshot) {
//         for (let change of querySnapshot.docChanges()) {
//             if (change.type === 'added') {
//                 // データが追加された時
//                 console.log("データが追加された時: ", change.doc.data());
//             }
//             else if (change.type === 'modified') {
//                 // データが変更された時
//                 console.log("データが変更された時: ", change.doc.data());
//             }
//             else if (change.type === 'removed') {
//                 // データが削除された時
//                 console.log("データが削除された時: ", change.doc.data());
//             }
//         }
//     })

// export default {
//   name: 'ErrorView',
//   components: {
//     SimpleForm
//   },
// data() {
//     return {
//         name: '',
//         email: '',
//         message: ''
//     }
// },
// methods: {
//   handleSubmit() {
//     let userMessage = {
//       name: this.name,
//       email: this.email,
//       message: this.message
//     }

//     db.collection('userMessages').add(userMessage)
//   },
  // getData() { // エラー
  //   let messageData = db.collection('userMessages');

  //   messageData.get().then((doc) => {
  //       if (doc.exists) {
  //           console.log("Document data:", doc.data());
  //       } else {
  //           // doc.data() will be undefined in this case
  //           console.log("No such document!");
  //       }
  //   }).catch((error) => {
  //       console.log("Error getting document:", error);
  //   });
  // }
  // getData() { // エラー
  //   let messageData = db.collection('userMessages');
  //   // データ取得
  //   db.collection('userMessages').where('id', '==', true)
  //   .get()
  //   .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //           // テーブル表示
  //           console.log(doc.id, " => ", doc.data());
  //           this.items = [doc.data()];
  //       });
  //       console.log(messageData);
  //   }).catch((error) => {
  //       console.log(error);
  //       // テーブルリセット
  //       this.items = [];
  //   });
  //   console.log(messageData);
  // },
//   getData() { // 成功 取得を押すと取得する
//     db.collection("userMessages").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//     });
//   });
//   },
// }
// }
</script>
