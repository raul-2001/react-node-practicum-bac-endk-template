const mongoose = require('mongoose')

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide hotel name'],
        maxlength: [50, 'Name can not be more than 50 characters'],
    },
    state: {
        type: String,
        required: [true, 'Please provide state']
    },
    city: {
        type: String,
        required: [true, 'Please provide city']
    },
    street: {
        type: String,
        required: [true, 'Please provide street']
    },
    zipCode: {
        type: String,
        required: [true, 'Please provide zip code'],
        maxlength: [5, 'Zip-code can not be more than 5 characters']
    },
    brand: {
        type: String,
    },
    stars: {
        type: Number,
        required: [true, 'Please provide stars for hotel']
    },
    latitude: {
        type: String,
        required: [true, 'Please provide latitude of hotel'],
        maxlength: 12,
    },
    longitude: {
        type: String,
        required: [true, 'Please provide longitude of hotel'],
        maxlength: 12,
    },
    chain: {
        type: String
    },
    // createdBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User',
    //     required: [true, 'Please provide user']
    // }
    
})

module.exports = mongoose.model('Hotel', HotelSchema)