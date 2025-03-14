const express = require("express")
const { getTeams, createTeam, updateTeam, deleteTeam, downloadPdf } = require ("../controllers/TeamController.js");

const router = express.Router();

router.get('/teams', getTeams);
router.post('/create-teams', createTeam);
router.put('/edit-teams/:id', updateTeam);
router.delete('/delete-teams/:id', deleteTeam);
router.get('/download-pdf/:id', downloadPdf);

module.exports = router
