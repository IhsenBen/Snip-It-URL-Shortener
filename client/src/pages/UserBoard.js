import { Container } from '@mui/material';
import { useContext } from 'react';
import URLShortnerForm from '../components/URLShortnerForm';
import UserTable from '../components/UserTable';
import { AuthContext } from '../context/auth-context';

const UserBord = () => {
  const { userId } = useContext(AuthContext);
  return (
    <Container maxWidth="xl">
      <URLShortnerForm route={`/link/user/${userId}`} />
      <UserTable />
    </Container>
  );
};

export default UserBord;
