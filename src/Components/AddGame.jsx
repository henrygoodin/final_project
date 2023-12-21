import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './AddGame.css'; // Update the import path for the corresponding CSS file

function AddGame(props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const handleAddGame = () => {
    const newGame = {
      id: nanoid(),
      title: title,
      price: parseFloat(price),
      description: description,
      image: URL.createObjectURL(selectedFile),
    };
    props.addGame(newGame);
    // Clear input fields after adding the game
    setTitle("");
    setPrice(0);
    setDescription("");
    setSelectedFile(null);
  };

  const handleImageUpdate = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="row mt-5" id="addGame">
      <h3>Add Game</h3>
      <div className="col-md-3">
        <label htmlFor='txtTitle' className='form-label'>Title</label>
        <input type="text" id='txtTitle' placeholder='Game Title' className='form-control' onChange={(evt) => setTitle(evt.currentTarget.value)} value={title} />
      </div>
      <div className="col-md-3">
        <label htmlFor='txtPrice' className='form-label'>Price</label>
        <input type="number" id='txtPrice' placeholder='0.00' className='form-control' onChange={(evt) => setPrice(evt.currentTarget.value)} value={price} />
      </div>
      <div className="col-md-3">
        <label htmlFor='txtDescription' className='form-label'>Description</label>
        <input type="text" id='txtDescription' placeholder='Game Description' className='form-control' onChange={(evt) => setDescription(evt.currentTarget.value)} value={description} />
      </div>
      <div className="col-md-2">
        <label htmlFor="fileUpload" className='form-label'>Game Image</label>
        <input type="file" name="file" id='fileUpload' onChange={handleImageUpdate} />
      </div>
      <div className="col-md-1">
        <button type='button' id='btnAdd' className='btn btn-primary btn-lg' onClick={handleAddGame}>Add Game <FontAwesomeIcon icon={faPlusCircle} /></button>
      </div>
    </div>
  );
}

export default AddGame;
