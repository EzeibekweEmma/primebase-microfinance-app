const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Loan = require("./models/Loan");
const generateRandomID = require("./models/GenerateRandomID");
require("dotenv").config();

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes goes here
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ connection: "Okay" });
});

app.post("/api/request_for_loan", async (req, res) => {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
  try {
    let { full_name, email, loan_amount, repayment_duration } = req.body;
    // Trim and setting to lowercase
    email = email.trim().toLowerCase();
    //  capitalize the first letters of each word in a userName
    full_name = full_name
      .toLowerCase()
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Formatting as money with the currency symbol and commas for thousands
    const formattedAmount = Number(loan_amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    const newLoan = new Loan({
      full_name,
      email,
      loan_amount: formattedAmount,
      repayment_duration,
      transaction_id: generateRandomID(),
    });

    const savedLoan = await newLoan.save();

    res.status(200).json({
      message: `Loan request of ${formattedAmount} was successfully sent.`,
      transaction_id: savedLoan.transaction_id,
    });
  } catch (error) {
    console.error("An error occur while requesting for loan:", error);
    res.status(500).json({
      message:
        "An error occur while requesting for loan, Please try again later",
    });
  }
});

app.get("/api/get_all_loan_request", async (req, res) => {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
  try {
    res.json(await Loan.find());
  } catch (error) {
    console.error("Unable to get request:", error);
    res.status(500).json({
      message: "Unable to get request, Please try again later",
    });
  }
});

app.listen(port, () => console.log(`App is listening on port ${port}!`));
