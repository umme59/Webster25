require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const logger = require('./middleware/loggerMiddleware');
const scheduler = require('./jobs/scheduler');

const authRoutes = require('./routes/authRoutes');
const medicationRoutes = require('./routes/medicationRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const logRoutes = require('./routes/logRoutes');
const wellnessRoutes = require('./routes/wellnessRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
console.log("🔑 Loaded MONGO_URI:", process.env.MONGO_URI);
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// routes
app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/wellness', wellnessRoutes);
app.use('/api/ai', aiRoutes);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// start cron scheduler
scheduler.start();
