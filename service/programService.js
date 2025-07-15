const ProgramRepository = require("../repository/program")

class ProgramService {
    /**
     * Creates a new program in the database.
     *
     * @param {string} program - The program object to be created.
     * @returns {Promise<string>} - Resolves with the ID of the newly created program.
     */
    static async createProgram(program) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await ProgramRepository.createProgram(program);
                resolve(result);
            } catch (error) {
                console.error('Error creating program:', error);
                reject(error.message);
            }
        });
    }

    static async getPrograms() {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await ProgramRepository.getPrograms();
                resolve(result);
            } catch (error) {
                console.error('Error fetching programs:', error);
                reject(error);
            }
        });
    }

    /**
     * Deletes a program from the database.
     * @param programId {number} - The ID of the program to be deleted.
     * @returns {Promise<string>}
     */
    static async deleteProgram(programId) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await ProgramRepository.deleteProgram(programId);
                resolve(result);
            } catch (error) {
                console.error('Error deleting program:', error);
                reject(error.message);
            }
        });
    }

}

module.exports = ProgramService;