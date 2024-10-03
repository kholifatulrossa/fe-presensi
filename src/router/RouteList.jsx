import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import DashboardPage from '../pages/MainDashboard';
import DashAdmin from '../pages/admin/DashAdmin';
import { Perizinan } from '../pages/admin/Perizinan';
import { DataKelas } from '../pages/admin/DataKelas';
import NotificationPopup from '../pages/components/Alert';
import { Profil } from '../pages/users/Profil';
import { Dashboard } from '../pages/Dashboard';
import { DashUsers } from '../pages/users/DashUsers';

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
  {
    path :'/users',
    element: <Dashboard/>,
    children: [
      { path: '/users', element: <DashUsers/> },
      { path: '/users/profil', element: <Profil/> }
    ]
  },
  {
    path: '/alert',
    element: <NotificationPopup/>
  },
]);

export default routes;
