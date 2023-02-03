const oracledb = require("oracledb");
const config = require("../database/dbConfig");

async function createTables() {
  let connection;
  try {
    connection = await oracledb.getConnection(config);

    console.log("Successfully connected to Oracle Database");
    const stmts = [
      `DROP TABLE useRecharges`,

      `DROP TABLE recharges`,

      `DROP TABLE tickets`,


      `create table tickets(
        cod_ticket varchar2(8) constraint pk_cod_ticket primary key,
        dateTime timestamp
        )`,

      `create table recharges
        (id_recharge  number(4) constraint pk_id_recharges primary key,
        type_recharge varchar2(10),
        fk_cod_ticket varchar2(8),
        status number(1),
        dateTime_recharge timestamp,
        validity timestamp,
        FOREIGN KEY (fk_cod_ticket) REFERENCES  tickets (cod_ticket))`,

      `create table useRecharges
      (id_use  number(4) constraint pk_id_use primary key,
      dateTime_use timestamp,
      fk_id_recharge number(4),
      FOREIGN KEY (fk_id_recharge) REFERENCES  recharges (id_recharge))`,

    ];

    for (const s of stmts) {
      try {
        await connection.execute(s);
      } catch (e) {
        if (e.errorNum != 942) throw e;
      }
    }
    await connection.commit();
  } catch (err) {
    console.error(err);
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
  createTables: createTables,
};
