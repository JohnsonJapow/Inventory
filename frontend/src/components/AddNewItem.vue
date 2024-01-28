<template>
    <div class="addclass" style="position: relative;">
        <header>
            <h1>Add New Item</h1>
        </header>    
        <nav>
            <button @click="back" id="backtoDashboard">Back to Dashboard</button>
        </nav>
        <form id="addItemForm" @submit.prevent="submitForm">
            <label for="item">Item Name</label>
            <input type="text" id="itemName" v-model="itemName" required><br><br>
            <label for="item">Expiry Date</label>
            <input type="text" id="item" v-model="expiredDate" placeholder="2020-12-31" required><br><br>
            <label for="item">Purchasing Date</label>
            <input type="text" id="item" v-model="purchasingDate" placeholder="2020-12-31" required><br><br>
            <label for="item">Quantity</label>
            <input type="number" id="item" v-model="number" required><br><br>
            <label for="item">Location</label>
            <input type="text" id="item" v-model="location" required><br><br>
            <button type="submit">Add</button>
        </form>

    </div>
</template>
<script> 
    import axios from 'axios';
    export default {
        computed: {
            store_id() {
                const storeId = this.$store.state.store_id;
                console.log('store_id:', storeId);
                return storeId;
            }
        },
        data(){
            return{
                itemName:"",
                expiredDate:"",
                purchasingDate:"",
                number:"",
                location:"",
                //store_id: this.store_id // Include the store_id when creating a new item
            }
        },
        methods: {
            async submitForm(){
            // Validate the date string
            if (!/^(\d{4})-(\d{2})-(\d{2})$/.test(this.expiredDate)) {
                alert('Please enter the date in the format yyyy-MM-dd');
                return;
            }  
            if (!/^(\d{4})-(\d{2})-(\d{2})$/.test(this.purchasingDate)) {
                alert('Please enter the date in the format yyyy-MM-dd');
                return;
            }
            // Prepare the item data to be sent to the backend
            const newItem = {
                itemName: this.itemName,
                expiredDate: this.expiredDate,
                purchasingDate: this.purchasingDate,
                number: this.number,
                location: this.location,
                };

                try {
                // Send a POST request to the backend to add the new item
                const response = await axios.post(`http://localhost:4321/api/items?store_id=${this.store_id}`, newItem);
                
                console.log('New item added:', response.data);
                console.log('Submitting form with data:', this.itemName, this.expiredDate, this.purchasingDate, this.soldDate, this.wastedDate, this.number, this.location, this.store_id);
                // Reset form fields
                this.itemName = '';
                this.expiredDate = '';
                this.purchasingDate = '';
                this.number = '';
                this.location = '';

                // Redirect to the dashboard or another appropriate page
                //this.$router.push('/inventoryhome');
                } catch (error) {
                console.error('Failed to add new item:', error);
                // Show an error message to the user
                alert('Failed to add new item. Please try again.');
                }
                
            },
            back() {
            // Clear user data from storage
            // Here you would call your logout method, which would handle any necessary clean-up operations
            // Redirect to the login page
            this.$router.push('/inventoryhome');
            }
        }
    }        
</script>
<style>
    .addclass{
        text-align: center;
        color: #334572;
        margin-top: 60px;
        padding-top: 50px;
    }
    .addclass > nav > button{
        background-color: rgb(3, 62, 67);
        border: 1px solid black;
        color: white;
        padding: 3px 6px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        position: absolute;
        top: 0px;
        left: 10px
    }
    .addclass > form > button{
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

