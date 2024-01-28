<template>
  <head>Log-in</head>
  <form :class="loginformclass" @submit.prevent="submitForm">
    <label for="email">Store Account:</label>
    <input type="email" id="email" v-model="email" required placeholder="abc@gamil.com">
    <br><br>  
    <label for="password">Store Password:</label>
    <input type="password" id="password" v-model="password" required>
    <br><br>
    <button type="submit">Login</button>
  </form>
  <div>
    <router-link to="/signup">Don't have an account? Sign up</router-link>
  </div>  
  
  
</template>

<script>
import axios from 'axios';
export default {
  
  data() {
    return {
      email: '',
      password: '',
      loginformclass:'loginstyle'
    };
  },
  methods: {
            async submitForm() {
            console.log('Email: ', this.email);
            console.log('Password: ', this.password);
            try {
                  // Send a POST request to your backend authentication endpoint
                  const response = await axios.post('http://localhost:4321/api/login', {
                  username: this.email,
                  password: this.password,
                });

                // Check if the response has data property
                if (response && response.data && response.data.store) {
                    console.log('Login successful');
                    console.log('Token:', response.data.token);
                    console.log('User:', response.data.store);
                    if (response.data.store.id) {
                        this.$store.commit('SET_STORE_ID', response.data.store.id);
                        // Save to localStorage
                        localStorage.setItem('store_id', response.data.store.id);
                        console.log('Store ID set in Vuex:', this.$store.state.store_id);
                    } else {
                        console.log('The store object does not contain a store_id');
                    }
                    // Save the store id to the Vuex store or another client-side storage solution
                    // Reset form fields
                    this.email = '';
                    this.password = '';
                    // Redirect to the inventory home page
                    this.$router.push('/inventoryhome');
                } else {
                    console.log('Response does not contain data');
                }
            } catch (error) {
                // Authentication failed
                console.log('Login failed:', error);
                // Show an error message to the user
                alert('Invalid username or password');
            }
            this.email = null;
            this.password = null;
        }
  }
};
</script>

<style scoped>
    .loginstyle {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: black;
      margin-top: 60px;
    }
   .loginstyle > div{
     margin: 50px 50px 50px 50px;
   }
   .loginstyle > button{
      background-color: rgb(3, 62, 67);
      border: 1px solid black;
      color: white;
      padding: 5px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
    }
</style>