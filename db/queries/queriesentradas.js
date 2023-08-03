const getPool = require("../pool");

// Coger todos las entradas ordenado por votos o fecha(Entradilla)
async function getAll(votos = "entradilla") {
  let connection;

  try {
    connection = await getPool();

    const [entradas] = await connection.query(
      "SELECT * FROM entradas ORDER BY ?? DESC LIMIT 3",
      [votos]
    );

    return entradas;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Filtrar por lugar o categoría ordenado por votos o fecha(Entradilla)
async function getConsulta(lugar, categoria, votos = "entradilla") {
  let connection;

  try {
    connection = await getPool();

    const [consulta1] = await connection.query(
      "SELECT * FROM entradas WHERE lugar like ? AND categoria = ? ORDER BY ?? DESC LIMIT 3",
      [`%${lugar}%`, categoria, votos]
    );

    const [consulta2] = await connection.query(
      "SELECT * FROM entradas WHERE lugar like ? OR categoria = ? ORDER BY ?? DESC LIMIT 3",
      [`%${lugar}%`, categoria, votos]
    );

    if (consulta1.length > 0) {
      return consulta1;
    } else if (consulta2.length > 0) {
      return consulta2;
    } else {
      return (consulta3 = "No se han encontrado coincidencias");
    }
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

async function entradaNueva(
  titulo,
  categoria,
  lugar,
  texto,
  user_id,
  savePhoto
) {
  let connection;

  try {
    connection = await getPool();

    const insertarEntrada = connection.query(
      "INSERT INTO entradas (titulo, categoria, lugar, texto, user_id, foto) VALUES(?,?,?,?,?,?)",
      [titulo, categoria, lugar, texto, user_id, savePhoto[0]]
    );
    savePhoto.forEach((foto, i = 1) => {
      if (i !== 1) {
        connection.query("INSERT INTO entradas (foto" + i + ") VALUES (?)", [
          foto,
        ]);
        i++;
      }
    });
  } finally {
    if (connection) connection.release();
  }
}
// Exportamos las funciones
module.exports = {
  getAll,
  getConsulta,
  entradaNueva,
};
