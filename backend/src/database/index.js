const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const URI = process.env.MONGO_URI
mongoose.connect(URI).then(() => {
    console.log("Connected on Mongo database")
}).catch(err => {
    console.error("Error detected: " + err)
})

module.exports = mongoose 