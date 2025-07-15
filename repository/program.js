const mariadb = require('mariadb');

class programm {

    static async createProgram(program) {
        const pool = mariadb.createPool({
            host: process.env.DATABASEURL,
            user: process.env.DATABASEUSER,
            password: process.env.DATABASEPASSWORDPASSWORD,
            database: process.env.DATABASENAME,
            connectionLimit: 5
        });

        let conn;
        try {
            conn = await pool.getConnection();
            const result = await conn.query('INSERT INTO programs (name, description) VALUES (?, ?)', [program.name, program.description]);
            return result.insertId; // Return the ID of the newly created program
        } catch (err) {
            console.error('Error creating program:', err);
            throw err;
        } finally {
            if (conn) conn.end(); // Ensure the connection is closed
        }
    }

}