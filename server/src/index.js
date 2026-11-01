import dotenv from "dotenv"
import {app} from "./app.js"

dotenv.config({
    path:"./.env"
})

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}/api/v1/notes`)
})