const express = require('express')
const router = express.Router()

const { createRoom, getAllRooms, deleteRoom } = require('../controllers/room')


router.route('/:hotelId').get(getAllRooms).post(createRoom)
router.route('/:id').delete(deleteRoom)

module.exports = router