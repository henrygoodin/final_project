import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './Game.css';

function Game(props) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(props.game.title);
    setPrice(props.game.price);
    setDescription(props.game.description);
  }, [props.game]);

  const deleteGame = () => {
    props.removeGame(props.game);
  };

  const saveGameChanges = () => {
    setEditMode(false);
    const updatedGame = {
      title,
      price,
      description,
      id: props.game.id,
      image: props.game.image,
    };
    props.updateGame(updatedGame);
  };


  return (
    <div className="card">
      <img
        src={props.game.image}
        alt="Game Cover"
        className="card-img-top mx-auto"
      />
      {!editMode && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-center">{title}</li>
          <li className="list-group-item text-center">{`$${price.toFixed(
            2
          )}`}</li>
          <li className="list-group-item text-center">{description}</li>
          <li className="list-group-item text-center">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteGame}
            >
              Delete <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
          <li className="list-group-item text-center">
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => setEditMode(true)}
            >
              Edit <FontAwesomeIcon icon={faEdit} />
            </button>
          </li>
        </ul>
      )}
      {editMode && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-center">
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(evt) => setTitle(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item text-center">
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(evt) => setPrice(parseFloat(evt.currentTarget.value))}
            />
          </li>
          <li className="list-group-item text-center">
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(evt) => setDescription(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item text-center">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={saveGameChanges}
            >
              Save
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Game;