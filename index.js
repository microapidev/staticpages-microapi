require('express-async-errors')
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const fileRoutes = require("./routes/files")

app.use('api/v1/files', fileRoutes);

const port = (process.env.PORT || 3000);
app.listen(port, ()=> `Server now running on ${port}`)