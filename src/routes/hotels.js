const express = require('express')
const router = express.Router()

const {
    getAllHotels,
    getSingleHotel,
    createHotel,
    deleteHotel,
    updateHotel,
    getList,

} = require('../controllers/hotels')

router.route('/').get(getAllHotels).post(createHotel).get(getList)
router.route('/:id').get(getSingleHotel).delete(deleteHotel).patch(updateHotel)


module.exports = router