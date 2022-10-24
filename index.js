require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const { Pool } = require('pg');

const pool = new Pool();


app.get("/api/calls", (req, res, next) => {
  pool
    .query("SELECT * FROM calls LIMIT 10")
    .then((data) => res.json(data.rows))
    .catch((error) => res.sendStatus(500));
});

app.get("/api/calls/:id", (req, res, next) => {
  const { id } = req.params;
  //console.log(id);
  pool
    .query("SELECT * FROM calls WHERE call_id = $1", [id])
    .then((data) => res.json(data.rows))
    .catch((error) => res.sendStatus(500));
});

app.post("/api/calls", (req, res, next) => {
  const { created_date,
    hour_of_day,
    conversation,
    sales_function,
    vertical,
    contact_call,
    call_count,
    sdr_pod_role,
    day_of_week,
    lead_id } = req.body;
  pool
    .query(
      "INSERT INTO calls (created_date, hour_of_day, conversation, sales_function, vertical, contact_call, call_count, sdr_pod_role, day_of_week, lead_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [created_date, hour_of_day, conversation, sales_function, vertical, contact_call, call_count, sdr_pod_role, day_of_week, lead_id]
    )
    .then((data) => res.json(data.rows))
    .catch((error) => res.sendStatus(500));
});

app.delete("/api/calls/:id", (req, res, next) => {
  const { id } = req.params;

  pool
    .query("DELETE FROM calls WHERE call_id = $1", [id])
    .then((data) => res.json(data.rows))
    .catch((error) => res.sendStatus(500));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});