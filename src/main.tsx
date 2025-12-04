import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Homepage from "./ui/Homepage";
import Categories, { allProductLoader } from "./ui/Categories";
import Product from "./ui/Product";
import Cart from "./ui/Cart";
import { productLoader } from "./component/BestSelling";
import { productDetailLoader } from "./component/ProductDetail";
import { Provider } from "react-redux";
import { store } from "./store";
import Login from "./ui/Login";
import SignUpComponent from "./LoginPage/SignUpComponent";
import ForgotPassword from "./LoginPage/ForgotPassword";
import ResetPassword from "./LoginPage/ResetPassword";
import MyAccount from "./ui/MyAccount";
import ShippingAddress from "./Cart/ShippingAddress";
import CartBox from "./Cart/CartBox";
import LoginComponent from "./LoginPage/LoginComponent";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import AuthProvider from "./Provider/AuthProvider";
import ErrorPage from "./component/ErrorPage";
import Wishlist, { wishLoader } from "./Acount/Wishlist";
import OrderSuccess from "./Order/OrderSuccess";
import OrderError from "./Order/OrderError";
import Order, { orderLoader } from "./Acount/Order";
import AddressInput from "./Acount/AddressInput";
import Password from "./Acount/Password";
import UserProfile from "./Acount/UserProfile";
import Admin from "./ui/Admin";
import Dashboard, { allOrderLoader } from "./Admin/Dashboard";
import Products from "./Admin/Products";
import Customer, { customerLoader } from "./Admin/Customer";
import Review, { ReviewLoader } from "./Admin/Review";
import Settings from "./Admin/Settings";
import AdminPage from "./Admin/AdminPage";
import Orders, { adminOrderList } from "./Admin/Orders"
import AdminLogin from "./Admin/AdminLogin";
import { AdminproductLoader as loader } from "./Admin/Products";
import AddProduct from "./Admin/AddProduct";
import Contact from "./ui/Contact";
import About from "./ui/About";
import EditProduct, { editLoader } from "./Admin/EditProduct";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        children: [
          {
            path: "/login",
            element: <LoginComponent />,
          },
          {
            path: "/sign-up",
            element: <SignUpComponent />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "/reset-password",
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: "/",
        element: <Homepage />,
        loader: productLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/products",
        element: <Categories />,
        loader: allProductLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/products/:id",
        element: <Product />,
        loader: productDetailLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        element: <ProtectedRoute />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/cart",
            element: <Cart />,
            errorElement: <ErrorPage />,

            children: [
              {
                path: "shipping",
                element: <ShippingAddress />,
              },
              {
                index: true,
                element: <CartBox />,
              },
            ],
          },
          {
            path: "/order-success",
            element: <OrderSuccess />,
          },
          {
            path: "/order-error",
            element: <OrderError />,
          },
          {
            path: "/account",
            element: <MyAccount />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <Order />,
                loader: orderLoader,
              },
              {
                path: "wishlist",
                element: <Wishlist />,
                loader: wishLoader,
              },
              {
                path: "address",
                element: <AddressInput />,
              },
              {
                path: "password",
                element: <Password />,
              },
              {
                path: "user",
                element: <UserProfile />,
              },
            ],
          },
        ],
      },{
          path: "/admin-login",
          element: <AdminLogin/>
      },
      {
        element: <Admin />,
        children: [
          {
            path: "/admin",
            element: <AdminPage />,
            children: [
              {
                path: "dashboard",
                element: <Dashboard />,
                loader: allOrderLoader
              },
              {
                path: "products",
                element: <Products />,
                loader: loader,
              },
              {
                path: "/admin/edit-product/:id",
                element: <EditProduct />,
                loader: editLoader,
                 },
              {
                path: "add-products",
                element: <AddProduct />,
              },
              {
                path: "orders",
                element: <Orders/>,
                loader: adminOrderList
              },
              {
                path: "customers",
                element: <Customer />,
                loader: customerLoader,
              },
              {
                path: "reviews",
                element: <Review />,
                loader: ReviewLoader,
              },
              {
                path: "settings",
                element: <Settings />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);


