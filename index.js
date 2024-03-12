const express = require('express')
const {connectDB} =require('./database/connection')
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/route',require('./routes/route'));

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} `);
})
