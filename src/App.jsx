import React, { useEffect } from "react";
import NotPage from "./components/notpage/NotPage";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Headers from "./components/header/Header";
import Footers from "./components/footer/Footer";
import HomePage from "./components/homepage/HomePage";
import ContactPage from "./components/contact/ContactPage";
import BookPage from "./components/book/BookPage";
import LayoutAdmin from "./components/admin/LayoutAdmin";
import AdminDashboard from "./components/admin/pageAdmin/AdminDashboard";
import LayoutUser from "./components/admin/manage-user/LayoutUser";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import { fetchAccountToken } from "./service/api";
import { useDispatch, useSelector } from "react-redux";
import { doAccountToken } from "./redux/account/accountSlice";
import Loading from "./components/loading/Loading";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";

const Layout = () => {
  return (
    <>
      <Headers></Headers>
      <Outlet></Outlet>
      <Footers></Footers>
    </>
  );
};
const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const handleAccountToken = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    ) {
      return;
    }

    let res = await fetchAccountToken();
    if (res && res.data) {
      dispatch(doAccountToken(res.data.data));
    }
  };

  useEffect(() => {
    handleAccountToken();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      errorElement: <NotPage />,
      children: [
        {
          index: true,
          element: <HomePage></HomePage>,
        },
        {
          path: "contact",
          element: <ContactPage></ContactPage>,
        },
        {
          path: "books",
          element: <BookPage></BookPage>,
        },
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin></LayoutAdmin>,
      errorElement: <NotPage />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminDashboard></AdminDashboard>
            </ProtectedRoute>
          ),
        },
        {
          path: "user",
          element: <LayoutUser></LayoutUser>,
        },
        {
          path: "books",
          element: <BookPage></BookPage>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login></Login>,
      errorElement: <NotPage />,
    },
    {
      path: "/register",
      element: <Register></Register>,
      errorElement: <NotPage />,
    },
  ]);
  return (
    <>
      {isAuthenticated === true ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading></Loading>
      )}
    </>
  );
};

export default App;
