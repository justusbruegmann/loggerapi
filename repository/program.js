const mariadb = require('mariadb');

class program {

    /** * Creates a new program in the database.
     *
     * @returns {Promise<unknown>}
     * @param {String} name The name of the program to be created.
     */
    static async createProgram(name) {
        return new Promise(async (resolve, reject) => {
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
                const result = await conn.query('INSERT INTO program (name) VALUES (?)', [name]);
                resolve(result.insertId); // Return the ID of the newly created program
            } catch (err) {
                console.error('Error creating program:', err);
                reject(err); // Reject the promise with the error
            } finally {
                if (conn) await conn.end(); // Ensure the connection is closed

            }
        });
    }

    /** * Retrieves all programs from the database.
     *
     * @returns {Promise<unknown>}
     */
    static async getPrograms() {
        return new Promise(async (resolve, reject) => {
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
                const result = await conn.query('SELECT * FROM program');
                resolve(result); // Return the list of programs
            } catch (err) {
                console.error('Error fetching programs:', err);
                reject(err); // Reject the promise with the error
            } finally {
                if (conn) await conn.end(); // Ensure the connection is closed
            }
        });
    }

    /** * Deletes a program from the database by its ID.
     *
     * @returns {Promise<unknown>}
     * @param programId {number}
     */
    static async deleteProgram(programId) {
        return new Promise(async (resolve, reject) => {
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
                const result = await conn.query('DELETE FROM program WHERE id = ?', [programId]);
                resolve(result.affectedRows > 0); // Return true if a program was deleted
            } catch (err) {
                console.error('Error deleting program:', err);
                reject(err); // Reject the promise with the error
            } finally {
                if (conn) await conn.end(); // Ensure the connection is closed
            }
        });
    }

}

module.exports = program;