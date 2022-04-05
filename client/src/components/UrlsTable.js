import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Errors from './Errors';

export default function UrlsTable() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_API}/link/`
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
  }, []);

  return (
    <Container maxWidth="xl">
      <Errors error={error} loading={loading} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell align="right">Snipped URL</TableCell>
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
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
