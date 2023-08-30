import { useEffect, useRef, useState } from "react";
import { AddBand } from "./components/AddBand";
import { BandList } from "./components/BandList";

import { io } from "socket.io-client";

export const App = () => {
  const [online, setonline] = useState(false);
  const [bands, setBands] = useState([]);
  const socketRef = useRef();
  const onVote = (id) => {
    socketRef.current.emit("votar-banda", id);
  };
  const onDeleteBanda = (id) => {
    socketRef.current.emit("eliminar-banda", id);
  };
  const onChangeBandName = (data) => {
    socketRef.current.emit("change-banda", data);
  };
  const onCreateBand = ({ name }) => {
    socketRef.current.emit("crear-banda", { name });
  };
  useEffect(() => {
    socketRef.current = io("http://localhost:4000/", {
      reconnectionDelayMax: 10000,
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socketRef.current.on("current-bands", (bands) => {
      setBands(bands);
    });
  }, []);

  useEffect(() => {
    socketRef.current.on("disconnect", () => {
      setonline(false);
    });
  }, []);
  useEffect(() => {
    socketRef.current.on("connect", () => {
      setonline(true);
    });
  }, []);

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
        <div className="col-8">
          <BandList
            data={bands}
            onVote={onVote}
            onDeleteBanda={onDeleteBanda}
            onChangeBandName={onChangeBandName}
            onCreateBand={onCreateBand}
          />
        </div>
        <div className="col-4">
          <AddBand onCreateBand={onCreateBand} />
        </div>
      </div>
    </div>
  );
};
