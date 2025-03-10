const express = require("express")
const { getEvents, createEvent, updateEvent, deleteEvent} = require ("../controllers/EventsController.js");

const router = express.Router();

router.post('/create-events', createEvent); //CREATE
router.get('/events', getEvents); //READ
router.put('/update-events/:id', updateEvent); //UPDATE
router.delete('/delete-events/:id', deleteEvent) //DELETE

module.exports = router