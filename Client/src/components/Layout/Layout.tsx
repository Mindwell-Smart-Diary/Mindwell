import { Outlet } from "react-router-dom";
import AppBarComponent from "../appbar/Appbar";

export const Layout = () => {
  return (
    <div>
      <AppBarComponent />
      <Outlet />
    </div>
  );
};
