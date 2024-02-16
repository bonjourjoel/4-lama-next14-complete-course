const { default: mongoose } = require("mongoose");

const connection = {};

export const connectToDb = async () => {
  try {
    // check if already connected in dev mode reload
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGODB_URL);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
