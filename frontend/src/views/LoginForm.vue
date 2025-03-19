<template>
  <h1>Welcome to Task Tracker</h1>
  <div class="form">

    <h2>Login</h2>

    <form @submit.prevent="login">
      <div class="inputBox">
        <InputBox :label="emailLabel" type="text" :placeholder="emailPlaceholder" v-model="email"/>
        <InputBox :label="passwordLabel" type="password" :placeholder="passwordPlaceholder" v-model="password"/>
      </div>
      <div class="button">
        <button>Login</button>
      </div>
    </form>

    <div class="route">
      <p>Don't have an account?</p>
      <router-link to="/signup" class="link">Signup</router-link>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import InputBox from '../components/InputBox.vue'

export default {
  name: 'LoginForm',
  data () {
    return {
      emailLabel: 'Email',
      emailPlaceholder: 'abc@gmail.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '...........................',
      email: '',
      password: ''
    }
  },
  components: {
    InputBox
  },
  methods: {
    async login () {
      try {
        const res = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/auth/signin`, {
          username: this.email,
          password: this.password
        })
        localStorage.setItem('token', `Bearer ${res.data.token}`)
        this.$router.push('/task')
      } catch (e) {
        alert('Wrong Credentials')
      }
    }
  }
}
</script>
