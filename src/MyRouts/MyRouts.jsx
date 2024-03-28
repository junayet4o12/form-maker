import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home"
import LogIn from "../Pages/LogIn/LogIn";
import Register from "../Pages/Register/Register";
import CreateForm from "../Pages/CreateForm/CreateForm";
const MyRouts = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <LogIn />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/createForm',
        element: <CreateForm />
      }
    ]
  },
]);

export default MyRouts;