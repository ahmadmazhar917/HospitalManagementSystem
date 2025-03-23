const express = require("express");
const path = require("path");
const hms = express();
const port = 80;
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/HospitalManagementSystem");
}

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We are connected.");
});

const helpSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  query: String,
});

const appointment = new mongoose.Schema({
  name: String,
  cnic: String,
  address: String,
  city: String,
  phone: String,
  email: String,
  message: String,
  date: String,
});

const contactUs = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String,
});
const appoint = mongoose.model("appointment", appointment);

const help = mongoose.model("homepage-help", helpSchema);

const contact = mongoose.model("ContactUs", contactUs);

hms.use("/static", express.static("static"));
hms.use(express.urlencoded());
hms.set("view engine", "pug");
hms.set("views", path.join(__dirname, "views"));
hms.get("/", (req, res) => {
  res.render("home.pug");
});
hms.post("/", (req, res) => {
  var myData = new help(req.body);
  myData
    .save()
    .then(() => {
      // res.send("Your information has been saved to the database.");
      res.render("home.pug");
    })
    .catch(() => {
      res.send("Item was not saved to the database.");
    });
});
hms.get("/home.pug", (req, res) => {
  res.render("home.pug");
});

hms.get("/AboutUs.pug", (req, res) => {
  res.render("AboutUs.pug");
});
hms.get("/OurDoctors.pug", (req, res) => {
  res.render("OurDoctors.pug");
});

hms.get("/Appointment.pug", (req, res) => {
  res.render("Appointment.pug");
});
hms.post("/Appointment.pug", (req, res) => {
  var myData1 = new appoint(req.body);
  myData1
    .save()
    .then(() => {
      // res.send("Your information has been saved to the database.");
      res.render("Appointment.pug");
    })
    .catch(() => {
      res.send("Item was not saved to the database.");
    });
});

hms.get("/onlinereport.pug", (req, res) => {
  res.render("onlinereport.pug");
});
hms.get("/contactus.pug", (req, res) => {
  res.render("contactus.pug");
});
hms.post("/contactus.pug", (req, res) => {
  var myData2 = new contact(req.body);
  myData2
    .save()
    .then(() => {
      // res.send("Your information has been saved to the database.");
      res.render("contactus.pug");
    })
    .catch(() => {
      res.send("Item was not saved to the database.");
    });
});

hms.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
