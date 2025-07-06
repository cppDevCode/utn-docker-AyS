const express = require("express");
const db = require("./db");

// Define express app
const app = express();
const port = 4000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));
app.get("/api/greet", (req, res) => { 
  const name = req.query.name;
  res.json({ message: `Hola ${name}` })});
app.get("/api/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});
app.post('/api/students', async (req, res) => {
  const datosRecibidos = req.body.name;
  try {
    console.log(`Datos recibidos = ${datosRecibidos}`);
    const result = await db.query(`INSERT INTO students `
                                    +`(name) VALUES ('${datosRecibidos}')`
                                                      + ` RETURNING id, name`);    
    res.json({
      id: result.rows[0].id,
      name: result.rows[0].name
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
})

// Start the server
app.listen(port, () => console.log(`App running on port ${port}`));
