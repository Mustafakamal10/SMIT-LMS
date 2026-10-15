import mongoose from "mongoose";

let isConnected = false;

const DIRECT_FALLBACK_URI =
  "mongodb://murtazakamalkamalhussain_db_user:KRiq6uGoyFHIuF0e@ac-zax4ggp-shard-00-00.cumygyl.mongodb.net:27017,ac-zax4ggp-shard-00-01.cumygyl.mongodb.net:27017,ac-zax4ggp-shard-00-02.cumygyl.mongodb.net:27017/LMS?ssl=true&authSource=admin&retryWrites=true&w=majority";

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  const mongoUri = process.env.MONGO_URI || DIRECT_FALLBACK_URI;

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Primary Connection Error:", error.message);
    if (mongoUri !== DIRECT_FALLBACK_URI) {
      try {
        console.log("🔄 Retrying with direct MongoDB cluster connection...");
        await mongoose.connect(DIRECT_FALLBACK_URI, {
          serverSelectionTimeoutMS: 8000,
        });
        isConnected = true;
        console.log("✅ MongoDB Connected via direct cluster URI");
        return;
      } catch (fallbackErr) {
        console.error("❌ Direct cluster connection failed:", fallbackErr.message);
      }
    }
    throw error;
  }
};

export default connectDB;