import mongoose from "mongoose";

const connectDB = async () => {
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log('MongoDb connection has failed', error);
        process.exit()
    }
}

export default connectDB;