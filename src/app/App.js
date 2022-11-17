import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { Main } from "../pages/Main/Main";
import { Guide } from "../pages/Guide/Guide";
import { NotFound } from "../pages/NotFound/NotFound";
import { Error } from "../pages/Error/Error";

import { NavBar } from "../components/NavBar/NavBar";

import { RequireAuth } from "../features/authState";

function App() {
  return (
    <Router>
      <Global />
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Main />
            </RequireAuth>
          }
        />
        <Route
          path="/Guide"
          element={
            <RequireAuth>
              <Guide />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/error" element={<Error />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

const Global = createGlobalStyle`
  * {
    margin: 0;
}
`;

export { App };
