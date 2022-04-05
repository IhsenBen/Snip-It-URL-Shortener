import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material/';
import { Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import Errors from '../components/Errors';
import FormikField from '../components/FormField';
import { AuthContext } from '../context/auth-context';

const initialLogIn = {
  username: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LogIn = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const auth = useContext(AuthContext);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/user/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.username,
            password: values.password,
          }),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.message);
        throw new Error(responseData.message);
      }

      auth.login(responseData.user._id, responseData.user.username);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="Form" style={{ marginTop: '100px' }}>
      <Errors error={error} loading={loading} />
      {loading && <CircularProgress color="inherit" />}

      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Log In
      </Typography>
      <Grid container justifyContent="center" spacing={4}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialLogIn}
          validationSchema={validationSchema}
        >
          {(props) => {
            return (
              <Form>
                <Grid
                  container
                  sx={{
                    px: '150px',
                    py: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Grid item xs={12} sm={12}>
                    <FormikField
                      name="username"
                      label="username"
                      type="text"
                      required={true}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <FormikField
                      name="password"
                      label="Password"
                      type="password"
                      required={true}
                    />
                  </Grid>

                  <Grid item xs={12} container justifyContent="flex-end">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!props.isValid || !props.dirty}
                    >
                      Log In
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
      <Grid container justifyContent="center" spacing={4}>
        <Stack sx={{ width: 150, textAlign: 'center' }}>
          <Typography variant="body2" gutterBottom sx={{ textAlign: 'center' }}>
            Don't have an account?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/signup"
            sx={{ textTransform: 'none', width: '100%' }}
          >
            Sign Up
          </Button>
        </Stack>
      </Grid>
    </div>
  );
};

export default LogIn;
