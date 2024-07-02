import mongoose , {ConnectOptions} from "mongoose";

const connectMongoDb = async(mongodbUrl : string) =>{
    try{
        await mongoose.connect(mongodbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }as ConnectOptions)
        console.info('MongoDB Connected...')
    }catch(e){
        console.error('Error connecting to mongodb',e);
    }
}

export const db = {connectMongoDb};