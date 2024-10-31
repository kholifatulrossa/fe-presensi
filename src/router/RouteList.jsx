import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import DashboardPage from '../pages/MainDashboard';
import DashAdmin from '../pages/admin/DashAdmin';
import { Perizinan } from '../pages/admin/Perizinan';
import { DataKelas } from '../pages/admin/DataKelas';
import { Profil } from '../pages/users/Profil';
import { Dashboard } from '../pages/Dashboard';
import { DashUsers } from '../pages/users/DashUsers';
import ProtectedRoute from './ProtectedRoutes';
import { ProfilAdmin } from '../pages/admin/Profil';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <DashboardPage />, // Parent layout
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <DashAdmin />
          </ProtectedRoute>
        ), // Protected route
      },
      {
        path: 'perizinan',
        element: (
          <ProtectedRoute>
            <Perizinan />
          </ProtectedRoute>
        ), // Protected route
      },
      {
        path: 'dataKelas',
        element: (
          <ProtectedRoute>
            <DataKelas />
          </ProtectedRoute>
        ), // Protected route
      },
      {
        path: 'profil',
        element: (
          <ProtectedRoute>
            <ProfilAdmin/>
          </ProtectedRoute>
        ), // Protected route
      },
    ],
  },
  {
    path: '/users',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <DashUsers />
          </ProtectedRoute>
        ), // Protected route
      },
      {
        path: 'profil',
        element: (
          <ProtectedRoute>
            <Profil />
          </ProtectedRoute>
        ), // Protected route
      },
    ],
  },
]);

export default routes;
