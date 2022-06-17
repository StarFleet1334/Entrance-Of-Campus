const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./Routes/AuthRoutes');
const cookieParser = require('cookie-parser');


app.listen(4000, () => {
    console.log("Server Started")
})

mongoose.connect("mongodb+srv://ilia2002:iliko2002@cluster0.lwa3n.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection established to MongoDB")
}).catch((err) => {
    console.log(err.message);
})



app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use("/", authRoutes)