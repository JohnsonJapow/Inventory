<template>
    
    <div class="dashboradclass">
        <nav>
            <button @click="logout" id="logout">Log Out</button>
        </nav>
        <h1>Welcome to the Dashboard!</h1>
        <form>
            <button @click="addItem">Add New Item</button>
            <button @click="updateItem">Update Item</button>
            <button @click="browseItem">Browse</button>
            <button @click="checkMyPantry">Check My Pantry</button>
        </form>
    </div>    
    
</template>
<script>
    export default {
        methods: {
            logout() {
                // Clear user data from storage
                // Here you would call your logout method, which would handle any necessary clean-up operations
                // Redirect to the login page
                this.$router.push('/login');
            },
            addItem() {
                this.$router.push('/addnewitem');
            },
            updateItem() {
                this.$router.push('/updateitem');
            },
            browseItem(){
                this.$router.push('/browseItem');
            },
            checkMyPantry(){
                this.$router.push('/checkMyPantry');
            }
        }
    }
</script>
<style>
    .dashboradclass >nav>button{
        background-color: rgb(3, 62, 67);
        border: 1px solid black;
        color: white;
        padding: 5px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
    .dashboradclass >form>button{
        background-color: rgb(71, 69, 30);
        border: 1px solid black;
        color: white;
        padding: 5px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
    .dashboradclass{
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: black;
        margin-top: 60px;
    }
    .dashboradclass > div{
        margin: 50px 50px 50px 50px;
    }
</style>
