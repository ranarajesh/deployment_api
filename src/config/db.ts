import mongoose from 'mongoose';

const connectDb = async (uri: string): Promise<void> => {
  const dbConn = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB connect to ${dbConn.connection.host}`);
};

export default connectDb;
