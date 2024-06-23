import React from 'react';

const FormPage = ({ fields, formData, handleChange, handleFileChange }) => (
    <div>
        {fields.map(field => (
            <div key={field.name}>
                <label>{field.label}</label>
                {field.type === 'file' ? (
                    <input type="file" name={field.name} onChange={handleFileChange} />
                ) : (
                    <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                    />
                )}
            </div>
        ))}
    </div>
);

export default FormPage;
