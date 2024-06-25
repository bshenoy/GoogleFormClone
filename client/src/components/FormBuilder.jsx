import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Stepper,
  Step,
  StepLabel,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Tooltip, IconButton
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserData } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import icon for upload button
import { useNavigate } from 'react-router-dom';
import config from "../config/envConfig";


const formSections = [
  {
    title: 'Personal Information',
    page: "page1",
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text', required: true, description: "Enter your first name"},
      { name: 'middleName', label: 'Middle Name', type: 'text', description:"Enter your Middle name" },
      { name: 'lastName', label: 'Last Name', type: 'text', required: true , description:"Enter your last name" },
      { name: 'contactNumber', label: 'Contact Number', type: 'text', required: true, description:"Enter your primary contact number. Format: +(Country Code) [Number}" },
      { name: 'alternateContact', label: 'Alternate Contact', type: 'text' },
      { name: 'dob', label: 'Date of Birth', type: 'date', required: true, description:"Select your date of birth from the calendar." },
      { name: 'age', label: 'Age', type: 'text', required: true, description:"Enter your age. Format: 25" },
      { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
      { name: 'maritalStatus', label: 'Marital Status', type: 'select', options: ['Single', 'Married', 'Divorced', 'Widowed'], required: true, description:"Enter your marital status" },
      { name: 'nationality', label: 'Nationality', type: 'text', required: true , description:"Enter The name of the Country of nationality or citizenship"},
      { name: 'bloodGroup', label: 'Blood Group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true, description:" Enter your blood group. Format: O+, A-, etc" },
     
    ]
  },
  {
    title: 'Residential Information',
    page: "page2",
    fields: [
      { name: 'currentAddress', label: 'Current Residential Address', type: 'text', required: true, description: 'Enter your current residential address in Full along with City, State, and Postal Code' },
      { name: 'currentCity', label: 'City', type: 'text', required: true },
      { name: 'currentState', label: 'State', type: 'text', required: true },
      { name: 'currentPostalCode', label: 'Postal Code', type: 'text', required: true },
      { name: 'permanentAddress', label: 'Permanent Residential Address', type: 'text', required: true, description: 'Enter your Permanent Residential Address in Full along with City, State, and Postal Code' },
      { name: 'permanentCity', label: 'City', type: 'text', required: true },
      { name: 'permanentState', label: 'State', type: 'text', required: true },
      { name: 'permanentPostalCode', label: 'Postal Code', type: 'text', required: true },
      { name: 'currentLocation', label: 'Current Location', type: 'text', required: true, description: 'Enter your current city of residence.' },
      { name: 'preferredLocation', label: 'Preferred Location', type: 'text', required: true, description: 'Enter your preferred city of residence.' }
    ]
  },
  {
    title: 'Document Information',
    page: "page3",
    fields: [
      { name: 'passport', label: 'Do you have a passport?', type: 'select', options: ['YES', 'NO'], required: true, description: "Select 'Yes' if you have a passport, otherwise select 'No'." },
      { name: 'passportNumber', label: 'Passport Number', type: 'text', description: 'If you selected "Yes" above, enter your passport number.' },
      { name: 'passportCopy', label: 'Upload your Passport Copy', type: 'file', description: 'If you selected "Yes" above, upload a copy of your passport.' },
      { name: 'aadhaarNumber', label: 'Aadhaar Card Number', type: 'text', required: true, description: 'Enter your Aadhaar card number.' },
      { name: 'aadhaarCopy', label: 'Upload your Aadhaar Card Copy', type: 'file', description: 'Upload a copy of your Aadhaar Card.' },
      { name: 'panNumber', label: 'PAN Card Number', type: 'text', required: true, description: 'Enter your PAN card number.' },
      { name: 'panCopy', label: 'Upload your PAN Card Copy', type: 'file', description: 'Upload a copy of your PAN Card.' },
      { name: 'drivingLicense', label: 'Driving License Details (if applicable)', type: 'text', description: 'Enter your driving license number if applicable.' },
      { name: 'drivingLicenseCopy', label: 'Upload your Driving License Copy', type: 'file', description: 'Upload a copy of your Driving License Card.' },
      { name: 'voterID', label: 'Voter ID Card Details (if applicable)', type: 'text', description: 'Enter your Voter ID card number if applicable.' },
      { name: 'voterIDCopy', label: 'Upload your Voter ID Copy', type: 'file', description: 'Upload a copy of your Voter ID Card.' }
    ]
  },
  {
    title:"Professional Links and Documents",
    page:"page4",
    fields:[
      {
        name: 'photograph',
        label: 'Photograph',
        type: 'file',
        description: 'Upload a recent passport-sized photograph.',
        required: true
      },
      {
        name: 'workLinkPortfolio',
        label: 'Work Link/Portfolio (LinkedIn)',
        type: 'text',
        description: 'Provide a link to your LinkedIn profile or online portfolio.',
        required: true
      },
      {
        name: 'resumeCV',
        label: 'Please attach your updated Resume/CV',
        type: 'file',
        description: 'Upload your resume and portfolio.',
        required: true
      },
      {
        name: 'socialMediaLinks',
        label: 'Please share the links of your Social Media Profiles (LinkedIn, Facebook, Instagram, etc.)',
        type: 'text',
        description: 'Provide links to your social media profiles.',
        required: true
      },
      {
        name: 'onlinePortfolioWebsite',
        label: 'Please share the links of your Online Portfolio or Website (if applicable) {If none please mention NA}',
        type: 'text',
        description: 'Provide the link to your online portfolio or personal website.',
        required: true
      },
      {
        name: 'skills',
        label: 'Skills',
        type: 'text',
        description: 'List down all the skills you possess.',
        required: true
      },
      {
        name: 'languages',
        label: 'Languages',
        type: 'text',
        description: 'List the languages you are proficient in.',
        required: true
      }
    ]
  },{
    title: 'Educational Details',
    page: "page5",
    fields: [
      { name: 'educationCourse', label: 'Education: Course', type: 'text', required: true, description: 'Enter the course you have completed.' },
      { name: 'educationSpecialization', label: 'Education: Specialization', type: 'text', required: true, description: 'Enter your area of specialization.' },
      { name: 'educationInstitution', label: 'Education: Institution', type: 'text', required: true, description: 'Enter the name of the institution where you completed your course.' },
      { name: 'educationYearOfCompletion', label: 'Education: Year of Completion', type: 'date', required: true, description: 'Enter the date you completed your course.' },
      { name: 'educationPassPercentage', label: 'Education: Pass Percentage', type: 'text', required: true, description: 'Enter the percentage you achieved in your course. Format: 85.6%.' },
      { name: 'educationProof', label: 'Upload Proof of Education Completion', type: 'file', required: true, description: 'Upload the proof of your education completion. Please upload your Consolidated MarkSheet or Semester Marksheet, Provisional Degree Certificate, Degree Completion Certificate.' },
      { name: 'anyCertifications', label: 'Any Certifications', type: 'select', options: ['YES', 'NO'], required: true, description: "Select 'Yes' if you have any certifications, otherwise select 'No'." },
      { name: 'certificationsObtained', label: 'Certifications Obtained', type: 'text', description: 'List the certifications you have obtained.' },
      { name: 'certificationAuthority', label: 'Name of Certification Issuing Authority', type: 'text', description: 'Enter the name of the authority that issued the certification.' },
      { name: 'certificationCompletionDate', label: 'Certification Completion Date', type: 'date', description: 'Select the date when the certification was issued.' },
      { name: 'certificationProof', label: 'Upload Proof of Certification', type: 'file', description: 'Upload the proof of your certification.' },
      { name: 'expectedJoinDate', label: 'Please Enter a Tentative Date you are expected to join us in case you are shortlisted/selected', type: 'date', required: true },
      { name: 'fresherStatus', label: 'Are you a Fresher?', type: 'select', options: ['YES', 'NO'], required: true }
    ]
  },
  {
    title: 'Employment Details',
    page: "page6",
    fields: [
      { name: 'totalExperience', label: 'Total Experience', type: 'text', required: true, description: 'Enter your total years & months of experience.' },
      { name: 'organizationName', label: 'Organization Name', type: 'text', required: true, description: 'Enter the name of the current organization you have worked for.' },
      { name: 'designation', label: 'Designation/Job Title', type: 'text', required: true, description: 'Enter your current designation or job title.' },
      { name: 'employmentStartDate', label: 'Employment Start Date', type: 'date', required: true, description: 'Select the start date of your employment.' },
      { name: 'employmentEndDate', label: 'Employment End Date', type: 'date', description: 'Select the end date of your employment (if applicable).' },
      { name: 'rolesAndResponsibilities', label: 'List down your Roles and Responsibilities', type: 'textarea', required: true, description: 'Describe your roles and responsibilities in the organization.' },
      { name: 'reasonForLeaving', label: 'Reason for Leaving', type: 'text', required: true, description: 'Provide the reason for leaving your previous or current job.' },
      { name: 'currentCTC', label: 'Current CTC', type: 'text', required: true, description: 'Enter your current Cost to Company (CTC). Format: INR 100000 (Annual CTC)' },
      { name: 'expectedCTC', label: 'Expected CTC', type: 'text', required: true, description: 'Enter your expected Cost to Company (CTC). Format: INR 100000 (Annual CTC)' },
      { name: 'noticePeriod', label: 'Notice Period', type: 'text', required: true, description: 'Enter the number of days in your notice period. Example: 60 Days' }
    ]
  },
  {
    title: 'Documents Related to Experience',
    page: "page7",
    fields: [
      { name: 'salarySlips', label: 'Upload Salary Slips/Payslips (Last 3 Months)', type: 'file', required: true, description: 'Upload your Salary Slips/Payslips for the last 3 months.' },
      { name: 'bankStatements', label: 'Upload Bank Statements (Last 3 Months)', type: 'file', required: true, description: 'Upload your Bank Statements for the last 3 months.' },
      { name: 'offerLetter', label: 'Upload Offer Letter/Joining Letter/Employment Agreement', type: 'file', required: true, description: 'Upload Offer Letter/Joining Letter/Employment Agreement from organization(s) for your total experience.' },
      { name: 'incrementLetter', label: 'Upload Increment Letter', type: 'file', required: true, description: 'Upload increment letter from organization(s) for your total experience.' },
      { name: 'relievingLetter', label: 'Upload Relieving Letter/Experience Certificates', type: 'file', required: true, description: 'Upload Relieving Letter/Experience Certificates/Acceptance of resignation from present employment.' }
    ]
  },
  {
    title: 'Current Offers',
    page: "page8",
    fields: [
      { name: 'currentlyServingNoticePeriod', label: 'Are you Currently Serving your Notice Period?', type: 'select', options: ['YES', 'NO'], required: true },
      { name: 'lastWorkingDate', label: 'Mention your Last working Date', type: 'date', description: 'If you selected "Yes" above, enter your last working date in the organization.' },
      { name: 'existingOffers', label: 'Do you hold any existing offers?', type: 'select', options: ['YES', 'NO', 'MAYBE'], required: true },
      { name: 'offerFromOrganization', label: 'If yes, enter the name of the organization you hold an offer from', type: 'text' },
      { name: 'offerProof', description: 'Please upload the offer letter or proof of offer you hold', type: 'file' },
      { name: 'offerAccepted', label: 'Please confirm if you have accepted the offer you hold?', type: 'select', options: ['YES', 'NO', 'MAYBE'], required: true },
      { name: 'offerAcceptanceDate', label: 'Please mention the date you have to accept the Offer you hold or the date you have Accepted the Offer', type: 'date' },
      { name: 'expectedCTCoffered', label: 'If no, mention the expected/proposed CTC you are offered', type: 'text' }
    ]
  },
  {
    title: 'Reference Contact and Verification Consent',
    page: "page9",
    fields: [
      { name: 'referenceContactName', label: 'One reference contact person name from this organization', type: 'text', required: true },
      { name: 'referenceContactDesignation', label: 'One reference contact person\'s Designation from this organization', type: 'text', required: true },
      { name: 'referenceContactNumber', label: 'One reference contact person\'s Contact No from this organization', type: 'text', required: true },
      { name: 'referenceContactEmail', label: 'One reference contact person\'s Email ID from this organization', type: 'email', required: true },
      { name: 'referenceContactRelationship', label: 'Professional Relationship with the mentioned reference contact person', type: 'text', required: true },
      { name: 'referenceCheckDate', label: 'Date we can Reference Check', type: 'date', required: true }
    ]
  },
  {
    title: 'Verification Consent',
    page: "page10",
    fields: [
      { name: 'employmentVerificationConsent', label: 'Employment Verification Consent', type: 'select', options: ['YES', 'NO', 'MAYBE'], required: true },
      { name: 'authorizationToContact', label: 'Authorization to contact previous employers and references', type: 'select', options: ['YES', 'NO', 'MAYBE'], required: true }
    ]
  },
  {
    title: 'Background Checks and Disclosures',
    page: "page11",
    fields: [
      { name: 'backgroundCheckConsent', label: 'Consent to conduct background checks', type: 'select', options: ['YES', 'NO', 'MAYBE'], required: true },
      { name: 'drugAlcoholTestingConsent', label:'Consent to Drug/Alcohol Testing', type: 'select', options: ['YES', 'NO', 'MAYBE'], required: true },
      { name: 'criminalConvictions', label:"Disclosure of any Criminal Convictions ", description: 'Select Yes if you have any criminal convictions or pending criminal cases, otherwise select No.', type: 'select', options: ['YES', 'NO'], required: true },
      { name: 'criminalConvictionDetails', label:"Details of any Criminal Convictions or Pending Criminal Cases", description: 'Details of any Criminal Convictions or Pending Criminal Cases', type: 'textarea', description: 'Provide details of your criminal convictions or pending criminal cases, including charges, dates, and outcomes, if applicable.' },
      { name: 'formSubmissionAcknowledgement', label:"Acknowlegement", description:'By submitting this form, I acknowledge that all the information provided is true and accurate to the best of my knowledge.', type: 'select', options: ['YES', 'NO'], required: true }
    ]
  }
  // Add more sections as needed
];

const FormBuilder = () => {
  const [formData, setFormData] = useState({});
  const [fileUploads, setFileUploads] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const userData = useSelector(selectUserData);
  const [userEmailName, setUserEmailName] = useState({ email: '', name: '' });
  const dispatch = useDispatch();
  const apiCalled = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEmailName = async () => {
      try {
        const response = await axios.get(`${config.DOMAIN_URL}auth/user-details`, { withCredentials: true });
        setUserEmailName({ email: response.data.email, name: response.data.name });
     
      } catch (error) {
        console.error('Error fetching user email and name:', error);
      }
    };

    if (!apiCalled.current) {
      fetchUserEmailName();
      apiCalled.current = true;
    }
  }, []);

  useEffect(() => {
    const initializeFormData = () => {
      const initialData = { ...userEmailName };
      formSections.forEach(section => {
        section.fields.forEach(field => {
          // Set field value from userData if available
          if (userData && userData[section.page]) {
            let fieldValue = userData[section.page][field.name] || '';
  
            // Format date fields if they exist and are not empty
            if (field.type === 'date' && fieldValue) {
              fieldValue = new Date(fieldValue).toISOString().split('T')[0];
            }
  
            initialData[field.name] = fieldValue;
          } else {
            initialData[field.name] = '';
          }
        });
      });
  
      setFormData(initialData);
    };
  
    if (userData && userEmailName.email) {
      initializeFormData();
    }
  }, [userData, userEmailName]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   console.log("file uplaod", name, files)
  //   setFileUploads({ ...formData, [name]: files[0] });
  // };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const selectedFile = files[0];

    // Check file size (1 MB limit)
    if (selectedFile.size > 512 * 512) {
      alert('File size exceeds 0.5 MB limit.');
      return;
    }

    // Read file content as Base64 string
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      // Update formData with Base64 string

      setFormData({ ...formData, [name]: reader.result });
    };
    reader.onerror = () => {
      console.error('Error reading file.');
    };
  };

  const savePageData = async () => {
    const pageData = formSections[currentPage].fields.reduce((data, field) => {
      data[field.name] = formData[field.name];
      return data;
    }, {});

    try {
      const response = await axios.post(`${config.DOMAIN_URL}api/save_response`, {
        page: `page${currentPage + 1}`, // Adjusted to match backend page naming convention
        data: pageData
      }, { withCredentials: true });

      dispatch(loginSuccess(response.data.data.responses));

   return response;
    } catch (error) {
      console.error('Error saving page data:', error);
    }
  };

  const handleNext = async () => {
    if (validateCurrentPage()) {
      await savePageData();
      setCurrentPage(currentPage + 1);
    } else {
      alert('Please fill all required fields before proceeding.');
    }
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  // const validateCurrentPage = () => {
  //   const sectionFields = formSections[currentPage].fields;
  //   return sectionFields.every(field => !field.required || formData[field.name]);
  // };
  const validateCurrentPage = () => {
    const sectionFields = formSections[currentPage].fields;
    const isValid = sectionFields.every(field => {
      if (field.required) {
        // Check if required field has a value
        const fieldValue = formData[field.name];
        const isFieldValid = !!fieldValue; // Check if field is filled
        if (!isFieldValid) {
          console.log(`Validation failed for ${field.name}`);
        }
        return isFieldValid;
      } else {
        // Non-required field, always consider valid
        return true;
      }
    });
  
    // console.log('Current page validation result:', isValid);
       return isValid;
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const saveResponse = await savePageData();

    if (saveResponse.status === 200) {
      try {
        const response = await axios.get(`${config.DOMAIN_URL}api/submit_form`, { withCredentials: true });

        if (response.data.message === 'Form submitted successfully') {
          navigate('/saved');
          // console.log("/saved being called");
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  } catch (error) {
    console.error('Error saving page data:', error);
  }
};


  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 4 }}>
        <Stepper activeStep={currentPage} alternativeLabel>
          {formSections.map((section, index) => (
            <Step key={index}>
              <StepLabel>{section.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" sx={{ marginTop: 4 }}>
          {formSections[currentPage].title}
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {currentPage === 0 && (
            <Grid item xs={12}>
              <TextField
                label="Name"
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                disabled
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                disabled
              />
            </Grid>
          )}
          {formSections[currentPage].fields.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              {field.type === 'select' ? (
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>{field.label + (field.required ? ' *' : '')}</InputLabel>
                  <Select
                    label={field.label + (field.required ? ' *' : '')}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                  >
                    {field.options.map((option, idx) => (
                      <MenuItem key={idx} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="body2" color="textSecondary">{field.description}</Typography>
              
                </FormControl>
              ) : field.type === 'file' ? (
                <>
              
                  <input
                    type="file"
                    accept="image/*, application/pdf"
                    name={field.name}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id={`file-input-${field.name}`}
                  />
                  <TextField
                    type="text"
                    name={field.name}
                    value={formData[field.name] || ''}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onClick={() => document.getElementById(`file-input-${field.name}`).click()}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <Tooltip title="Upload File">
                        <IconButton component="span">
                          <CloudUploadIcon />
                        </IconButton>
                      </Tooltip>
                      )
                    }}
                  />
                  {field.description && (
                    <Typography variant="body2" color="textSecondary">{field.description}</Typography>
                  )}
                </>
              ) : (
                <>
                <TextField
                  label={field.label + (field.required ? ' *' : '')}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required={field.required}
                />
                     <Typography variant="body2" color="textSecondary">{field.description}</Typography>
                     </>
              )}
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          {currentPage > 0 && <Button onClick={handlePrev}>Previous</Button>}
          {currentPage < formSections.length - 1 ? (
            <Button onClick={handleNext} variant="contained" color="primary">
              Next
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          )}
        </Box>
      </form>
    </Container>
  );
};

export default FormBuilder;