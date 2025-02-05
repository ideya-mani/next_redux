// components/UserProfile.tsx
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../services/api.service';
import { RootState } from '../redux/store';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  if (!data) return <Typography>No user data available.</Typography>;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
