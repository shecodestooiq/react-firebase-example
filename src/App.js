import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Too short')
    .max(16, 'Too long')
    .required('First name is required'),
  lastName: Yup.string()
    .min(3, 'Too short')
    .max(16, 'Too long')
    .required('Last name is required'),
  email: Yup.string().email('Invalid email').required('email is required'),
  phoneNumber: Yup.string().matches(
    '^(?:+971|00971|0)(?!2)((?:2|3|4|5|6|7|9|50|51|52|55|56)[0-9]{7,})$'
  ),
});

function App() {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        onSubmit={(vals) => {
          console.log(vals);
          // submit logic
        }}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <TextField
              label='First Name'
              name='firstName'
              fullWidth
              variant='outlined'
              margin='dense'
              value={values.firstName}
              onChange={handleChange}
              error={errors.firstName && touched.firstName}
              helperText={<ErrorMessage name='firstName' />}
              required
            />
            <TextField
              label='Last Name'
              name='lastName'
              fullWidth
              variant='outlined'
              margin='dense'
              value={values.lastName}
              onChange={handleChange}
              error={errors.lastName && touched.lastName}
              helperText={<ErrorMessage name='lastName' />}
              required
            />
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
            <Button variant='contained' type='submit' color='primary' fullWidth>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
