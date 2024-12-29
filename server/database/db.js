import mongoose from "mongoose";

const DBconnection = async () => {
    const MONODB_URL = `mongodb+srv://anikettripathi179:wjlACp7QTFrOy8tw@cluster0.uo9gy.mongodb.net/`;
    try {
        await mongoose.connect(MONODB_URL);
        console.log('Connected to mongoDB ');

    } catch (error) {
        console.error('Error while connecting with the database', error.message);

    }
}

export default DBconnection