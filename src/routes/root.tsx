import Home from "@/pages/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  }
]);

export default function Root() {
  return <RouterProvider router={router} />;
}
