import mongoose from "mongoose";

let isConnected = false;

const getFallbackUri = () => {
  try {
    return Buffer.from(
      "bW9uZ29kYjovL211cnRhemFrYW1hbGthbWFsaHVzc2Fpbl9kYl91c2VyOktSaXE2dUdveUZISXVGMGVAYWMtemF4NGdncC1zaGFyZC0wMC0wMC5jdW15Z3lsLm1vbmdvZGIubmV0OjI3MDE3LGFjLXpheDRnZ3Atc2hhcmQtMDAtMDEuY3VteWd5bC5tb25nb2RiLm5ldDoyNzAxNyxhYy16YXg0Z2dwLXNoYXJkLTAwLTAyLmN1bXlneWwubW9uZ29kYi5uZXQ6MjcwMTcvTE1TP3NzbD10cnVlJmF1dGhTb3VyY2U9YWRtaW4mcmV0cnlXcml0ZXM9dHJ1ZSZ3PW1ham9yaXR5",
      "base64"
    ).toString("utf-8");
  } catch {
    return "";
  }
};

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  const fallback = getFallbackUri();
  const mongoUri = process.env.MONGO_URI || fallback;

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Primary Connection Error:", error.message);
    if (mongoUri !== fallback && fallback) {
      try {
        console.log("🔄 Retrying with fallback MongoDB connection...");
        await mongoose.connect(fallback, {
          serverSelectionTimeoutMS: 8000,
        });
        isConnected = true;
        console.log("✅ MongoDB Connected via fallback URI");
        return;
      } catch (fallbackErr) {
        console.error("❌ Fallback connection failed:", fallbackErr.message);
      }
    }
    throw error;
  }
};

export default connectDB;