require("express-async-errors");
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const port = process.env.PORT || 5555;
const fileRoutes = require("./routes/files");
const errorMiddleware = require("./middleware/error");
const initDB = require("./config/db");

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./uploads/")));

// Documenetation route
// app.use("/api/v1", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Api routes
app.use("/api/v1/files", fileRoutes);

// Home page
app.get('/', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, './index.html'));
});

//Handle invalid api endpoints
app.use((req, res, next) => {
  throw new CustomError("Invalid request", 400);
});

// Handle server erros
app.use(errorMiddleware);

// Listen to port
app.listen(port, () => {
  console.log(`::: Server listening on port ${port}`);
  initDB();
});

app.on("error", error => {
  console.log("::> An error occurred in our server " + error);
});

module.exports = app;
