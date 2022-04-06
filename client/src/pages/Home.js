import { Container } from '@mui/material';
import URLShortnerForm from '../components/URLShortnerForm';
import UrlsTable from '../components/UrlsTable';
import {  useState } from 'react';

const Home = () => {
  const [loadTable, setLoadTable] = useState(false);
  return (
    <Container maxWidth="xl">
      <URLShortnerForm route={/link/}
      setLoadTable={setLoadTable} />
      <UrlsTable loadTable={loadTable}/>
    </Container>
  );
};

export default Home;
