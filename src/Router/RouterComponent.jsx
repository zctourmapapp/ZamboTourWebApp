import { Route, Routes, Navigate, useLocation, Outlet } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import Login from "../Page/Login";
import Register from "../Page/Register";
import RecoveryAccount from "../Page/RecoveryAccount";
import Layout from "../Page/Layout";
import useUserHook from "../Hooks/useUserHook";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy, useEffect } from "react";

const Home = lazy(() => import("../Page/Home"));

const ProtectedRoutes = () => {
  const { user } = useUserHook();
  const location = useLocation();

  return localStorage.getItem("user") || user?.isApproved ? (
    <Outlet />
  ) : (
    <Navigate to="home" replace state={{ from: location.pathname }} />
  );
};

const RouterComponent = () => {
  const { checkToken } = useUserHook();

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AnimatePresence>
      <Suspense fallback={<Text>Loading</Text>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/recover" element={<RecoveryAccount />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/*" element={<Layout />} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default RouterComponent;
