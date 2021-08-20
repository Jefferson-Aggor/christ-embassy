const dotenv = require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const Vonage = require("@vonage/server-sdk");
const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "Public")));

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const vonage = new Vonage({
  apiKey: "11e53dab",
  apiSecret: "XWq3PB3be7n8azmo",
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/admin", (req, res) => res.render("admin"));

app.post("/", (req, res) => {
  const from = "NOPW-Akuse";
  const to = "233548907875";
  const text = `Registration Made!.\n Details \n name: ${
    req.body.name
  } \n contact: ${req.body.contact} \n location: ${
    req.body.location
  } \n expectations: ${req.body.expectations} \n\n Go to ${
    req.protocol
  }://${req.get("host")}/admin to view bookings `;

  console.log(req.body);

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        console.log("Message sent successfully.");
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]["error-text"]}`
        );
      }
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
