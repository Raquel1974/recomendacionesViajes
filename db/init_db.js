const getPool = require('./pool');

initDb();

async function initDb () {


    let connection;

    try{

        connection = await getPool();

        console.log('Creando tablas...');
        await connection.query(`CREATE TABLE IF NOT EXISTS usuarios(
            id INT UNSIGNED AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(80) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            avatar VARCHAR(50),
            PRIMARY KEY (id)
        )`);

        await connection.query(`CREATE TABLE IF NOT EXISTS entradas(
            id INT UNSIGNED AUTO_INCREMENT,
            titulo VARCHAR(50) UNIQUE NOT NULL,
            categoria VARCHAR(50) NOT NULL,
            lugar VARCHAR(100) NOT NULL,
            entradilla DATETIME DEFAULT CURRENT_TIMESTAMP,
            texto TEXT NOT NULL,
            foto VARCHAR(50) NOT NULL,
            votos INT UNSIGNED,
            user_id INT UNSIGNED NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (user_id) REFERENCES usuarios(id)
        )`)

        await connection.query(`CREATE TABLE IF NOT EXISTS comentarios(
            id INT UNSIGNED AUTO_INCREMENT,
            comentario VARCHAR(500) NOT NULL,
            entrada_id INT UNSIGNED NOT NULL,
            user_id INT UNSIGNED NOT NULL,
            foto VARCHAR(50),
            create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            FOREIGN KEY (entrada_id) REFERENCES entradas(id),
            FOREIGN KEY (user_id) REFERENCES usuarios(id)
        )`)

        console.log('Tablas creadas.');

    } catch (error) {
        console.log(error.message);

    } finally{
        if(connection) {
            connection.release();
            process.exit();
        }
    }
}