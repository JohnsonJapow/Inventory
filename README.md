# Stock Sage - An Inventory Management System

## Usage 
- The web application allows users to manage their inventory.

## Features
- Adding/Updating stocks
- Browsing items with line chart format (quantity with sold date/purchasing date/wasted date)
- Checking items in the selected location

## Tech Stack
- Java Spring framework / Spring Boot
- Vue.js for website UI
- Chart.js for displaying chart lines (integrated into Vue.js components)
- PostgreSQL for storing data (User information and Inventory information)

## Setup

### Database
1. Set the database username and password as system properties:
   
   - **For Linux or macOS:**
     ```bash
     export DB_USERNAME=your_username
     export DB_PASSWORD=your_password
     ```
   - **For Windows:**
     ```batch
     set DB_USERNAME=your_username
     set DB_PASSWORD=your_password
     ```

### Server
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/JohnsonJapow/Inventory.git
2. Move to the inventory directory:
   ```bash
   cd .\inventory
3. Run the server:
   ```bash
   .\mvnw spring-boot:run
### Client
1. Move to the frontend directory:
   ```bash
   cd .\inventory\frontend
2. Run the client:
   ```bash
   npm run serve
## Notes
- By default, the client runs on localhost:8080
- By default, the server runs on localhost:4321
- By default, the database runs on localhost:5432
