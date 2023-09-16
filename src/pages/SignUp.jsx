import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { auth } from '../firebaseConfig';

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from '@firebase/auth';
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Too short')
    .max(16, 'Too long')
    .required('Password is required'),
  email: Yup.string().email('Invalid email').required('Emmail is required'),
});

function SignUp() {
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (vals) => {
          await createUserWithEmailAndPassword(
            auth,
            vals.email,
            vals.password
          ).then((userCredintals) => {
            const user = userCredintals.user;
            sendEmailVerification(user);
            alert('success please verfiy your email');
          });
        }}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <h1 style={{ textAlign: 'center', margin: '12px 0' }}>
              Sign Up Page
            </h1>
            <TextField
              label='Email'
              name='email'
              fullWidth
              variant='outlined'
              margin='dense'
              value={values.email}
              onChange={handleChange}
              error={errors.email && touched.email}
              helperText={<ErrorMessage name='email' />}
              required
            />
            <TextField
              label='Password'
              name='password'
              type='password'
              fullWidth
              variant='outlined'
              margin='dense'
              value={values.password}
              onChange={handleChange}
              error={errors.password && touched.password}
              helperText={<ErrorMessage name='password' />}
              required
            />

            <Button variant='contained' type='submit' color='primary' fullWidth>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUp;
