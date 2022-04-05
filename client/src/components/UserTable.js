import {
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth-context';
import Errors from './Errors';

export default function UrlsTable() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const username = auth.username;

  useEffect(() => {
    const sendRequest = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_API}/link/user/${userId}`
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setUrls(responseData.links);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
      setLoading(false);
    };
    sendRequest();
  }, [userId]);

  return (
    <Container maxWidth="xl">
      {loading && <CircularProgress color="inherit" />}
      <Errors error={error} />

      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          marginY: '2rem',
        }}
      >
        Hello {username} ! 👋
      </Typography>

      <Typography variant="h4">Here Are your Links</Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell align="right">Snipped URL</TableCell>
              <TableCell align="right">Clicks</TableCell>
              <TableCell align="right">Snipped</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={3}>No links</TableCell>
              </TableRow>
            )}
            {urls?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.longUrl}
                </TableCell>
                <TableCell align="right">
                  <a
                    href={`${process.env.REACT_APP_BACKEND_API}/link/${row.shortUrl}`}
                    label="link"
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    {row.shortUrl}
                  </a>
                </TableCell>
                <TableCell align="right">{row.clicks}</TableCell>
              </TableRow>
            ))}
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
