const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Hello from the Smart Pantry API!");
})
const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})
