<template>
    <div class="checkmypantry" style="position: relative;">
        <header>
            <h1>Check My Pantry</h1>
        </header>
        <nav>
            <button @click="back" id="backtoDashboard">Back to Dashboard</button>
        </nav>
        <form id="pantrylocation">
            <label for="selectedlocation">Location:</label>
            <select v-model="selectedLocation" id="selectedlocation" @change="fetchItemDetails">
                <option disabled value="">Please select a location</option>
                <option v-for="location in uniqueLocations" :value="location" :key="location">
                    {{ location }}
                </option>
            </select>
        </form>
        <div v-if="itemsInLocation.length > 0">
            <h2>Items in {{selectedLocation}}</h2>
            <div v-for="item in itemsInLocation" :key="item.id" class="item-details-container">
                <p>ID: {{ item.id }}</p>
                <p>Name: {{ item.itemName }}</p>
                <p>Quantity: {{ item.number }}</p>
                <p>Expiry Date: {{ item.expiredDate }}</p>
                <hr />
            </div>
        </div>
        <div v-else>
            <p>No items found in this location.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            items: [],
            selectedLocation: null,
        };
    },
    computed: {
        uniqueLocations() {
            const locations = new Set(this.items.map(item => item.location));
            return Array.from(locations);
        },
        itemsInLocation() {
            if (!this.selectedLocation) return [];
            return this.items.filter((item) => item.location === this.selectedLocation);
        },
    },
    async created() {
        try {
            const response = await axios.get(`http://localhost:4321/api/stores/${this.$store.state.store_id}/items`);
            this.items = response.data;
        } catch (error) {
            console.error('Failed to fetch items:', error);
            alert('Failed to fetch items. Please try again later.');
        }
    },
    methods: {
        back() {
            this.$router.push('/inventoryhome');
        },
        async fetchItemDetails() {
            // Implementation depends on your API
        },
    }
}
</script>

<style scoped>
.checkmypantry {
    text-align: center;
    color: #334572;
    margin-top: 60px;
    padding-top: 50px;
}
.checkmypantry > nav > button {
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
</style>
