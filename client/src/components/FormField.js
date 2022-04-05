import { Stack, TextField } from '@mui/material';
import { ErrorMessage, Field } from 'formik';

const FormikField = ({ name, label, type = 'text', required = false }) => {
  return (
    <Stack
      sx={{
        width: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: 2,
      }}
    >
      <Field
        required={required}
        autoComplete="off"
        as={TextField}
        label={label}
        name={name}
        type={type}
        fullWidth
        helperText={<ErrorMessage name={name} />}
      />
    </Stack>
  );
};

export default FormikField;
