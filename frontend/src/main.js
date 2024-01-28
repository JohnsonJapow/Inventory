import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';

import LoginForm from './components/LogInForm.vue';
import SignUpForm from './components/RegisterForm.vue';
import InventoryHome from './components/Dashboard.vue';
import AddNew from './components/AddNewItem.vue';
import Update from './components/UpdateItem.vue';
import Browse from './components/Browse.vue';
import CheckMyPantry from './components/CheckMyPantry.vue';

import App from './App.vue'
import axios from 'axios';

const store = createStore({
    state: {
        store_id: null,
        items: [],
    },
    mutations: {
        SET_STORE_ID: (state, id) => { state.store_id = id; },
        SET_ITEMS: (state, items) => { state.items = items; },
        SET_INVENTORY_ITEMS: (state, inventoryItems) => { state.inventoryItems = inventoryItems; },  // New mutation
    },
    actions: {
        fetchItems: async ({ commit }) => {
          try {
              const response = await axios.get('http://localhost:4321/api/items');
              commit('SET_ITEMS', response.data);
          } catch (error) {
              console.error('Failed to fetch items:', error);
          }
        }
    },
    getters: {
        items: state => state.items,
        inventoryItems: state => state.inventoryItems,  // New getter
    },
  });
const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: '/', redirect: '/login' },
        { path: '/login', component: LoginForm },
        { path: '/signup', component: SignUpForm },
        { path: '/inventoryhome', component: InventoryHome },
        { path: '/addnewitem', component: AddNew },
        { path: '/updateitem',component: Update},
        { path: '/browseitem',component: Browse},
        { path: '/checkmypantry',component: CheckMyPantry},
    ]
});
const store_id = localStorage.getItem('store_id');
if (store_id) {
  store.commit('SET_STORE_ID', store_id);
}
const app = createApp(App)
app.use(router);
app.use(store);
app.mount('#app')
