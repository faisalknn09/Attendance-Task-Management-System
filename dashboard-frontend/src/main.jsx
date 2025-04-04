import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Home from './components/Home.jsx';
import Info from './components/Info.jsx';
import Report from './components/Report.jsx';
import LoginPage from './LoginPage.jsx'; // Import Login component
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />, // Set Login as the main page
  },
  {
    path: "/app",
    element: <App />, // App will be accessible after login
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "info",
        element: <Info />,
      },
      {
        path: "report",
        element: <Report />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
