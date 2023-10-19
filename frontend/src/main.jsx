import React, { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Settings from "./pages/Settings";
import ErrorPage from "./pages/ErrorPage";
import Progress from "./pages/Progress";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./utils/PrivateRoutes";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import Notes from "./components/Notes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/progress",
    element: <Progress />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/notes",
    element: <Notes />,
    errorElement: <ErrorPage />,
  },
]);

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // initialize theme from local storage or use default
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "dark";
  });

  useEffect(() => {
    // save current theme to local storage
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
