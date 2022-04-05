import { Container } from '@mui/material';
import URLShortnerForm from '../components/URLShortnerForm';
import UrlsTable from '../components/UrlsTable';

const Home = () => {
  return (
    <Container maxWidth="xl">
      <URLShortnerForm route={/link/} />
      <UrlsTable />
    </Container>
  );
};

export default Home;
