const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const postRoute = require("./routes").post;
const utilityBillRoute = require("./routes").utilityBill;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");
const PORT = process.env.PORT || 8080;

// connect to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to Mongo Atlas.");
  })
  .catch((e) => {
    console.log(e);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", authRoute);
app.use(
  "/api/posts",
  passport.authenticate("jwt", { session: false }),
  postRoute
);
app.use(
  "/api/utilitybill",
  passport.authenticate("jwt", { session: false }),
  utilityBillRoute
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
