const programService = require('../service/programService');
const router = require('express').Router();

router.get("/programs", async (req, res) => {
    try {
        const programs = await programService.getPrograms();
        res.status(200).json(programs);
    } catch (error) {
        console.error("Error fetching programs:", error);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/program", async (req, res) => {
    try {
        const programName = req.query.name; // Assuming the program data is sent in the request body
        const createdProgramId = await programService.createProgram(programName);
        res.status(201).json({ id: createdProgramId });
    } catch (error) {
        console.error("Error creating program:", error);
        res.status(500).send("Internal Server Error");
    }
})

router.delete("/program", async (req, res) => {
    try {
        const programId = req.query.id;
        await programService.deleteProgram(programId);
        res.status(204).send(`succesfull deletet the programm ${programId}`); // No content
    } catch (error) {
        console.error("Error deleting program:", error);
        res.status(500).send("Internal Server Error"+ error.message);
    }
})