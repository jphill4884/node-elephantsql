require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const { Pool } = require('pg');

const pool = new Pool();

app.get("/api/users", (req, res, next) => {
  pool
    .query("SELECT * FROM users")
    .then((data) => res.json(data.rows))
    .catch((error) => res.sendStatus(500));
});

app.get("/api/users/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  pool
    .query("SELECT * from users WHERE user_id = $1", [id])
    .then((data) => res.json(data.rows))
    .catch(() => res.sendStatus(500));
});

app.post("/api/users", (req, res, next) => {
  const { user_id, first_name, last_name, age, active } = req.body;
  pool
    .query(
      "INSERT INTO users (user_id, first_name, last_name, age, active) VALUES ($1, $2, $3, $4)", [user_id, first_name, last_name, age, active]
    )
    .then((data) => res.json(data.rows))
    .catch((error) => res.sendStatus(500));
});

app.get("/api/orders", (req, res, next) => {
  pool
    .query("SELECT * FROM orders")
    .then((data) => res.json(data.rows))
    .catch(() => res.sendStatus(500));
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});