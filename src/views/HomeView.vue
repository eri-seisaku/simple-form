<template>
  <section>
    <SimpleForm />
  </section>
</template>

<script>
import SimpleForm from '@/components/SimpleForm.vue'
import { db } from '../firebase/config'

export default {
  name: 'HomeView',
  components: {
    SimpleForm
  },
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

</script>
