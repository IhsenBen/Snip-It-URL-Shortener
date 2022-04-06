import { Container } from '@mui/material';
import { useContext, useState } from 'react';
import URLShortnerForm from '../components/URLShortnerForm';
import UserTable from '../components/UserTable';
import { AuthContext } from '../context/auth-context';

const UserBord = () => {
  const [loadTable, setLoadTable] = useState(false);
  const { userId } = useContext(AuthContext);
  return (
    <Container maxWidth="xl">
      <URLShortnerForm
        route={`/link/user/${userId}`}
        setLoadTable={setLoadTable}
      />
      <UserTable loadTable={loadTable} />
    </Container>
  );
};

export default UserBord;
