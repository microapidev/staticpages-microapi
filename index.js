require('express-async-errors')
const express = require('express');
const cors = require('cors');
const app = express();

const port = (process.env.PORT || 3000);
const fileRoutes = require("./routes/files")
const errorMiddleware = require("./middleware/error")

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Api routes
app.use('/api/v1/files', fileRoutes);

//Handle invalid api endpoints
app.use((req, res, next) => {
     throw new CustomError("Invalid request", 400);
});

// Handle server erros
app.use(errorMiddleware);

// Listen to port
app.listen(port, () => `Server now running on ${port}`)

