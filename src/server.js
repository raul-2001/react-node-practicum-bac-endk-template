const app = require("./app");
const connectDB = require('./db/connect')
require('dotenv').config();


const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MANGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening port ${port}...`));
        
    } catch (error) {
        console.log(error);
    }
}

start();
