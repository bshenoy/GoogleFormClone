const express = require('express');
const multer = require('multer');
const { ensureAuth } = require('../middleware/auth');
const Response = require('../models/Response');
const User = require('../models/User');
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
const pageMappings = {
    'page1': 'page1',
    'page2': 'page2',
    'page3': 'page3',
    'page4': 'page4',
    'page5': 'page5',
    'page6': 'page6',
    'page7': 'page7',
    'page8': 'page8',
    'page9': 'page9',
    'page10':"page10",
    "page11":"page11"
};
router.post('/save_response', ensureAuth, async (req, res) => {
    try {
        const { page, data } = req.body;
      
        let response = await Response.findOne({ userId: req.user._id });
        if (!response) {
            response = new Response({ userId: req.user._id, responses: {} });
        }
        
        if (pageMappings.hasOwnProperty(page)) {
            response.responses[pageMappings[page]] = data;
        } else {
            // Handle case where page is not recognized
            console.error(`Invalid page: ${page}`);
            res.status(404).json({ error: "Inavalid page deatils"})
        }
        // Add more conditions for other pages as needed


        response.updatedAt = Date.now();
        const savedData = await response.save();
        res.status(200).json({
            message: 'Form submitted successfully',
            data: savedData
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});



router.get('/submit_form', ensureAuth, async (req, res) => {
    try {
        console.log("submit_form called ")
        // Update the user's formSubmissionCompleted flag
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { formSubmissionCompleted: true },
            { new: true }
        );

        res.status(200).json({
            message: 'Form submitted successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// router.get('/saved_responses', ensureAuth, async (req, res) => {
//     try {
     
//       const response = await Response.findOne({ userId: req.session.userId });
//       if (response) {
//         res.status(200).json(response.responses);
//       } else {
//         res.status(404).json({ message: 'No saved responses found' });
//       }
//     } catch (err) {
//       console.error(err); // Logging the error
//       res.status(500).json({ error: err.message });
//     }
//   });

module.exports = router;
