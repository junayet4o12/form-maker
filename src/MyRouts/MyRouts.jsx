import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home"
import CreateForm from "../Pages/CreateForm/CreateForm";
import PrivateRouts from "../PrivateRouts/PrivateRouts";
import YourForms from "../Pages/YourForms/YourForms";
import FormDetails from "../Pages/FormDetails/FormDetails";
import UpdateForm from "../Pages/UpdateForm/UpdateForm";
import UserProfile from "../Pages/UserProfile/UserProfile";
import FillUpForm from "../Pages/FillUpForm/FillUpForm";
import ThanksMessage from "../Pages/ThanksMessage/ThanksMessage";
import SeeData from "../Pages/SeeData/SeeData";
import Authentication from "../Pages/Authentication/Authentication";
import SubOrdinate from "../Pages/Subordinate/SubOrdinate";
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
        path: '/accountPortal',
        element: <Authentication />
      },
      {
        path: '/profile',
        element: <PrivateRouts><UserProfile /></PrivateRouts>
      },
      {
        path: '/myForms',
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
        path: '/subordinate/:id',
        element: <PrivateRouts><SubOrdinate /></PrivateRouts>
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
        path: '/responses/:id',
        element: <PrivateRouts><SeeData /></PrivateRouts>
      }
    ]
  },
]);

export default MyRouts;