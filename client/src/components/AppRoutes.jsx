import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import Chat from "./Chat";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default AppRoutes;
