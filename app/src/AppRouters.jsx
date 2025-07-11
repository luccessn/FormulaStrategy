import React from "react";
import { Route, Routes } from "react-router-dom";
import { RoutersConfig } from "./Config/RoutersConfig";

export const AppRouters = () => {
  return (
    <Routes>
      {RoutersConfig.map((route, index) => {
        const key = route.path || `route-${index}`;
        return (
          <Route path={route.path} key={key} Component={route.Component} />
        );
      })}
    </Routes>
  );
};
