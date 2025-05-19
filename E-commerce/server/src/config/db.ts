import { logger } from "@sentry/node";
import mongoose from "mongoose";

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

const connectDB = async (attempt = 1): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info("✅ MongoDB connected");
  } catch (error) {
    logger.error(`MongoDB connection failed (Attempt ${attempt}/${MAX_RETRIES})`, { error });

    if (attempt < MAX_RETRIES) {
      logger.info(`🔁 Retrying connection in ${RETRY_DELAY / 1000} seconds...`);
      setTimeout(() => connectDB(attempt + 1), RETRY_DELAY);
    } else {
      logger.error("Max retry attempts reached. Exiting...");
      process.exit(1);
    }
  }
};

export default connectDB;