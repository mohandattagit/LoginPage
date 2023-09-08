const express = require("express");
const app = express();
const port = 3001;
const connectDB = require("./database/mongodb.js");
const { router } = require("./routes/routes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use("/api", router);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
