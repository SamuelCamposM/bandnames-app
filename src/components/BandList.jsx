import React, { useEffect, useState } from "react";

export const BandList = ({ data, onVote, onDeleteBanda, onChangeBandName }) => {
  const [bands, setBands] = useState(data);
  useEffect(() => {
    setBands(data);
  }, [data]);

  const onChangeNombre = (e, id) => {
    setBands(
      bands.map((itemBand) =>
        itemBand.id === id ? { ...itemBand, name: e.target.value } : itemBand
      )
    );
  };

  const onLostFocus = (e, id) => {
    onChangeBandName({ value: e.target.value, id });
  };
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
