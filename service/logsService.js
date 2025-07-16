const log = require("../repository/Logs");

class logService{

    static async createLog(logContent) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await log.createLog(logContent);
                resolve(result);
            } catch (error) {
                console.error('Error creating log:', error);
                reject(error.message);
            }
        })
    }

    static async getLogsOffProgramm(programId, limit, offset) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await log.getLogsOffProgramm(programId, limit, offset);
                resolve(result);
            } catch (error) {
                console.error('Error fetching logs:', error);
                reject(error.message);
            }
        })
    }

    static async getLogsFromDate(programId, date, limit, offset) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await log.getLogsFromDate(programId, date, limit, offset);
                resolve(result);
            } catch (error) {
                console.error('Error fetching logs from date:', error);
                reject(error.message);
            }
        })
    }

    static async deleteLog(logId) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await log.deleteLog(logId);
                resolve(result);
            } catch (error) {
                console.error('Error deleting log:', error);
                reject(error.message);
            }
        })
    }
}