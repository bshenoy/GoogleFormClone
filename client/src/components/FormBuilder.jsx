import React, { useState, useEffect } from 'react';
import FormPage from './FormPage';
import axios from 'axios';

const formJson = {
    sections: [
        { fields: [{ name: 'name', label: 'Name', type: 'text' }, { name: 'email', label: 'Email', type: 'email' }] },
        { fields: [{ name: 'phone', label: 'Phone', type: 'text' }] },
        // Add more sections similarly
    ]
};

const FormBuilder = () => {
    const [formData, setFormData] = useState({});
    const [fileUploads, setFileUploads] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const initialFormData = {};
        formJson.sections.forEach(section => {
            section.fields.forEach(field => {
                initialFormData[field.name] = '';
            });
        });
        setFormData(initialFormData);
    }, []);

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
            alert('Please fill all fields before proceeding.');
        }
    };

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
    };

    const validateCurrentPage = () => {
        const sectionFields = formJson.sections[currentPage].fields;
        return sectionFields.every(field => formData[field.name]);
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

        try {
            const response = await axios.post('/api/forms', form);
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormPage
                fields={formJson.sections[currentPage].fields}
                formData={formData}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
            />
            <div>
                {currentPage > 0 && <button type="button" onClick={handlePrev}>Previous</button>}
                {currentPage < formJson.sections.length - 1 && <button type="button" onClick={handleNext}>Next</button>}
                {currentPage === formJson.sections.length - 1 && <button type="submit">Submit</button>}
            </div>
        </form>
    );
};

export default FormBuilder;
