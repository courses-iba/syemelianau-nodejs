const mongoose = require('mongoose');

const URI = process.env.DB_URI;

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('🟢 The database is connected.'))
    .catch(error => console.log(`🔴 Unable to connect to the database: ${error}.`));

const disconnect = callback => mongoose.connection.close(() => callback());

process.once('SIGUSR2', () => disconnect(() => process.kill(process.pid, 'SIGUSR2')));
process.on('SIGTERM', () => disconnect(() => process.exit()));
process.on('SIGINT', () => disconnect(() => process.exit()));

require('../models/products.model');
