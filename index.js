require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const { Pool } = require('pg');

const pool = new Pool();


//Begin Users Endpoints

app.get("/api/users", (req, res, next) => {
  pool
    .query("SELECT * FROM users")
    .then((data) => res.json(data.rows))
    .catch((error) => res.sendStatus(500));
});

app.get("/api/users/:id", (req, res, next) => {
  const { id } = req.params;
  //console.log(id);
  pool
    .query("SELECT * FROM users WHERE user_id = $1", [id])
    .then((data) => res.json(data.rows))
    .catch((error) => res.sendStatus(500));
});

app.post("/api/users", (req, res, next) => {
  const { user_id, first_name, last_name, age, active } = req.body;
  pool
    .query(
      "INSERT INTO users (user_id, first_name, last_name, age, active) VALUES ($1, $2, $3, $4, $5)", [user_id, first_name, last_name, age, active]
    )
    .then((data) => res.json(data.rows))
    .catch((error) => res.sendStatus(500));
});

app.put("/api/users/:id", (req, res, next) => {
  const { id } = req.params;
  const { user_id, first_name, last_name, age, active } = req.body;

  pool
    .query(
      "UPDATE users SET user_id = $1, first_name = $2, last_name = $3, age = $4, active = $5 WHERE user_id = $6" , [user_id, first_name, last_name, age, active, id]
    )
    .then((data) => res.json(data.rows))
    .catch((error) => res.status(500).send("That user could not be found"));
});

app.delete("/api/users/:id", (req, res, next) => {
  const { id } = req.params;

  pool
    .query("DELETE FROM users WHERE user_id = $1", [id])
    .then((data) => res.json(data.rows))
    .catch((error) => res.sendStatus(500));
});

// Begin Orders Endpoints

app.get("/api/orders", (req, res, next) => {
  pool
    .query("SELECT * FROM orders")
    .then((data) => res.json(data.rows))
    .catch((error) => res.sendStatus(500));
});

app.get("/api/orders/:id", (req, res, next) => {
  const { id } = req.params;
  //console.log(id);
  pool
    .query("SELECT * FROM orders WHERE order_id = $1", [id])
    .then((data) => res.json(data.rows))
    .catch((error) => res.sendStatus(500));
});

app.post("/api/orders", (req, res, next) => {
  const { order_id, price, date, user_id } = req.body;
  console.log(req.body);
  pool
    .query(
      "INSERT INTO orders (order_id, price, date, user_id) VALUES ($1, $2, $3, $4)", [order_id, price, date, user_id]
    )
    .then((data) => res.json(data.rows))
    .catch((error) => res.sendStatus(500));
});

app.put("/api/orders/:id", (req, res, next) => {
  const { id } = req.params;
  const { order_id, price, date, user_id } = req.body;

  pool
    .query(
      "UPDATE users SET user_id = $1, first_name = $2, last_name = $3, age = $4, active = $5 WHERE user_id = $6" , [order_id, price, date, user_id, id]
    )
    .then((data) => res.json(data.rows))
    .catch((error) => res.status(500).send("That order could not be found"));
});

app.delete("/api/orders/:id", (req, res, next) => {
  const { id } = req.params;

  pool
    .query("DELETE FROM orders WHERE user_id = $1", [id])
    .then((data) => res.json(data.rows))
    .catch((error) => res.sendStatus(500));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});