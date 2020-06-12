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
const userRoutes = require("./routes/users");
const errorMiddleware = require("./middleware/error");
const initDB = require("./config/db");
const { authorize } = require("./middleware/auth");
const { updateConfig } = require("./controllers/users");

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./uploads/")));

//Api routes
app.use("/v1/files", authorize(), fileRoutes);
app.use("/v1/users", userRoutes);
app.use("/v1/documentation", userRoutes);
app.use("/v1/configure", authorize(), updateConfig);

// Home page
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.on("error", (error) => {
  console.log("::> An error occurred in our server " + error);
});

module.exports = app;
