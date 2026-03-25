import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { FacilityDetail } from "./components/FacilityDetail";
import { LoginWrapper as Login } from "./components/LoginWrapper";
import { RegisterWrapper as Register } from "./components/RegisterWrapper";
import { MyPage } from "./components/MyPage";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "facility/:id", Component: FacilityDetail },
      { path: "mypage", Component: MyPage },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);
