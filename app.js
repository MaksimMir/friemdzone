const express = require('express');
const config = require('config');
const authRouter = require('./routes/auth.route');
const eventRouter = require('./routes/event.route');
const messageRouter = require('./routes/message.route');
const feedbackRouter = require('./routes/feedback.route');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/event', eventRouter);
app.use('/api/message', messageRouter);
app.use('/api/feedback', feedbackRouter);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (res, req) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000;



app.listen(PORT, () => console.log(`App started on port ${PORT}`));


