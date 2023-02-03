import React, {Suspense}from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./contexts/NavBar";

import HomePage from "./pages/HomePage";
import TicketsPage from "./pages/TicketsPage";
import ManagePage from "./pages/ManagePage";
import UsagePage from "./pages/UsagePage";


const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<h1>..........</h1>}/>
      <NavBar></NavBar>
      <Routes>
        <Route exact path="/" element={<HomePage></HomePage>} />
        <Route exact path="/Bilhetes" element={<TicketsPage></TicketsPage>} />
        <Route exact path="/Gerenciamento" element={<ManagePage></ManagePage>} />
        <Route exact path="/use" element={<UsagePage></UsagePage>} />
      </Routes>{" "}
    </Router>
  );
};

export default AppRoutes;
