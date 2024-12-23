import { createBrowserRouter } from 'react-router-dom';

import PrivateRoute from '../pages/authUser/PrivateRouter'
import Layout from '../layout/Layout';

import HomePage from '../pages/homePage/HomePage';
import Login from '../pages/authUser/Login';
import Register from '../pages/authUser/RegisterUser';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
              <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: 'Login',
        element: <Login />,
      },
      {
        path: 'Register',
        element: <Register />,
      },
    ],
  },
//   {
//     path: '*',
//     element: <ErrorPage />,
//   },
]);