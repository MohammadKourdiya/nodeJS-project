const express = require("express");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const Mydata = require("./modals/myDataSchema");
app.set("view engine", "ejs");
app.use(express.static("public"));

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

//---RENDER BOOTSTRAP DESİGNS---//
app.get("/", (req, res) => {
  res.render("index", {});
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

app.get("/user/view.html", (req, res) => {
  res.render("user/view");
});

app.get("/user/edit.html", (req, res) => {
  res.render("user/edit");
});

//---!!!RENDER BOOTSTRAP DESİGNS!!!---//

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
