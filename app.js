
require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


// Import database configuration
const config = require('./config/dbConfig');

// CORS Configuration
const corsOptions = {
    origin: "*", // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, sessions, etc.)
    optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); // Enable CORS with the specified options
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'secret56555',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.MONGO_URL }), 
    cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
        sameSite: 'lax', // Adjust as necessary based on your security requirements
        secure: false, // Set to true if using HTTPS
    }
}));

// Connect to MongoDB
mongoose.connect(config.MONGO_URL , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '/client/build')));

// API Routes
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));

// Middleware to handle client-side routing and prevent caching of index.html
app.use((req, res, next) => {
    // Check if the request is for a static file (e.g., .ico, .js, .css, .jpg, .png, .map)
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next(); // If it's a static file, continue to the next middleware or route handler
    } else {
        // Set cache control headers for the index.html file
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        // Serve the index.html file
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    }
});

// // Serve the index.html file for any other request (handle client-side routing)
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});