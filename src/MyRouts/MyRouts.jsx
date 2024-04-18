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
import FillUpForm from "../Pages/FillUpForm/FillUpForm";
import ThanksMessage from "../Pages/ThanksMessage/ThanksMessage";
import SeeData from "../Pages/SeeData/SeeData";
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
        element: <PrivateRouts><UserProfile /></PrivateRouts>
      },
      {
        path: '/yourForms',
        element: <PrivateRouts><YourForms /></PrivateRouts>
      },
      {
        path: '/formDetails/:id',
        element: <PrivateRouts><FormDetails /></PrivateRouts>
      },
      {
        path: '/updateForm/:id',
        element: <PrivateRouts><UpdateForm /></PrivateRouts>
      },
      {
        path: '/createForm',
        element: <PrivateRouts><CreateForm /></PrivateRouts>
      },
      {
        path: '/fillUpForm/:id',
        element: <FillUpForm />
      },
      {
        path: '/thanks/:id',
        element: <ThanksMessage />
      },
      {
        path: '/seeData/:id',
        element: <PrivateRouts><SeeData /></PrivateRouts>
      }
    ]
  },
]);

export default MyRouts;