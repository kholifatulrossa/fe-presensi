import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import DashboardPage from '../pages/MainDashboard';
import DashAdmin from '../pages/admin/DashAdmin';
import { Perizinan } from '../pages/admin/Perizinan';
import { DataKelas } from '../pages/admin/DataKelas';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <DashboardPage />,
    children: [
      { path: '/admin', element: <DashAdmin /> },
      { path: '/admin/perizinan', element: <Perizinan /> },
      { path: '/admin/dataKelas', element: <DataKelas /> },
    ],
  },
]);

export default routes;
