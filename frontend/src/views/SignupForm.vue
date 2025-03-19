<template>
  <h1>Welcome to Task Tracker</h1>
  <div class='form'>

    <h2>Signup</h2>

    <form @submit.prevent="signup">

      <div class="inputBox">
        <InputBox :label="emailLabel" type="text" :placeholder="emailPlaceholder" v-model="email"/>
        <InputBox :label="passwordLabel" type="password" :placeholder="passwordPlaceholder" v-model="password"/>
        <InputBox :label="confirmPasswordLabel" type="password" :placeholder="passwordPlaceholder" v-model="confirmPassword"/>
      </div>

      <div class="button">
        <button>Signup</button>
      </div>

    </form>

    <div class="route">
      <p>Already have an account?</p>
      <router-link to="/login" class="link">Login</router-link>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import InputBox from '../components/InputBox.vue'

export default {
  name: 'SignupForm',
  data () {
    return {
      emailLabel: 'Email',
      emailPlaceholder: 'abc@gmail.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '.................',
      confirmPasswordLabel: 'Confirm Password',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  components: {
    InputBox
  },
  methods: {
    async signup () {
      try {
        if (!(this.password === this.confirmPassword)) {
          alert('Passwords dont match')
        } else {
          const res = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/auth/signup`, {
            username: this.email,
            password: this.password
          })
          localStorage.setItem('token', `Bearer ${res.data.token}`)
          this.$router.push('/task')
        }
      } catch (e) {
        alert('Email should not be empty / Email already taken')
      }
    }
  }
}
</script>
