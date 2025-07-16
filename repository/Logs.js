const mariadb = require('mariadb');

class log{
    /** * Creates a new log entry in the database.
     *
     * @param log {object}
     * @returns {Promise<unknown>}
     */
    static async createLog(log) {
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
                const result = await conn.query('INSERT INTO logItems (programId, logcode,logtext,timestamp) VALUES (?,?,?, ?)', [log.programId, log.logcode, log.logtext, log.date]);
                resolve(result.insertId); // Return the ID of the newly created log
            } catch (err) {
                console.error('Error creating log:', err);
                reject(err); // Reject the promise with the error
            } finally {
                if (conn) await conn.end(); // Ensure the connection is closed
            }
        });
    }

    /** * Retrieves all logs for a specific program from the database.
     *
     * @param programId {number}
     * @param limit {number} - The maximum number of logs to retrieve.
     * @param offset {number} - The number of logs to skip before starting to collect the result set.
     * @returns {Promise<unknown>}
     */
    static async getLogsOffProgramm(programId, limit, offset) {
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
                const result = await conn.query('SELECT * FROM logItems WHERE programId = ? order by logItems.timestamp LIMIT ? OFFSET ?', [programId,limit, offset]);
                resolve(result); // Return the list of logs for the specified program
            } catch (err) {
                console.error('Error fetching logs:', err);
                reject(err); // Reject the promise with the error
            } finally {
                if (conn) await conn.end(); // Ensure the connection is closed
            }
        });
    }

    /** * Retrieves logs for a specific program from a given date.
     *
     * @param programId {number}
     * @param date {date}
     * @param limit {number} - The maximum number of logs to retrieve.
     * @param offset {number} - The number of logs to skip before starting to collect the result set.
     * @returns {Promise<unknown>}
     */

    static async getLogsFromDate(programId, date,limit, offset) {
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
                const result = await conn.query('SELECT * FROM logItems WHERE programId = ? AND timestamp >= ? order by logItems.timestamp LIMIT ? OFFSET ?', [programId, date, limit,offset]);
                resolve(result); // Return the list of logs for the specified program from the given date
            } catch (err) {
                console.error('Error fetching logs:', err);
                reject(err); // Reject the promise with the error
            } finally {
                if (conn) await conn.end(); // Ensure the connection is closed
            }
        });
    }

    /** * Deletes a log entry from the database by its ID.
     *
     * @param logId {number} - The ID of the log to be deleted.
     * @returns {Promise<unknown>}
     */
    async deleteLog(logId) {
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
                const result = await conn.query('DELETE FROM logItems WHERE id = ?', [logId]);
                resolve(result.affectedRows > 0); // Return true if a log was deleted
            } catch (err) {
                console.error('Error deleting log:', err);
                reject(err); // Reject the promise with the error
            } finally {
                if (conn) await conn.end(); // Ensure the connection is closed
            }
        });
    }

}
module.exports = log;
