const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const allRoutes = require("./routes/allRoutes");

app.set("view engine", "ejs");
app.use(express.static("public"));

//DELETE METHOD//

var methodOverride = require("method-override");
app.use(methodOverride("_method"));
//DELETE METHOD//

//==AUTO REFRESH==//
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
//==!!AUTO REFRESH!!==//

//---CONECCT MONGO DB---//
mongoose
  .connect(
    "mongodb+srv://mkourdiya:hPQ00QSqCzehCGCh@cluster0.5cne7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//---!!CONECCT MONGO DB!!---//
app.use(allRoutes);
