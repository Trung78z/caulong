const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const port = process.env.PORT || 8080;

const UserAuth = require("./Routes/User");
const Post = require("./Routes/Post");
const Image = require("./Routes/Image");
const Join = require("./Routes/Join");
const Comments = require("./Routes/Comments");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));

app.use("/posts", Post);
app.use("/auth", UserAuth);
app.use("/img", Image);
app.use("/join", Join);
app.use("/comments", Comments);
app.get("/", (req, res) => {
  res.end("Hello world");
});
app.get("/page", function (request, response) {
  response.sendFile(path.join(__dirname, "views/index.html"));
});
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("App listen on port:" + port);
  });
});
