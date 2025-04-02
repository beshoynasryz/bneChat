import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/BNEchat', {
          
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Database connection error:', err.message);
    }
};

export default connectDB;  