import { useEffect, useRef, useState, useContext } from "react";
import { AddBand } from "../components/AddBand";
import { BandList } from "../components/BandList";
import { SocketContext } from "../context";
import { BandChart } from "../components/BandChart";

export const HomePage = () => {
  const { online } = useContext(SocketContext);

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service Status:
          {online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </p>
      </div>

      <h1>Band Names</h1>
      <hr />
      <div className="row">
        <div className="col">
          <BandChart />
        </div>
      </div>

      <div className="row">
        <div className="col-8">
          <BandList />
        </div>
        <div className="col-4">
          <AddBand />
        </div>
      </div>
    </div>
  );
};
