require('express-async-errors')
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require("morgan")
const path = require("path")

const port = process.env.PORT;
const fileRoutes = require("./routes/files")
const errorMiddleware = require("./middleware/error")
const initDB = require("./config/db")

app.use(cors())
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, './uploads/')));

//Api routes
app.use('/api/v1/files', fileRoutes);

//Handle invalid api endpoints
app.use((req, res, next) => {
     throw new CustomError("Invalid request", 400);
});

// Handle server erros
app.use(errorMiddleware);

// Listen to port
app.listen(port, () => {
     console.log(`::: Server listening on port ${port}`);
     initDB()
});

app.on('error', (error) => {
     console.log("::> An error occiurred in our server " + error);
});