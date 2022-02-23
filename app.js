const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.route');

const app = express();

app.use(express.json({ extended: true }));
app.use('/api/auth', authRouter);

const PORT = config.get('port') || 5000;

const start = () => {
    try {
        mongoose.connect(config.get('mongourl'), {
            useUnifiedTopology: true
        });

        app.listen(PORT, () => console.log(`App started on port ${PORT}`));
    } catch (error) {
        console.log('Server Error', error.message);
        process.exit(1);
    }
}

start();

