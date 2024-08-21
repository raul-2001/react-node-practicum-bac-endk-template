const {BadRequestError} = require('../errors/bad-request')
const {NotFountError} = require('../errors/not-found')
const Hotel = require('../models/hotels')
const {StatusCodes} = require('http-status-codes')
const axios = require('axios');


const getList = async (req, res) => {
    const { lat, lng, city, brand, chain, state, street,zipCode, limit = 250 } = req.query;
    if ((!lat || !lng) && !city){
        return res.status(400).json({ error: 'Please provide latitude and longtitude.'});
    }

    try {
        const response  = await axios.getAllHotels('https://travel-amigos.com/getAllHotels', {
            params : {
                latitude: lat,
                longitude: lng,
                city: city,
                brand: brand,
                chain: chain,
                limit: Math.min(limit, 250), // limit to a max of 250 hotels
            }
        })

        const hotels = response.data;

        res.json({
            hotels: hotels.map(hotel => ({
                id: hotel.id,
                name: hotel.name,
                chain: hotel.chain,
                state: hotel.state,
                street: hotel.street,
                zipCode: hotel.zipCode,
                distance: hotel.distance,
                neighborhood: hotel.neighborhood,
                images: hotel.images,
                amenities: hotel.amenities, // Room or property amenities
            }))
        })

    } catch (error) {
        res.status(500).json({error: 'Error fetching hotels'})
    }
}


const getAllHotels = async (req, res) => {
    const hotels = await Hotel.find().sort('-createdAt')
    res.status(StatusCodes.OK).json({hotels})
}

const getSingleHotel = async (req, res) => {
    const {//user: {userId}, 
    params: {id: hotelId}}  = req
    const hotel = await Hotel.findOne({_id: hotelId, 
        //createdBy: userId
    })

    if(!hotel) {
        throw new NotFountError(`No hotel with id ${hotelId}`)
    }

    res.status(StatusCodes.OK).json({ hotel })
}

const createHotel = async (req, res) => {
    //req.body.createdBy = req.user.userId

    const hotel = await hotel.create(req.body)
    res.status(StatusCodes.CREATED).json({ hotel })
}

const deleteHotel = async (req, res) => {
    const {//user: //{userId}, 
        params: {id: hotelId}} = req
    const hotel = await Hotel.findOneAndDelete({//_id: hotelId, 
        createdBy: userId})
    if(!hotel) {
        throw new NotFountError(`No hotel with id ${hotelId}`)
    }
    
    res.status(StatusCodes.OK).send("hotel deleted")

}    

const updateHotel = async (req, res) => {
    const {body: {state, city, street, zipCode}, 
        ///user: {userId}, 
        params: {id: hotelId}} = req

    if (state === '') {
        throw new BadRequestError('state can not be empty')
    }    

    if (city === '') {
        throw new BadRequestError('city can not be empty')
    }   

    if (street === '') {
        throw new BadRequestError('street can not be empty')
    }   

    if (zipCode === '') {
        throw new BadRequestError('zipCode can not be empty')
    }   

    const hotel = await Hotel.findByIdAndUpdate({_id: hotelId,
        /// createdBy: userId
        }, 
        req.body, {new: true, runValidators: true})

    if (!hotel) {
        throw new NotFountError(`No hotel with id ${hotelId}`)
    }    

    res.status(StatusCodes.OK).json({ hotel })
}

module.exports = {
    getAllHotels,
    getSingleHotel,
    createHotel,
    deleteHotel,
    updateHotel, 
    getList
}