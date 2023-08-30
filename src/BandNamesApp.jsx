import React from "react";
import { HomePage } from "./pages";
import { SocketProvider } from "./context";
 
export const BandNamesApp = () => {
  return (
    <SocketProvider> 
        <HomePage /> 
    </SocketProvider>
  );
};
