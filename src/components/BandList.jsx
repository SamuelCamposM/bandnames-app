import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../context";

export const BandList = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  const onVote = (id) => {
    socket.emit("votar-banda", id);
  };
  const onDeleteBanda = (id) => {
    socket.emit("eliminar-banda", id);
  };
  const onChangeNombre = (e, id) => {
    setBands(
      bands.map((itemBand) =>
        itemBand.id === id ? { ...itemBand, name: e.target.value } : itemBand
      )
    );
  };
  const onLostFocus = (e, id) =>
    socket.emit("change-banda", { value: e.target.value, id });

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });
    return () => socket.off("current-bands");
  }, []); 

  const CrearRows = () => {
    return bands.map((bandEditable) => (
      <tr key={bandEditable.id}>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => onVote(bandEditable.id)}
          >
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={bandEditable.name}
            onChange={(e) => onChangeNombre(e, bandEditable.id)}
            onBlur={(e) => onLostFocus(e, bandEditable.id)}
          />
        </td>
        <td>
          <h3>{bandEditable.votes}</h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => onDeleteBanda(bandEditable.id)}
          >
            Borrar
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <>
      <table className="table table stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{CrearRows()}</tbody>
      </table>
    </>
  );
};
