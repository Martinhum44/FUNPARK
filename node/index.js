const express = require("express") 
const app = express()
const router = require("./routers/main.js")
const connect = require("./db/connect")
const cors = require("cors")
const notFound = require("./middleware/notfound.js")
const handler = require("./middleware/handler.js")
require("dotenv").config() 

app.use(cors())
app.use(express.json())
app.use("/frontend",express.static("./public"))
app.use("/api", router)
app.use(notFound) 
app.use(handler) 
 
var port = process.env.PORT || 3000 
         
async function start(){
    try{
        await connect(process.env.CONNECTION_STRING)
        app.listen(3000, console.log(`listening on port ${port}`))
    } catch(error){
        console.log("THE ERROR: "+error)
    }
} 
 
start() 