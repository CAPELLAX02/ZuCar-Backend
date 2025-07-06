const express = require('express');
const cors = require('cors');
const app = express();

const { PORT } = require("./config/env")

app.use(express.json());
app.use(cors({
  origin: [
    // 'http://localhost:63342',
    // 'http://localhost:5500',
    'http://localhost:5173',
    'https://zu-car-frontend.vercel.app',
    'https://www.zucararackaplama.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/test', (_, res) => res.json("Test success, server is live!"));

app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/dataRoutes'));
app.use('/', require('./routes/mailRoutes'))

app.use((err, req, res, _next) => {
  console.error('❌', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

