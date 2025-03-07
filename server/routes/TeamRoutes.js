const express = require("express")
const { getTeams, createTeam, updateTeam, deleteTeam } = require ("../controllers/TeamController.js");

const router = express.Router();

router.get('/teams', getTeams);
router.post('/create-teams', createTeam);
router.put('/edit-teams/:id', updateTeam);
router.delete('/delete-teams/:id', deleteTeam);

module.exports = router
