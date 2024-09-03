const {BadRequestError} = require('../errors/bad-request')
const {NotFountError} = require('../errors/not-found')
const Room = require('../models/rooms')
const Hotel = require('../models/hotels')
const {StatusCodes} = require('http-status-codes')


const createRoom = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId
        const {user: {userId}, params: {hotelId}, body: { roomNumber, bedrooms, floor,
            currency, room_cost_per_night, room_types, bed_type, view, images
         }} = req;
        // const { hotel } = req.params;

        const room = await Room.create({hotelId, roomNumber, bedrooms, floor,
            currency, room_cost_per_night, room_types, bed_type, view, images, createdBy: userId})
        console.log(room)

        // Add room to hotel's rooms array
        await Hotel.findByIdAndUpdate(hotelId, {$push: { rooms: room._id }})

        res.status(StatusCodes.CREATED).json({ message: 'Room added successfully', room })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error adding room', error });
    }

}

// Get all rooms for a specific hotel
const getAllRooms = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const rooms = await Room.find({ hotelId }).sort('-createdAt');
        res.status(StatusCodes.OK).json({ rooms })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching rooms', error });
    }
} 

const get_availabilty = async (req, res) => {
    const { date } = req.body
    const availableRooms = await Room.find( {
        booking: {
            $not: {
                $elemMatch: {
                    date: new Date(date),
                    booked: true,
                }
            }
        }
    })

    res.send(`Available rooms on ${date}: ${availableRooms.map(room => room.roomNumber).join(', ')}`);
        
}

const deleteRoom = async (req, res) => {
    const {user: {userId}, 
        params: {id: roomId}} = req
    const room = await Room.findOneAndDelete({_id: roomId, 
        createdBy: userId})
    if(!room) {
        throw new NotFountError(`No hotel with id ${roomId}`)
    }
    
    res.status(StatusCodes.OK).send("hotel deleted")

}  

module.exports = {createRoom, getAllRooms, deleteRoom}