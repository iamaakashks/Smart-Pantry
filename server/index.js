const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const pantryRoutes = require('./routes/pantryRoutes.js');
const recipeRoutes = require('./routes/recipeRoutes.js')
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/recipes', recipeRoutes);

app.get('/', (req, res)=>{
    res.send("Hello from the Smart Pantry API!");
})
const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})
