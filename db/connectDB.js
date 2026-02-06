const mongoose = require('mongoose');
const liveMongodb ="mongodb+srv://jainvikas887:ram123@cluster0.ji699.mongodb.net/apistudent2026?appName=Cluster0"

const connectDB =async()=>{
    try {
        const conn =await mongoose.connect(liveMongodb);
        console.log("mongodb Connected")
    } catch (error) {
        console.log(error)
    }

}

module.exports =connectDB