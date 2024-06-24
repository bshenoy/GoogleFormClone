const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    responses: {
        page1: {
            firstName: String,
            middleName: String,
            lastName: String,
            contactNumber: String,
            alternateContact: String,
            dob: Date,
            age: String,
            gender: String,
            maritalStatus: String,
            nationality: String,
            bloodGroup: String,
            profilePicture: String, // Assuming you store file path or URL
        },
        page2: {
            aadhar: String,
            pan: String,
        },
    },
    fileUploads: {
        type: Map,
        of: String // Store file URLs
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
