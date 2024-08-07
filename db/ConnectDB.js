import { connect, set } from "mongoose";

export const connectDB = async () => {
    set("strictQuery", true)
    try {
        await connect(process.env.NEXT_APP_MONGO_URL);
        console.log(`MongoDB Connected........`);
    } catch (error) {
        console.log(error);
    }
};




