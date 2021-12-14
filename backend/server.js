require('dotenv').config();
const cors = require('cors')
const express = require('express')
require('./models/Bill')
require('./models/Purchase')
require('./config/dbConnect')();
const purchaseRoute = require("./routes/purchaseRoute")
const billRoute = require("./routes/billRoute")
const userRoute = require("./routes/userRoute")
const app = express()

app.use(cors())


app.use(express.json())

app.use("/api/purchase", purchaseRoute)
app.use("/api/user", userRoute)
app.use("/api/bill", billRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});