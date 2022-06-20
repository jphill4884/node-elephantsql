require('dotenv').config();
const { Pool } = require('pg');
const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const pool = new Pool();

app.get("/api/users", (req, res, next) => {
  pool
    .query("SELECT * FROM users")
    .then((data) => res.json(data.rows))
    .catch((error) => res.sendStatus(500));
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});