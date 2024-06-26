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
            currentAddress: String,
            currentCity: String,
            currentState: String,
            currentPostalCode: String,
            permanentAddress: String,
            permanentCity: String,
            permanentState: String,
            permanentPostalCode: String,
            currentLocation: String,
            preferredLocation: String
          },
          page3: {
            passport: String,
            passportNumber: String,
            passportCopy: String,
            aadhaarNumber: String,
            aadhaarCopy: String,
            panNumber: String,
            panCopy: String,
            drivingLicense: String,
            drivingLicenseCopy: String,
            voterID: String,
            voterIDCopy: String
          },
          page4:{
         
                photograph: String,
                workLinkPortfolio: String,
                resumeCV: String,
                socialMediaLinks: String,
                onlinePortfolioWebsite: String,
                skills: String,
                languages: String
          
          },
          page5: {
            educationCourse: String,
            educationSpecialization: String,
            educationInstitution: String,
            educationYearOfCompletion: Date,
            educationPassPercentage: String,
            educationProof: String,
            anyCertifications: String,
            certificationsObtained: String,
            certificationAuthority: String,
            certificationCompletionDate: Date,
            certificationProof: String,
            expectedJoinDate: Date,
            fresherStatus: String
          },
          page6: {
            totalExperience: String,
            organizationName: String,
            designation: String,
            employmentStartDate: Date,
            employmentEndDate: Date,
            rolesAndResponsibilities: String,
            reasonForLeaving: String,
            currentCTC: String,
            expectedCTC: String,
            noticePeriod: String
          },
          page7: {
            salarySlips: String,
            bankStatements: String,
            offerLetter: String,
            incrementLetter: String,
            relievingLetter: String
          },
          page8: {
            currentlyServingNoticePeriod: String,
            lastWorkingDate: Date,
            existingOffers: String,
            offerFromOrganization: String,
            offerProof: String,
            offerAccepted: String,
            offerAcceptanceDate: Date,
            expectedCTCoffered: String
          },
          page9: {
            referenceContactName: String,
            referenceContactDesignation: String,
            referenceContactNumber: String,
            referenceContactEmail: String,
            referenceContactRelationship: String,
            referenceCheckDate: Date
          },
          page10: {
            employmentVerificationConsent: String,
            authorizationToContact: String
          },
          page11: {
            backgroundCheckConsent: String,
            drugAlcoholTestingConsent: String,
            criminalConvictions: String,
            criminalConvictionDetails: String,
            formSubmissionAcknowledgement: String
          }
          
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
