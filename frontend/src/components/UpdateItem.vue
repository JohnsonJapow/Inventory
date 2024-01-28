    <template>
        <div class="updateclass" style="position: relative;">
            <header>
                <h1>Update Item</h1>
            </header>    
            <nav>
                <button @click="back" id="backtoDashboard">Back to Dashboard</button>
            </nav>
            
            <form id="updateItemForm" @submit.prevent="submitForm">
                <label for="item">Item Name</label>
                <select v-model="selectedItemName" id="selectedItemName">
                    <option disabled value="">Please select an item</option>
                    <option v-for="itemName in uniqueItemNames" :value="itemName" :key="itemName">
                        {{ itemName }}
                    </option>
                </select><br><br>
                <div v-for="item in filteredItems" :key="item.id">
                    <input type="checkbox" :id="item.id" v-model="item.checked">
                    <label :for="item.id">
                        Item ID: {{ item.id }},
                        Item Name: {{ item.itemName }},
                        Expiry Date: {{ item.expiredDate }},
                        Purchasing Date: {{ item.purchasingDate }},
                        Sold Date: {{ item.soldDate }},
                        Wasted Date: {{ item.wastedDate }},
                        Quantity: {{ item.number }},
                        Location: {{ item.location }}
                    </label>
                </div>

                <label for="expireddate">Expiry Date</label>
                <input type="text" id="expireddate" v-model="expireddate"><br><br>
                <label for="purchasingdate">Purchasing Date</label>
                <input type="text" id="purchasingdate" v-model="purchasingdate"><br><br>
                <label for="solddate">Sold Date</label>
                <input type="text" id="solddate" v-model="solddate" :disabled="wasteddate !== '' && solddate === ''"><br><br>
                <label for="wasteddate">Wasted Date</label>
                <input type="text" id="wasteddate" v-model="wasteddate" :disabled="solddate !== '' && wasteddate === ''"><br><br>

                <label for="number">Quantity</label>
                <input type="number" id="number" v-model="number" required><br><br>
                <label for="location">Location</label>
                <input type="text" id="location" v-model="location" required><br><br>
                <button type="submit" form="updateItemForm">Update</button>
            </form>
            <p v-if="updateMessage">{{ updateMessage }}</p>
        </div>
    </template>
    <script > 
        import { toRaw } from 'vue';
        import axios from 'axios';
        export default {
            
            data() {
                return {
                    itemId: null,
                    items: [],
                    selectedItemName: "",
                    number: "",
                    location: "",
                    updateMessage: "",
                    purchasingdate: null,
                    expireddate: null,
                    solddate: "", 
                    wasteddate: "",
                    itemIds: [],
                    selectedItemId: null,
                    selectedProperties: [], 
                };
            },

            computed: {
                filteredItems() {
                    return this.items.filter(item => item.itemName === this.selectedItemName && !item.soldDate && !item.wastedDate);
                },
                store_id() {
                    const storeId = this.$store.state.store_id;
                    console.log('store_id:', storeId);
                    return storeId;
                },
                
                uniqueItemNames() {
                    return [...new Set(this.items.map(item => item.itemName))];
                }
            },
            watch: {
                selectedItemName(newVal) {
                    if (newVal) {
                        this.selectedProperties = []; // Resetting the selectedProperties array
                        // Find the corresponding item and update selectedItemId
                        let selectedItemName = this.items.find(item => item.itemName === newVal);
                        if (selectedItemName) {
                            this.selectedItemId = selectedItemName.id;
                            this.fetchItemDetails();
                        } else {
                            console.error('No item found with name:', newVal);
                        }
                    }
                }

            },
            async created() {    
                const storeId = this.$store.state.store_id;  
                if (!storeId) {
                    console.error('Store ID is null');
                    alert('Please log in again.');
                    this.$router.push('/login');
                    return;
                }   
                try {
                    const response = await axios.get(`http://localhost:4321/api/stores/${storeId}/items`);
                    console.log('Response data from server:', response.data);  // Log the raw response data
                    this.items = response.data.map(item => ({...item, checked: false}));
                    console.log('Items after assignment:', this.items);  // Log the items after assignment
                    if (this.items.length > 0) {
                        this.selectedItemName = this.items[0].itemName;
                        console.log("Initial selected item:", this.selectedItemName);  // Add this lin
                        if (this.selectedItemName && this.selectedItemName.id) {
                            console.log("Selected Item ID:", this.selectedItemName.id);
                        }
                    }
                }catch (error) {
                        console.error('Failed to fetch items:', error);
                        alert('Failed to fetch items. Please try again later.');
                }
            },
            
            methods: {
                async fetchItemDetails() {
                    try {
                        const response = await axios.get(`http://localhost:4321/api/items/${this.selectedItemId}?storeId=${this.store_id}`);
                        const item = response.data;
                        this.itemName=item.itemName;
                        this.itemId = item.id;
                        this.purchasingdate = item.purchasingDate;
                        this.expireddate = item.expiredDate;
                        this.solddate = item.soldDate;
                        this.wasteddate = item.wastedDate;
                        this.number = item.number;
                        this.location = item.location;
                    } catch (error) {
                        console.error('Failed to fetch item details:', error);
                        alert('Failed to fetch item details. Please try again later.');
                    }
                },
                async fetchItemIds() {
                    try {
                        const response = await axios.get(`http://localhost:4321/api/stores/${this.store_id}/items/${this.selectedItemName}`);
                        this.itemIds = response.data.map(item => item.id);
                    } catch (error) {
                        console.error('Failed to fetch item ids:', error);
                        alert('Failed to fetch item ids. Please try again later.');
                    }
                },
                async submitForm() {
                    const storeId = this.$store.state.store_id;
                    let itemData = {};
                    this.filteredItems.forEach((item) => {
                        if (item.checked) {
                            if (this.expireddate && !/^(\d{4})-(\d{2})-(\d{2})$/.test(this.expireddate)) {
                                alert('Please enter the expired date in the format yyyy-MM-dd');
                                return;
                            }  
                            if (this.purchasingdate && !/^(\d{4})-(\d{2})-(\d{2})$/.test(this.purchasingdate)) {
                                alert('Please enter the purchasing date in the format yyyy-MM-dd');
                                return;
                            }
                            if (this.solddate && !/^(\d{4})-(\d{2})-(\d{2})$/.test(this.solddate)) {
                                alert('Please enter the sold date in the format yyyy-MM-dd');
                                return;
                            }
                            if (this.wasteddate && !/^(\d{4})-(\d{2})-(\d{2})$/.test(this.wasteddate)) {
                                alert('Please enter the wasted date in the format yyyy-MM-dd');
                                return;
                            }

                            itemData = {
                                id: item.id,
                                itemName: item.itemName,
                                number: this.number, // Update with form data
                                location: this.location, // Update with form data
                                expiredDate: this.expireddate, // Update with form data
                                purchasingDate: this.purchasingdate, // Update with form data
                                soldDate: this.solddate, // Update with form data
                                wastedDate: this.wasteddate, // Update with form data
                            };
                                    
                            this.updateItem(storeId, item.id, itemData);
                        }
                    });
                },


            async updateItem(storeId, itemId, itemData){
                try{
                    const response = await axios.put(`http://localhost:4321/api/stores/${storeId}/items/${itemId}`, itemData);

                    if (response.status === 200) {
                        this.updateMessage = 'Item successfully updated!';
                        // You may want to fetch item data again here to reflect the updates
                        await this.fetchItemDetails();
                    }
                } catch (error) {
                    console.error('Failed to update item:', error);
                    alert('Failed to update item. Please check your input and try again.');
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
        .updateclass{
            text-align: center;
            color: #334572;
            margin-top: 60px;
            padding-top: 50px;
        }
        .updateclass > nav > button{
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
        .updateclass > form > button{
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

