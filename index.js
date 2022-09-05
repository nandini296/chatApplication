const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const router = require("./routes/routerForChat");
const socketio = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(router);
app.use("/api/auth", userRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection successfull");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });


const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  console.log("User Connected!", socket.id);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected!", socket.id);
  });
});


// For heroku
if(process.env.NODE_ENV == "production")
{
  app.use(express.static("form/build"));
  const path = require("path");
  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"form","build","index.html"));
  })
}

// app.listen(PORT,()=>{
//   console.log("Server is running on ",PORT);
// })



server.listen(PORT, () => {
  console.log("server running on", PORT);
});
