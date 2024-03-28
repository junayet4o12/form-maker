import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
const MyRouts = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>
  },
]);

export default MyRouts;