import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home"
import LogIn from "../Pages/LogIn/LogIn";
import Register from "../Pages/Register/Register";
import CreateForm from "../Pages/CreateForm/CreateForm";
import PrivateRouts from "../PrivateRouts/PrivateRouts";
import YourForms from "../Pages/YourForms/YourForms";
import FormDetails from "../Pages/FormDetails/FormDetails";
import UpdateForm from "../Pages/UpdateForm/UpdateForm";
import UserProfile from "../Pages/UserProfile/UserProfile";
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
        path: '/profile',
        element: <PrivateRouts><UserProfile/></PrivateRouts>
      },
      {
        path: '/yourForms',
        element: <YourForms />
      },
      {
        path: '/formDetails/:id',
        element: <FormDetails />
      },
      {
        path: '/updateForm/:id',
        element: <UpdateForm />
      },
      {
        path: '/createForm',
        element: <PrivateRouts><CreateForm /></PrivateRouts>
      }
    ]
  },
]);

export default MyRouts;