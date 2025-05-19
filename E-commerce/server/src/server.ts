import express from 'express';
import cors from 'cors';
import routes from './routes/index.routes';
import errorHandler from './middlewares/error.middleware';
import logger from './utils/logger';
import connectDB from './config/db';

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"], // Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`, { stack: err.stack });
  process.exit(1); // Exit to avoid unpredictable state
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (reason: any) => {
  logger.error(`Unhandled Rejection: ${reason}`);
});

// Start Server only after DB connects
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Server startup failed", { error });
    process.exit(1);
  }
};

// Start the server
startServer();
