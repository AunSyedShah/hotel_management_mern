import { useFormik } from 'formik';
import axios from 'axios';
import { useAuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router';

export default function Login() {

  const {user, setUser} = useAuthContext();
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
        setUser(response.data.user);
        navigate("/dashboard")
      } catch (err) {
        
      }
    },
  });

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-base-100 shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-error text-sm mt-1">{formik.errors.email}</span>
              )}
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <span className="text-error text-sm mt-1">{formik.errors.password}</span>
              )}
            </div>


            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
