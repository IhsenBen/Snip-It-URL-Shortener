import { Box, Button, Grid, Link, Typography } from '@mui/material/';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Errors from './Errors';
import FormikField from './FormField';

const urlValidation = Yup.object().shape({
  url: Yup.string().required('Required').url('Must be a valid URL'),
});

const initialValues = {
  url: '',
};

const URLShortnerForm = ({route, setLoadTable}) => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');



  const handleSubmit = async (values) => {
    setUrl(values.url);

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}${route}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            longUrl: values.url,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setShortUrl(responseData.link.shortUrl);
     setLoadTable(prevloadTable => !prevloadTable);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Something went wrong, please try again.');
    }
  };

  return (
    <div className="Form" style={{ marginTop: '100px' }}>
      <Errors error={error} loading={loading} />
      <Typography variant="h4"  sx={{ textAlign: 'center' }}>
        Snip Your URL
      </Typography>
      <Grid container justifyContent="center" spacing={4}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={urlValidation}
        >
          {(props) => {
            return (
              <Box sx={{
                margin: '0 auto',
                textAlign: 'center',
              }}>
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
                        name="url"
                        label="url"
                        type="url"
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
                        Snip
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
                <Box sx={{
                  margin: '0 auto',
                  textAlign: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  width: '100%',

                }}>
                <Typography
                  variant="h8"
                  gutterBottom
                  sx={{ textAlign: 'center' }}
                >
                  Your Snipped URL:
                </Typography>
                <Typography
                  variant="h8"
                  gutterBottom
                  sx={{ textAlign: 'center' }}
                >
                {shortUrl !== '' && (
                  <Link
                    href={`${process.env.REACT_APP_BACKEND_API}/link/${shortUrl}`}
                    target="_blank"
                  >
                    {`${process.env.REACT_APP_BACKEND_API}/link/${shortUrl}`}
                  </Link>
                )}
                </Typography>
                </Box>
              </Box>
            );
          }}
        </Formik>
      </Grid>
    </div>
  );
};

export default URLShortnerForm;
