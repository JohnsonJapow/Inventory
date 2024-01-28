<template>
    <div class="browseclass"  style="position: relative;">
      <header>
        <h1>Browse Inventory</h1>
      </header>
      <nav>
        <button @click="back" id="backtoDashboard">Back to Dashboard</button>
      </nav>
      <form id="browseItemForm">
        <label for="item">Item Name</label>
        <select v-model="selectedItem" id="selectedItemName" @change="fetchItemDetails">
          <option disabled value="">Please select an item</option>
          <option v-for="item in uniqueItemNames" :value="item" :key="item">
            {{ item }}
          </option>
        </select>
      </form>
      <div>
          <label for="dataType">Data Type:</label>
          <select v-model="selectedDataType" id="dataType" @change="fetchItemDetails">
            <option value="soldDate">Quantity with Sold Date</option>
            <option value="purchasingDate">Quantity with Purchasing Date</option>
            <option value="wastedDate">Quantity with Wasted Date</option>
          </select>
          <div class="chart-container" style="position: relative; height:40vh; width:80vw">
              <canvas id="chart" width="400" height="400"></canvas>
          </div>
      </div>
      <div v-if="relevantItems.length > 0">
        <h2>Item Details</h2>
          <div v-for="item in relevantItems" :key="item.id" class="item-details-container">
            <p>ID:<br> {{ item.id }}</p>
            <p>Name:<br> {{ item.itemName }}</p>
            <p>Purchasing Date:<br> {{ item.purchasingDate }}</p>
            <p>Expiry Date:<br> {{ item.expiredDate }}</p>
            <p>Wasted Date:<br> {{ item.wastedDate }}</p>
            <p>Sold Date:<br> {{ item.soldDate }}</p>
            <p>Quantity:<br> {{ item.number }}</p>
            <p>Location:<br> {{ item.location }}</p>
            <hr />
          </div>
      </div>
      <div v-else>
        <p>No relevant items found</p>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';
import Chart from 'chart.js/auto';
export default {
    data() {
        return {
            items: [],
            selectedItem: null,
            selectedDataType: 'soldDate',
            itemDetails: null,
            chart: null,
            chartData:{},
        };
    },
    watch: {
      relevantItems(newItems) {
        this.chartData = this.getChartData(newItems);
        this.updateChart();
      },
    },
    computed:{
        store_id() {
                    const storeId = this.$store.state.store_id;
                    console.log('store_id:', storeId);
                    return storeId;
        },
        uniqueItemNames() {
          const names = new Set(this.items.map(item => item.itemName));
          return Array.from(names);
        },
        relevantItems() {
            if (!this.selectedItem) return [];
            return this.items
                .filter((item) => item.itemName === this.selectedItem)
                .sort((a, b) => new Date(a.expiredDate) - new Date(b.expiredDate));
        },
    },
    async mounted() {
        // your mounted hook logic here
        await this.$nextTick();
        // Initialize chartData before calling updateChart
        this.chartData = this.getChartData(this.items, this.selectedDataType, this.selectedItem);
        this.updateChart();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateChart);
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
      getChartData(items, dataType, itemName) {
          const data = {};
          for (const item of items) {
            if (item.itemName === itemName && item[dataType]) {
              const date = item[dataType];
              if (!(date in data)) {
                data[date] = 0;
              }
              if (dataType === 'purchasingDate') {
                data[date] += item.number;
              } else {
                data[date] += item.number;
              }
            }
          }
          const sortedDataArray = Object.entries(data).sort(([dateA], [dateB]) => 
          new Date(dateA) - new Date(dateB));
          const sortedData = Object.fromEntries(sortedDataArray);
          return sortedData;
        },

        updateChart() {
          const ctx = document.getElementById('chart').getContext('2d');
          if (this.chart) {
            this.chart.destroy();
          }
          this.chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: Object.keys(this.chartData),
              datasets: [{
                label: 'Items Sold',
                data: Object.values(this.chartData),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              }],
            },
          });
        },
        async fetchItemDetails() {
          try {
            const response = await axios.get(`http://localhost:4321/api/stores/${this.$store.state.store_id}/items/${this.selectedItem}`);
            if (response.data.length > 0) {
              this.itemDetails = response.data[0];
              // Update chart data and redraw chart
              this.chartData = this.getChartData(this.items, this.selectedDataType, this.selectedItem);
              this.updateChart();
            } else {
              console.log("No item details found");
              this.itemDetails = null;
            }
            console.log('itemDetails:', this.itemDetails);
          } catch (error) {
            console.error('Failed to fetch item details:', error);
            alert('Failed to fetch item details. Please try again later.');
          }
        },


        back() {
            this.$router.push('/inventoryhome');
        }
    }
}
</script>

<style scoped>
.browseclass {
    text-align: center;
    color: #334572;
    margin-top: 60px;
    padding-top: 50px;
}
.browseclass > nav > button {
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
.item-details-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
}
.item-details-container > p {
    flex-basis: calc(100% / 8);  /* Adjust as needed */
}
</style>
