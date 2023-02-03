const express = require("express");
require('dotenv').config()
const migration = require("./migrations/createTables")
const dbOperation = require("./database/dbOperation");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;


migration.createTables();




app.use(cors());
app.use(express.json());




app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Main");
});



app.get("/getAllRecharges", dbOperation.fetchDataRecharges);
app.get("/getAllTickets", dbOperation.fetchDataTickets);
app.get("/check/:codigo",dbOperation.getTicketById);
app.get("/useRecharges/:id",dbOperation.getUseRechargeById);



app.post("/create", dbOperation.createTicket);
app.post("/addRecharge", dbOperation.insertTicketRecharges);
app.put("/teste",dbOperation.useTicket);






