const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const passport = require("passport");
const path = require("path");
const app = express();
// BoadyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("App connected to our DB"))
  .catch(err => console.log(err));
// Using passport Middleware
app.use(passport.initialize());
// Load Passport config
require("./config/passport")(passport);
// Use Routes MiddleWare
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App started on port ${port}`));
