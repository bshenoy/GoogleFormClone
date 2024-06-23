import React from 'react';
import FormBuilder from '../components/FormBuilder';

const Form = ({ userData }) => (
  <div>
    <h1>Fill the Form</h1>
    <FormBuilder userData={userData} />
  </div>
);

export default Form;