const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

// Link all routes
app.use('/api/investors', require('./routes/investorRoutes'));
app.use('/api/funds', require('./routes/fundRoutes'));
app.use('/api/sips', require('./routes/sipRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));