const express = require('express');
const multer = require('multer');
const { ensureAuth } = require('../middleware/auth');
const Response = require('../models/Response');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post('/save_response', ensureAuth, async (req, res) => {
    try {
        const { page, data } = req.body;
        let response = await Response.findOne({ userId: req.user._id });
        if (!response) {
            response = new Response({ userId: req.user._id, responses: {} });
        }
        response.responses[page] = data;
        await response.save();
        res.status(200).json({ message: 'Response saved successfully' });
    } catch (err) {
        console.error(err); // Logging the error
        res.status(500).json({ error: err.message });
    }
});

router.post('/submit_form', ensureAuth, upload.single('file'), async (req, res) => {
    try {
        const response = new Response({
            userId: req.user._id,
            responses: req.body.responses,
            fileUploads: { file: req.file.path }
        });
        await response.save();
        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (err) {
        console.error(err); // Logging the error
        res.status(500).json({ error: err.message });
    }
});

router.get('/saved_responses', ensureAuth, async (req, res) => {
    try {
        const response = await Response.findOne({ userId: req.user._id });
        if (response) {
            res.status(200).json(response.responses);
        } else {
            res.status(404).json({ message: 'No saved responses found' });
        }
    } catch (err) {
        console.error(err); // Logging the error
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
