<template>
    <head>Sign-up</head>
    <form :class="registerclass" @submit.prevent="submitForm">
        <label for="email">New Store Account :</label>
        <input type="email" id="email" v-model="email" required placeholder="abc@gamil.com">
        <br><br>  
        <label for="password">New Store Password:</label>
        <input type="password" id="password" v-model="password" required>
        <br><br>    
        <button type="submit">Sign-up</button>
    </form>    
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    <router-link to="/login">Already have an account? Log in</router-link>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                email: '',
                password: '',
                errorMessage: '',
                registerclass:'registerstyle',
            };
        },
        methods: {
            async submitForm() {
                this.errorMessage = '';
                console.log('Email: ', this.email);
                console.log('Password: ', this.password);
                try {
                    let response = await axios.post('http://localhost:4321/api/users', {
                        username: this.email,
                        password: this.password,
                    });
                    this.email = null;
                    this.password = null;
                } catch (error) {
                    if (error.response && error.response.data === 'Username already exists') {
                        this.errorMessage = 'This username is already in use. Please choose a different one.';
                    } else {
                        this.errorMessage = 'An error occurred. Please try again later.';
                    }
                }
            }
        }
    };
</script>
<style>
    .registerstyle {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: black;
      margin-top: 60px;
    }
    .registerstyle > div{
        margin: 50px 50px 50px 50px;
    }
    .registerstyle > button{
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
