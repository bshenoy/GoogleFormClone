import React, { useState, useEffect } from 'react';
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
  Typography
} from '@mui/material';
import axios from 'axios';
import '../index.css';  // Import your CSS file

const formSections = [
  {
    title: 'Personal Information',
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text', required: true },
      { name: 'middleName', label: 'Middle Name', type: 'text' },
      { name: 'lastName', label: 'Last Name', type: 'text', required: true },
      { name: 'contactNumber', label: 'Contact Number', type: 'text', required: true },
      { name: 'alternateContact', label: 'Alternate Contact', type: 'text' },
      { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
      { name: 'age', label: 'Age', type: 'text', required: true },
      { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
      { name: 'maritalStatus', label: 'Marital Status', type: 'select', options: ['Single', 'Married', 'Divorced', 'Widowed'], required: true },
      { name: 'nationality', label: 'Nationality', type: 'text', required: true },
      { name: 'bloodGroup', label: 'Blood Group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
      { name: 'profilePicture', label: 'Profile Picture', type: 'file' }
    ]
  },
  {
    title: 'Additional Information',
    fields: [
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'country', label: 'Country', type: 'text' }
    ]
  },
  {
    title: 'Additional Information',
    fields: [
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'country', label: 'Country', type: 'text' }
    ]
  },
  {
    title: 'Additional Information',
    fields: [
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'country', label: 'Country', type: 'text' }
    ]
  },
  {
    title: 'Additional Information',
    fields: [
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'country', label: 'Country', type: 'text' }
    ]
  },
  {
    title: 'Additional Information',
    fields: [
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'country', label: 'Country', type: 'text' }
    ]
  },
  {
    title: 'Additional Information',
    fields: [
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'country', label: 'Country', type: 'text' }
    ]
  },
  {
    title: 'Additional Information',
    fields: [
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'country', label: 'Country', type: 'text' }
    ]
  },
  {
    title: 'Additional Information',
    fields: [
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'country', label: 'Country', type: 'text' }
    ]
  },
  {
    title: 'Additional Information',
    fields: [
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'country', label: 'Country', type: 'text' }
    ]
  },
  {
    title: 'Additional Information',
    fields: [
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'country', label: 'Country', type: 'text' }
    ]
  },
];

const FormBuilder = ({ userData }) => {
  const [formData, setFormData] = useState({});
  const [fileUploads, setFileUploads] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const initialFormData = {};
    formSections.forEach(section => {
      section.fields.forEach(field => {
        initialFormData[field.name] = '';
      });
    });

    // Pre-fill email and name from userData and disable them
    if (userData) {
      initialFormData['email'] = userData.email || '';
      initialFormData['name'] = userData.name || '';
    }
    setFormData(initialFormData);

    // Fetch user data if the user is already logged in
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user', { withCredentials: true });
        const user = response.data.user;
        setFormData({
          ...formData,
          ...user
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (!userData) {
      fetchUserData();
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFileUploads({ ...fileUploads, [name]: files[0] });
  };

  const handleNext = () => {
    if (validateCurrentPage()) {
      setCurrentPage(currentPage + 1);
    } else {
      alert('Please fill all required fields before proceeding.');
    }
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const validateCurrentPage = () => {
    const sectionFields = formSections[currentPage].fields;
    return sectionFields.every(field => !field.required || formData[field.name]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });
    Object.keys(fileUploads).forEach(key => {
      form.append(key, fileUploads[key]);
    });
 console.log ("form data", formData)
    try {
      const response = await axios.post('/api/forms', form);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
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
                value={formData.name}
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
                value={formData.email}
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
                </FormControl>
              ) : field.type === 'file' ? (
                <TextField
                  type="file"
                  name={field.name}
                  onChange={handleFileChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              ) : (
                <TextField
                  label={field.label + (field.required ? ' *' : '')}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required={field.required}
                />
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
