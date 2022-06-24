import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            UseUnifiedTopology: true,
            useNewUrlParser: true,
        })

        console.log(`Conexiunea către baza de date MongoDB cu id: ${conn.connection.host} a fost efectuată cu succes!`.cyan.underline)
    } catch (error) {
        console.error(`Eroare: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB