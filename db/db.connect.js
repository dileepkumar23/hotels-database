const mongoose = require("mongoose")

require("dotenv").config();

const mongoUri = process.env.MONGODB

const initializeDatabase = async () => {
   await  mongoose.connect(mongoUri)
            .then(() => console.log("Connect to Database"))
            .catch((error) => console.log("Error occured while connecting to database", error))
}

module.exports = {initializeDatabase}
