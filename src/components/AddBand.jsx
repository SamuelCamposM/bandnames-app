import React, { useState, useContext } from "react";
import { SocketContext } from "../context";

export const AddBand = () => {
  const { socket } = useContext(SocketContext);

  const [newBand, setnewBand] = useState("");
  
  const onCreateBand = ({ name }) => {
    socket.emit("crear-banda", { name });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (newBand.trim().length > 1) {
      onCreateBand({ name: newBand });
    }
  };
  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={newBand}
          className="form-control"
          placeholder="Nueva banda"
          onChange={(e) => setnewBand(e.target.value)}
        />
      </form>
    </>
  );
};
