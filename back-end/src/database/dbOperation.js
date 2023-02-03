const oracledb = require("oracledb");
const config = require("./dbConfig");
const { randomCode, addValidity } = require("../utils/utils.js");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

let connection;

async function fetchDataRecharges(req, res) {
  try {
    const connection = await oracledb.getConnection(config);
    const result = await connection.execute(
      "SELECT * FROM recharges  ORDER BY dateTime_recharge"
    );
    if (result.rows.length > 0) {
      return res.send(result.rows).status(200);
    }
    return res.status(404).json({
      status: "error",
      menssage: "there are no refills",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error." });
  }
}

async function fetchDataTickets(req, res) {
  try {
    const connection = await oracledb.getConnection(config);
    const result = await connection.execute(
      "select  max(tickets.cod_ticket) as cod from tickets"
    );
    if (result.rows.length > 0) {
      return res.send(result.rows).status(200);
    }
    return res.status(404).json({
      status: "error",
      menssage: "No tickets generated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error." });
  }
}

async function getUseRechargeById(req, res) {
  try {
    const idRecharge = parseInt(req.params.id);
    const connection = await oracledb.getConnection(config);
    const result = await connection.execute(
      `SELECT * FROM userecharges where fk_id_recharge = ${idRecharge} ORDER BY dateTime_use`
    );
    if (result.rows.length > 0) {
      return res.send(result.rows).status(200);
    }
    return res.status(404).json({
      status: "error",
      menssage: "there is no use",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error." });
  }
}


async function createTicket(req, res) {
  try {
    const codigo = randomCode();
    const dateTime = new Date();
    const connection = await oracledb.getConnection(config);
    const sql = `insert into tickets (cod_ticket, dateTime) values(:1, :2)`;
    const rows = [[codigo, dateTime]];
    let result = await connection.executeMany(sql, rows);
    if (result) {
      return res.status(201).json({
        status: "success",
        message: "New ticket has been created!",
        rows,
      });
    }
    return res.json({
      status: "error",
      message: "Unable to create the ticket , please try again later",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "internal server error.",
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function insertTicketRecharges(req, res) {
  try {
    const codigo = req.body.codigo;
    const typeTicket = req.body.typeTicket;
    const connection = await oracledb.getConnection(config);
    const result = await connection.execute(
      `SELECT * FROM tickets where cod_ticket = '${codigo}'`
    );
    if (result.rows.length > 0) {
      const id = parseInt(Math.random() * 10000);
      const dateTime = new Date();
      const connection = await oracledb.getConnection(config);
      const sql = `insert into recharges (id_recharge, type_recharge,fk_cod_ticket,status,dateTime_recharge,validity) values(:1, :2, :3, :4, :5, :6)`;
      const rows = [[id, typeTicket, codigo, 0, dateTime, null]];
      let result = await connection.executeMany(sql, rows);
      if (result) {
        return res.status(201).json({
          status: "success",
          message: "New recharge performed!",
          rows,
        });
      }
      return res.json({
        status: "error",
        message: "Unable to reload ticket , please try again later",
      });
    } else {
      return res.status(404).json({
        status: "error",
        menssage: "ticket not found",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      menssage: "internal server error.",
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function getTicketById(req, res) {
  try {
    const codigo = req.params.codigo;
    const connection = await oracledb.getConnection(config);
    const result = await connection.execute(
      `SELECT * FROM tickets where cod_ticket = '${codigo}'`
    );
    if (result.rows.length > 0) {
      const result = await connection.execute(
        `SELECT * FROM recharges where FK_COD_TICKET = '${codigo}'`
      );
      if (result.rows.length > 0) {
        const connection = await oracledb.getConnection(config);
        await connection.execute(
          "UPDATE recharges SET status = :1  where validity < sysdate and status != 2 and status != 3",
          [2]
        );
        const result = await connection.execute(`
      SELECT A.COD_TICKET,A.DATETIME,B.id_recharge,B.type_recharge,B.status,B.validity ,B.datetime_recharge
      FROM TICKETS A, RECHARGES B
      WHERE A.COD_TICKET = B.FK_COD_TICKET and B.FK_COD_TICKET = '${codigo}'
      ORDER BY b.datetime_recharge`);
        return res.send(result.rows).status(200);
      }
      return res.status(400).json({
        status: "error",
        messager: "ticket has no refills",
      });
    }
    return res.status(404).json({
      status: "error",
      messager: "ticket not found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "internal server error.",
    });
  }
}

async function useTicket(req, res) {
  try {
    const idRecharge = parseInt(req.body.idRecharge);
    const connection = await oracledb.getConnection(config);
    const result = await connection.execute(`
      SELECT * FROM recharges where id_recharge = ${idRecharge}`);
    if (result.rows[0].STATUS === 0) {
      if (result.rows[0].TYPE_RECHARGE === "UNICO" || result.rows[0].TYPE_RECHARGE === "DUPLO") {
        const dateTime = new Date();
        const validity = addValidity(dateTime, 1);
        await connection.execute(
          "UPDATE recharges SET status = :1, validity = :2 where id_recharge = :3",
          [1, validity, idRecharge]
        );
        const id = parseInt(Math.random() * 10000);
        const sql = `insert into useRecharges (id_use,datetime_use,fk_id_recharge) values(:1, :2, :3)`;
        const rows = [[id,dateTime, idRecharge]];
        await connection.executeMany(sql, rows);
        return res.status(201).json({
          status: "success",
          message: "first use of recharge",
        });
      } else if (result.rows[0].TYPE_RECHARGE === "SEMANAL") {
        const dateTime = new Date();
        const validity = addValidity(dateTime, 10080);
        await connection.execute(
          "UPDATE recharges SET status = :1, validity = :2 where id_recharge = :3",
          [1, validity, idRecharge]
        );
        const id = parseInt(Math.random() * 10000);
        const sql = `insert into useRecharges (id_use,datetime_use,fk_id_recharge) values(:1, :2, :3)`;
        const rows = [[id,dateTime, idRecharge]];
        await connection.executeMany(sql, rows);
        return res.status(201).json({
          status: "success",
          message: "first use of recharge",
        });
      }
      else if (result.rows[0].TYPE_RECHARGE === "MENSAL") {
        const dateTime = new Date();
        const validity = addValidity(dateTime, 43200);
        await connection.execute(
          "UPDATE recharges SET status = :1, validity = :2 where id_recharge = :3",
          [1, validity, idRecharge]
        );
        const id = parseInt(Math.random() * 10000);
        const sql = `insert into useRecharges (id_use,datetime_use,fk_id_recharge) values(:1, :2, :3)`;
        const rows = [[id,dateTime, idRecharge]];
        await connection.executeMany(sql, rows);
        return res.status(201).json({
          status: "success",
          message: "first use of recharge",
        });
      }
    } else if (result.rows[0].STATUS === 1 || result.rows[0].STATUS === 3) {
      const dateTime = new Date();
      if (result.rows[0].VALIDITY >= dateTime) {
        const id = parseInt(Math.random() * 10000);
        const sql = `insert into useRecharges (id_use,datetime_use,fk_id_recharge) values(:1, :2, :3)`;
        const rows = [[id,dateTime, idRecharge]];
        await connection.executeMany(sql, rows);
        return res.status(200).json({
          status: "success",
          message: "Recharge used",
        });
      } else if (result.rows[0].TYPE_RECHARGE === "DUPLO") {
        if (result.rows[0].STATUS === 3) {
           await connection.execute(
            "UPDATE recharges SET status = :1 where id_recharge = :3",
            [2, idRecharge]
          );
        } else {
          const validity = addValidity(dateTime, 40);
           await connection.execute(
            "UPDATE recharges SET status = :1, validity = :2 where id_recharge = :3",
            [3, validity, idRecharge]
          );
          const id = parseInt(Math.random() * 10000);
          const sql = `insert into useRecharges (id_use,datetime_use,fk_id_recharge) values(:1, :2, :3)`;
          const rows = [[id,dateTime, idRecharge]];
          await connection.executeMany(sql, rows);
          return res.status(202).json({
            status: "success",
            message: "second use of dual ticket",
          });
        }
      } else {
        await connection.execute(
          "UPDATE recharges SET status = :1 where id_recharge = :3",
          [2, idRecharge]
        );
        return res.status(200).json({
          status: "success",
          message: "Recharge used",
        });
      }
    } else {
      return res.status(401).json({
        status: "error",
        message: "expired ticket",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "internal server error.",
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports = {
  fetchDataTickets: fetchDataTickets,
  fetchDataRecharges: fetchDataRecharges,
  createTicket: createTicket,
  insertTicketRecharges: insertTicketRecharges,
  getTicketById: getTicketById,
  useTicket: useTicket,
  getUseRechargeById: getUseRechargeById
};
