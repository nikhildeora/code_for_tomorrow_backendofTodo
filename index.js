const express = require("express");
const {connection} = require("./config/main.js");
const {TodoRoute} = require("./route/todo.route.js");
const {UserRoute} = require("./route/user.route.js");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/todo", TodoRoute);
app.use("/user", UserRoute);

app.listen(8000, async () => {
    try {
        await connection;
        console.log("database connected");
        console.log("server running on port 8000");
    } catch (error) {
        console.log("error in running port");
    }
})