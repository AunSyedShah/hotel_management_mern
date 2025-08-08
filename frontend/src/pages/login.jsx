import { useFormik } from 'formik';
import axios from 'axios';
import { useAuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router';
import { Card, Input, Button, Container } from '../components/ui';

export default function Login() {

  const {user, setUser, setToken} = useAuthContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) errors.email = 'Email is required';
      if (!values.password) errors.password = 'Password is required';
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/auth/login', values);
        console.log(response.data.user);
        // Update context
        setUser(response.data.user);
        setToken(response.data.token);
        // Note: AuthProvider syncs to localStorage; this is an extra safeguard.
        try {
          localStorage.setItem('auth_user', JSON.stringify(response.data.user));
          localStorage.setItem('auth_token', response.data.token);
        } catch (_) {}
        navigate("/dashboard")
      } catch (err) {
        
      }
    },
  });

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <Container maxWidth="md">
        <Card title="Login" className="max-w-md mx-auto">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
              required
            />

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full"
            >
              Login
            </Button>
          </form>
        </Card>
      </Container>
    </div>
  );
}
