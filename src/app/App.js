import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import { Login } from "../pages/Login/Login";
import { NotFound } from "../pages/NotFound/NotFound";

function App() {
  return (
    <>
      <Router>
        <Global />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

const Global = createGlobalStyle`
  * {
    margin: 0;
}
`;

export { App };
