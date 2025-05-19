import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new DailyRotateFile({
      filename: "logs/%DATE%-error.log", // Rotates logs daily
      datePattern: "YYYY-MM-DD",
      maxSize: "10m", // Max log file size (10MB)
      maxFiles: "14d", // Keep logs for 14 days
      level: 'error' // Story inly errors in the error log file
    }),
    new DailyRotateFile({
      filename: 'logs/%DATE%-combined.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '10m',
      maxFiles: '14d',
      level: 'info', // Store info and above in the combined log file
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
      level: 'debug', // Allow debugging logs to show in the console during development
    }),
  ]
})


// 4. Integrate with Monitoring Services (Optional) TODO

export default logger;