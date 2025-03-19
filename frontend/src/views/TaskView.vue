<template>
  <div class="taskView">

    <div class="navbar">
      <div class="navHeading">Task Tracker App</div>
      <button @click="logout">Logout</button>
    </div>

    <h1>My Task</h1>

    <div class="addTask">
      <div @click="addTask" class="plusIcon">+</div>
      <input type="text" placeholder="Add a task" v-model="taskToAdd"/>   <!-- Input to add Task-->
      <div @click="addTask" class="addIcon">Add</div>
    </div>

    <div class="listItems">
      <ul>                                                                <!-- List of all the Pending Tasks-->
          <li v-for="(el,idx) in incompleteArr" :key="idx">
              <div class="incompleteTasks">
                <input type="checkbox" :id="idx" @click="completeTask(idx)"/>
                <label for="idx">{{ el.title }}</label>
              </div>
          </li>
      </ul>
    </div>

    <p >Completed ( {{ completeArr.length }} )</p>

    <div class="listItems">
      <ul>                                                                <!-- List of all the Completed Tasks-->
          <li v-for="(el) in completeArr" :key="el">
              <div class="completedTasks">
                <div>&#10004;</div>
                <div class="checked">{{ el.title }}</div>
              </div>
          </li>
      </ul>
    </div>

    <button @click="deleteTasks" v-if="completeArr.length">Delete the Completed Tasks</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TaskView',

  // Getting all the tasks of the user and showing them
  async beforeMount () {
    const token = localStorage.getItem('token')
    if (token) {
      const res = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/task`, {
        headers: {
          authorization: token
        }
      })
      this.arr = res.data.tasks.map((el) => el)
    } else {
      alert('Please Login to view Tasks')
      this.$router.push('/')
    }
  },

  data () {
    return {

      // variable to store the tasks
      arr: [],

      // variable to store the task that is to be added
      taskToAdd: ''
    }
  },

  computed: {

    // an array of all the incompleted tasks
    incompleteArr () {
      return this.arr.filter((el) => { return el.completed === false })
    },

    // an array of all the completed tasks
    completeArr () {
      return this.arr.filter((el) => { return el.completed === true })
    }
  },

  methods: {

    // function to Logout and clear out the JWT token
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },

    // function to add a new task to the database
    async addTask () {
      await axios.post(`${process.env.VUE_APP_BACKEND_URL}/task`, {
        title: this.taskToAdd
      }, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      location.reload()
    },

    // function to complete/check a pending task
    async completeTask (idx) {
      await axios.patch(`${process.env.VUE_APP_BACKEND_URL}/task/${this.incompleteArr[idx].id}`, {}, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      location.reload()
    },

    // function to delete all the completed tasks
    async deleteTasks () {
      await axios.delete(`${process.env.VUE_APP_BACKEND_URL}/task`, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      location.reload()
    }
  }
}
</script>
